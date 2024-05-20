import { toast } from "react-toastify";
import { deleteItem, getAllMatchingItems } from "../helpers";
import { redirect } from "react-router-dom";

const DeleteBudget = ({params}) => {
    try{
        deleteItem({
            key: "expenses",
            id:params.id,
        });

        const associatedExpenses = getAllMatchingItems({
            category:"subexpenses",
            key: "budgetId",
            value:params.id,
        });

        associatedExpenses.forEach((expense) => {
            deleteItem({
                key:"subexpenses",
                id: expense.id,
            })
        });
       
        toast.success("Expense category deleted successfully");
    
    } catch(e) {
        throw new Error("There was a problem deleting your expense category");
    }
   
    return redirect("/");
}

export default DeleteBudget;