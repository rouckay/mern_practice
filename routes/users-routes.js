const express = require("express");
const users = require("../controllers/user-controller");
const {check} = require("express-validator")
const router = express.Router();

router.get('/',users.getUsers);
router.post('/login',users.login);
router.post('/signup',[check("username").not().isEmpty(),check("email").normalizeEmail().isEmail(),check("password").isLength({min:6})],users.signUp);


module.exports = router;
