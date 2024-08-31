import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Avatar,
} from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout'; // Import the Logout icon
import ChatIcon from "@mui/icons-material/Chat";
import { deleteToken } from "../Services/auth.service";
import { useNavigate } from "react-router-dom";

export default function Navbar({ switchFn, auth, changeAuth, user }) {
  const [open, setOpen] = useState(false);
  const [currAvatar, setcurrAvatar] = useState("");
  useEffect(() => {
    if (user) {
      if (user.gender === "Male") {
        setcurrAvatar("male.png");
      } else {
        setcurrAvatar("female.png");
      }
    }
  }, [user]);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    deleteToken();
    changeAuth(false);
    setOpen(false);
    navigate("/");
  };

  const handleProfileClick = () => {
    navigate("/account"); // Assuming /account is the route for the user's account page
  };

  const handleLogoClick = () => {
    if(auth)
      navigate("/home");
    else
      navigate('/') // Navigate to home page
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1e40af" }}> 
      <Toolbar className="flex justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={handleLogoClick}>
          <ChatIcon  sx={{ color: "white" }} />
          <Typography variant="h5" sx={{ color: "white" }}>
            QuickChat
          </Typography>
        </div>

        <Button className="flex items-center gap-2">
          {auth ? (
            <>
              <IconButton onClick={handleProfileClick} sx={{ color: "white" }}>
                <Avatar alt="User Profile" src={currAvatar} />
              </IconButton>

              <Button
                onClick={handleClickOpen}
                variant="contained"
                color="inherit"
                sx={{
                  color: "#ffffff",
                  borderColor: "#f44336",
                  backgroundColor: "#e53935",
                  "&:hover": {
                    backgroundColor: "#f54373",
                    borderColor: "#f44336",
                    color: "white",
                  },
                }}
              >
                <LogoutIcon /> {/* Use the Logout icon instead of text */}
              </Button>

              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"Confirm Logout"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Are you sure you want to logout?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={handleLogout} color="primary" autoFocus>
                    Logout
                  </Button>
                </DialogActions>
              </Dialog>
            </>
          ) : (
            <>
              <Button
                onClick={() => switchFn(true)}
                variant="outlined"
                color="inherit"
                sx={{
                  color: "white",
                  borderColor: "white",
                  "&:hover": {
                    backgroundColor: "#2563eb",
                    borderColor: "white",
                  },
                }}
              >
                Login
              </Button>
              <Button
                onClick={() => switchFn(false)}
                variant="contained"
                color="inherit"
                sx={{
                  backgroundColor: "#10b981",
                  color: "#1e40af",
                  "&:hover": {
                    backgroundColor: "#dbeafe",
                  },
                }}
              >
                Register
              </Button>
            </>
          )}
        </Button>
      </Toolbar>
    </AppBar>
  );
}
