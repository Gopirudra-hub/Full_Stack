const express = require("express");
const router = express.Router();

const { register, login } = require("../controllers/auth");

router.post("/add-user", register);
router.post("/login-user", login);


module.exports = router;
