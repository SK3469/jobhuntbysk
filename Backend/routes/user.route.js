import express from "express";
import { login, logout, register, updateProfile } from "../controllers/user.controllers.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {singleUpload} from "../middlewares/multer.js"

const router = express.Router();

// Use lowercase route names for consistency
router.route("/register").post(singleUpload,register);
router.route("/login").post(login);
router.route("/profile/update").post(isAuthenticated,singleUpload, updateProfile); //singleUpload should be here to make sure all add upadting sapratly..
router.route("/logout").get(logout);

export default router;
