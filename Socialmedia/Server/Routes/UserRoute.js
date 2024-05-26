import express from 'express'
import { unfollowUser, deleteUser, followUser, getAllUsers, getUser, updateUser, followList } from '../Controllers/UserController.js'
// import authMiddleWare from '../MiddleWare/authMiddleWare.js';  

const router = express.Router()

router.get('/:id', getUser);
router.get('/',getAllUsers)
router.put('/:id', updateUser) 
router.delete('/:id', deleteUser)
router.put('/:id/follow', followUser)
router.put('/:id/unfollow', unfollowUser)
router.post("/:id", followList);

export default router