import { Link, Outlet } from "react-router-dom";

export default function Layout () {
    return (
        <div>
            <Link to={"/home"}>Home</Link>
            <Link to={"/login"}>Login</Link>
            <Link to={"/signup"}>Registrion</Link>

            <Outlet></Outlet>
        </div>
    )
}