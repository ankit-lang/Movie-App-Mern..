import express from "express";
import {
  addBooking,
  deleteBooking,
  getBooking,
} from "../controller/bookingController.js";

const bookrouter = express.Router();

bookrouter.post("/", addBooking);
bookrouter.get("/:id", getBooking);
bookrouter.delete("/:id", deleteBooking);

export default bookrouter;
