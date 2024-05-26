import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { addMessage, getMessages } from "../../api/MessageRequests";
import { getUser } from "../../api/UserRequest";
import "./ChatBox.css";
import { format } from "timeago.js";
import InputEmoji from 'react-input-emoji'

const ChatBox = ({ chat, currentUser, setSendMessage, receivedMessage }) => {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [filePreview, setFilePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  // const [data, setData] = useState(null);

  // const serverPublic = "https://newserver-4.onrender.com/images/";
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  // const scroll = useRef();
  // const chatBodyRef = useRef(null);


  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
    setIsSubmitDisabled(newMessage.trim() === ''); // Disable if newMessage is empty or only whitespace
  }


  // Function to handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    // Generate preview for image or video
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }


  // fetching data for header
  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== currentUser);
    const getUserData = async () => {
      try {
        const { data } = await getUser(userId);
        setUserData(data);
        // console.log(data)
      } catch (error) {
        console.log(error);
      }
    };

    if (chat !== null) getUserData();
  }, [chat, currentUser]);

  // fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await getMessages(chat._id);
        setMessages(data);
        // console.log(data)
      } catch (error) {
        console.log(error);
      }
    };

    if (chat !== null) fetchMessages();
  }, [chat]);


// Always scroll to last Message
useEffect(() => {
  const chatBody = document.querySelector(".chat-body");
  if (chatBody) {
    chatBody.scrollTop = chatBody.scrollHeight;
  }
}, [messages, receivedMessage]);



  // Send Message
  const handleSend = async (e) => {
    e.preventDefault()
    const message = {
      senderId: currentUser,
      text: newMessage,
      chatId: chat._id
      // images: selectedFile.name,
    }
     // Check if an image file is selected
  if (selectedFile) {
    message.images = selectedFile.name; // Include the image file
  }
    const receiverId = chat.members.find((id) => id !== currentUser);
    // send message to socket server
    setSendMessage({ ...message, receiverId })
    // send message to database
    try {
      const { data } = await addMessage(message);
      setMessages([...messages, data]);
      setNewMessage("");
      setFilePreview(null); // Reset file preview after sending the message
      setSelectedFile(null);
    }
    catch {
      console.log("error")
    }
  }

  // Receive Message from parent component
  useEffect(() => {
    console.log("Message Arrived: ", receivedMessage)
    if (receivedMessage !== null) {
      console.log("Message Arrived: ", receivedMessage)
      setMessages([...messages, receivedMessage]);
    }

  }, [receivedMessage])


  const imageRef = useRef();

  return (
    <>
      <div className="ChatBox-container">
        {chat ? (
          <>
            {/* chat-header */}
            <div className="chat-header">
              <div className="follower">
                <div>
                  <img
                    src={
                      userData?.profilePicture
                        ? serverPublic +
                        userData.profilePicture
                        : serverPublic +
                        "defaultProfile.png"
                    }
                    alt="Profile"
                    className="followerImage"
                    style={{ width: "50px", height: "50px" }}
                  />
                  <div className="name" style={{ fontSize: "0.9rem" }}>
                    <span>
                      {userData?.firstname} {userData?.lastname}
                    </span>
                  </div>
                </div>
              </div>
              <hr
                style={{
                  width: "95%",
                  border: "0.1px solid #ececec",
                  marginTop: "20px",
                }}
              />
            </div>
            {/* chat-body */}
            {/* chat-body */}
            <div className="chat-body">
              {messages.map((message, index) => (
                
                <div
                  key={index}
                  className={message.senderId === currentUser ? "message own" : "message"}
                >
                 {/* {message.images && (
                   <img src={serverPublic + message.images} alt="img" srcset="" />
                 )}
                 {message.text && <span>{message.text}</span>} */}
                 <span>{message.text}</span>

                  {/* Display message timestamp */}
                  <span>{format(message.createdAt)}</span>
                </div>
              ))}
            </div>
            {/* chat-sender */}
            <div className="chat-sender">
              <div onClick={() => imageRef.current.click()}>+</div>
              {filePreview && (
                <img src={filePreview} alt="File Preview" style={{ maxWidth: "100px", maxHeight: "100px" }} />
              )}
              <InputEmoji
                value={newMessage}
                onChange={handleChange}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSend(e);
                  }
                }}
              />

              <div className={`send-button button ${isSubmitDisabled ? 'disabled' : ''}`} onClick={handleSend} disabled={isSubmitDisabled}>Send</div>
              <input
                type="file"
                name=""
                id=""
                style={{ display: "none" }}
                ref={imageRef}
                onChange={handleFileChange}
              />
            </div>{" "}
          </>
        ) : (
          <span className="chatbox-empty-message">
            Tap on a chat to start conversation...
          </span>
        )}
      </div>

    </>
  );
};

export default ChatBox;