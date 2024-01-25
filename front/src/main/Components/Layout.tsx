import { Link, Outlet } from "react-router-dom";
import "./Layout.css";

function Header() {
    return (
        <>
            <Link to="/">Home</Link>
            <Link to="/repository">Full Default Database</Link>
            <Link to="/BTable">Book Table</Link>
        </>
    );
}

function Layout() {
    return (
        <>
            <nav>
                <Header />
            </nav>
            <main>
                <Outlet />
            </main>
        </>
    );
}

export default Layout;
