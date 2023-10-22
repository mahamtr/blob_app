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
  const [selectedRows, setSelectedRows] = useState<BlobRecord[]>([]);
  const [sasUris, setSasUris] = useState<string[]>([
    "https://maai1blob.blob.core.windows.net/root/security-key.txtb7ac8475-b20b-469e-9b19-946578b18199?sv=2023-08-03&se=2023-10-22T14%3A10%3A22Z&sr=b&sp=r&sig=cTlhto7T%2B%2BFQALpXBuR5xwjl28MvBYVbSp3SwU6WmCA%3D",
  ]);
  const { axios, data, error, loading, status } = useHttpClient({
    onSuccess: (data) => {
      setTableData(data);
      setSelectedRows([]);
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

  //todo remove this
  useEffect(() => {
    console.log(selectedRows);
  }, [selectedRows]);

  return (
    <div className={styles.Home} data-testid="Home">
      <div className={styles.Row}>
        <Filter />
        <Actions
          selectedRows={selectedRows}
          setSasUris={setSasUris}
          fetchData={fetchData}
        />
      </div>
      <Table data={tableData} setSelectedRows={setSelectedRows} />
      <div className={styles.Row}>
        <Upload />
        <Download sasUris={sasUris} />
      </div>
    </div>
  );
};

export default Home;
