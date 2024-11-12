import { statusCodes } from "../common/const.js"
import * as payments from "../services/payments.js"

export const editPayments = async (req , res) =>{
    try {
        const payment = await payments.editPayments(req)
        res.status(statusCodes.ok).json(payment)
    } catch (error) {
        res.status(statusCodes.internalServerError).json({message : error.message})
    }
}