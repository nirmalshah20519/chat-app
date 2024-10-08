import {
  getChatByIdDto,
  getChatIdByFriendDto,
  getMyFriendsDto,
} from "../DTOs/chat.dto.js";

export const getMyFriends = async (req, resp) => {
  try {
    const r = await getMyFriendsDto(req.user.userEmail);
    const { code, ...rest } = r;
    resp.status(code).send(rest);
  } catch (error) {
    console.error("Error in sendRequest:", error);
    resp
      .status(500)
      .send({ message: "An error occurred while finding the friends" });
  }
};

export const getChatById = async (req, resp) => {
  try {
    const r = await getChatByIdDto(req.params.chatId);
    const { code, ...rest } = r;
    resp.status(code).send(rest);
  } catch (error) {
    console.error("Error in sendRequest:", error);
    resp
      .status(500)
      .send({ message: "An error occurred while finding the Messages" });
  }
};

export const getChatIdByFriend = async (req, resp) => {
  // logic to get chatId by friend

  try {
    
    const userEmail = req.user.userEmail;
    
    const friendId = req.params.friendId;
    
    const r = await getChatIdByFriendDto(userEmail, friendId);
    const { code, ...rest } = r;
    resp.status(code).send(rest);
  } catch (error) {
    console.error("Error in sendRequest:", error);
    resp
      .status(500)
      .send({ message: "An error occurred while finding the Messages" });
  }
};
