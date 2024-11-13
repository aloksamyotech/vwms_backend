import express from "express";
import {
  createVehicle,
  deleteVehicle,
  getAllVehicle,
  updateStatus,
} from "../controllers/vehicle_type.js";

import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const router = express.Router();
router.post("/create", upload.single("file"), createVehicle);

router.get("/all", getAllVehicle);
router.delete("/delete/:id", deleteVehicle);

router.patch("/edit/:id", updateStatus);

export default router;
