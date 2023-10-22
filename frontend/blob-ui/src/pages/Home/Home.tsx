import React, { FC, useEffect, useState } from "react";
import styles from "./Home.module.css";
import Actions from "../../components/Actions/Actions";
import Filter from "../../components/Filter/Filter";
import Table from "../../components/Table/Table";
import Upload from "../../components/Upload/Upload";
import Download from "../../components/Download/Download";
import useHttpClient from "../../services/HttpClient";
import BlobRecord from "../../models/BlobRecord";

interface HomeProps {}

const Home: FC<HomeProps> = () => {
  const [tableData, setTableData] = useState<BlobRecord[]>([]);
  const [filteredTableData, setFilteredTableData] = useState<BlobRecord[]>([]);
  const [selectedRows, setSelectedRows] = useState<BlobRecord[]>([]);
  const [filterValue, setFilterValue] = useState<string>("");
  const [sasUris, setSasUris] = useState<string[]>([]);
  const { axios, data, error, loading, status } = useHttpClient({
    onSuccess: (data) => {
      setTableData(data);
    },
    onError: (error) => {
      setTableData([]);
      console.log(error);
    },
  });

  const fetchData = () => {
    axios({
      url: "/Blob/GetAllBlobRecords",
      method: "GET",
      body: null,
      headers: null,
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setFilteredTableData(tableData);
    setSelectedRows([]);
    setFilterValue("");
  }, [tableData]);

  useEffect(() => {
    setFilteredTableData(
      tableData.filter((br) =>
        br.name.toUpperCase().includes(filterValue.toUpperCase())
      )
    );
  }, [filterValue]);

  return (
    <div className={styles.Home} data-testid="Home">
      <div className={styles.Row}>
        <Filter filterValue={filterValue} setFilterValue={setFilterValue} />
        <Actions
          selectedRows={selectedRows}
          setSasUris={setSasUris}
          fetchData={fetchData}
        />
      </div>
      <Table data={filteredTableData} setSelectedRows={setSelectedRows} />
      <div className={styles.Row}>
        <Upload fetchData={fetchData} />
        <Download sasUris={sasUris} setSasUris={setSasUris} />
      </div>
    </div>
  );
};

export default Home;
