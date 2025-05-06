const express = require("express");
const cors=require("cors");
const dotenv = require("dotenv")
const userRoute = require("./Routes/userRoute.js")
const productRoute = require("./Routes/productRoutes.js")
const cartRoute = require("./Routes/cartRoute.js")


const app = express();

app.use(express.json());
app.use(cors())
dotenv.config()


// importting our database config ffile
const ConnectDb = require("./config/db.js")

const PORT = process.env.PORT || 3000;
console.log(PORT)

// Connected with Database\
ConnectDb()




app.get("/",(req,res)=>{
    console.log("server is running")
    res.send("hello i am on")
})


// Api Routes
app.use("/api/users",userRoute)
app.use("/api/users",productRoute)
app.use("/api/cart",cartRoute)

app.listen(PORT,()=>{
    console.log(`hello man server on runngin on port http://localhost:${PORT}`)
})