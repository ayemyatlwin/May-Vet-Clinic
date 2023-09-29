import React from "react";
import Navbar from "../components/Navbar";
import DataTable from "../components/DataTable";
import Overview from "../components/Overview";

const Home = () => {
  return (
    <div className="mx-auto">
      <Navbar />
      <Overview />
      <DataTable />
    </div>
  );
};

export default Home;
