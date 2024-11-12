import express from "express";
import {
  createService,
  deleteService,
  editServices,
  getAllServices,
} from "../controllers/services.js";

const router = express.Router();

router.post("/create", createService);
router.get("/all", getAllServices);
router.patch("/edit/:id", editServices);
router.delete("/delete/:id", deleteService);

export default router;
