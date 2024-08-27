import Response from "../Code/Response.js";
import userModel from "../Models/user.model.js";
import { generateOTP } from "../utils/otp.util.js";
import jwt from "jsonwebtoken";
import UserRepository from "../Code/UserRepository.js";
import requestModel from "../Models/request.model.js";

/*
{
    "firstName": "John",
    "lastName": "Doe",
    "dateOfBirth": "1990-01-15",
    "gender": "Male",
    "email": "john.doe@example.com"
}
*/
export const getUserSchema = (userDto) => {
  const { firstName, lastName, dateOfBirth, gender, email } = userDto;
  const lastOtp = generateOTP();
  return new userModel({
    firstName,
    lastName,
    dateOfBirth,
    gender,
    email,
    userName: email.split("@")[0],
    lastOtp,
    isVerified: false,
  });
};

const validateUserFields = async (userDto) => {
  const { firstName, lastName, dateOfBirth, gender, email } = userDto;

  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!emailRegex.test(email.toLowerCase())) {
    return Response.error("Invalid email format.");
  }

  if (firstName.length < 3 || firstName.length > 20) {
    return Response.error("First name must be between 3 and 20 characters.");
  }
  if (lastName.length < 3 || lastName.length > 20) {
    return Response.error("Last name must be between 3 and 20 characters.");
  }

  if (new Date(dateOfBirth) >= new Date()) {
    return Response.error("Date of birth cannot be in the future.");
  }

  const validGenders = ["Male", "Female", "Other"];
  if (!validGenders.includes(gender)) {
    return Response.error(
      "Invalid gender specified. Choose from Male, Female, or Other."
    );
  }

  const emailExists = await userModel.findOne({ email });
  if (emailExists && emailExists.isVerified === true) {
    return Response.error("Email is already in use.");
  }
  if (emailExists && emailExists.isVerified === false) {
    const otp = generateOTP();
    emailExists.firstName = firstName;
    emailExists.lastName = lastName;
    emailExists.dateOfBirth = dateOfBirth;
    emailExists.gender = gender;
    emailExists.lastOtp = otp;
    await emailExists.save();
    return Response.success(
      `User Registered Successfully! Kindly enter OTP [${otp}] to verify account`,
      emailExists
    );
  }

  return null;
};

const CreateToken = (email) => {
  const jwtKey = process.env.JWT_SECRET_KEY;
  const payLoad = { userEmail: email };
  return jwt.sign(payLoad, jwtKey, { expiresIn: "2h", algorithm: "HS256" });
};

export const validateAndCreateUser = async (userDto) => {
  const validationResponse = await validateUserFields(userDto);
  if (validationResponse) {
    return validationResponse;
  }
  try {
    const newUser = new userModel(userDto);
    await newUser.save();
    return Response.success(
      `User Registered Successfully! Kindly enter OTP [${newUser.lastOtp}] to verify account`,
      newUser
    );
  } catch (error) {
    console.error("Error saving user to database:", error);
    return Response.error("Failed to save user due to internal error.");
  }
};

export const verifyUserDto = async (verifyDto) => {
  // debugger;
  const { email, otp } = verifyDto;
  const user = await userModel.findOne({ email });

  if (!user) {
    return Response.notFound("User not found");
  }

  if (user.lastOtp !== otp) {
    return Response.error("Invalid OTP");
  }

  user.isVerified = true;
  await user.save();

  return Response.success(
    "Congratulations! your account is Verified. you can login with registered email."
  );
};

export const LoginUserDto = async (email) => {
  const user = await userModel.findOne({ email });

  if (!user) {
    return Response.notFound("User not found");
  }

  if (!user.isVerified) {
    return Response.badRequest("User is not verified");
  }

  const newOtp = generateOTP();
  user.lastOtp = newOtp;
  await user.save();

  return Response.success(`Otp sent to your email : ${user.lastOtp}`);
};

export const AuthenticateUserDto = async (authDto) => {
  const { email, otp } = authDto;
  const user = await userModel.findOne({ email });

  if (!user) {
    return Response.notFound("User not found");
  }

  if (!user.isVerified) {
    return Response.error("User is not verified");
  }

  if (user.lastOtp !== otp) {
    return Response.error("Wrong Otp");
  }
  const token = CreateToken(user.email);

  return Response.success("Login Successful", undefined, token);
};

export const getUserByEmailDto = async (userEmail) => {
  const user = await userModel.findOne({ email: userEmail });
  if (!user) {
    return Response.notFound(`User not found`);
  } else {
    return Response.success(`User not found`, user);
  }
};
/*
availability :-
0 - can add as friend
1 - request already sent
2 - request already received
3 - already friends
*/
export const getUserByQueryDto = async (query, userName) => {
  try {
    const currentUser = await userModel.findOne({ userName });

    if (!currentUser) {
      return Response.notFound("Current user not found");
    }

    const users = await userModel.find({
      $or: [
        { firstName: { $regex: query, $options: "i" } },
        { lastName: { $regex: query, $options: "i" } },
        { userName: { $regex: query, $options: "i" } },
      ],
      userName: { $ne: userName },
      isVerified: true,
    });

    const updatedUsers = await Promise.all(
      users.map(async (user) => {
        const request = await requestModel.findOne({
          from: currentUser._id,
          to: user._id,
        });

        const revRequest = await requestModel.findOne({
          from: user._id,
          to: currentUser._id,
        });

        let availability = 0;
        if (request || revRequest) {
          if (request?.isAccepted === true || revRequest?.isAccepted===true) {
            availability = 3;
          } else if (request?.isAccepted === false) {
            availability = 1;
          }
          else if (revRequest?.isAccepted === false) {
            availability = 2;
          }
        }

        return {
          ...user._doc,
          availability,
        };
      })
    );

    return Response.success("Users found", updatedUsers);
  } catch (error) {
    return Response.error(`An error occurred: ${error.message}`);
  }
};

// apis for testing
export const getAllUsersDto = async () => {
  const users = await userModel.find({ isVerified: true });
  return users;
};
