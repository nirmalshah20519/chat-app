import userModel from "../Models/user.model.js";
import requestModel from "../Models/request.model.js";
import chatModel from "../Models/chat.model.js";
import messageModel from "../Models/message.model.js";
import Response from "../Code/Response.js";

export const sendRequestDto = async (reqDto) =>{
    const {from, to} = reqDto;
    const user1 = await userModel.findOne({email: from});
    const user2 = await userModel.findOne({email: to});

    if(!user2){
        return Response.notFound(`User with email ${to} not found.`);
    }

    const newReq = new requestModel({
        from: user1._id,
        to: user2._id
    });
    await newReq.save();
    return Response.success(`Request sent to ${user2.firstName} ${user2.lastName}`);
}

export const acceptRequestDto = async (reqDto) =>{
    const {from, to} = reqDto;
    const u1 = await userModel.findOne({email:from});
    const u2 = await userModel.findOne({email:to});
    const req = await requestModel.findOne({from:u1._id, to:u2._id});

    if(!req){
        return Response.notFound(`Request not found.`);
    }
    req.isAccepted=true;
    await req.save();

    const chat = new chatModel({
        user1:req.from,
        user2:req.to
    });
    await chat.save();

    const message = new messageModel({
        content:`${u1.firstName} and ${u2.firstName} are now friends.`,
        contentType:'text',
        chatId:chat._id
    });
    await message.save();

    return Response.success(`${u1.firstName} and ${u2.firstName} are now friends.`);
} 

export const rejectRequestDto = async (reqDto) =>{
    const {from, to} = reqDto;
    console.log(reqDto);
    const u1 = await userModel.findOne({email:from});
    const u2 = await userModel.findOne({email:to});
    const req = await requestModel.findOne({from:u1._id, to:u2._id});

    if(!req){
        return Response.notFound(`Request not found.`);
    }
    await requestModel.deleteOne({ _id: req._id });
    return Response.success(`Request successfully rejected.`);
}

export const getMyRequestsDto = async (email) => {
    const user = await userModel.findOne({ email });
    if(!user){
        return Response.notFound(`User not found.`);
    }
    const requests = await requestModel.find({to:user._id, isAccepted:false}).populate('from');
    return Response.success('Your Friend Requests', requests);
}