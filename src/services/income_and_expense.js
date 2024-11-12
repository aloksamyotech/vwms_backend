import { errorMessage } from "../common/const.js";
import IncomeAndExpense from "../models/income_and_expense.js";

export const createInEx = async (req) =>{
    try {
        const {type , date , description , amount } = req?.body
        const newInEx = new IncomeAndExpense({
            type, amount , date , description
        })
        return await newInEx.save()
    } catch (error) {
        throw new Error(`${errorMessage.notCreated}`)
    }
}


export const getAllInEx = async () =>{

    try {
        return await IncomeAndExpense.find({
            active : true
        }).sort({updatedAt : -1}).lean()
    } catch (error) {
        throw new Error(`${errorMessage.notFound}`)
    }
}


export const editInAndEx = async (req) =>{
    try {
        const { id  } = req?.params
        const {type , date , description , amount } = req?.body
        const updatedData = {
            type ,
            date , description , amount
        }

        const response = await IncomeAndExpense.findByIdAndUpdate(id , updatedData , {new : true})
        if (!response) {
            throw new Error(`${errorMessage,notFound}`)
        }
         return response
    } catch (error) {
        throw new Error(`${errorMessage.notUpdate}`)
    }
}


export const deleteInAndEx = async (req) =>{
    try {
        const { id } = req?.params;
        const updatedService = await IncomeAndExpense.findByIdAndUpdate(
          id,
          { active: false }
        );
        if (!updatedService) {
          throw new Error(`${errorMessage.notFound}`);
        }
        return updatedService;
      } catch (error) {
        throw new Error(`${errorMessage.notDeleted}`);
      }
}