import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { userAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, signout } = userAuth();
  const [nav, setNav] = useState(false);
  const navigate = useNavigate();

  const handleSignout = async () => {
    try {
      await signout();
      navigate("/signin");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="rounded-div flex items-center justify-between h-20 font-bold py-10 min-w-[400px]">
      <Link to="/">
        <h1 className="text-2xl">Cryptobase</h1>
      </Link>
      <div className="hidden md:block">
        <ThemeToggle />
      </div>

      <div className="hidden md:block">
        {user?.email ? (
          <>
            <Link to="/account" className="p-4 hover:text-accent">
              Account
            </Link>
            <Link
              className="bg-button text-btnText px-5 py-2 ml-2 rounded-2xl shadow-lg hover:shadow-2xl"
              onClick={handleSignout}
            >
              Sign out
            </Link>
          </>
        ) : (
          <>
            <Link to="/signin" className="p-4 hover:text-accent">
              Sign In
            </Link>
            <Link
              to="/signup"
              className="bg-button text-btnText px-5 py-2 ml-2 rounded-2xl shadow-lg hover:shadow-2xl"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
      {/* Menu Icon */}
      <div
        onClick={() => setNav(!nav)}
        className="block md:hidden cursor-pointer z-10"
      >
        {nav ? null : <AiOutlineMenu size={20} />}
      </div>
      {/* Mobile Menu */}
      <div
        className={
          nav
            ? "md:hidden fixed left-0 top-0 flex flex-col items-center justify-between w-full h-full bg-primary ease-in-out duration-300 z-10"
            : "fixed left-[-100%] top-0 h-full flex flex-col items-center justify-between ease-in-out duration-300"
        }
      >
        <ul className="w-full p-4">
          <li
            onClick={() => setNav(!nav)}
            className="md:hidden cursor-pointer z-10 flex justify-end mt-4"
          >
            {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
          </li>
          <li className="border-b py-6">
            <Link onClick={() => setNav(false)} to="/">
              Home
            </Link>
          </li>
          <li className="border-b py-6">
            <Link onClick={() => setNav(false)} to="/account">
              Account
            </Link>
          </li>
          <li className="py-6">
            <ThemeToggle />
          </li>
        </ul>
        <div className="flex flex-col w-full p-4">
          <Link onClick={() => setNav(false)} to="/signin">
            <button className="w-full my-2 p-3 bg-primary  border border-secondary rounded-2xl shadow-xl">
              Sign In
            </button>
          </Link>
          <Link onClick={() => setNav(false)} to="/signup">
            <button className="w-full my-2 p-3 bg-button  text-btnText rounded-2xl shadow-xl">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
