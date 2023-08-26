import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  actors:[{type:String,required:true}],

  releaseDate: {
    type: Date,
    required: true,
  },
  posterUrl: {
    type: String,

  },
  featured: {
    type: Boolean,
  },
  bookings: [
    {
      type: mongoose.Types.ObjectId,
      ref:"bookings"
    },
  ],
  admin: {
    type: mongoose.Types.ObjectId,
    ref:"admin",
    required:true
   
  },
});

const movieModel = new mongoose.model('pictures',movieSchema)
export default movieModel;