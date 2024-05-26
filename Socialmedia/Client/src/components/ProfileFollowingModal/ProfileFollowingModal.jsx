import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { getAllUser } from '../../api/UserRequest';

import Following from '../ProfileFollowingModal/Following';


const ProfileFollowingModal = ({ onClose }) => {
    const { user } = useSelector((state) => state.authReducer.authData);
    const [myFollowing, setMyFollowing] = useState([]);

    // Fetch following users
    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                const response = await getAllUser();
                const userFollowingIds = user.following.map(following => following);
                const usersWithFollowing = response.data.filter(user =>
                    userFollowingIds.includes(user._id)
                );
                console.log(usersWithFollowing)
                setMyFollowing(usersWithFollowing);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        fetchAllUsers();
    }, [setMyFollowing]);


    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2 className='cardHeading'>Following</h2>
                <hr className='hr' />
                <div className='follower-container'>
                    {myFollowing.map(following => (
                        <div className="follower userFollower">
                            <Following following={following} setMyFollowing={setMyFollowing} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProfileFollowingModal;
