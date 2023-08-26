import bookingModel from "../model/Booking.js";
import UserModel from "../model/User.js";
import bcrypt from "bcryptjs";
export const GetAllUsers = async (req, res, next) => {
  try {
    let users = await UserModel.find();
    if (!users) {
      return res.status(500).json({
        message: "Unexpected error occured",
      });
    }
    return res.status(200).json({ users });
  } catch (error) {
    return next(error);
  }
};

export const addUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (
    !name &&
    name.trim() === "" &&
    !email &&
    email.trim() === "" &&
    !password &&
    password.trim()
  ) {
    return res.status(422).json({
      message: "Invalid data",
    });
  }
  try {
    const hashpassword = bcrypt.hashSync(password, 10);
    const user = new UserModel({ name, email, password: hashpassword });
    await user.save();
    if (!user) {
      return res.status(500).json({
        message: "Unexpected error",
      });
    }
    return res.status(201).json({
      id : user._id,
    });
  } catch (error) {
    next(error);
  }
};
export const updateUser = async (req, res, next) => {
  const id = req.params.id;
  const { name, email, password } = req.body;
  if (
    !name &&
    name.trim() === "" &&
    !email &&
    email.trim() === "" &&
    !password &&
    password.trim()
  ) {
    return res.status(422).json({
      message: "Invalid data",
    });
  }
  try {
    const hashpassword = bcrypt.hashSync(password, 10);
    let user = await UserModel.findByIdAndUpdate(id, {
      name,
      email,
      password: hashpassword,
    });
    if (!user) {
      return res.status(500).json({
        message: "Unexpected error",
      });
    }
    res.status(200).json({
      message: "updated successfully",
    });
  } catch (error) {
    next(error);
  }
};
export const deleteUser = async (req, res, next) => {
  const id = req.params.id;
  const { name, email, password } = req.body;
  if (
    !name &&
    name.trim() === "" &&
    !email &&
    email.trim() === "" &&
    !password &&
    password.trim()
  ) {
    return res.status(422).json({
      message: "Invalid data",
    });
  }
  try {
    let user = await UserModel.findByIdAndDelete(id);
    if (!user) {
      return res.status(500).json({
        message: "Unexpected error",
      });
    }
    res.status(200).json({
      message: "deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
export const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email && email.trim() === "" && !password && password.trim()) {
    return res.status(422).json({
      message: "Invalid data",
    });
  }
  let existingUser; 
  try {
     existingUser = await UserModel.findOne({ email });
  const isPasswordCorrect = bcrypt.compareSync(password,existingUser);

  if(!existingUser){
    return res.status(400).json({
        message : "Unable to find user  by this id"
    })
  }
  if(!isPasswordCorrect){
    return res.status(400).json({message : "Incorrect passwod"})
  }
  } catch (error) {
    next(error)
    
  }
  return res.status(200).json({
    message:'login success',
    id : existingUser._id
  })
};
export const getUserBooking =async(req,res,next)=>{
  const id = req.params.id;
  let bookings;
  try {
    bookings = await bookingModel.find({user:id})

  } catch (error) {
    next(error)
  }
  if(!bookings){
    res.status(400).json({message:"Unable to fnd movies"})

  }
  return res.status(200).json({bookings})
}