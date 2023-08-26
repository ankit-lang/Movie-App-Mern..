import jwt from "jsonwebtoken";
import movieModel from "../model/Movies.js";
import mongoose from "mongoose";
import adminModel from "../model/Admin.js";

export const addMovie = async (req, res, next) => {
  const extractedtoken = req.headers.authorization.split(" ")[1];
  if (!extractedtoken && extractedtoken.trim() === "") {
    return res.status(404).json({
      message: "token not found",
    });
  }
  //verify token
  let adminId;
  jwt.verify(extractedtoken, process.env.SECRET_KEY, (err, decrypted) => {
    if (err) {
      return res.status(400).json({ message: `${err.message}` });
    } else {
      adminId = decrypted.id;
      return;
    }
  });

  //create new movie
  const { title, description, releaseDate, posterUrl, featured,bookings, actors } =
    req.body;
  if (
    !title &&
    title.trim() === "" &&
    !description &&
    description.trim() === "" &&
    !posterUrl &&
    posterUrl.trim() === ""
  ) {
    return res.status(400).json({
      message: "Invalid Data",
    });
  }
  let movie;
  try {
    movie = new movieModel({
      title,
      description,
      featured,
      releaseDate: new Date(`${releaseDate}`),
      actors,
      posterUrl,
      admin: adminId,
      bookings
    });
    const session = await mongoose.startSession()
    const adminUser = await adminModel.findById(adminId)
    0
    
  } catch (error) {
    next(error);
  }
  if(!movie){
    return res.status(500).json({
        message :"request failed"
    })
  }
  const session = await mongoose.startSession()
  const adminUser = await adminModel.findById(adminId)
  session.startTransaction();
  await movie.save({session})
  adminUser.addMovie.push(movie);
  adminUser.save({session})
  await session.commitTransaction();

  return res.status(200).json({message: "movie added",movie})
};



export const getMovies =async( req,res,next)=>{
    let movies;
    try {
        movies= await movieModel.find({})

    } catch (error) {
        next(error)
    }
    if(!movies){
        return res.status(400).json({message:"request failed"})

    }
   
    return res.status(200).json({message: "found movies",movies})
}
export const getMovieById = async(req,res,next)=>{
    const id = req.params.id;
   
    let movie;
    try {
       movie = await movieModel.find({_id:id}) 
    } catch (error) {
        next(error)
    }
    if(!movie){
        return res.status(400).json({messasge:"invalid id"})
    }
    return res.status(200).json({movie})
}