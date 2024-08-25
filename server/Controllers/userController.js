
import { AuthenticateUserDto, getAllUsersDto, getUserByEmailDto, getUserSchema, LoginUserDto, validateAndCreateUser, verifyUserDto } from "../DTOs/user.dto.js";

export const registerUser = async (req, resp) => {
    try {
        const user = getUserSchema(req.body);
        const r = await validateAndCreateUser(user)
        const {code, ...rest} = r;
        resp.status(code).send(rest);
    } catch (error) {
        // Log the error or handle it accordingly
        console.error("Failed to register user:", error);
        resp.status(500).send({
            message: "Failed to register user due to an internal error.",
            error
        });
    }
}

export const verifyUser = async (req, resp) => {
    // debugger;
    try {
        console.log(req.body);
        const v = await verifyUserDto(req.body);
        console.log(v);
        const {code, ...rest} = v;
        resp.status(code).send(rest);
        
    } catch (error) {
        resp.status(500).send({
            message: "Failed to verify user due to an internal error.",
            error
        });
    }
}

export const loginUser = async (req, resp) => {
    try {
        const v = await LoginUserDto(req.body.email);
        const {code, ...rest} = v;
        resp.status(code).send(rest);
        
    } catch (error) {
        resp.status(500).send({
            message: "Failed to verify user due to an internal error.",
            error
        });
    }
}

export const authenticateUser = async (req, resp) => {
    try {
        const v = await AuthenticateUserDto(req.body);
        const {code, ...rest} = v;
        resp.status(code).send(rest);        
    } catch (error) {
        resp.status(500).send({
            message: "Failed to verify user due to an internal error.",
            error
        });
    }
}

export const getUserById = async (req, resp) => {
    try {
        const userEmail = req.params.email;
        const r = await getUserByEmailDto(userEmail);

        const {code, message, data} = r;
        
        if(data){
            resp.status(code).send(data);
        }else{
            resp.status(code).send({message});
        }
    } catch (error) {
        resp.status(500).send({
            message: "Failed to fetch users due to an internal error.",
            error
        });
    }
}


//apis for testing


export const getAllUsers = async (req, resp) => {
    try {
        const users = await getAllUsersDto();
        console.log(users);
        resp.status(200).send(users);        
    } catch (error) {
        resp.status(500).send({
            message: "Failed to fetch users due to an internal error.",
            error
        });
    }
}
