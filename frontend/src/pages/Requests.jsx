import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { decodeToken, getUserByEmail } from "../Services/auth.service";
import { toast } from "react-toastify";
import { Card, CardContent, Typography, Button } from "@mui/material";
import {
  getMyRequests,
  acceptRequest,
  rejectRequest,
} from "../Services/request.service";

export default function Requests({ changeAuth, auth }) {
  const [requests, setRequests] = useState([]);
  const [user, setUser] = useState([]);

  useEffect(() => {
    const t = decodeToken();
    const email = t.userEmail;
    getMyRequests(email)
      .then((resp) => {
        setRequests(resp.data);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }, []);

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

  const handleAccept = (requestId) => {
    // logic to accept
  };

  const handleReject = (requestId) => {
    // logic to reject
  };

  return (
    <>
      <Navbar auth={auth} changeAuth={changeAuth} user={user} />
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          marginTop: 2,
          textAlign: "center",
          color: "blue",
        }}
      >
        Friend Requests
      </Typography>

      <div className="p-4 flex flex-wrap gap-4">
        {requests.map((request) => (
          <Card key={request._id} className="w-full max-w-xs shadow-lg">
            <CardContent className="text-center">
              <img
                className=" mx-auto"
                src={request.from.gender === "Male" ? "male.png" : "female.png"}
                width={"200px"}
                alt={request.from.firstName}
              />
              <Typography variant="h6" className="font-bold">
                {request.from.firstName} {request.from.lastName}
              </Typography>
              <Typography variant="body2" className="text-gray-600">
                {request.from.email}
              </Typography>
              <div className="mt-2 flex justify-between space-x-4">
                <Button
                  onClick={() => handleAccept(request._id)}
                  sx={{
                    backgroundColor: "green",
                    "&:hover": {
                      backgroundColor: "darkgreen",
                    },
                    color: "white",
                    width: "100%",
                  }}
                >
                  Accept
                </Button>
                <Button
                  onClick={() => handleReject(request._id)}
                  sx={{
                    backgroundColor: "red",
                    "&:hover": {
                      backgroundColor: "darkred",
                    },
                    color: "white",
                    width: "100%",
                  }}
                >
                  Reject
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
