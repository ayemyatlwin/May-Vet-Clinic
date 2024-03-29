import React, { useState } from "react";
import Navbar from "../components/Navbar";
import DataTable from "../components/DataTable";
import Overview from "../components/Overview";

const Home = () => {
  const [pets, setPets] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Add a state variable for search
  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const [showModal, setShowModal] = useState(false);
  const [editModal, setEditModal] = useState(false);



  const filteredPets = pets?.filter((pet) => {
    if (pet && pet.petname) {
      return pet.petname.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return false; // Handle the case where pet or pet.petname is undefined
  });
  return (
    <div className="mx-auto">
      <Navbar />
      <Overview
        searchQuery={searchQuery}
        handleSearchInputChange={handleSearchInputChange}
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <DataTable
        searchQuery={searchQuery}
        editModal={editModal}
        setEditModal={setEditModal}
        pets={pets}
        setPets={setPets}
        filteredPets={filteredPets}
      />
    </div>
  );
};

export default Home;
