import { sendMessageDto } from "../DTOs/message.dto.js";

export const sendMessage = async (req, resp) => {
  try {
    const r = await sendMessageDto(req.body);
    const { code, ...rest } = r;
    resp.status(code).send(rest);
  } catch (error) {
    console.error("Error in sending message :", error);
    resp
      .status(500)
      .send({ message: "An error occurred while sending the request." });
  }
};