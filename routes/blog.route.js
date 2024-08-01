const express = require('express')
const { createComment } = require("../controllers/comment.controller")
const {createPost, getAllPosts} = require("../controllers/post.controller");
const { likePost, unlikePost } = require('../controllers/like.controller');
const router = express.Router();

router.post("/comments/create", createComment)
router.post("/post/create", createPost)
router.get("/post", getAllPosts)
router.post("/like", likePost)
router.post("/unlike",unlikePost)
module.exports = router;