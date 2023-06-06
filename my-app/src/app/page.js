'use client'

import React, { useState } from 'react';
import SearchBar from "./SearchBar";
import DataTable from "./DataTable";
import './style.css'

export default function Home() {
  const [dataArray, setDataArray] = useState([]);

  const updateDataArray = (data) => {
    setDataArray(data);
  };

  return (
    <>
      <SearchBar updateDataArray={updateDataArray}/>   
      <DataTable dataArray={dataArray} />
    </>
  );
}