import React, { useState } from "react";
import search from "../images/search.png";
import SelectSmall from "./SelectSmall";
import CreatePatient from "./CreatePatient";

const Overview = ({ searchQuery, handleSearchInputChange,showModal,setShowModal }) => {

  return (
    <div className=" flex flex-col px-5">
      <h1 className=" Title font-semibold">Patient List</h1>
      <div className=" flex justify-between ">
        <div className="flex flex-col">
          <div className="inputSearch flex py-1">
            <input
              className=" outline-none"
              type="text"
              name=""
              placeholder="Search by Pet Name"
              value={searchQuery}
              onChange={handleSearchInputChange}
              id=""
            />
            <img src={search} className="h-3 w-3 mt-1.5  ms-auto" alt="" />
          </div>
          <div className="flex gap-3 mt-2">
            <SelectSmall
              val={"Status"}
              valueOne={"allergy"}
              valueTwo={"picky-eater"}
            />
            <SelectSmall
              val={"Breed All"}
              valueOne={"Golden Retriever"}
              valueTwo={"Beagle"}
              valueThree={"Spaniel"}
            />
          </div>
        </div>
        <div className="flex flex-col">
          {/*  */}
          <CreatePatient showModal={showModal} setShowModal={setShowModal} />
          <div className="flex mt-2 ">
            <label htmlFor="small" className="block  text-xs font-medium  ">
              Rows per page:
            </label>
            <SelectSmall
              val={"10"}
              valueOne={"1"}
              valueTwo={"2"}
              valueThree={"3"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
