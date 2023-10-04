import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { toast } from "react-toastify";

const EditPatient = ({  setEditModal,pet }) => {
//  console.log(pet);
 const date=new Date(pet?.dateOfBirth);
//  console.log(date,"hhhh");
  const [selectedDate, setSelectedDate] = useState(date);

//   console.log(selectedDate);
  const [patientData, setPatientData] = useState({
    petname: pet?.petname,
    pawrent: pet?.pawrent,
    gender: pet?.gender,
    contactNo: pet?.contactNo,
    city: pet?.city,
    status: pet?.status,
    breed: pet?.breed,
    dateOfBirth: selectedDate,
    address: pet?.address,
    township: pet?.township,
  });

  const updateData = async (patientData) => {
    try {
      const { data } = await axios.patch(
        `https://patient-list-w0nz.onrender.com/patients/${pet?.id}`,
        patientData
      );
    //   console.log(data);
    } catch (error) {
    //   console.error("Error updating data:", error);
    }
  };
  const handleSave = async (e) => {
    if (e) {
        e.stopPropagation();
        e.preventDefault(); // Check if e is defined and has preventDefault method
      }
      setPatientData({
        ...patientData,
        dateOfBirth: selectedDate,
      });
    await updateData(patientData);
    // console.log(patientData);
    setEditModal(false)
    toast.success('Edited Successfully', {
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        })
  };
  useEffect(() => {
    setPatientData({
      ...patientData,
      dateOfBirth: selectedDate, // Update dateOfBirth with selectedDate
    });
  }, [selectedDate]);
  

  return (
    <>
       <>
          <div  className="flex justify-center items-center overflow-x-hidden shadow-2xl overflow-y-auto fixed inset-0 z-50  ">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none ">
                <div className="flex justify-end p-3  rounded-t ">
                  <button
                    className="bg-transparent border-0 text-black float-right"
                    onClick={(e) => {
                       e.stopPropagation();
                        setEditModal(false)
                    }}
                  >
                    <span className="text-black opacity-7 h-6 w-6 text-x  block py-0 rounded-full">
                      x
                    </span>
                  </button>
                </div>
                <h3 className="mx-auto font-semibold  Title ">Update Patient</h3>
                <h3 className="mx-auto text-[14px]  ">
                  Enter Updated Patient Information Below
                </h3>

                <div className="relative px-7 pt-5 pb-12 flex flex-row gap-12">
                  <div className="w-[50%]">
                    <form onClick={(e)=>e.stopPropagation()} className="  px-8 pt-6 pb-4 w-full">
                      <label className="block text-black text-sm  mb-1 ">
                        Pet Name
                      </label>
                      <input
                        value={patientData?.petname}
                        onChange={(e) =>{
                           e.stopPropagation();
                            setPatientData({
                                ...patientData,
                                petname: e.target.value,
                              })
                        }
                          
                        }
                        className="shadow appearance-none border inputBorder inputBorder rounded w-full py-2  text-black"
                      />
                      <label className="block text-black text-sm  mb-1 mt-1">
                        Pawrent
                      </label>
                      <input
                        value={patientData?.pawrent}
                        onChange={(e) =>{
                           e.stopPropagation();
                            setPatientData({
                                ...patientData,
                                pawrent: e.target.value,
                              })
                        }
                          
                        }
                        className="shadow appearance-none border inputBorder rounded w-full py-2  text-black"
                      />
                      <label className="block text-black text-sm  mt-1 mb-1">
                        Gender
                      </label>
                      <div className="flex mb-3">
                        <div className="flex gap-3 ">
                          <label
                            htmlFor="inline-radio"
                            className=" text-sm font-medium text-gray-900"
                          >
                            Male
                          </label>
                          <input
                            id="inline-radio"
                            value={"Male"}
                            onChange={(e) =>{
                               e.stopPropagation();
                                setPatientData({ ...patientData, gender: "Male" })
                            }
                              
                            }
                            type="radio"
                            name="inline-radio-group"
                            className="w-4 h-4 text-blue-600 bg-gray-100 inputBorder "
                          />
                        </div>
                        <div className="flex gap-3 items-center mr-4">
                          <label
                            htmlFor="inline-2-radio"
                            className="ml-2 text-sm font-medium text-gray-900"
                          >
                            Female
                          </label>
                          <input
                            value={"Female"}
                            onChange={(e) =>{
                               e.stopPropagation();
                                setPatientData({
                                    ...patientData,
                                    gender: "Female",
                                  })
                            }
                              
                            }
                            id="inline-2-radio"
                            type="radio"
                            name="inline-radio-group"
                            className="w-4 h-4 text-blue-600 bg-gray-100 inputBorder "
                          />
                        </div>
                      </div>

                      <label className="block text-black text-sm  mb-1 mt-1">
                        Contact No.
                      </label>
                      <input
                        value={patientData.contactNo}
                        onChange={(e) =>{
                           e.stopPropagation();
                            setPatientData({
                                ...patientData,
                                contactNo: e.target.value,
                              })
                        }
                          
                        }
                        className="shadow appearance-none border inputBorder rounded w-full py-2 px-1 text-black"
                      />
                      <label className="block text-black text-sm  mb-1 mt-1">
                        City
                      </label>
                      <input
                        value={patientData.city}
                        onChange={(e) =>{
                           e.stopPropagation();
                            setPatientData({
                                ...patientData,
                                city: e.target.value,
                              })
                        }
                          
                        }
                        className="shadow appearance-none border inputBorder rounded w-full py-2 px-1 text-black"
                      />
                    </form>
                  </div>
                  <div className="w-[50%]">
                    <form onClick={(e)=>e.stopPropagation()} className="  px-8 pt-6 pb-4 w-full">
                      <label className="block text-black text-sm  mb-1 mt-1">
                        Status
                      </label>
                      <select
                        id="small"
                        value={patientData.status} // Set the value to the state variable
                        onChange={(e) =>{
                           e.stopPropagation();
                            setPatientData({
                                ...patientData,
                                status: e.target.value,
                              })
                        }
                         
                        }
                        className="block w-full p-2 mb-3 text-sm text-gray-900 border inputBorder rounded-lg bg-inherit "
                      >
                        <option value="" selected disabled>
                          Select a status
                        </option>
                        <option value="picky_eat">picky_eater</option>
                        <option value="allergy">allergy</option>
                      </select>
                      <label className="block text-black text-sm  mb-1 mt-1">
                        Breed
                      </label>
                      <select
                        id="small"
                        value={patientData.breed} // Set the value to the state variable
                        onChange={(e) =>{
                           e.stopPropagation();
                            setPatientData({
                                ...patientData,
                                breed: e.target.value,
                              })
                        }
                         
                        }
                        className="block w-full p-2 mb-3 text-sm text-gray-900 border inputBorder rounded-lg bg-inherit "
                      >
                        <option value="" selected disabled>
                          Choose Breed
                        </option>
                        <option value="Golden Retriever">
                          Golden Retriever
                        </option>
                        <option value="Beagle">Beagle</option>
                        <option value="Spaniel">Spaniel</option>
                      </select>
                      <label className="block text-black text-xs mt-1 mb-1  ">
                        Date of birth
                      </label>
                      <DatePicker
                        selected={patientData.dateOfBirth}
                        onChange={(date) => setSelectedDate(date)} // Set the selected date in state
                        dateFormat="dd/MM/yyyy" // Use "dd" for day, "MM" for month, and "yyyy" for year
                        className="shadow appearance-none border inputBorder rounded w-full py-2 mb-1  px-1 text-black"
                        placeholderText="Select Date"
                      />
                      <label className="block text-black text-sm  mb-1 mt-1">
                        Address
                      </label>
                      <textarea
                        value={patientData?.address}
                        onChange={(e) =>{
                           e.stopPropagation();
                            setPatientData({
                                ...patientData,
                                address: e.target.value,
                              })
                        }
                          
                        }
                        className="shadow appearance-none border inputBorder rounded w-full py-2 px-1 text-black"
                      />
                      <label className="block text-black text-sm  mb-1 mt-1">
                        Township
                      </label>
                      <input
                        value={patientData.township}
                        onChange={(e) =>{
                           e.stopPropagation();
                            setPatientData({
                                ...patientData,
                                township: e.target.value,
                              })
                        }
                         
                        }
                        className="shadow appearance-none border inputBorder rounded w-full py-2 px-1 text-black"
                      />
                    </form>
                  </div>
                </div>
                <div className=" flex justify-center  pb-3 gap-5">
                  <button
                     onClick={(e)=>{
                      e.stopPropagation();
                      e.preventDefault();
                       handleSave(e,pet?.id);
                     }}
                    className=" w-20 update-btn rounded-md text-center"
                  >
                    Update{" "}
                  </button>
                  <button onClick={(e) => {
                       e.stopPropagation();
                        setEditModal(false)
                    }} className=" w-20 bg-inherit cancel-btn  rounded-md text-center">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
    </>
  );
};

export default EditPatient;
