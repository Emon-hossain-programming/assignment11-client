import React from "react";
import { FaClipboardList, FaUsers, FaUserSlash, FaWallet } from "react-icons/fa";
import { Link, Outlet } from "react-router";
import useAdmin from "../Hooks/useAdmin";
import { MdSettingsSuggest } from "react-icons/md";
import { HiOutlineHome } from "react-icons/hi";
import useAuth from "../Hooks/useAuth";

const DashBoardLayout = () => {
  const { user, loading: authLoading } = useAuth(); 
const [isAdmin, isAdminLoading] = useAdmin();


const isStaff = user?.role === 'staff';


if (isAdminLoading || authLoading) {
    return <span className="loading loading-spinner"></span>;
}

  if (isAdminLoading) return <span className="loading loading-spinner"></span>;
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            {/* Sidebar toggle icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="my-1.5 inline-block size-4"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>
          <div className="px-4">Navbar Title</div>
        </nav>
        <Outlet></Outlet>
        
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}

          <ul>
            <li>
              <Link className="btn btn-primary" to='/'><HiOutlineHome></HiOutlineHome> </Link>
            </li>
          </ul>
          <ul className="menu w-full grow">
            {/* List item */}
            <li>
              <Link
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Dashboard Home"
                to='/dashboard'
              >
                {/* Home icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="my-1.5 inline-block size-4"
                >
                  <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                  <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                </svg>
                <span className="is-drawer-close:hidden">Homepage</span>
              </Link>
            </li>
            {/* my pages */}
            {
              isAdmin &&  <li>
              <Link
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Admin-Home"
                to='/dashboard/adminHome'
              >
               <FaClipboardList></FaClipboardList>
                
                <span className="is-drawer-close:hidden">Admin-Home</span>
              </Link>
            </li>

            }


            {
              isAdmin &&  <li>
              <Link
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="My-Issues"
                to='/dashboard/MyIssues'
              >
               <FaClipboardList></FaClipboardList>
                
                <span className="is-drawer-close:hidden">My-Issues</span>
              </Link>
            </li>

            }
            <li>
              <Link
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Total Revinew"
                to='/dashboard/totalIncome'
              >
               <FaWallet></FaWallet>
                
                <span className="is-drawer-close:hidden">Total Revinew</span>
              </Link>
            </li>


           
            {
              (isAdmin || isStaff) && <li>
              <Link
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Manage-Issues"
                to='/dashboard/ManageIssues'
              >
               <MdSettingsSuggest></MdSettingsSuggest>
                
                <span className="is-drawer-close:hidden">Manage-Issues</span>
              </Link>
            </li>
            }

            {
              isAdmin &&  <li>
              <Link
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="All User"
                to='/dashboard/allUser'
              >
               <FaUsers></FaUsers>
                
                <span className="is-drawer-close:hidden">All User</span>
              </Link>
            </li>
            }

            <li>
              <Link
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Report User"
                to='/dashboard/ReportIssues'
              >
               <FaUserSlash />
                
                <span className="is-drawer-close:hidden">Report User</span>
              </Link>
            </li>
         
            


            {/* List item */}
            <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Settings"
              >
                {/* Settings icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="my-1.5 inline-block size-4"
                >
                  <path d="M20 7h-9"></path>
                  <path d="M14 17H5"></path>
                  <circle cx="17" cy="17" r="3"></circle>
                  <circle cx="7" cy="7" r="3"></circle>
                </svg>
                <span className="is-drawer-close:hidden">Settings</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashBoardLayout;
