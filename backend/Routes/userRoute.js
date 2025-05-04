const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router()

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already Exist" });

    const newUser = new User({ name, email, password });
    const savedUser = await newUser.save();

    
// Implemented JWT Token 🚨🚨🚨🚨🚨🚨🚨

const payload = {user:{_id:savedUser._id, role:savedUser.role}}

jwt.sign(payload, process.env.JWT_SECRET,{expiresIn:"10h"},(err,token)=>{
  if(err) throw new Error("Not able to get Token")
      
    res.status(201).json({user:{
      _id:savedUser._id,
      name:savedUser.name,
      email:savedUser.email,
      role:savedUser.role
    },token})
})

  } catch (error) {
    console.log(error)
    res.status(400).send("Something went wrong" + error)
  }
});


module.exports = router;