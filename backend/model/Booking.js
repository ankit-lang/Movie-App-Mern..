import mongoose from "mongoose";


const bookingSchema =  new mongoose.Schema({
    movie:{
        type:mongoose.Types.ObjectId,
       ref:"picture",
       required:true
    },
    date:{
        type:Date,
        required:true
    },
    seatNumber:{
        type:Number,
        required:true
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"user",
        required :true
    }
})
const bookingModel = new mongoose.model("booking",bookingSchema)
export default bookingModel;