import {
  acceptRequestDto,
  getMyRequestsDto,
  sendRequestDto,
} from "../DTOs/request.dto.js";

export const sendRequest = async (req, resp) => {
  try {
    const r = await sendRequestDto(req.body);
    const { code, ...rest } = r;
    resp.status(code).send(rest);
  } catch (error) {
    console.error("Error in sendRequest:", error);
    resp
      .status(500)
      .send({ message: "An error occurred while sending the request." });
  }
};

export const acceptRequest = async (req, resp) => {
  try {
    
    const r = await acceptRequestDto(req.body);
    const { code, ...rest } = r;
    resp.status(code).send(rest);
  } catch (error) {
    console.error("Error in acceptRequest:", error);
    resp
      .status(500)
      .send({ message: "An error occurred while accepting the request." });
  }
};

export const rejectRequest = async (req, resp) => {
  try {
    
    const r = await rejectRequestDto(req.body);
    const { code, ...rest } = r;
    resp.status(code).send(rest);
  } catch (error) {
    console.error("Error in rejectRequest:", error);
    resp
      .status(500)
      .send({ message: "An error occurred while rejecting the request." });
  }
};

export const getMyRequests = async (req, resp) => {
  try {
    const r = await getMyRequestsDto(req.params.email);
    const { code, ...rest } = r;
    resp.status(code).send(rest);
  } catch (error) {
    console.error("Error in rejectRequest:", error);
    resp
      .status(500)
      .send({ message: "An error occurred while rejecting the request." });
  }
};




