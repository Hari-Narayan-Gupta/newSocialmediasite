import React from "react";
import "./Followers.css";

const Followers = ({follower}) => {

    const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <>
            <div>
                <img
                    src={
                        publicFolder + follower.profilePicture
                            ? publicFolder + follower.profilePicture
                            : publicFolder + "defaultProfile.png"
                    }
                    alt="profile"
                    className="followerImage"
                />
                <div className="name">
                    <span>{follower.firstname} {follower.lastname}</span>
                    <span>@{follower.username}</span>
                </div>
            </div>
            {/* <button
                className={
                    following ? "button fc-button UnfollowButton" : "button fc-button"
                }
                onClick={handleFollow}
            >
                {following ? "Unfollow" : "Follow"}
            </button> */}
        </>
    );
}

export default Followers;