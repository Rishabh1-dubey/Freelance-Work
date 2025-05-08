const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

require("dotenv").config();

const router = express.Router();
// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDNARY_CLOUD_NAME,
  api_key: process.env.CLOUDNARY_API_KEY,
  api_secret: process.env.CLOUDNARY_API_SECRET,
});

// Multer setup using memory storeage
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "NO file Upload" });
    }

    // Function to handle the stream upload cloudnary
    const streanUpload = (fileBuffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream((error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        });
        //Use stramifiler to convert file buffer to a stream
        streamifier.createReadStream(fileBuffer).pipe(stream)
      });
    };

    // Call the StramUpload function
    const result = await streanUpload(req.file.buffer)
    // Respond with the upload image URL
    res.json({imageURL:result.secure_url})

  } catch (error) {
    return res.status(500).json("Server Error");
  }
});

module.exports = router;