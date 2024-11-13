import express from "express";
import * as packageController from "../controllers/packages.js";
const router = express.Router();

router.post("/create", packageController.createPackage);
router.get("/all", packageController.getPackage);
router.delete("/delete/:id", packageController.deletePackage);
router.patch("/edit/:id", packageController.updatePackage);
export default router;
