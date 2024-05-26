import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllPosts } from "../../api/PostRequest";
import ProfilePost from "../Post/ProfilePost";
import { useParams } from "react-router-dom";

const ProfilePosts = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.authReducer.authData);
    const { posts, loading } = useSelector((state) => state.postReducer);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await getAllPosts();
                // dispatch action to store posts in Redux store
                dispatch({ type: "SET_POSTS", payload: response.data });
                // console.log(response.data);
                // console.log(posts)
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };
        fetchPosts();
    }, [dispatch]); // added dispatch as dependency

    const filteredPosts = posts.filter((post) => {
        // Check if the userId of the post matches the userId in the user object
        return post.userId[0] === user._id;
    });
    // console.log("Filtered Posts:", filteredPosts); // Log filtered posts

    return (
        <>
            <div className="Posts">
                {loading
                    ? "Fetching posts...."
                    : filteredPosts.map((post, id) => {
                        return <ProfilePost data={post} key={id} user={user} />;
                    })}
            </div>
        </>
    );
};

export default ProfilePosts;
