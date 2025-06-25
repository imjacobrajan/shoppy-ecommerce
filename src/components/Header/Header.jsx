import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import Logo from "../../assets/logo.png";

function Header() {
  const { totalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-200/50 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center group">
            <div className="relative">
              <img
                src={Logo}
                alt="Logo"
                className="h-10 w-auto transition-transform duration-200 group-hover:scale-105"
              />
            </div>
            <span className="ml-3 text-2xl font-bold text-slate-900 tracking-tight">
              Shoppy
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="relative text-slate-700 hover:text-indigo-600 transition-colors duration-200 font-medium py-2 px-1 group"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-200 group-hover:w-full"></span>
            </Link>
            <Link
              to="/cart"
              className="relative flex items-center text-slate-700 hover:text-indigo-600 transition-all duration-200 font-medium py-2 px-3 rounded-xl hover:bg-slate-50 group"
            >
              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 transition-transform duration-200 group-hover:scale-110"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1 shadow-lg shadow-indigo-600/25">
                    {totalItems}
                  </span>
                )}
              </div>
              <span className="ml-2 hidden lg:block">Cart</span>
            </Link>
          </nav>

          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-600 hover:text-indigo-600 focus:outline-none p-2 rounded-xl hover:bg-slate-100 transition-all duration-200"
            >
              <div className="relative w-6 h-6">
                <span
                  className={`absolute left-0 top-1 w-6 h-0.5 bg-current transition-all duration-300 ${
                    isMenuOpen ? "rotate-45 translate-y-2" : ""
                  }`}
                ></span>
                <span
                  className={`absolute left-0 top-2.5 w-6 h-0.5 bg-current transition-opacity duration-300 ${
                    isMenuOpen ? "opacity-0" : ""
                  }`}
                ></span>
                <span
                  className={`absolute left-0 top-4 w-6 h-0.5 bg-current transition-all duration-300 ${
                    isMenuOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                ></span>
              </div>
            </button>
          </div>
        </div>

        <div
          className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            isMenuOpen ? "max-h-40 opacity-100 mt-6" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="space-y-1 pb-4">
            <Link
              to="/"
              className="block py-3 px-4 text-slate-700 hover:text-indigo-600 hover:bg-slate-50 rounded-xl transition-all duration-200 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/cart"
              className="flex items-center justify-between py-3 px-4 text-slate-700 hover:text-indigo-600 hover:bg-slate-50 rounded-xl transition-all duration-200 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              <span>Cart</span>
              {totalItems > 0 && (
                <span className="bg-indigo-600 text-white text-xs font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1 shadow-lg shadow-indigo-600/25">
                  {totalItems}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
