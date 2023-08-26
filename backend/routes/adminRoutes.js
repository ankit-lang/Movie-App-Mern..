import express from "express";
import {
  addAdmin,
  adminLogin,
  getAdmin,
} from "../controller/adminController.js";
const adminRouter = express.Router();

adminRouter.post("/signup", addAdmin);
adminRouter.post("/login", adminLogin);
adminRouter.get("/", getAdmin);

export default adminRouter;
