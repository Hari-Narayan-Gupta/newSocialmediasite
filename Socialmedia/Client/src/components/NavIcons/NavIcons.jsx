import React from "react";

import Home from "../../img/home.png";
import Noti from "../../img/noti.png";
import Comment from "../../img/comment.png";
import { UilSetting } from "@iconscout/react-unicons";
import { Link } from "react-router-dom";

const NavIcons = ({ setChatPopupOpened }) => {

  // const handleChatClick = () => {
  //   setChatPopupOpened(prevState => !prevState); // Toggle the state
  // };


  return (
    <div className="navIcons">
      <Link to="../home">
        <img src={Home} alt="" title="Home"/>
      </Link> 
      <UilSetting />
      <img src={Noti} alt="" title="Notification"/>

      <Link to="../chat">
        <img src={Comment} alt="" title="Messanger"/>
      </Link>

      {/* <button className="msg-btn" onClick={handleChatClick}>
        <img src={Comment} alt="" />
      </button> */}
    </div>
  );
};

export default NavIcons;