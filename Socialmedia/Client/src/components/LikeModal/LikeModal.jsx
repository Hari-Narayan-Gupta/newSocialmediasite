import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import './LikeModal.css';
import { getUser } from '../../api/UserRequest'; // Import the getUser API function
import { unfollowUser, followUser } from "../../actions/userAction";

const LikeModal = ({ onClose, likesData }) => {
    const { user } = useSelector((state) => state.authReducer.authData);
    const [users, setUsers] = useState([]);
    // const serverPublic = "https://newserver-1-rfyh.onrender.com/images/";
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
    const [following, setFollowing] = useState({});
    const dispatch = useDispatch()



    useEffect(() => {
        const fetchUsers = async () => {
            console.log(likesData)
            try {
                const promises = likesData.map(async (userId) => {
                    // Fetch user data for each user ID in likesData
                    const response = await getUser(userId);
                    return response.data;

                });
                const userData = await Promise.all(promises);
                setUsers(userData);
                // Initialize following state based on current user's following status
                const followingState = {};
                userData.forEach(u => {
                    followingState[user._id] = user.following.includes(u._id);
                    console.log(user.following.includes(u._id))
                });
                setFollowing(followingState);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUsers(); // Call the fetchUsers function when the component mounts
    }, [likesData]); // Trigger the effect when likesData changes


    // Define handleFollow function
    const handleFollow = async (userId) => {
        // console.log(following[userI d])
        try {
            if (following[userId]) {
                console.log("True")
                await unfollowUser(userId, user);
                setFollowing(prevFollowing => ({
                    ...prevFollowing,
                    [userId]: false
                }));
            } else {
                console.log("False")
                await followUser(userId, user);
                setFollowing(prevFollowing => ({
                    ...prevFollowing,
                    [userId]: true
                }));
            }
        } catch (error) {
            console.error('Error following/unfollowing user:', error);
        }
    };


    return (
        <div className="modal-overlay">
            <div className="modal-content1">
                <span className="close" onClick={onClose}>&times;</span>
                <h3 className='cardHeading like'>Likes</h3>
                <hr className='hr' />
                <div className='likes-container'>
                    {/* Render user data */}
                    {users.map((userData, index) => (
                        <>
                            <div className="like-container">
                                <div key={index} >
                                    <div className='likes'>
                                        <img
                                            src={
                                                serverPublic + userData.profilePicture
                                                    ? serverPublic + userData.profilePicture
                                                    : serverPublic + "defaultProfile.png"
                                            }
                                            alt="profile"
                                            className="followerImage"
                                        />
                                        <div className="name liker-name">
                                            <span>{userData.firstname} {userData.lastname}</span>
                                        </div>
                                    </div>
                                </div>
                                {user._id !== userData._id && (
                                <button
                                    className={following[userData._id] ? "button fc-button UnfollowButton" : "button fc-button"}
                                    onClick={() => handleFollow(userData._id)}
                                >
                                    {following[userData._id] ? "Unfollow" : "Follow"}
                                </button>
                            )}
                            </div>
                        </>
                    ))}     
                </div>
            </div>
        </div>
    );
};

export default LikeModal;

