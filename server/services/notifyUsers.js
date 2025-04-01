import cron from "node-cron"
import { sendEmail } from "../utils/sendEmail.js";
import { User } from "../models/userModel.js";
import { Borrow } from "../models/borrowModel.js";
export const notifyUsers=()=>{
  cron.schedule("*/30 * * * *",async()=>{
    try{
        const oneDayAgo=new Date(Date.now()-24*60*60*1000);
        const borrowers=await Borrow.find({
            dueDate:{
                $lt:oneDayAgo
            },
            returnDate:null,
            notified:false,
        });

        for(const element of borrowers){
            if(element.user && element.user.email)
            {
               // const user=await User.findById(element.user_id);
                sendEmail({
                    email:element.user.email,
                    subject:"Book Return Remainder",
                    message:`Hello ${element.user.name},\n\nThis is a remainder that the
                        book you borrowed is due for return today.\n\n
                        Please return the book asap\n\n Thank You`
                });

                element.notified=true;
                await element.save();

            }
        }
    }
    catch(error){
        console.error("Some error occurred while notifying users",error)
    }
})
  };