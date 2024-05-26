import * as UserApi from "../api/UserRequest";


export const updateUser=(id, formData)=> async(dispatch)=> {
    dispatch({type: "UPDATING_START"})
    try{
        const {data} = await UserApi.updateUser(id, formData);
        console.log("Action ko receive hoa hy ye : ",data)
        dispatch({type: "UPDATING_SUCCESS", data: data})
    }   
    catch(error){
        dispatch({type: "UPDATING_FAIL"})
    }
}


export const followUser = (id, data)=> async(dispatch)=> {
    dispatch({type: "FOLLOW_USER", data: id})
    UserApi.followUser(id, data)
}


// import UserApi from 'path/to/UserApi'; // Import your UserApi module

// export const followUser = (id, username, profilePicture, data) => async (dispatch) => {
//     try {
//         // Dispatch action to update UI optimistically
//         // dispatch({ type: "FOLLOW_USER", data: id });
//         dispatch({ type: "FOLLOW_USER", data: id,});

//         const requestData = {
//             id,
//             username,
//             profilePicture,
//             ...data, // Optionally include additional data
//         };

//         const response = await UserApi.followUser(id, requestData);
//         console.log("User followed successfully:", response);

//     } catch (error) {
//         console.error('Error following user:', error);
//     }
// };





// export const unfollowUser = (id, data)=> async(dispatch)=> {
//     dispatch({type: "UNFOLLOW_USER", data: id})
//     UserApi.unfollowUser(id, data)
// }

export const unfollowUser = (id, data) => async (dispatch) => {
    // console.log(id)
    // console.log(data)
    dispatch({ type: "UNFOLLOW_USER", data: id }); 
    UserApi.unfollowUser(id, data);
    dispatch({ type: "REMOVE_FOLLOWING", data: data._id });
};


// export const unfollowUser = (id, data) => async (dispatch) => {
//     dispatch({ type: "UNFOLLOW_USER", data: id });
//     try {
//         await UserApi.unfollowUser(id, data); // Await the API call
//         dispatch({ type: "REMOVE_FOLLOWING", data: data._id });
//     } catch (error) {
//         // Handle error if API call fails
//         console.error("Error unfollowing user:", error);
//         // You can dispatch an error action here if needed
//     }
// };   

