import React from "react";
import { Link, NavLink, useNavigate } from "react-router";
import iconImg from "../../assets/Public Infrastructure Issue Reporting System icon.jpg";
import useAuth from "../../Hooks/useAuth";

const Navber = () => {
  const { logOut, user } = useAuth();
  const navigate = useNavigate();
  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/allIssues">All Issues</NavLink>
      </li>
       <li>
        <NavLink to="/about">About Us</NavLink>
      </li>
       <li>
        <NavLink to="/contact">Contact</NavLink>
      </li>
       <li>
        <NavLink to="/addIssue">Add Issue</NavLink>
      </li>
    </>
  );
  const handleLogout = () => {
    logOut()
      .then((res) => {
        console.log(res.user);
        navigate("/register");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <NavLink to="/">
          <div className="flex gap-2">
            <div className="flex items-center">
              <img className="w-12 h-14 rounded-2xl" src={iconImg} alt="" />
            </div>
            <div>
              <h2 className="font-bold text-blue-700">Public Report</h2>
              <h2 className="text-gray-500">Report .Track .Resolve</h2>
            </div>
          </div>
        </NavLink>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">

        <div className="flex-none gap-2">
          {user ? (
            <div className="dropdown dropdown-end">
              
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full border-2 border-primary">
                  <img
                    alt="User Profile"
                    src={user?.photoURL || "https://ibb.co.com/bjHth1Ys"}
                  />
                </div>
              </div>

              {/* dropdown menu*/}
              <ul
                tabIdex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li className="p-2 font-bold text-center border-b mb-2">
                  {user?.displayName || "Anonymous User"}
                </li>
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="text-red-500">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/register" className="btn btn-primary">
              Register
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navber;
