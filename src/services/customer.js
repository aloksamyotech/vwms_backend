import { errorMessage } from "../common/const.js";
import Customer from "../models/customer.js";

export const createCustomer = async (req) => {  
  try {
    const { name, email, phone } = req?.body;
    
    const newCustomer = new Customer({
        name , email , phone
    })
    return await newCustomer.save()
    
  } catch (error) {
    throw new Error(`${errorMessage.notCreated}`)
  }
};
