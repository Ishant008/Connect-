import express from 'express'
import { protectRoute } from '../middlewares/protectRoute.js'
import { addComment, createPost, deletePost, getAllPosts, getPosts, likeUnlike } from '../controllers/post.controller.js';

const postRoute = express.Router()


postRoute.post('/create-post',protectRoute,createPost)
postRoute.delete('/delete-post/:postID',protectRoute,deletePost)
postRoute.put('/add-comment/:postID',protectRoute,addComment)
postRoute.put('/like-post/:postID',protectRoute,likeUnlike)
postRoute.get('/get-all-posts',protectRoute,getAllPosts)
postRoute.get('/get-posts/:userID',protectRoute,getPosts)


export default postRoute;