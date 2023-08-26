import mongoose from "mongoose";
import bookingModel from "../model/Booking.js";
import movieModel from "../model/Movies.js";
import UserModel from "../model/User.js";

export const addBooking = async (req, res, next) => {
  const { movie, date, seatNumber, user } = req.body;

  let existingMovie;
  let existingUser;
  try {
    existingMovie = await movieModel.findById(movie);
    existingUser = await UserModel.findById(user);
  } catch (error) {
    next(error);
  }
  if (!existingMovie) {
    return res.status(400).json({ message: "movie not found" });
  }
  if (!existingUser) {
    return res.status(400).json({ message: "User not found" });
  }

  let booking;
  try {
    booking = await new bookingModel({
      movie,
      date: new Date(`${date}`),
      seatNumber,
      user,
    });
  } catch (error) {
    next(error);
  }
  if (!booking) {
    return res.status(400).json({ message: "unable to add booking" });
  }
  let session = await mongoose.startSession();
  session.startTransaction();
  existingUser.bookings.push(booking);
  existingMovie.bookings.push(booking);
  await existingMovie.save({ session });
  await existingUser.save({ session });
  await booking.save({ session });
  session.commitTransaction();

  return res.status(200).json({
    booking,
  });
};

export const getBooking = async (req, res, next) => {
  const id = req.params.id;
  let booking;
  try {
    booking = await bookingModel.findById(id);
  } catch (error) {
    next(error);
  }
  if (!booking) return res.status(400).json({ message: "unexpected error" });
  return res.status(200).json({ booking });
};
export const deleteBooking = async (req, res, next) => {
  const id = req.params.id;
  let booking;
  try {
    booking = await bookingModel.findByIdAndRemove(id).populate("user picture");
    const session = await mongoose.startSession();
    session.startTransaction();
    await booking.user.bookings.pull(booking);
    await booking.movie.bookings.pull(booking);
    await booking.movie.save({ session });
    await booking.user.save({ session });
    session.commitTransaction();
  } catch (error) {
    console.log("error");
  }
  if (!booking) return res.status(400).json({ message: "unexpected error" });
  return req.status(200).json({message:"Succesfully deleted" });
};
