import mongoose from "mongoose"



const adminSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique :true

    },
    password:{
        type : String,
        required : true,
        minLength : 6,
    },
    addMovie:[{
        type:mongoose.Types.ObjectId,
        ref:"pictures"

    }]
})


const adminModel = new mongoose.model('admin',adminSchema)
export default adminModel