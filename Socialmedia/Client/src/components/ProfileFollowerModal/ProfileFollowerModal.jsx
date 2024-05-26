import React from 'react';
import "./ProfileFollowerModal.css";
import { getAllUser } from '../../api/UserRequest';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Followers from './Followers';

const ProfileFollowerModal = ({ onClose }) => {

    const { user } = useSelector((state) => state.authReducer.authData);
    const [myFollowers, setMyFollowers] = useState([])

    // for getting Followers 
    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                const response = await getAllUser();
                const userFollowersIds = user.followers.map(follower => follower._id);
                console.log(userFollowersIds)
                const usersWithFollowers = response.data.filter(user =>
                    userFollowersIds.includes(user._id)
                );
                console.log(usersWithFollowers);
                setMyFollowers(usersWithFollowers);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        fetchAllUsers();
    }, []);


    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2 className='cardHeading'>Followers</h2>
                <hr className='hr'/>
                <div className='follower-container'>
                    {myFollowers.map(follower => (
                        <div className="follower userFollower">
                            <Followers follower={follower}/>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default ProfileFollowerModal;