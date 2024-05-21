/* purposefully putting wait function 
after submitting the expense. 
Not to be used in read Full-stack application*/
export const makeItWait = () => new Promise (res => setTimeout(res,Math.random()*800));

const generateRamdomColor = () => {
    const existingExpenseLength = fetchData("expenses")?.length?? 0;

    return `${existingExpenseLength*34} 65% 50%`;
}

// Local Storage
export const fetchData = (key => {
    return JSON.parse(localStorage.getItem(key));
})

export const getAllMatchingItems = ({category, key, value}) => {
    const data = fetchData(category) ?? [];
    return data.filter((item)=> item[key]===value);
}

// create expense
export const createExpense = ({name, amount}) => {
    const newItem = {
        id: crypto.randomUUID(),
        name: name,
        createdAt: Date.now(),
        amount: +amount,
        color: generateRamdomColor()
    }
    const existingExpenses = fetchData("expenses") ?? [];
    return localStorage.setItem("expenses", JSON.stringify([...existingExpenses,newItem]))
}

// create sub-expense
export const createSubExpense = ({name, amount, budgetId}) => {
    const newItem = {
        id: crypto.randomUUID(),
        name: name,
        createdAt: Date.now(),
        amount: +amount,
        budgetId: budgetId
    }
    const existingSubExpenses = fetchData("subexpenses") ?? [];
    return localStorage.setItem("subexpenses", JSON.stringify([...existingSubExpenses,newItem]))
}

//Delete item
// export const deleteItem = ({key}) => {
//     return localStorage.removeItem(key);
// }

export const deleteItem = ({key,id}) => {
    const existingData = fetchData(key);
    if(id) {
        const newData = existingData.filter((item)=> item.id!==id);
        return localStorage.setItem(key,JSON.stringify(newData));
    }
    return localStorage.removeItem(key);
}

//Total spent by budget
export const calculateSpentByBudget = (budgetId) => {
    const expenses = fetchData("subexpenses") ?? [] ;
    const budgetSpent = expenses.reduce((acc, expense) => {
        if(expense.budgetId !== budgetId) {
            return acc;
        }
        // add current amount to total
        return acc+=expense.amount;
    }, 0);

    return budgetSpent;
}

//Formattting Helper functions
export const formatDateToLocaleString = (epoch) => {
    return new Date(epoch).toLocaleDateString();
}

export const formatPercentage = (amt) => {
    return amt.toLocaleString(undefined, {
        style: "percent",
        minimumFractionDigits: 0
    })
}

//format currency
export const formatCurrency = (amt) => {
    if (amt == null || isNaN(amt)) {
        return '';
    }
    return amt.toLocaleString(undefined, {
        style: "currency",
        currency: "USD"
    })
}