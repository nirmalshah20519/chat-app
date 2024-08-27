import React, { useState } from "react";
import { Box, Typography, InputBase, IconButton, Avatar } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ChatIcon from "@mui/icons-material/Chat";
import InputEmoji from "react-input-emoji";
import { sendMessage } from "../Services/message.service";

export default function ChatContainer({
  messages,
  user,
  currChat,
  currFriend,
  reload
}) {
  const processContent = (content) => {
    const replaced = content.replace(user?.firstName, "you");
    return replaced;
  };
  const [Message, setMessage] = useState("");

  // const handleMessageChange = (e) =>{
  //   setMessage(e.target.value)
  // }
  const handleMessageSend = () => {
    // console.log(Message);
    const newMessage = {
      content: Message,
      authorId: user?._id,
      chatId: currChat,
    };
    setMessage("");
    console.log(newMessage);
    sendMessage(newMessage)
      .then((resp) => {
        console.log(resp);
        reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "91.5vh",
        // maxWidth: '600px',
        margin: "0 auto",
        border: "1px solid #ddd",
        // borderRadius: '8px',
        overflow: "hidden",
      }}
    >
      {currChat !== null ? (
        <>
          {/* Chat Header */}
          <Box
            sx={{
              padding: "16px",
              borderBottom: "1px solid #ddd",
              backgroundColor: "#f0f0f0",
              display: "flex",
            }}
          >
            <Avatar
              alt={currFriend?.firstName}
              src={currFriend?.gender === "Male" ? "male.png" : "female.png"}
              sx={{ width: 36, height: 36, mx: 1 }}
            />
            <Typography variant="h6">
              {currFriend?.firstName} {currFriend?.lastName}
            </Typography>
          </Box>

          {/* Chat Messages */}
          <Box
            sx={{
              flex: 1,
              padding: "16px",
              overflowY: "auto",
              backgroundColor: "#e5ddd5",
              "&::-webkit-scrollbar": { display: "none" }, // Hide scrollbar for Chrome, Safari, and Opera
              "-ms-overflow-style": "none", // Hide scrollbar for IE and Edge
              "scrollbar-width": "none", // Hide scrollbar for Firefox
            }}
          >
            {messages.map((message, index) => (
              <Box
                key={index + 1}
                sx={{
                  marginBottom: "12px",
                  display: "flex",
                  justifyContent:
                    message.authorId === user._id
                      ? "flex-end"
                      : message.authorId === null
                      ? "center"
                      : "flex-start",
                }}
              >
                <Box
                  sx={{
                    padding: "8px 16px",
                    borderRadius: "16px",
                    backgroundColor:
                      message.authorId === user._id
                        ? "#dcf8c6"
                        : message.authorId === null
                        ? "#c9c0c0"
                        : "#fff",
                    maxWidth: "70%",
                    boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  {message.authorId === null ? (
                    <Typography variant="body2">
                      {processContent(message.content)}
                    </Typography>
                  ) : (
                    <Typography variant="body2">{message.content}</Typography>
                  )}
                  {message.authorId !== null && (
                    <Typography
                      variant="caption"
                      sx={{
                        display: "block",
                        textAlign: "right",
                        marginTop: "4px",
                      }}
                    >
                      {new Date(message.createdAt).toLocaleString("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                      })}
                    </Typography>
                  )}
                </Box>
              </Box>
            ))}
          </Box>

          {/* Input Area */}
          <Box
            sx={{
              padding: "8px 16px",
              borderTop: "1px solid #ddd",
              backgroundColor: "#f0f0f0",
              display: "flex",
              alignItems: "center",
            }}
          >
            <InputEmoji
              value={Message}
              onChange={setMessage}
              onEnter={handleMessageSend}
              sx={{
                flex: 1,
                padding: "8px 12px",
                backgroundColor: "#fff",
                borderRadius: "20px",
                boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.1)",
              }}
              placeholder="Type a message..."
            />
            <IconButton
              onClick={handleMessageSend}
              sx={{
                marginLeft: "8px",
                color: "#007bff",
              }}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </>
      ) : (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="100vh"
          backgroundColor="#eeffee"
        >
          <ChatIcon style={{ fontSize: 80, color: "#888" }} />
          <Typography variant="h5" style={{ marginTop: 16 }}>
            Chat App
          </Typography>
        </Box>
      )}
    </Box>
  );
}
