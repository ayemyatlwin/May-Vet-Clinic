import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "petname", headerName: "Pet name", width: 130 },
    { field: "pawrent", headerName: "Pawrent", width: 130 },
    { field: "breed", headerName: "Breed", width: 150 },
    { field: "gender", headerName: "Gender", width: 120 },
    { field: "dateOfBirth", headerName: "Date of Birth", width: 150 },
    { field: "contactNo", headerName: "Contact Phone No:", width: 180 },
    { field: "address", headerName: "Address", width: 340 },
  ];

const DataTable = () => {
  const [rows, setRows] = useState([]); // State to store the fetched data

  useEffect(() => {
    
    axios.get("https://patient-list-w0nz.onrender.com/patients")
      .then((response) => {
        setRows(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []); 

  return (
    <div className=" py-5">
      <div>
        <DataGrid
          rows={rows}
          columns={columns}
          hideFooter={true}
          hideFooterSelectedRowCount={true}
          hideFooterPagination={true}
          scrollbarSize={0}
          checkboxSelection
        />
      </div>
    </div>
  );
};

export default DataTable;



  