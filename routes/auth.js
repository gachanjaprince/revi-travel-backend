const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth')
const JWTAuthMiddleware = require('../middleware/auth')

router.get("/status", JWTAuthMiddleware, authController.status);
router.post("/createUser", authController.postSignup);
router.post("/login", authController.postLogin);
router.post("/logout", authController.postLogout);

module.exports = router;