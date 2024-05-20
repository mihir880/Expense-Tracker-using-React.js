import { Link, useNavigate, useRouteError } from "react-router-dom";
import {HomeIcon, ArrowUturnLeftIcon} from '@heroicons/react/24/solid';

const Error = () => {
    const error = useRouteError();
    const navigate = useNavigate();

    return <>
    <div className="error">
        <h1>Oh no! We'have got a problem</h1>
        <p>{error.message || error.statusText}</p>

        <div className="flex-md">
            <button className="btn btn--dark" onClick={
                () => navigate(-1)}>
                <ArrowUturnLeftIcon className="trash-icon"/>
                <span>Go Back</span>
            </button>
            <Link to="/" className="btn btn--dark">
                <HomeIcon className="trash-icon"/>
                <span>Go Home</span>
            </Link>
        </div>
    </div>
    </>
}

export default Error;