import React from "react";
// import PostSide from "../../components/PostSide/PostSide";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import ProfileLeft from "../../components/ProfileLeft/ProfileLeft";
import RightSide from "../../components/RightSide/RightSide";
import "./Profile.css";
import UserPost from "../../components/PostSide/UserPosts";
const Profile = () => {
  return (
    <div className="Profile">
      <ProfileLeft />
      <div className="Profile-center">
        <ProfileCard location = 'profilePage'/>
      <UserPost/>
      </div>
      <RightSide/>
    </div>
  );
};

export default Profile;