import express from "express";
import {
  createInEx,
  deleteInAndEx,
  editInAndEx,
  getAllInEx,
  IncomeAndExpenseReport,
} from "../controllers/income_and_expense.js";

const router = express.Router();

router.post("/create", createInEx);
router.get("/all", getAllInEx);
router.delete("/delete/:id", deleteInAndEx);
router.patch("/edit/:id", editInAndEx);
router.get("/all/inandexReport/:startDate/:endDate", IncomeAndExpenseReport);

export default router;
