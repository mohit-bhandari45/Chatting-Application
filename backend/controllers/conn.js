const mongoose = require("mongoose")

const connectDB = () => {
    mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(()=>{
        console.log("DB connection successful")
    }).catch((error)=>{
        console.log(error)
    })
}

module.exports = connectDB