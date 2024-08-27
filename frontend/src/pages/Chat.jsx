import React, { useEffect, useState } from "react";
import {
  decodeToken,
  getUserByEmail,
  searchQuery,
} from "../Services/auth.service";
import { toast } from "react-toastify";
import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Box,
  IconButton,
  useMediaQuery,
  Grid,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Navbar from "../components/Navbar";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import ChatIcon from "@mui/icons-material/Chat";
import {
  acceptRequest,
  rejectRequest,
  sendRequest,
} from "../Services/request.service";
import FriendList from "../components/FriendList";
import { getChatById, getMyFriends } from "../Services/chat.service";
import ChatContainer from "../components/ChatContainer";
import {io} from 'socket.io-client'

export default function Chat({ changeAuth, auth }) {
  const [query, setQuery] = useState("");
  const [user, setUser] = useState(null);
  const [currChat, setCurrChat] = useState(null);
  const [currFriend, setCurrFriend] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [currChatMessages, setcurrChatMessages] = useState([]);
  const [friends, setFriends] = useState([]);
  const [flag, setFlag] = useState(false);
  const [fl, setFl] = useState(false);
  const [socket, setsocket] = useState(null);

  const reload = () => {
    setFl((f) => !f);
  };

  useEffect(() => {
    const socketUrl = process.env.REACT_APP_SOCKET_URL;
    const newSocket = io(socketUrl);
    setsocket(socket);

    return () => {
      newSocket.disconnect()
    }
  }, [user])

  useEffect(() => {
    if (user) {
      getMyFriends()
        .then((resp) => {
          setFriends(resp.data);
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    }
  }, [flag, user]);

  useEffect(() => {
    setFlag((f) => !f);
  }, []);

  const isSmallScreen = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    const t = decodeToken();
    const email = t.userEmail;
    getUserByEmail(email)
      .then((resp) => {
        setUser(resp);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }, []);

  useEffect(() => {
    if (query) {
      searchQuery(query)
        .then((resp) => {
          setSearchResults(resp.data);
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    } else {
      setSearchResults([]);
    }
  }, [query, flag]);

  const handleSearch = (event) => {
    setQuery(event.target.value);
  };

  // useEffect(() => {
  //   if(currChat){
  //     console.log('yaga');
  //     getChatById(currChat).then(resp=>{
  //       setcurrChatMessages(resp.data);
  //     }).catch(err=>{
  //       toast.error(err.response.data.message);
  //     })
  //   }
  // }, [currChat])

  const handleChatClick = (chatId, friend) => {
    // logic to start chat
    // console.log(chatId);
    setCurrChat(chatId);
    setCurrFriend(friend);
    getChatById(chatId)
      .then((resp) => {
        // console.log(resp.data);
        setcurrChatMessages(resp.data);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  useEffect(() => {
    if(currChat){
      getChatById(currChat)
        .then((resp) => {
          // console.log(resp.data);
          setcurrChatMessages(resp.data);
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    }
  }, [fl]);

  

  // const messages = [
  //   { text: "Hello!", time: "10:00 AM", isSender: false },
  //   { text: "Hi there!", time: "10:01 AM", isSender: true },
  //   { text: "Hello! How are you doing today? I wanted to check in and see if you're free to catch up later.", time: "10:00 AM", isSender: false },
  //   { text: "Hi there! I'm doing well, thank you! How about you? Sure, I'd love to catch up. What time works best for you?", time: "10:01 AM", isSender: true },
  //   { text: "I've been pretty busy with work, but I'm free in the evening around 6 PM. Does that work for you?", time: "10:02 AM", isSender: false },
  //   { text: "That works perfectly for me. Let's meet at our usual spot. Looking forward to it!", time: "10:03 AM", isSender: true },
  //   { text: "Great! I'll see you then. By the way, have you heard about the new cafe that opened downtown?", time: "10:04 AM", isSender: false },
  //   { text: "Yes, I have! I've been wanting to check it out. Maybe we can grab a coffee there after we meet.", time: "10:05 AM", isSender: true },
  //   { text: "That sounds like a plan! I heard they have some amazing pastries too. Can't wait to try them.", time: "10:06 AM", isSender: false },
  //   { text: "Absolutely! I've heard nothing but good things. I'll save some room for those pastries!", time: "10:07 AM", isSender: true },
  //   { text: "By the way, did you finish that book you were reading? I was thinking about picking it up.", time: "10:08 AM", isSender: false },
  //   { text: "Yes, I finished it last week. It was a great read! I'd definitely recommend it. Let me know if you want to borrow it.", time: "10:09 AM", isSender: true },
  //   { text: "Thanks! I'll definitely take you up on that. It's been on my reading list for a while now.", time: "10:10 AM", isSender: false },
  //   { text: "No problem! Just remind me when we meet later, and I'll bring it with me.", time: "10:11 AM", isSender: true },
  //   { text: "Will do! Oh, and I almost forgot to ask, how was your weekend? Did you do anything fun?", time: "10:12 AM", isSender: false },
  //   { text: "It was pretty relaxing. I went for a hike on Saturday and just took it easy on Sunday. How about you?", time: "10:13 AM", isSender: true },
  //   { text: "That sounds nice. I didn't do much, just caught up on some sleep and binge-watched a show.", time: "10:14 AM", isSender: false },
  //   { text: "Which show did you watch? I've been looking for something new to start.", time: "10:15 AM", isSender: true },
  //   { text: "I watched that new crime drama everyone's been talking about. It was really intense but so good!", time: "10:16 AM", isSender: false },
  //   { text: "Oh, I've heard about that one! I'll have to check it out. Thanks for the recommendation!", time: "10:17 AM", isSender: true },
  //   { text: "You're welcome! Let me know what you think of it when you get the chance to watch.", time: "10:18 AM", isSender: false },
  //   { text: "Will do! Anyway, I should get back to work now. I'll see you later this evening.", time: "10:19 AM", isSender: true },
  //   { text: "Alright, see you then! Have a great day at work!", time: "10:20 AM", isSender: false },
  //   { text: "Thanks, you too!", time: "10:21 AM", isSender: true },
  //   // more messages...
  // ];

  return (
    <>
      <Navbar auth={auth} changeAuth={changeAuth} user={user} />
      <Grid container sx={{ height: "91.5vh" }}>
        <Grid
          item
          xs={isSmallScreen ? 12 : 3}
          sx={{
            borderRight: isSmallScreen ? "none" : "1px solid #ccc",
            overflowY: "auto",
            backgroundColor: "whitesmoke",
          }}
        >
          {/* Friend List */}
          <Box sx={{ padding: 2 }}>
            <Typography variant="h6">Friends</Typography>
            <FriendList
              friends={friends}
              user={user}
              handleChatClick={handleChatClick}
              currChat={currChat}
            />
            {/* Render friend list here */}
          </Box>
        </Grid>
        <Grid
          item
          xs={isSmallScreen ? 12 : 9}
          sx={{
            overflowY: "auto",
          }}
        >
          {/* Chat Area */}
          <Box sx={{ padding: 0 }}>
            <ChatContainer
              currFriend={currFriend}
              messages={currChatMessages}
              user={user}
              currChat={currChat}
              reload={reload}
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
