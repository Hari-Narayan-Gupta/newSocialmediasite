import React, { useEffect, useState } from "react";
import "./ProfileCard.css";
import Cover from "../../img/cover.jpg";
import Profile from "../../img/profileImg.jpg";
import instagram from "../../img/instagram-icon.png";
import facebook from "../../img/facebook-icon.png";
import twitter from "../../img/X-icon.png";
import youtube from "../../img/youtube-icon.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import ProfileFollwerModal from "../ProfileFollowerModal/ProfileFollowerModal";
import ProfileFollowingModal from "../ProfileFollowingModal/ProfileFollowingModal";



const ProfileCard = ({ location }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const posts = useSelector((state) => state.postReducer.posts)
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  // const serverPublic = "https://newserver-4.onrender.com/images/";


  // State variable to manage modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFollowingModalOpen, setIsFollowingModalOpen] = useState(false);

// useEffect(() => {
//   console.log(posts)
// },[])
  // Function to toggle modal visibility
  const toggleFollowerModal = () => {
    setIsModalOpen(!isModalOpen);
    setIsFollowingModalOpen(false);
  };

  const toggleFollowingModal = () => {
    setIsFollowingModalOpen(!isFollowingModalOpen);
    setIsModalOpen(false);

  };

  return (
    <div className="ProfileCard">
      <div className="ProfileImages">
        <img src={
          user.coverPicture
            ? serverPublic + user.coverPicture
            : serverPublic + "defaultCover.jpg"
        } alt="CoverImage" />
        <img
          src={
            user.profilePicture
              ? serverPublic + user.profilePicture
              : serverPublic + "defaultProfile.png"
          }
          alt="ProfileImage"
        />
      </div>
      <div className="ProfileName">
        <span>{user.firstname} {user.lastname}</span>
        <span>{user.worksAt ? user.worksAt : 'Write about yourself'}</span>
      </div>

      <div className="socialLinkHead">
        <div className="socialMeadiaLink">
          <Link to={`https://www.facebook.com/${user.facebook}`} className="socialLink" target="_blank">
            <div className="facebook-logo logo">
              <img className="facebook" src={facebook} alt="facebook" />
            </div>
          </Link>
          <Link to={`https://www.instagram.com/${user.instagram}`} className="socialLink" target="_blank">
            <div className="instagram-logo logo">
              <img className="instagram" src={instagram} alt="instagram" />
            </div>
          </Link>
          <Link to={`https://twitter.com/${user.twitter}`} className="socialLink" target="_blank" >
            <div className="twitter-logo logo">
              <img className="twitter" src={twitter} alt="twitter" />
            </div>
          </Link>
          <Link to={`${user.youtube}`} className="socialLink" target="_blank" >
            <div className="youtube-logo logo">
              <img className="youtube" src={youtube} alt="youtube" />
            </div>
          </Link>
        </div>
      </div>

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow" onClick={toggleFollowerModal}>
            <span>{user.followers.length}</span>
            <span>Followers</span>
          </div>
          <div className="vl"></div>
          <div className="follow" onClick={toggleFollowingModal}>
            <span>{user.following.length}</span>
            <span>Following</span>
          </div>
          {/* for profilepage */}
          {location === "profilePage" && (
            <>
              <div className="vl"></div>
              <div className="follow" >
                <span>{
                  posts.filter((post) => post.userId[0] === user._id).length
                }</span>
                <span>Posts</span>
              </div>{" "}
            </>
          )}
        </div>
        <hr />
      </div>

      {location === "profilePage" ? (
        ""
      ) : (
        <span>
          <Link to={`/profile/${user._id}`} style={{ textDecoration: "none", color: "inherit" }}>
            My Profile
          </Link>
        </span>
      )}

      {/* Render modal conditionally */}
      {isModalOpen && (
        <ProfileFollwerModal onClose={toggleFollowerModal}>
          {/* Modal content */}
          {/* You can display followers list or any other content here */}
        </ProfileFollwerModal>
      )}

      {isFollowingModalOpen && (
        <ProfileFollowingModal onClose={toggleFollowingModal}>
          {/* Modal content */}
          {/* You can display following list or any other content here */}
        </ProfileFollowingModal>
      )}

    </div>
  );
};

export default ProfileCard;