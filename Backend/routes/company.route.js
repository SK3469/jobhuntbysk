import express from "express";
import { getCompany, getCompanyById, registercompany, updatecompany } from "../controllers/company.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

// Use lowercase route names for consistency
router.route("/register").post(isAuthenticated,registercompany);
router.route("/get").get(isAuthenticated,getCompany);
router.route("/get/:id").get(isAuthenticated,getCompanyById);
router.route("/update/:id").put(isAuthenticated,singleUpload,updatecompany);

export default router;
