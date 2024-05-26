import React, { useState, useEffect } from "react";
import "./Post.css";
import Comment from "../../img/comment.png";
import Share from "../../img/share.png";
import Heart from "../../img/like.png";
import NotLike from "../../img/notlike.png";
import { Link } from "react-router-dom";
// import { likePost } from "../../api/PostRequest";
// import { useSelector } from "react-redux";
import { likePost, deletePost } from "../../api/PostRequest"; // Import deletePost API
import CommentModal from "../CommentModal/CommentModal";
import ShareModal from "../PostShareModal/ShareModal"; // Import the ShareModal component
// import { getFollowingPost } from "../../api/PostRequest";
// import { getUser } from "../../api/UserRequest";
import LikeModal from "../LikeModal/LikeModal";


const Post = ({ data, user }) => {
  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const [likes, setLikes] = useState(data.likes.length)
  const [showCommentModal, setShowCommentModal] = useState(false); // State to manage modal visibility
  const [showShareModal, setShowShareModal] = useState(false); // State to manage share modal visibility
  const [showLikeModal, setShowLikeModal] = useState(false); // State to manage the new modal visibility
  const [isDeleted, setIsDeleted] = useState(false); // hari gupta 19/03/2024

  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  // const serverPublic = "https://newserver-3.onrender.com/images/";


  useEffect(() => {
    // console.log(data.userId[1].profilrPicture);
    // console.log(data);
    // console.log(serverPublic)
    // console.log(data.userId === user._id)
  }, [data]);


  const handleDelete = async () => {
    try {
      await deletePost(data._id, user._id);
      console.log("Post deleted successfully");
      setIsDeleted(true);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  if (isDeleted) {
    return null; // Render nothing if the post is deleted
  }

  const handleLike = () => {
    likePost(data._id, user._id);
    // console.log(data._id);
    setLiked((prev) => !prev);
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1)
  };

  const toggleModal = () => {
    setShowCommentModal(!showCommentModal); // Toggle comment modal visibility
  };
  const toggleShareModal = () => {
    setShowShareModal(!showShareModal); // Toggle share modal visibility
  };
  const toggleLikeModal = () => {
    setShowLikeModal(!showLikeModal); // Toggle the like modal visibility
  };


  return (
    <>
      {/* {data.userId === user._id && ( */}
      <div className="Post">
        <div className="postHead">
          <div className="userProfile">
            <img
              src={
                data.userId[1].profilrPicture
                  ? serverPublic + data.userId[1].profilrPicture
                  : serverPublic + "defaultProfile.png"
              }
              alt="Profile"
            />
            <Link to={`/profile/${data.userId[0]}`} style={{ textDecoration: "none", color: "inherit" }}>
              {data.userId[1].username}
            </Link>

            {/* <div className="userName">{user.username}</div> */}
          </div>
          {data.userId[0] === user._id && (
            <div className="dots-dropdown">
              <div className="dots"></div>
              <div className="dots"></div>
              <div className="dots"></div>
              <div className="dropdown-content">
                {/* Only render the delete button if the condition is met */}
                <button onClick={handleDelete}>Delete</button>
                <button onClick={handleLike}>{liked ? "Unlike" : "Like"}</button>
              </div>
            </div>
          )}
        </div>

        {data.image ? (
          <div className="media-container">
            <img
              // src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : null}
              src={data.image ? serverPublic + data.image : null}
              alt=""
            />
          </div>
        ) : null}

        {data.video ? (
          <div className="media-container">
            <video
              // src={data.video ? process.env.REACT_APP_PUBLIC_FOLDER + data.video : null}
              src={data.video ? serverPublic + data.video : null}
              controls // Add controls attribute to enable video controls
              alt=""
            />
          </div>
        ) : null}

        {/* <div className="comment">

          </div> */}

        <div className="postReact">
          <img
            src={liked ? Heart : NotLike}
            alt=""
            style={{ cursor: "pointer" }}
            onClick={handleLike}
          />
          <img
            src={Comment}
            alt=""
            title="comment"
            style={{ cursor: "pointer" }}
            onClick={toggleModal} // Call toggleModal when comment icon is clicked
          />
          <img
            src={Share}
            alt=""
            title="share"
            style={{ cursor: "pointer" }}
            onClick={toggleShareModal} // Open share modal on click
          />
        </div>

        <span className="SeeLikes" style={{ color: "var(--gray)", fontSize: "12px" }} onClick={toggleLikeModal}>
          {likes} likes
        </span>
        <div className="detail">
          <span>
            <b>{data.name} </b>
          </span>
          <span>{data.desc}</span>
        </div>

        {/* Render the modal component conditionally */}
        {showCommentModal && (
          // Inside the Post component where you render the CommentModal component
          <CommentModal onClose={toggleModal} imageData={data.image} videoData={data.video} postId={data._id} user={user} />
        )}

        {showShareModal && (
          <ShareModal
            onClose={toggleShareModal}
            postId={data._id}
            user={user}
          />
        )}

        {showLikeModal && (
          <LikeModal onClose={toggleLikeModal} likesData={data.likes} />
        )}
      </div>
      {/* )} */}
    </>
  );
};

export default Post;

