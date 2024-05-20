import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { useEffect, useRef } from "react";
import { useFetcher } from "react-router-dom";

const AddExpenseForm = ({expenses}) => {
    const fetcher = useFetcher();
    const formRef = useRef();
    const focusRef = useRef();
    const isSubmitting = fetcher.state === "submitting";

    useEffect(() => {
      if(!isSubmitting) {
        formRef.current.reset();
        focusRef.current.focus();
      }
    
    }, [isSubmitting])
    
    return <>
        <div className="form-wrapper">
            <h2 className="h3">Add New <span className="accent">
            {expenses.length === 1 && `${expenses.map((exp)=> exp.name)} `}
                </span> {" "}
             Expense
            </h2>
            <fetcher.Form method="post" className="grid-sm" ref={formRef}>
                <div className="expense-inputs">
                    <div className="grid-xs">
                        <label htmlFor="newSubExpense">
                        Expense Name
                        </label>
                        <input type="text" name="newSubExpense" id="newSubExpense" placeholder="e.g., Coffee" ref={focusRef} required/>
                    </div>
                    <div className="grid-xs">
                    <label htmlFor="newSubExpenseAmount">
                        Amount
                        </label>
                        <input type="text" name="newSubExpenseAmount" id="newSubExpenseAmount" placeholder="e.g., 20.99" step="0.01" inputMode="decimal" required/>
                    </div>
                </div>
                <div className="grid-xs" hidden={expenses.length === 1}>
                    <label htmlFor="newSubExpenseBudget">
                        Expense Category
                        </label>
                        <select name="newSubExpenseBudget" id="newSubExpenseBudget" required>
                            {
                                expenses.sort((a,b) => a.createdAt - b.createdAt).map((expense)=>{
                                    return (<option key={expense.id} value={expense.id}>
                                            {expense.name}
                                    </option>);
                                })
                            }
                        </select>
                </div>
                <input  type="hidden" name="_action" value="createSubExpense"/>
                <button type="submit" className="btn btn--dark" disabled={isSubmitting}>
                    {
                        isSubmitting ? <span>Submitting...</span> :
                        <>
                            <span>Add expense</span>
                            <PlusCircleIcon className="trash-icon"/>
                        </>

                    }
                </button>    
            </fetcher.Form>
        </div>
    </>
}

export default AddExpenseForm;