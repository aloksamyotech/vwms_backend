import express from "express";

import {
  createOutOfService,
  deleteOutOfServices,
  getAllOutOfServices,
} from "../controllers/out_of_service.js";

const router = express.Router();

router.post("/create", createOutOfService);
router.get("/all", getAllOutOfServices);
router.delete("/delete/:id", deleteOutOfServices);

export default router;
