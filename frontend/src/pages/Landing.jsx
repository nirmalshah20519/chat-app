import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { decodeToken, deleteToken, getUserByEmail } from '../Services/auth.service';
import { toast } from 'react-toastify';
import { Card, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Landing({ changeAuth, auth }) {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const t = decodeToken();
        const email = t.userEmail;
        getUserByEmail(email).then(resp => {
            setUser(resp);
        }).catch(err => {
            toast.error(err.response.data.message);
            deleteToken();
            changeAuth(false);
        });
    }, []);

    const cards = [
        { title: 'Chat with Friends', link: '/chat', image:'chat-with-friends.jpg' },
        { title: 'Explore New Friends', link: '/explore', image:'explore-new-friends.jpeg' },
        { title: 'Friend Requests', link: '/requests', image:'friend-requests.png' }
    ];

    return (
        <>
            <Navbar auth={auth} changeAuth={changeAuth} user={user} />
            <div className="flex justify-center items-center mt-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {cards.map((card, index) => (
                        <Card 
                            key={index+1} 
                            className="cursor-pointer transition-transform transform hover:scale-105 shadow-lg"
                            onClick={() => navigate(card.link)}
                        >
                            <CardContent className="flex flex-col items-center p-6">
                                <img src={card.image} alt={card.title} className="w-48 h-48 mb-4" />
                                <Typography variant="h5" component="div" className="text-center">
                                    {card.title}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </>
    );
}
