import React, { useState } from "react";
import "./ShareModal.css";
import SendBox from "./SendBox";
import { useEffect } from "react";
import { getAllUser } from "../../api/UserRequest";
import { useSelector } from "react-redux";


const ShareModal = ({ onClose }) => {

    const [chatters, setChatters] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);

    const { user } = useSelector((state) => state.authReducer.authData);

    // for getting Followers 
    useEffect(() => {
        const fetchChatters = async () => {
            try {
                // Fetch all users
                const response = await getAllUser();
                // Extract the user IDs of followers
                const userFollowerIds = user.followers.map(follower => follower._id);
                // Filter users who are followers
                const followers = response.data.filter(user => userFollowerIds.includes(user._id));
                setChatters(followers);
            } catch (error) {
                console.error("Error fetching chatters:", error);
            }
        };
        fetchChatters();
    }, [user]);

    // useEffect(() => {
    //     console.log("Selected Users:", selectedUsers);
    // }, [selectedUsers]);


    const handleClose = () => {
        onClose(); // Call the onClose function passed from the parent component to close the modal
    };

    const handleSelect = (chatter) => {
        const isSelected = selectedUsers.some((user) => user._id === chatter._id);
        if (isSelected) {
            setSelectedUsers(selectedUsers.filter((user) => user._id !== chatter._id));
        } else {
            setSelectedUsers([...selectedUsers, chatter]);
        }
        // console.log("Selected Users:", selectedUsers); 
    };

    return (
        <>
            <div className="share-modal-overlay" onClick={handleClose}>
                <div className="share-modal-content">
                    <div className="share-modal-header">
                        <button className="share-modal-close" onClick={handleClose}>X</button>
                    </div>
                    <div className="share-modal-body">
                        {chatters.map(chatter => (
                            <SendBox key={chatter._id} chatter={chatter} onSelect={handleSelect} />
                        ))}
                    </div>
                    <div className="shareButton">
                        <button class="button share">Share</button>
                    </div>
                </div>
            </div>
        </>
    );
}
export default ShareModal;