import express from "express"
import { createInEx , deleteInAndEx, editInAndEx, getAllInEx} from "../controllers/income_and_expense.js"


const router = express.Router()

router.post("/create",createInEx)
router.get("/all",getAllInEx)
router.delete("/delete/:id", deleteInAndEx)
router.patch("/edit/:id", editInAndEx)

export default router