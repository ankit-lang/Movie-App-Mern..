import dotenv from "dotenv"
import express from "express"
import mongoose from "mongoose"
import Userrouter from "./routes/userRoutes.js"
import adminRouter from "./routes/adminRoutes.js"
import movieRouter from "./routes/movieRoutes.js"
import bookrouter from "./routes/bookingRouter.js"
import cors from "cors"

const app = express()
app.use(express.json())
dotenv.config()





// Allow requests from specific origins
const corsOptions = {
    origin: 'http://localhost:5173', // This should match your frontend's URL
    optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
//middleware
app.use("/user",Userrouter)
app.use("/admin",adminRouter)
app.use("/movie",movieRouter)
app.use("/booking",bookrouter)





mongoose.connect(process.env.MONGO_DB).then(()=>app.listen(5000,()=>{
    console.log(`server running and db connected`)
})).catch((e)=>console.log(e))

