
import React, { useRef, useState } from "react";
import ChatBox from "../../components/ChatBox/ChatBox";
import Conversation from "../../components/Conversation/Conversation";
import LogoSearch from "../../components/LogoSearch/LogoSearch";
import NavIcons from "../../components/NavIcons/NavIcons";
import "./Chat.css";
import { useEffect } from "react";
import { createChat, userChats } from "../../api/ChatRequests";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { getAllUser } from "../../api/UserRequest";
import TrendCard from "../../components/TrendCard/TrendCard";


const Chat = () => {
  const dispatch = useDispatch();
  const socket = useRef();
  const { user } = useSelector((state) => state.authReducer.authData);

  const [chats, setChats] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);
  const [followers, setFollowers] = useState([]);
  const [occurClicked, setOccurClicked] = useState(false); // New state to track occur click




  


  // for getting Followers 
  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await getAllUser();
        // console.log(response.data);
        // console.log(user) 
        const userFollowersIds = user.followers.map(follower => follower._id);
        // console.log(userFollowersIds)
        const usersWithFollowers = response.data.filter(user =>
          userFollowersIds.includes(user._id)
        );
        // console.log(usersWithFollowers);
        setFollowers(usersWithFollowers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchAllUsers();
  }, []);





  // Get the chat in chat section
  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await userChats(user._id);
        // console.log(data)
        setChats(data);
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, [user._id]);

  // Connect to Socket.io
  useEffect(() => {
    socket.current = io("http://localhost:5000");
    // socket.current = io("https://newserver-4.onrender.com");
    socket.current.emit("new-user-add", user._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);



  // Send Message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);


  // Get the message from socket server
  useEffect(() => {
    socket.current.on("recieve-message", (data) => {
      // console.log(data)
      setReceivedMessage(data);
    }

    );
  }, []);

  // console.log("chat:"+ chats)
  // const checkOnlineStatus = (chat) => {
  //   const chatMember = chat.members.find((member) => member !== user._id);
  //   const online = onlineUsers.find((user) => user.userId === chatMember);
  //   return online ? true : false;
  // };

  return (
    <>
      <div className="head">
        <div className="searcbox">
          <LogoSearch />
        </div>
        <div className="icons">
          <NavIcons />
        </div>
      </div>
      <div className="Chat">
        {/* Left Side */}
        <div className="Left-side-chat">
          {/* <LogoSearch /> */}

          <div className="Chat-container">
            <h2 className="chats">Chats</h2>
            <div className="Chat-list">
              {/* {chats.map((chat) => (
                <div
                  onClick={() => {
                    // setCurrentChat(chat);
                  }}
                >
                  <Conversation
                    data={chat}
                    currentUser={user._id}
                    online={checkOnlineStatus(chat)}
                  />
                </div>
              ))} */}

              {followers.map((follower, index) => (
                <div
                  onClick={() => {
                    // const chat = chats[index];
                    // console.log(chat)
                    // console.log(follower)
                    // setCurrentChat(chat); // ye function jis follower pr clicke kiya h use lkr jayega or usi particular follower ki ChatId create krega 
                  }}>
                  <Conversation
                    // data={chat}
                    follower={follower}
                    currentUser={user._id}
                  // online={checkOnlineStatus(chat)}
                  />
                </div>
              )
              )}


            </div>
          </div>
        </div>

        {/* Right Side */}

        <div className="Right-side-chat">
          <div style={{ width: "20rem", alignSelf: "flex-end" }}>
            {/* <NavIcons /> */}
          </div>
          <ChatBox
            chat={currentChat}
            currentUser={user._id}
            setSendMessage={setSendMessage}
            receivedMessage={receivedMessage}
          />
        </div>

        <div className="trends">
          <TrendCard/>
        </div>
      </div>
    </>
  );
};

export default Chat;


