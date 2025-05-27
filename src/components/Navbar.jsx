import React, { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setUser, clearUser } from '../features/userSlice.js'
import SuccessToast from './Toast/SuccessToast';

const Navbar = ({ name }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isScrolled, setIsScrolled] = useState(false);
    const [toast, setToast] = useState();
    const [loader,setLoader] = useState(false);

    const user = useSelector((state) => state.user.user);

    const logoutWithGoogle = async () => {
        setLoader(true);
        axios.get(`${import.meta.env.VITE_BACKEND}/auth/logout`, {
            withCredentials: true
        }).then((res) => {
            setLoader(false);
            dispatch(clearUser());
            navigate('/');
            setToast(`Logged Out.`)
            setTimeout(() => {
                setToast('')
            }, 3000)
        }).catch((error) => setLoader(false));
    };


    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    return (
        <>
            {toast ? <SuccessToast message={toast} /> : ``}
            <div className={`navbar fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${isScrolled ? "bg-white/10 backdrop-blur border-b border-white/20" : "bg-base-300"}`}>
                <div className="navbar-start cursor-pointer" onClick={() => navigate('/')}>
                    <img className='rounded-full w-10 h-10 mt-2 ml-2 lg:mt-2 lg:ml-6' src={logo} alt="myblogs" />
                    <h1 className="text-lg lg:text-xl text-black ml-2 font-bold">my<span className='font-bold text-[#6941C6]'>Blogs</span></h1>
                </div>
                <div className="navbar-center hidden lg:flex">
                    {
                        user ? <ul className="flex justify-between gap-16 py-4 px-1 text-lg text-[#6941C6]">
                            <NavLink to='/' className={({ isActive }) => `hover:underline transition cursor-pointer hover:text-[#42307D] ${isActive ? `underline text-[#42307D]` : ``}`}>Home</NavLink>
                            <NavLink to='/blogs' className={({ isActive }) => `hover:underline transition cursor-pointer hover:text-[#42307D] ${isActive ? `underline text-[#42307D]` : ``}`}>Blogs</NavLink>
                            <NavLink to='/postblog' className={({ isActive }) => `hover:underline transition cursor-pointer hover:text-[#42307D] ${isActive ? `underline text-[#42307D]` : ``}`}>Post Blog</NavLink>
                            <NavLink to='/yourblog' className={({ isActive }) => `hover:underline transition cursor-pointer hover:text-[#42307D] ${isActive ? `underline text-[#42307D]` : ``}`}>Your Blogs</NavLink>
                        </ul> : ``
                    }
                </div>
                <div className="navbar-end">
                    {
                        !user ?
                            (name ? `` : <div className='flex space-x-2 lg:space-x-4 items-center'>
                                <Link className="btn btn-sm lg:btn-md hover:bg-purple-700 bg-purple-800 shadow-md text-[#F9F5FF] rounded-lg" to='/signup'>
                                    Signup
                                </Link>
                                <Link className="btn btn-sm lg:btn-md hover:text-purple-700 text-purple-800  shadow-md hover:bg-base-300 bg-[#F9F5FF] rounded-lg" to='/login'>
                                    Login
                                </Link>
                            </div>)
                            :
                            <div className='flex space-x-4'>
                                <img
                                    className='w-10 h-10 rounded-full border-2 border-green-500 p-0.5'
                                    alt="Img"
                                    src={user.user === undefined ? user?.pictureUrl : user?.user?.pictureUrl}
                                />
                                <button className='btn bg-red-600 logout-linear-gradient text-white btn-sm mt-1 lg:btn-md lg:mt-0' onClick={logoutWithGoogle}>{loader ?<span className="loading loading-spinner loading-md" />:`Logout`}</button>
                            </div>
                    }

                    {
                        user &&
                        <div className="dropdown ml-2">
                            <div tabIndex={0} role="button" className="btn btn-sm lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-5 w-5 stroke-current"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path> </svg></div>
                            <ul
                                tabIndex={0}
                                class="menu menu-sm dropdown-content bg-base-100 rounded-box mt-5 -mx-48 w-60 p-4 shadow text-lg">
                                <Link to='/' className='hover:underline transition cursor-pointer'>Home</Link>
                                <Link to='/blogs' className='hover:underline transition cursor-pointer'>Blogs</Link>
                                <Link to='/postblog' className='hover:underline transition cursor-pointer'>Post Blog</Link>
                                <Link to='/yourblog' className='hover:underline transition cursor-pointer'>Your Blogs</Link>
                            </ul>
                        </div>

                    }
                </div>
            </div >
        </>
    )
}

export default Navbar
