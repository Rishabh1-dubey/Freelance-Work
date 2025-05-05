const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already Exist" });

    const newUser = new User({ name, email, password });
    const savedUser = await newUser.save();

    // Implemented JWT Token 🚨🚨🚨🚨🚨🚨🚨

    const payload = { user: { _id: savedUser._id, role: savedUser.role } };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "10h" },
      (err, token) => {
        if (err) throw new Error("Not able to get Token");

        res.status(201).json({
          user: {
            _id: savedUser._id,
            name: savedUser.name,
            email: savedUser.email,
            role: savedUser.role,
          },
          token,
        });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send("Something went wrong" + error);
  }
});

//@POST for login api/v1/login

router.get("/login", async (req,res)=>{
  const {email,password} = req.body;

  try {
    

const user = await User.findOne({email})
if(!user)  return res.status(400).json({message:"Invalid Credentials"})

  const IsPassword = await user.matchPassword(password  )
  if(!IsPassword) return res.status(400).json({message:"Password in not Matched"})


    // Implemented JWT token
    const payload = { user: { _id: user._id, role: user.role } };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "10h" },
      (err, token) => {
        if (err) throw new Error("Not able to get Token");

        res.status(201).json({
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token,
        });
      }
    )

  } catch (error) {
    console.log(error)
    res.send("Something went wrong" + error)
  }
})

// @access Private logged User Profile
router.get("/profile", protect , async (req,res)=>{
  res.json(req.user)
})

module.exports = router;
