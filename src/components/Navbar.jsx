import { Link, NavLink } from "react-router-dom";
import { IoPersonOutline } from "react-icons/io5";
import { IoPersonAddOutline } from "react-icons/io5";
import { useContext, useEffect } from "react";
import { AuthContext } from "../FirebaseProvider/FirebaseProvider";

const Navbar = () => {

    const { user, logout } = useContext(AuthContext)
    const {theme, setTheme} = useContext(AuthContext)

    const toggleTheme = (e) => {
        if (e.target.checked)
            setTheme('dark')
        else
            setTheme('light')
    }
    useEffect(() => {
        localStorage.setItem('theme', theme)
        const localTheme = localStorage.getItem('theme')
        document.querySelector('html').setAttribute('data-theme', localTheme);
    }, [theme]);

    const links =
        <>
            <NavLink to='/' className={({ isActive }) => isActive ? "text-purple-500 lg:border-b-purple-500 lg:border-b-2" : "hover:text-purple-300"}><a>Home</a></NavLink>
            <NavLink to='/dashboard' className={({ isActive }) => isActive ? "text-purple-500 lg:border-b-purple-500 lg:border-b-2" : "hover:text-purple-300"}><a>Dashboard</a></NavLink>
            <NavLink to='/features' className={({ isActive }) => isActive ? "text-purple-500 lg:border-b-purple-500 lg:border-b-2" : "hover:text-purple-300"}><a>Features</a></NavLink>
            <NavLink to='/contactus' className={({ isActive }) => isActive ? "text-purple-500 lg:border-b-purple-500 lg:border-b-2" : "hover:text-purple-300"}><a>Contact Us</a></NavLink>
        </>
    return (
        <div className="shadow-xl sticky top-0 z-50 ">
            <div className="navbar bg-base-100 max-w-7xl mx-auto lg:py-6 w-11/12 ">
                <div className="navbar-start" data-aos="fade-down">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 z-[100] shadow bg-base-100 rounded-box w-52 gap-4 p-4 *:font-semibold border border-purple-200">
                            {links}
                        </ul>
                    </div>
                    <div className="absolute ml-14 lg:ml-0 overflow-hidden flex justify-center items-center rounded-2xl border-none">
                        {/* bg-gradient-to-r from-orange-700 via-blue-500 to-green-400 text-transparent bg-clip-text animate-gradient bg-300%  */}
                        {/* <video className="absolute " autoPlay loop muted> <source src="https://videos.pexels.com/video-files/10914360/10914360-hd_1920_1080_24fps.mp4" /></video> */}
                        <Link to='/' className="bg-gradient-to-r from-orange-700 via-blue-500 to-green-400 text-transparent bg-clip-text animate-gradient bg-300% lg:text-3xl md:text-2xl text-xl font-extrabold">Taskify</Link>
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 *:lg:text-lg *:opacity-70 gap-6 *:font-semibold">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        user ?
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar tooltip tooltip-bottom flex items-center" data-tip={user?.displayName || "No Username"}>
                                    <div className="w-10 rounded-full ring ring-primary ring-offset-2" data-aos="zoom-in-left">
                                        <img alt="Tailwind CSS Navbar component" src={user?.photoURL || "https://i.ibb.co/TWmn0tk/monochrome-icon-people-icon-design-user-icon-in-flat-style-vector.jpg"} />
                                    </div>
                                </div>
                                <ul tabIndex={0} className="mt-3 z-[100] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                                    <Link to='/my_art_and_craft_list' className="pl-3 py-1.5 rounded-lg btn-ghost" ><a>My Art & Craft List</a></Link>
                                    <li onClick={logout}><a>Logout</a></li>
                                </ul>
                            </div>
                            :
                            <>

                                <Link
                                    to='/login'
                                    className={theme === 'light' ? 'btn shadow-none bg-white text-purple-700 hover:bg-purple-100 btn-primary btn-xs sm:btn-sm border-none md:btn-md lg:btn-md rounded-2xl' : 'btn shadow-none bg-transparent text-purple-400 hover:bg-purple-950 hover:text-purple-300 btn-primary btn-xs sm:btn-sm border-none md:btn-md lg:btn-md rounded-2xl'}
                                    data-aos="zoom-in-left"
                                >
                                    <IoPersonOutline />Login
                                </Link>
                                <Link
                                    to='/register'
                                    className={theme === 'light' ? "btn shadow-none bg-white text-orange-600 hover:bg-orange-100 btn-primary btn-xs sm:btn-sm border-none md:btn-md lg:btn-md hidden md:flex rounded-2xl" : "btn shadow-none bg-transparent text-orange-400 hover:bg-orange-950 btn-primary btn-xs sm:btn-sm border-none md:btn-md lg:btn-md hidden md:flex rounded-2xl"}
                                    data-aos="zoom-in-left"
                                >
                                    <IoPersonAddOutline />Register
                                </Link>
                            </>
                    }
                    <label className="cursor-pointer grid place-items-center ml-2">
                        <input type="checkbox" onChange={toggleTheme} value={theme} className="toggle theme-controller bg-base-content row-start-1 col-start-1 col-span-2" checked={theme === 'light' ? false : true} />
                        <svg className="col-start-1 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" /></svg>
                        <svg className="col-start-2 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                    </label>
                </div>
            </div>
        </div>
    )
}

export default Navbar