// import userModel from '../Models/user.model.js'; // adjust import as per your structure
// import chatModel from '../Models/chat.model.js'; 
import messageModel from '../Models/message.model.js';
import Response from '../Code/Response.js';

export const sendMessageDto = async (newMessage) => {
    const message = new messageModel(newMessage);
    await message.save()
    return Response.success('Message sent...', message);
};