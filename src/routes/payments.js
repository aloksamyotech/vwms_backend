import express from "express";
import { allPayments, editPayments } from "../controllers/payments.js";

const router = express.Router();

router.patch("/edit/:id", editPayments);
router.get("/all", allPayments);

export default router;
