import React from "react";
import Navber from "../Component/Nabver/Navber";
import { Outlet } from "react-router";
import Footer from "../Component/Footer/Footer";

const MainLayout = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col min-h-screen">
        <Navber></Navber>
        <div className="flex-1">
          <Outlet></Outlet>
        </div>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default MainLayout;
