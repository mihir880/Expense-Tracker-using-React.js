import { CurrencyDollarIcon } from "@heroicons/react/24/solid";
import { useEffect, useRef } from "react";
import { Form, useFetcher } from "react-router-dom";

const AddBudgetForm = () => {
    const fetcher = useFetcher();
    const isSubmitting = fetcher.state ==="submitting";

    const formRef = useRef();
    const focusRef = useRef();
    const clearForm = useEffect(() => {
      if(!isSubmitting) {
        formRef.current.reset();
        focusRef.current.focus();
      }
    
    }, [isSubmitting]);
    

    return <>
        <div className="form-wrapper">
            <h2 className="h3">
                Create Expense Category
            </h2>
            <fetcher.Form method="post" className="grid-sm" ref={formRef}>
                <div className="grid-xs">
                    <label htmlFor="newExpense">Expense Category Name</label>
                    <input type = "text" name = "newExpense" placeholder="e.g., Grocery" ref = {focusRef} required />
                    <label htmlFor="newExpenseAmount">Amount (Budget)</label>
                    <input type = "number" step= "0.01" name = "newExpenseAmount" id="newBudgetAmount" placeholder="e.g., $120" required inputMode="decimal"/>
                </div>
                <input type="hidden" name="_action" value="createExpense"/>
                <button type="submit" className="btn btn--dark" disabled={isSubmitting}>
                    {
                        isSubmitting ? <span>Submitting...</span> :
                        <>
                            <span>Create Category</span>
                            <CurrencyDollarIcon className="trash-icon"/>
                        </>

                    }
                </button>
            </fetcher.Form>
        </div>
    </>
}

export default AddBudgetForm;