import { useLoaderData } from "react-router-dom";
import { deleteItem, fetchData } from "../helpers";
import Table from "../components/Table";
import { toast } from "react-toastify";

//Loader function
export async function expensesLoader() {
    const subexpenses = await fetchData("subexpenses")
    return {subexpenses};
};

export async function expensesAction({request}) {
    const data = await request.formData();
    const {_action, ...values} = Object.fromEntries(data);

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

const ExpensesPage = () => {
    const {subexpenses} = useLoaderData();
    return <>
        <div className="grid-lg">
            <h1>All Expenses</h1>
            {
                subexpenses && subexpenses.length > 0 ? (
                   <div className="grid-md">
                    <h2>Recent Expenses <small>({subexpenses.length} Total)</small></h2>
                    <Table expenses={subexpenses}/>
                   </div>
                ):
                <p>No expenses to show</p>
            }
        </div>
    </>
};

export default ExpensesPage;