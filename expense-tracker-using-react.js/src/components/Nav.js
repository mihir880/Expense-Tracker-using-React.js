import { Form, NavLink } from "react-router-dom";
import logomark from "../assets/logomark.svg";
import {TrashIcon} from '@heroicons/react/24/solid';

const Nav = ({userName}) => {
    return <>
        <nav>
            <NavLink to="/" aria-label="Go to Home">
                <img className="logomark" src={logomark} alt="" />
                <span> Your Budget</span>
            </NavLink>
            { userName && (<Form method="post" action="/logout" onSubmit={(event) => {
                if(!window.confirm("Delete user and all data?")) {
                    event.preventDefault();
                }
            }}>
                
                <button type="submit" className="btn btn--warning">
                    <span>Delete User</span>
                    <TrashIcon className="trash-icon" />
                </button>
                </Form>
                )
            }
        
        </nav>
    </>
}

export default Nav;

