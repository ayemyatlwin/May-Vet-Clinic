import React, { useEffect, useState } from "react";
import allergy from "../images/allergy.png";
import picky_eater from "../images/picky_eater.png";
import pencil from "../images/edit.png";
import more from "../images/more.png";
import bin from "../images/delete.png";
import Swal from "sweetalert2";
import axios from "axios";
import EditPatient from "./EditPatient";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CircularProgress } from "@mui/material";

const DataTable = ({
  searchQuery,
  filteredPets,
  editModal,
  setEditModal,
  pets,
  setPets,
}) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [dropDownOpen, setDropDownOpen] = useState(null);
  const showDropDown = (id) => {
    if (id === dropDownOpen) {
      setDropDownOpen(null);
    } else {
      setDropDownOpen(id);
    }
  };

  const fetchData = async () => {
    const { data } = await axios.get(
      "https://patient-list-w0nz.onrender.com/patients"
    );
    setPets(data);
  };
  // console.log(pets);

  useEffect(() => {
    fetchData();
  }, [pets]);

  const formatDate = (dateString) => {
    if (!dateString) return ""; // Return an empty string if the date is not set
    const date = new Date(dateString); // Parse the dateString into a Date object
    const day = date.getDate();
    const month = date.getMonth() + 1; // Month is zero-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const toggleSelectRow = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const deleteProduct = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#CD211D",
      cancelButtonColor: "#444444",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `https://patient-list-w0nz.onrender.com/patients/${id}`
          );
          Swal.fire("Deleted!", "The item has been deleted.", "success");
          toast.error("delected successfully!", {
            position: "bottom-left",
            autoClose: 2000,
            theme: "light",
          });
        } catch (error) {
          Swal.fire(
            "Error",
            "An error occurred while deleting the item.",
            "error"
          );
        }
      }
    });
  };

  return (
    <div className=" data-container p-4">
      {pets?.length === 0 ? (
        <CircularProgress sx={{ color: "#54bab9" }} />
      ) : (
        <table className="min-w-full">
          <thead>
            <tr className=" border-b border-t border-gray-300">
              <th className="headerText p-2">
                <input
                  type="checkbox"
                  className="form-checkbox "
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
              <th className="headerText p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {searchQuery == ""
              ? pets?.map((pet, i) => (
                  <tr className="" key={pet.id}>
                    <td className="bodyText p-2 border-b">
                      <input
                        type="checkbox"
                        className="form-checkbox  text-gray-500"
                        checked={selectedRows.includes(pet?.id)}
                        onChange={() => toggleSelectRow(pet?.id)}
                      />
                    </td>
                    <td className="bodyText border-b p-2">
                      {pet?.breed
                        ? pet.breed.slice(0, 1) + " - 0" + (i + 1)
                        : "N/A"}
                    </td>
                    <td className="bodyText p-2 border-b">{pet?.petname}</td>
                    <td className="bodyText p-2 border-b">
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
                    <td className="bodyText p-2 border-b">{pet?.pawrent}</td>
                    <td className="bodyText p-2 border-b">{pet?.breed}</td>
                    <td className="bodyText p-2 border-b">{pet?.gender}</td>
                    <td className="bodyText p-2 border-b">
                      {formatDate(pet?.dateOfBirth)}
                    </td>
                    <td className="bodyText p-2 border-b">{pet?.contactNo}</td>
                    <td className="bodyText p-2 border-b">
                      {pet?.address + ", " + pet?.township + ", " + pet?.city}
                    </td>
                    <td
                      onClick={() => showDropDown(pet?.id)}
                      className="bodyText p-2 border-b relative "
                    >
                      <img src={more} className="h-4 w-3" alt="" />
                      {dropDownOpen === pet?.id && (
                        <div className="popup">
                          {/* Dropdown content for the open actions */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditModal(true);
                              // console.log(
                              //   "Edit button clicked for ID:",
                              //   pet?.id,
                              //   editModal
                              // );
                            }}
                            className=" flex gap-3 border-b w-full"
                          >
                            <img className="h-3 w-3 mt-1" src={pencil} alt="" />
                            Edit
                          </button>
                          {editModal == true ? (
                            <EditPatient
                              setEditModal={setEditModal}
                              pet={pet}
                            />
                          ) : null}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteProduct(pet?.id);
                            }}
                            className=" flex gap-3 w-full"
                          >
                            <img className="h-3 w-3 mt-1" src={bin} alt="" />
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              : filteredPets?.map((filpet, i) => {
                  return (
                    <tr className="" key={filpet.id}>
                      <td className="bodyText p-2 border-b">
                        <input
                          type="checkbox"
                          className="form-checkbox  text-gray-500"
                          checked={selectedRows.includes(filpet?.id)}
                          onChange={() => toggleSelectRow(filpet?.id)}
                        />
                      </td>
                      <td className="bodyText border-b p-2">
                        {filpet?.breed
                          ? filpet.breed.slice(0, 1) + " - 0" + (i + 1)
                          : "N/A"}
                      </td>
                      <td className="bodyText p-2 border-b">
                        {filpet?.petname}
                      </td>
                      <td className="bodyText p-2 border-b">
                        {filpet?.status === "allergy" ? (
                          <img
                            src={allergy}
                            alt={filpet?.status}
                            className="h-4 w-4 mx-auto"
                          />
                        ) : (
                          <img
                            src={picky_eater}
                            alt={filpet?.status}
                            className="h-4 w-4 mx-auto"
                          />
                        )}
                      </td>
                      <td className="bodyText p-2 border-b">
                        {filpet?.pawrent}
                      </td>
                      <td className="bodyText p-2 border-b">{filpet?.breed}</td>
                      <td className="bodyText p-2 border-b">
                        {filpet?.gender}
                      </td>
                      <td className="bodyText p-2 border-b">
                        {formatDate(filpet?.dateOfBirth)}
                      </td>
                      <td className="bodyText p-2 border-b">
                        {filpet?.contactNo}
                      </td>
                      <td className="bodyText p-2 border-b">
                        {filpet?.address +
                          ", " +
                          filpet?.township +
                          ", " +
                          filpet?.city}
                      </td>
                      <td
                        onClick={() => showDropDown(filpet?.id)}
                        className="bodyText p-2 border-b relative "
                      >
                        <img src={more} className="h-4 w-3" alt="" />
                        {dropDownOpen === filpet?.id && (
                          <div className="popup">
                            {/* Dropdown content for the open actions */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditModal(true);
                                console.log(
                                  "Edit button clicked for ID:",
                                  filpet?.id,
                                  editModal
                                );
                                // Add your edit logic here
                              }}
                              className=" flex gap-3 border-b w-full"
                            >
                              <img
                                className="h-3 w-3 mt-1"
                                src={pencil}
                                alt=""
                              />
                              Edit
                            </button>
                            {editModal == true ? (
                              <EditPatient
                                setEditModal={setEditModal}
                                pet={filpet}
                              />
                            ) : null}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteProduct(filpet?.id);
                              }}
                              className=" flex gap-3 w-full"
                            >
                              <img className="h-3 w-3 mt-1" src={bin} alt="" />
                              Delete
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DataTable;
