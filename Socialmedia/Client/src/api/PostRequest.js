import axios from 'axios'


const API = axios.create({ baseURL: 'http://localhost:5000' });
// const API = axios.create({ baseURL: 'https://newserver-4.onrender.com' });


API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
  
    return req;
  });

export const getTimelinePosts= (id)=> API.get(`/post/${id}/timeline`);
export const likePost=(id, userId)=>API.put(`post/${id}/like`, {userId: userId})


// Define deletePost function By Hari Gupta
export const deletePost = (id, userId) => API.delete(`/post/${id}`, { data: { userId } });

// Define commentNow function
export const commentNow = (postId, commentData) => API.put(`/post/${postId}/comment`, commentData);

//define getAllComments function
export const getAllComments = (id) => API.get(`/post/${id}/comments`);

//define getFollowingPost function 
export const getFollowingPost = (id) => API.get(`/post/${id}/followingPost`);

// Define the getAllPosts function
export const getAllPosts = () => API.get('/post');

export const getTrendingHashtags = () => API.get('/post')