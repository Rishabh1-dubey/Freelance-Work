const express = require("express");
const Subscribe = require("../models/Subscribe");

const router = express.Router();

router.post("/", async (req, res) => {
  const { email } = req.body;

  try {
    const subscribe = await Subscribe.findOne({ email });

    if (subscribe) {
      res.status(401).json({ message: "User already Exist" });
    }
    const newSubscribe = new Subscribe({email});
    await newSubscribe.save()
    return res.status(200).json({message:"new User subscribed successfully"})
  } catch (error) {
    console.log(error)
    res.status(402).json("Somethin went wrong" + error)
  }
});

module.exports = router