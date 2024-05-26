import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUser } from "../../api/UserRequest";
const Conversation = ({ data, currentUser, follower }) => {

  const [userData, setUserData] = useState(null)
  const [online, setOnline] = useState(false)
  const dispatch = useDispatch()
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  // const serverPublic = "https://newserver-4.onrender.com/images/";


  useEffect(() => {
    // Check if is_online is "0" (offline) or not
    if(follower.is_online === "1"){
      setOnline(true);
    }else{
      setOnline(false)
    }
    
  }, [follower.is_online]);

  useEffect(() => {
    // console.log(follower.profilePicture);
    // console.log(data.image);
    // console.log(serverPublic)
    // console.log(data.userId === user._id)
  }, [data]); // Make sure to include data in the dependency array if it's used inside useEffect

  return (
    <>
      <div className="follower conversation">
        <div>
          {online && <div className="online-dot"></div>}
          <img
            src={ follower.profilePicture
              ? serverPublic + follower.profilePicture
              : serverPublic + "defaultProfile.png"}
            alt="Profile"
            className="followerImage"
            style={{ width: "50px", height: "50px" }}
          />
          <div className="name" style={{ fontSize: '0.8rem' }}>
            <span>{follower.firstname} {follower.lastname}</span>
            <span style={{ color: online ? "#51e200" : "" }}>{online ? "Online" : "Offline"}</span>
          </div>
        </div>
      </div>
      <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />



    </>
  );
};

export default Conversation;