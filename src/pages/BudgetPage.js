import { useLoaderData } from "react-router-dom";
import { createSubExpense, deleteItem, getAllMatchingItems } from "../helpers";
import BudgetItem from "../components/BudgetItem";
import AddExpenseForm from "../components/AddExpenseForm";
import Table from "../components/Table";
import { toast } from "react-toastify";

export async function budgetLoader({params}) {
    const budget = await getAllMatchingItems({
        category:"expenses",
        key:"id",
        value: params.id,
    })[0];

    const subexpenses = await getAllMatchingItems({
        category:"subexpenses",
        key:"budgetId",
        value: params.id,
    });

    if(!budget) {
        throw new Error("The expense category you are trying to find do not exist");
    }
    
    return {budget, subexpenses};
}

export async function budgetAction({request}) {
    const data = await request.formData();
    const {_action, ...values} = Object.fromEntries(data);
    if(_action === "createSubExpense") {
        try {
            //create sub-expense
            createSubExpense({name: values.newSubExpense, amount: values.newSubExpenseAmount, budgetId:values.newSubExpenseBudget})
            return toast.success(`Expense ${values.newSubExpense} created!`)
        } catch(e) {
            throw new Error("There was a problem creating your expense.")
        }
    }
    if(_action === "deleteExpense") {
        try {
            //create sub-expense
            deleteItem({key: "subexpenses",id:values.expenseId,});
            return toast.success(`Expense deleted!`)
        } catch(e) {
            throw new Error("There was a problem deleting your expense.")
        }
    }
}

export const BudgetPage = () => {

    const {budget, subexpenses} = useLoaderData();

    return <>
    <div className="grid-lg" style={{"--accent":budget.color}}>
        <h1 className="h2">
            <span className="accent">{budget.name +" "}</span>Overview
        </h1>
        <div className="flex-lg">
            <BudgetItem budget={budget} showDelete={true}/>
            <AddExpenseForm expenses={[budget]}/>
        </div>
        {
            subexpenses && subexpenses.length > 0 && (
                <div className="grid-md">
                    <h2>
                       <span className="accent">{budget.name + " "}</span>Expenses
                    </h2>
                    <Table expenses={subexpenses} showBudget={false}/>
                </div>
            )
        }
    </div>
    </>;
}

export default BudgetPage;