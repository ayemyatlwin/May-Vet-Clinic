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

  const filteredPets = pets.filter((pet) =>
    pet?.petname.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className="mx-auto">
      <Navbar />
      <Overview searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleSearchInputChange={handleSearchInputChange} />
      <DataTable searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleSearchInputChange={handleSearchInputChange} pets={pets} setPets={setPets} filteredPets={filteredPets} />
    </div>
  );
};

export default Home;
