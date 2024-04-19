import express from "express"
import cors from "cors"
import mongoose from "mongoose";
import 'dotenv/config'
import router from "./routes/router.js"

const app = express()
app.use(cors())
app.use(express.json())

//used routes
app.use("/",router)



mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("DB connection Successful");
}).catch((err) => {
  console.log(err.message);
})


app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})


// app.post("/allusers",async(req,res)=>{
//   console.log(req.body)
//   console.log(req.body.userID)
//   let b=await User.findOne({_id:req.body.userID})
//   res.json(b);
// })