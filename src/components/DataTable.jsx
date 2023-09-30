import React, { useEffect, useState } from "react";
import allergy from "../images/allergy.png";
import picky_eater from "../images/picky_eater.png";
import axios from "axios";

const DataTable = () => {
  const [pets, setPets] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    axios.get("https://patient-list-w0nz.onrender.com/patients")
      .then((response) => {
        setPets(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  console.log(pets);

  const toggleSelectRow = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  return (
    <div className=" data-container p-5">
      <table className="min-w-full">
        <thead>
          <tr className=" border-b border-t border-gray-400">
            <th className="headerText p-2">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-500"
                checked={selectedRows.length === pets.length}
                onChange={() =>
                  selectedRows.length === pets.length
                    ? setSelectedRows([])
                    : setSelectedRows(pets.map((pet) => pet.id))
                }
              />
            </th>
            <th className="headerText p-2">ID</th>
            <th className="headerText p-2">Pet Name</th>
            <th className="headerText p-2">Status</th>
            <th className="headerText p-2">Pawrent Name</th>
            <th className="headerText p-2">Breed</th>
            <th className="headerText p-2">Gender</th>
            <th className="headerText p-2">Date of Birth</th>
            <th className="headerText p-2">Contact No</th>
            <th className="headerText p-2">Address</th>
          </tr>
        </thead>
        <tbody>
          {pets?.map((pet) => (
            <tr className="border-b " key={pet.id}>
              <td className=" p-2">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-blue-500"
                  checked={selectedRows.includes(pet?.id)}
                  onChange={() => toggleSelectRow(pet?.id)}
                />
              </td>
              <td className="bodyText  p-2">{pet?.id}</td>
              <td className="bodyText  p-2">{pet?.petname}</td>
              <td className="bodyText  p-2">
                {pet?.status === "allergy" ? (
                  <img
                    src={allergy}
                    alt={pet?.status}
                    className="h-4 w-4 mx-auto"
                  />
                ) : (
                  <img
                    src={picky_eater}
                    alt={pet?.status}
                    className="h-4 w-4 mx-auto"
                  />
                )}
              </td>
              <td className="bodyText  p-2">{pet?.pawrent}</td>
              <td className="bodyText  p-2">{pet?.breed}</td>
              <td className="bodyText  p-2">{pet?.gender}</td>
              <td className="bodyText  p-2">
                {pet?.dateOfBirth}
              </td>
              <td className="bodyText  p-2">{pet?.contactNo}</td>
              <td className="bodyText  p-2">{pet?.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
