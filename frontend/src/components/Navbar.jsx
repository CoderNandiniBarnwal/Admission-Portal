import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoMdSearch, IoMdMenu, IoMdClose } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { useUserContext } from "../context/UserContext";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useUserContext();

  return (
    <div className="border-2 border-gray-200">
      <div className="flex items-center justify-between px-6 md:px-8 py-4">
        <div>
          <img src="logo.png" alt="Logo" className="w-20 md:w-24" />
        </div>

        <div className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className="text-lg font-semibold text-gray-500 hover:text-black"
          >
            Home
          </Link>

          <Link
            to="/about"
            className="text-lg font-semibold text-gray-500 hover:text-black"
          >
            About
          </Link>

          <Link
            to="/admissionform"
            className="text-lg font-semibold text-gray-500 hover:text-black"
          >
            Admission
          </Link>

          <Link
            to="/payment"
            className="text-lg font-semibold text-gray-500 hover:text-black"
          >
            Payment
          </Link>

          <Link
            onClick={() => window.print()}
            to="/print cursor-pointer"
            className="text-lg font-semibold text-gray-500 hover:text-black"
          >
            Print
          </Link>
        </div>

        {/* Desktop Right Side */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center border-2 border-black px-2 rounded-md">
            <input
              type="text"
              placeholder="Search..."
              className="outline-none h-8 w-28"
            />
            <IoMdSearch className="text-2xl cursor-pointer" />
          </div>
          {user ? (
            <Link to="/userprofile">
              <img
                src={user.picture}
                alt="profile"
                className="w-10 h-10 rounded-full object-cover cursor-pointer"
              />
            </Link>
          ) : (
            <Link to="/userprofile">
              <CgProfile className="text-4xl cursor-pointer" />
            </Link>
          )}
          <Link to="/login" className="font-bold text-2xl hover:text-blue-500">
            Login
          </Link>
        </div>

        {/* Mobile Menu Icon */}
        <div
          className="md:hidden text-3xl cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <IoMdClose /> : <IoMdMenu />}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col px-6 pb-4 gap-4">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/admissionform">Admission</Link>
          <Link to="/payment">Payment</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/login">Login</Link>

          <div className="flex items-center border-2 border-black px-2 rounded-md">
            <input
              type="text"
              placeholder="Search..."
              className="outline-none h-8 w-full"
            />
            <IoMdSearch className="text-2xl cursor-pointer" />
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
