import express from "express"
import { editPayments } from "../controllers/payments.js"

const router = express.Router()

router.patch("/edit/:id",editPayments)

export default router