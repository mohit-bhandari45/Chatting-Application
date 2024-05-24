const express = require('express')
const router=require("./routes/userRoutes")
require("dotenv").config()
const connectDB=require("./controllers/conn")

const app = express()
app.use("/",router)


connectDB()

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})