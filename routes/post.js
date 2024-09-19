const express = require('express')
const router = express.Router()
const postController = require('../controllers/post')

router.get("/feed", postController.getPosts)
router.post("/createPost", postController.createPost);
router.get("/id/:id", postController.getPost)
router.put("/edit/:id", postController.editPost)

module.exports = router;
