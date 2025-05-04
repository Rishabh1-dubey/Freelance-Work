const express = require("express");

const User = require("../models/User.js")
const jwt = require("jsonwebtoken")

const router = express.Router()

router.post("/register", async(req,res)=>{
  const {name,email,password} = req.body
  try {
    
    console.log("checking the boyd of the app",req.body)
    res.send({name,email,password})
  } catch (error) {
    console.log(error)
    res.status(500).send("Something went wrong" + error)
  }
})

module.exports =router;