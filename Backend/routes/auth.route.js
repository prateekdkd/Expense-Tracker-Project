const express = require("express");
const user = require("../models/user.model")
const {signup, login} = require("../controllers/auth.controller");
const { protect } = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/register", signup)
router.post("/login", login)

router.get("/me", protect, async(req,res)=>{
    res.status(200).json(req.user);
})

module.exports = router;