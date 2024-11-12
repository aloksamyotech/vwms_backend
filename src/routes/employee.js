import express from "express";

import {
  createEmployee,
  getAllEmployee,
  updateEmployee,
} from "../controllers/employee.js";

const router = express.Router();
router.post("/create", createEmployee);
router.get("/all", getAllEmployee);
router.patch("/edit/:id", updateEmployee);

export default router;
