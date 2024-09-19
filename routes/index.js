const express = require('express')
const postController = require('../controllers/post')
const router = express.Router()

router.get('/', async () => {
    try {
      console.log('Client Refresh-')
    } catch (err) {
      console.log(err);
    }
  })
router.get("/account", postController.myPosts);
router.delete("/:id", postController.deletePost);

module.exports = router;
