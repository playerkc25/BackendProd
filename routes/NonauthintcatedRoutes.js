const { Login } = require("../controller/UserController");

const router=require("express").Router();

router.route("/Login").post(Login);