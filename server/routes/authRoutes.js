const express = require("express");
const { registerUser, loginUser, getUser } = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerUser);

router.get("/",getUser);

router.post("/login", loginUser);

module.exports = router;