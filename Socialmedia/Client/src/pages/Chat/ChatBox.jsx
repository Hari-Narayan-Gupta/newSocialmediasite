// created By Hari Gupta 

import React, { useState, useEffect } from 'react';
import './ChatBox.css'
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import RightMessage from "../Chat/RightMessage";
import LeftMessage from "../Chat/LeftMessage";
import { useRef } from "react";
import InputEmoji from 'react-input-emoji'
// import Followers from './Followers';
import { addMessage } from "../../api/MessageRequests"; // Import the addMessage function



export default function ChatBox({ onClose, followerData, chatId, setSendMessage, reciverMemberId, receivedMessage, setSendMessageClicked }) {

    const { user } = useSelector((state) => state.authReducer.authData);
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
    const imageRef = useRef();


    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState([]);

    const handleSend = async (e) => {

        setSendMessageClicked(true); // Add this line
        const data = {
            chatId: chatId, // Replace with the actual chat ID
            senderId: user._id,
            text: newMessage
        };
        
        const receiverId = reciverMemberId;
        setSendMessage({ ...data, receiverId })
        console.log("receiverId: " + reciverMemberId)

        try {
            await addMessage(data);
            setMessages([...messages, data])
            setNewMessage(""); // Clear the input field
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    const handleChange = (newMessage) => {
        setNewMessage(newMessage)
    }

    // Receive Message from parent component
    useEffect(() => {
        console.log("Message Arrived: ", receivedMessage)
        if (receivedMessage !== null && receivedMessage.chatId === chatId) {
            setMessages([...messages, receivedMessage]);
        }
    }, [receivedMessage])



    return (
        <>
        
            <section className="msger">
                <header className="msger-header">
                    <div className="head">
                        <div className="msger-header-title">
                            <img
                                src={followerData.profilePicture
                                    ? serverPublic + followerData.profilePicture
                                    : serverPublic + "defaultProfile.png"}
                                alt="Profile"
                            />
                        </div>
                        <Link className="chatBoxusername" to={`/profile/${user._id}`} style={{ textDecoration: "none", color: "inherit" }}>
                            {followerData.username}
                        </Link>
                    </div>
                    {/* <div className="minimize" onClick={handleMinimizeToggle}>-</div> */}
                </header>

                <main className="msger-chat">
                   <RightMessage messages={messages}/>
                </main>

                <div className="chat-sender">
                    <div className="add-file" onClick={() => imageRef.current.click()}>+</div>
                    <InputEmoji
                        value={newMessage}
                        onChange={handleChange}
                    />
                    <div className="send-button button" onClick={handleSend}>Send</div>
                    <input
                        type="text"
                        name="text"
                        id=""
                        style={{ display: "none" }}
                        ref={imageRef}
                    />
                </div>
            </section>

            {/* ) : (
                 <span className="chatbox-empty-message">
                     Tap on a chat to start conversation...
                 </span>
             )} */}

            {/* )} */}
            {/* {isMinimized && ( 
                <>
                    <Followers />
                    <div className="minimized-chat-box-circle" onClick={handleMinimizeToggle}>
                        <div className="minimized-icon-circle">
                            <div className="msger-header-title">
                                <img
                                    src={user.profilePicture ? serverPublic + user.profilePicture : serverPublic + "defaultProfile.png"}
                                    alt="Profile"
                                />
                                <div>username</div>
                            </div>
                        </div>
                    </div>
                </>
            )} */}
        </>
    )
}

