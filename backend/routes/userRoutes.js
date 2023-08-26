import express from "express"
import { GetAllUsers, addUser, deleteUser, getUserBooking, login, updateUser } from "../controller/userController.js";

const router = express.Router();


router.get("/",GetAllUsers)
router.get("/booking/:id",getUserBooking)
router.post("/signup",addUser)
router.put("/:id",updateUser).delete(deleteUser)
router.post("/login",login)

export default router