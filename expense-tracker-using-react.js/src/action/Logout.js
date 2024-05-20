import { redirect } from "react-router-dom";
import { deleteItem } from "../helpers";
import { toast } from "react-toastify";


export async function LogoutAction() {
    deleteItem({key:"userName"});
    deleteItem({key:"expenses"});
    deleteItem({key:"subexpenses"});
    toast.success("You've deleted your account!")

    return redirect("/");
}