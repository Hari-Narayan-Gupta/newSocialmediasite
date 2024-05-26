import React, { useState } from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import "./ProfileModal.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { uploadImage } from "../../actions/uploadAction";
import { updateUser } from "../../actions/userAction";
import Cropper from "react-easy-crop";
// import getCroppedImg from "./cropImage";

const ProfileModal = ({ modalOpened, setModalOpened, data }) => {
  const theme = useMantineTheme();
  const { password, ...other } = data;
  const [formData, setFormData] = useState(other);
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  // -----------------------------------------------------
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  // -----------------------------------------------------
  const dispatch = useDispatch();
  const param = useParams();

  const { user } = useSelector((state) => state.authReducer.authData);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      event.target.name === "profileImage"
        ? setProfileImage(img)
        : setCoverImage(img);
    }
  };

  // --------------------------------------
  const onCropComplete = (croppedArea, croppedAreaPixels) => { 
    setCroppedAreaPixels(croppedAreaPixels);
  };
  // --------------------------------------

  // form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    let UserData = formData;
    if (profileImage) {
      const croppedImage = await getCroppedImg(profileImage, croppedAreaPixels);  // By Hari
      const data = new FormData();
      const fileName = Date.now() + profileImage.name;
      data.append("name", fileName);
      data.append("file", croppedImage); // By Hari 
      // data.append("file", profileImage);
      UserData.profilePicture = fileName;
      try {
        dispatch(uploadImage(data));
      } catch (err) {
        console.log(err);
      }
    }
    if (coverImage) {
      const data = new FormData();
      const fileName = Date.now() + coverImage.name;
      data.append("name", fileName);
      data.append("file", coverImage);
      UserData.coverPicture = fileName;
      try {
        dispatch(uploadImage(data));
      } catch (err) {
        console.log(err);
      }
    }
    dispatch(updateUser(param.id, UserData));
    setModalOpened(false);
  };

  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="55%"
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
      <form className="infoForm" onSubmit={handleSubmit}>
        <h3 className="heading">Profile Info</h3>
        <div>
          <input
            value={formData.firstname}
            onChange={handleChange}
            type="text"
            placeholder="First Name"
            name="firstname"
            className="infoInput col-s-12"
          />
          <input
            value={formData.lastname}
            onChange={handleChange}
            type="text"
            placeholder="Last Name"
            name="lastname"
            className="infoInput col-s-12"
          />
        </div>

        <div>
          <input
            value={formData.workAt}
            onChange={handleChange}
            type="text"
            placeholder="Works at"
            name="workAt"
            className="infoInput workat col-s-12"
          />
        </div>

        <div>
          <input
            value={formData.livesin}
            onChange={handleChange}
            type="text"
            placeholder="Lives in"
            name="livesin"
            className="infoInput col-s-12 livesin"
          />
          <input
            value={formData.country}
            onChange={handleChange}
            type="text"
            placeholder="Country"
            name="country"
            className="infoInput col-s-12"
          />
        </div>

        <div>
          <input
            value={formData.relationship}
            onChange={handleChange}
            type="text"
            className="infoInput col-s-12"
            placeholder="Relationship status"
            name="relationship"
          />
          <input
            value={formData.instagram}
            onChange={handleChange}
            type="text"
            className="infoInput col-s-12"
            placeholder="Instagram Username"
            name="instagram"
          />
        </div>

        <div>
          <input
            value={formData.facebook}
            onChange={handleChange}
            type="text"
            className="infoInput col-s-12"
            placeholder="Facebook Username"
            name="facebook"
          />
          <input
            value={formData.twitter}
            onChange={handleChange}
            type="text"
            className="infoInput col-s-12"
            placeholder="Twitter Username"
            name="twitter"
          />
        </div>
        <div>
          <input
            value={formData.youtube}
            onChange={handleChange}
            type="text"
            className="infoInput col-s-12"
            placeholder="Youtube Channel Link"
            name="youtube"
          />
        </div>

        <div>
          {/* ---------------------------------------------- */}
          <div className="cropper-modal cropper-container">
            {profileImage && (
              <>
                <Cropper
                  image={URL.createObjectURL(profileImage)}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                  cropShape="round"
                  showGrid={false}
                />
                <button className="close-button" onClick={() => setProfileImage(null)}>Close</button>
              </>
            )}
          </div>

          {/* ---------------------------------------------- */}
          <div className="media-input">
            <label htmlFor="profileImage">Profile image</label>
            <input type="file" name="profileImage" onChange={onImageChange} />
          </div>

          <div className="media-input">
            <label htmlFor="coverImage">Cover image</label>
            <input type="file" name="coverImage" onChange={onImageChange} />
          </div>
        </div>

        <button className="button infoButton update-btn" type="submit">
          Update
        </button>
      </form>
    </Modal>
  );
};

export default ProfileModal;



const getCroppedImg = async (file, crop) => {
  const imageSrc = new Image();
  imageSrc.src = URL.createObjectURL(file);

  // Ensure the image is fully loaded before performing any operations on it
  await new Promise((resolve, reject) => {
    imageSrc.onload = resolve;
    imageSrc.onerror = reject;
  });

  const canvas = document.createElement("canvas");
  const scaleX = imageSrc.naturalWidth / imageSrc.width;
  const scaleY = imageSrc.naturalHeight / imageSrc.height;
  canvas.width = crop.width;
  canvas.height = crop.height;
  const ctx = canvas.getContext("2d");

  ctx.drawImage(
    imageSrc,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width,
    crop.height
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        console.error("Canvas is empty");
        reject(new Error("Canvas is empty"));
        return;
      }
      resolve(blob);
    }, "image/jpg");
  });
};
