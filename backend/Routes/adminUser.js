const express = require("express");
const User = require("../models/User");
const { protect, admin } = require("../middlewares/authMiddleware");

const router = express.Router();

// POST request
router.post("/", protect, admin, async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      res.status(401).json({ message: "User already Exist" });
    }

    const newUser = new User({
      name,
      email,
      password,
      role: role || "customer",
    });
    await newUser.save();
    return res.json({ message: "User crated Successfully", user: newUser });
  } catch (error) {
    console.log(error);
    res.json("somethin went wrong" + error);
  }
});

// GET request
router.get("/", protect, admin, async (req, res) => {
  try {
    const user = await User.find({});
    return res.json(user);
  } catch (error) {
    console.log(error);
    res.status(401).json("User is Not Stroed", error);
  }
});


// PUT Request
router.put("/:id" , protect,admin,async(req,res)=>{
    const user = await User.findById(req.params.id)


    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.role = req.body.role || user.role;
    }
const newUser =  await user.save()
return  res.status(200).json({message:"User Updated Successfully", user:newUser}) 


    
})

// Delete Request
router.delete("/:id" , protect,admin,async(req,res)=>{
    const user = await User.findById(req.params.id)

    if(user){
        await User.deleteOne()
        return  res.status(200).json({message:"User Deleted Successfully", user}) 
    }
    
})







module.exports = router;
