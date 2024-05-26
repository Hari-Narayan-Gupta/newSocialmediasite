import React, { useState, useRef } from "react";
import "./Postshare.css";
import { UilScenery } from "@iconscout/react-unicons";
import { UilPlayCircle } from "@iconscout/react-unicons";
import { UilLocationPoint } from "@iconscout/react-unicons";
// import { UilSchedule } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

// import { uploadImage, uploadPost } from "../../actions/uploadAction";
// import { uploadVideo, uploadPost } from "../../actions/uploadAction"; // By Hari Gupta

import { uploadImage, uploadVideo, uploadPost } from "../../actions/uploadAction"; // Fix this line


const PostShare = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  const loading = useSelector((state) => state.postReducer.uploading);
  const [image, setImage] = useState(null);
  const [Desc, setDesc] = useState(null);
  const [video, setVideo] = useState(null); // By Hari Gupta

  const desc = useRef();
  const imageRef = useRef();
  const videoRef = useRef(); // By Hari Gupta

  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  // const serverPublic = "https://newserver-2.onrender.com/images/";



  // On change Description
  const onChangeDesc = (e) => {
    setDesc(e.target.value);

  }

  // handle Video Change By Hari Gupta
  const onVideoChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let vid = event.target.files[0];
      setVideo(vid);
    }
  };

  // handle Image Change
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
    }
  };


  // handle post upload
  const handleUpload = async (e) => {
    e.preventDefault();

    //post data
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };

    // if there is a video with the post By Hari Gupta
    if (video) {
      const data = new FormData();
      const fileName = Date.now() + video.name;
      data.append("name", fileName);
      data.append("file", video);
      newPost.video = fileName;

      try {
        dispatch(uploadVideo(data));
      } catch (err) {
        console.log(err);
      }
      dispatch(uploadPost(newPost));
      resetShare();
    } else {
      console.log("Select Video or add Description...");
    }


    // if there is an image with post
    if (image) {
      const data = new FormData();
      const fileName = Date.now() + image.name;
      data.append("name", fileName);
      data.append("file", image);
      newPost.image = fileName;
      // console.log(newPost);
      try {
        dispatch(uploadImage(data));
      } catch (err) {
        console.log(err);
      }
      dispatch(uploadPost(newPost));
      resetShare();
    }
    /// Done By Hari & Vishal
    else if (Desc) {
      newPost.desc = Desc;
      //   console.log(newPost);
      //  console.log(Desc);
      dispatch(uploadPost(newPost));
      resetShare();
    }

    else {
      console.log("Select Image...");
    }

  };


  // Reset Post Share
  const resetShare = () => {
    setImage(null);
    setVideo(null); // By Hari Gupta
    setDesc(null);
    desc.current.value = "";
  };
  return (

    <div className="PostShare">
       <Link to={`/profile/${user._id}`} style={{ textDecoration: "none", color: "inherit" }}>
      <img className="profile"
        src={
          user.profilePicture
            ? serverPublic + user.profilePicture
            : serverPublic + "defaultProfile.png"
        }
        alt="Profile"
      />
      </Link>
      <div>
        {/* <input
          type="text"
          placeholder="What's happening?"
          required
          onChange={onChangeDesc}
          value={Desc}
          ref={desc}
        /> */}

        <input
          type="text"
          placeholder="What's happening?"
          required
          onChange={onChangeDesc}
          value={Desc || ''} // Providing an empty string as a fallback value
          ref={desc}
        />


        <div className="postOptions">
          <div
            className="option"
            style={{ color: "var(--photo)" }}
            onClick={() => imageRef.current.click()}
          >
            <UilScenery />
            Photo
          </div>

          <div className="option"    
            style={{ color: "var(--video)" }}
            onClick={() => videoRef.current.click()}
          >
            <UilPlayCircle />
            Video
          </div>
          <div className="option" style={{ color: "var(--location)" }}>
            <UilLocationPoint />
            Location
          </div>
          {/* <div className="option" style={{ color: "var(--shedule)" }}>
            <UilSchedule />
            Shedule
          </div> */}
          <button
            className="button ps-button"
            onClick={handleUpload}
            disabled={loading}
          >
            {loading ? "uploading" : "Post"}
          </button>

          <div style={{ display: "none" }}>
            <input type="file" ref={imageRef} onChange={onImageChange} />
            <input type="file" ref={videoRef} onChange={onVideoChange} accept="video/*" /> {/* By Hari Gupta */}
          </div>
        </div>

        {/* for preview video By Hari Gupta  */}
        {video && (
          <div className="previewVideo">
            <UilTimes onClick={() => setVideo(null)} />
            <video src={URL.createObjectURL(video)} controls />
          </div>
        )}

        {image && (
          <div className="previewImage">
            <UilTimes onClick={() => setImage(null)} />
            <img src={URL.createObjectURL(image)} alt="preview" />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostShare;