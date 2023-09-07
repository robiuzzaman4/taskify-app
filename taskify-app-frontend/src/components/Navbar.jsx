import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { toast } from "react-hot-toast";
import Container from "./Container";
import Button from "./Button";
import useAuth from "../hooks/useAuth";


const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { user, userLogout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        userLogout()
            .then(() => {
                toast.success("Sign Out Successfull!");
                navigate("/");
            })
            .catch((error) => {
                console.log(error.message);
            })
    }

    return (
        <div className="bg-white/50 backdrop-blur-3xl border-b border-neutral-200 fixed top-0 w-full z-50">
            <Container>
                <nav className="py-6 flex flex-col md:flex-row md:items-center justify-between gap-4 relative">
                    <div className='flex items-center'>
                        <Link to='/'>
                            <div className="text-2xl font-bold flex items-center gap-2">
                                <span>Taskify</span>
                            </div>
                        </Link>
                    </div>
                    <div className={`md:flex flex-col md:flex-row md:items-center gap-4 font-medium text-sm text-neutral-500 ${!menuOpen ? 'hidden' : 'flex'}`}>
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive ? 'text-neutral-900' : ''
                            }>
                            Home
                        </NavLink>
                        {
                            user &&
                            <NavLink
                                to="/my-profile"
                                className={({ isActive }) =>
                                    isActive ? 'text-neutral-900' : ''
                                }>
                                My Profile
                            </NavLink>
                        }
                        <NavLink
                            to="/manage-tasks"
                            className={({ isActive }) =>
                                isActive ? 'text-neutral-900' : ''
                            }>
                            Manage Tasks
                        </NavLink>
                        <NavLink
                            to="/dashboard"
                            className={({ isActive }) =>
                                isActive ? 'text-neutral-900' : ''
                            }>
                            Dashboard
                        </NavLink>
                        {
                            user ?
                                <div className="block md:hidden">
                                    <Button  
                                    onClick={handleLogout}
                                    fullwidth
                                    color="red">Sign Out</Button>
                                </div>
                                :
                                <Link
                                    to="/sign-in"
                                    className="block md:hidden">
                                    <Button fullwidth>Sign In</Button>
                                </Link>
                        }
                    </div>

                    {
                        user ?
                            <div className="hidden md:block">
                                <Button color="red" onClick={handleLogout}>Sign Out</Button>
                            </div>
                            :
                            <Link
                                to="/sign-in"
                                className="hidden md:block">
                                <Button>Sign In</Button>
                            </Link>
                    }

                    <div onClick={() => setMenuOpen(!menuOpen)} className="md:hidden absolute top-[22px] right-0 text-xl cursor-pointer h-9 w-9 grid place-items-center bg-neutral-50  hover:bg-neutral-100 text-neutral-500 rounded-lg">
                        {
                            !menuOpen ? <HiOutlineMenu /> : <HiOutlineX />
                        }
                    </div>
                </nav>
            </Container>
        </div >
    );
};

export default Navbar;