import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { followUser, unfollowUser } from "../../actions/userAction";
const User = ({ person }) => {
  // const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  const { user } = useSelector((state) => state.authReducer.authData);
  const dispatch = useDispatch()
  
  const [following, setFollowing] = useState(
    person.followers.includes(user._id)
  );

  useEffect(() => {
    // Update following state based on whether the logged-in user is included in the followers array
    setFollowing(person.followers.includes(user._id));
  }, [person.followers, user._id]);


  const handleFollow = () => {
    // console.log(user._id);
    following
      ? dispatch(unfollowUser(person._id, user)) :
       dispatch(followUser(person._id, user));  // Ye puchni hai
    setFollowing((prev) => !prev);
  };

  // useEffect(()=>{   
  //   console.log(person._id )
  //   console.log(following)
  // },[])
  return (
    <div className="follower">
      <div>
        <img
          src={
            serverPublic + person.profilePicture
              ? serverPublic + person.profilePicture
              : serverPublic + "defaultProfile.png"
          }
          alt="profile"
          className="followerImage"
        />
        <div className="name">
          <span>{person.firstname}</span>
          <span>@{person.username}</span>
        </div>
      </div>
      <button
        className={
          following ? "button fc-button UnfollowButton" : "button fc-button"
        }
        onClick={handleFollow}
      >
        {following ? "Unfollow" : "Follow"}
      </button>
    </div>
  );
};

export default User;