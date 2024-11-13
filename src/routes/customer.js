import express from "express";
import { createCustomer } from "../controllers/customer.js";

const router = express.Router();

router.post("/create", createCustomer);

export default router;
