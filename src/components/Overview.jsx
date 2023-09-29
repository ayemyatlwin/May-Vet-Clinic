import React from 'react'

const Overview = () => {
  return (
    <div className=' flex flex-col '>
    <h1>Patient List</h1>
    <div className=' flex justify-between '>
        <div className="flex flex-col">
            <h1>Search</h1>
            <div className="flex gap-3">
                <h1> Status All</h1>
                <h1> Breed All</h1>

           </div>
        </div>
        <div className="flex flex-col">
            <h1>Add new patienr</h1>
            <h1>Rows per page</h1>
        </div>
      
    </div>
    </div>
  )
}

export default Overview
