import { statusCodes } from "../common/const.js"
import * as customer from "../services/customer.js"

export const createCustomer = async (req,res)=>{
    try {
        const newCustomer = await customer.createCustomer(req)
        res.status(statusCodes.created).json(newCustomer)
    } catch (error) {
        res.status(statusCodes.internalServerError).json({message : error.message})
    }
}