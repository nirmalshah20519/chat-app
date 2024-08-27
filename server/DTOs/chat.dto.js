import userModel from "../Models/user.model.js"; // adjust import as per your structure
import chatModel from "../Models/chat.model.js";
import messageModel from "../Models/message.model.js";
import Response from "../Code/Response.js";

export const getMyFriendsDto = async (email) => {
  const user = await userModel.findOne({ email });
  if (!user) {
    return Response.notFound(`User with email ${email} not found`);
  }
  const chats = await chatModel
    .find({
      $or: [{ user1: user._id }, { user2: user._id }],
    })
    .populate("user1 user2");

  const friendsWithLastMessage = [];

  for (const chat of chats) {
    const friend = chat.user1._id.equals(user._id) ? chat.user2 : chat.user1;
    const lastMessage = await messageModel
      .findOne({ chatId: chat._id })
      .sort({ createdAt: -1 });

    friendsWithLastMessage.push({
      friend: {
        _id: friend._id,
        email: friend.email,
        firstName: friend.firstName,
        lastName: friend.lastName,
        gender: friend.gender,
      },
      lastMessage,
    });
  }
  friendsWithLastMessage.sort(
    (a, b) => b.lastMessage.createdAt - a.lastMessage.createdAt
  );

  return Response.success(
    "Friends fetched successfully",
    friendsWithLastMessage
  );
};

export const getChatByIdDto = async (chatId) => {
  const messages = await messageModel.find({ chatId });
  messages.sort((a, b) => a.createdAt - b.createdAt);
  return Response.success("messages", messages);
};

export const getChatIdByFriendDto = async (userEmail, friendId) => {
  // implement logic to get chatId by friend

  
  
  const user = await userModel.findOne({ email: userEmail });
  
  if (user===null) {
    console.log('yayyay');
    return Response.notFound(`User with email ${userEmail} not found`);
  }
  

  const chat = await chatModel.findOne({
    $or: [
      { user1: user._id, user2: friendId },
      { user1: friendId, user2: user._id },
    ],
  });
  
  if (!chat) {
    return Response.notFound(`Chat with friend ${friendId} not found`);
  }


  return Response.success("Chat Found", { chatId:chat._id });
};
