import React from "react";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import close from "../assets/close.svg"
import { useEffect } from "react";
import apiAxios from "../services/api";

const NavLinks = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false); 

    const checklogstatus = async() => {

        const response = await apiAxios.get(`/users/checkstatus`);

        setIsLoggedIn(response.data.isLoggedIn);

    }

    useEffect(() => {
        checklogstatus(); 
      }, []);
    
      const handleLogout = async () => {
        try {
          await apiAxios.post('/users/logout');
          
          setIsLoggedIn(false);
        } catch (error) {
          console.error('Logout failed:', error);
        }
      };


    return (
        <>
            <NavLink to="/home" className="  sm:text-xl font-quick  w-full text-center lg:w-auto hover:bg-gray-200 lg:hover:bg-transparent  "> Home</NavLink>
            <NavLink to="/Access" className="  sm:text-xl font-quick   w-full text-center lg:w-auto hover:bg-gray-200 lg:hover:bg-transparent "> Access</NavLink>
            <NavLink to="/" className="lg:ml-auto lg:pr-8"> {isLoggedIn ? (<button onClick={handleLogout} className="bg-black sm:py-2 sm:px-3 py-1 px-8 rounded-md text-sm font-quick text-white "> Logout </button>) : (<button className="bg-black sm:py-2 sm:px-3 py-1 px-8 rounded-md text-sm font-quick text-white "> Log In</button>)  }  </NavLink>
        </>
    )

};

const Nav = () => {
    const [isOpen, SetIsOpen] = useState(false);

    const toggleNavbar = () => {
        SetIsOpen(!isOpen);
    };


    return (
        <>
            <nav className="">
                <div className="hidden lg:flex  gap-x-10 ">
                    <NavLinks  />
                </div>

                <div className="lg:hidden">
                    <button onClick={toggleNavbar} className="pr-8">
                        {isOpen ? <span className="   text-3xl font-quick text-black" > <img src={close} className="h-8 w-8" /> </span> : <span className="bg-black py-2 px-3 rounded-lg text-sm font-comic text-white "> Menu</span>}
                    </button>
                </div>

            </nav>

            {isOpen && (
                <div className="flex flex-col basis-full items-center gap-2 shadow-md py-4 lg:hidden">
                    <NavLinks />
                </div>
            )}

        </>
    )
};

export default Nav;