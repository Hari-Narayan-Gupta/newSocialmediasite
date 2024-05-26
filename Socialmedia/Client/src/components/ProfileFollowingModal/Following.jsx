import React, { useEffect } from "react";
import { unfollowUser } from "../../actions/userAction";
import { useSelector, useDispatch } from "react-redux";


const Following = ({following, setMyFollowing}) => {
    // const Following = ({following, user}) => {
        
    const { user } = useSelector((state) => state.authReducer.authData);

    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
    const dispatch = useDispatch()

    const handleFollow = () => {
        // console.log(following._id)
        dispatch(unfollowUser(following._id, user));
        setMyFollowing(prevFollowing => {
            return prevFollowing.filter(f => f._id !== following._id);
        });  
    }; 

    return (
        <>
            <div>
                <img
                    src={
                        serverPublic + following.profilePicture
                            ? serverPublic + following.profilePicture
                            : serverPublic + "defaultProfile.png"
                    }
                    
                    alt="profile"
                    className="followerImage"
                />
                <div className="name">
                    <span>{following.firstname} {following.lastname}</span>
                    <span>@{following.username}</span>
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
        </>
    );
}

export default Following;