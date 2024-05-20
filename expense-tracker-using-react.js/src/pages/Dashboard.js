import { Link, useLoaderData } from "react-router-dom";
import { createExpense, createSubExpense, deleteItem, fetchData, makeItWait } from "../helpers"
import Intro from "../components/Intro";
import { toast } from "react-toastify";
import AddBudgetForm from "../components/AddBudgetForm";
import AddExpenseForm from "../components/AddExpenseForm";
import BudgetItem from "../components/BudgetItem";
import Table from "../components/Table";

//Loader function
export function dashboardLoader() {
    const userName = fetchData("userName");
    const expenses = fetchData("expenses");
    const subexpenses = fetchData("subexpenses")
    return {userName, expenses, subexpenses};
}

export async function dashboardAction({request}) {
    await makeItWait();

    const data= await request.formData();
    const {_action, ...values} = Object.fromEntries(data);

    // New user
    if(_action === "newUser") {
        try {
            localStorage.setItem("userName",JSON.stringify(values.userName));
            return toast.success(`Welcome, ${values.userName}`);
        } catch (e) {
            throw new Error("There was a problem creating your account. Try again please");
        }
    }

    if(_action === "createExpense") {
        try {
            //create expense
            createExpense({name: values.newExpense, amount: values.newExpenseAmount})
            return toast.success("Expense Category created!")
        } catch(e) {
            throw new Error("There was a problem creating your expense.")
        }
    }
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

const Dashboard = () => {

    const { userName, expenses, subexpenses} = useLoaderData();

    return <>
    <div>
        {userName ? (
        <div className="dashboard"><h1>Welcome back, <span className="accent">
            {userName}</span></h1>
            <div className="grid-sm">
                {
                    expenses && expenses.length > 0 ?
                    ( <div className="grid-lg">
                        <div className="flex-lg">
                            <AddBudgetForm />
                            <AddExpenseForm expenses = {expenses}/>
                        </div>
                        <h2>Existing Expenses</h2>
                        <div className="budgets">
                            {
                                expenses.map((expense) => (
                                    <BudgetItem key={expense.id} budget={expense}/>
                                    
                                ))
                            }
                        </div>
                        {
                            subexpenses && subexpenses.length > 0 && (
                                <div className="grid-md">
                                    <h2>Recent Expenses</h2>
                                    <Table expenses={subexpenses.sort((a,b) => b.createdAt - a.createdAt).slice(0,8)}/>
                                    {
                                        subexpenses.length > 8 && (
                                            <Link to="expenses" className="btn btn--dark">
                                                View all 
                                            </Link>
                                        )
                                    }
                                </div>
                            )
                        }
                    </div> ) :
                    <>
                        <div className="grid-sm">
                            <p>Personal Budgeting is the secret to financial freedom.</p>
                            <p>Create a expense to get started!</p>
                            <AddBudgetForm />
                        </div>
                    </>
                }
            </div>
            </div>): (<Intro/>)}
    </div>
    </>
}

export default Dashboard;

