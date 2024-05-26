import React from "react";
// import Posts from "../Posts/Posts";
import PostShare from "../PostShare/PostShare";
import "./PostSide.css";
import ProfilePosts from "../Posts/ProfilePosts";

const UserPost = () => {
  return (
    <div className="PostSide">
      <PostShare/>
      {/* <Posts/> */}
      <ProfilePosts />
      
    </div>
  );
};

export default UserPost;