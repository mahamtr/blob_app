import React, { Dispatch, FC, SetStateAction } from "react";
import styles from "./Actions.module.css";
import { Button, Space } from "antd";
import { DownloadOutlined, DeleteOutlined } from "@ant-design/icons";
import BlobRecord from "../../models/BlobRecord";
import useHttpClient from "../../services/HttpClient";

interface ActionsProps {
  selectedRows: BlobRecord[];
  setSasUris: Dispatch<SetStateAction<string[]>>;
  fetchData: () => void;
}

const Actions: FC<ActionsProps> = ({ selectedRows, setSasUris, fetchData }) => {
  const { axios: downloadAxios, loading: downloadLoading } = useHttpClient({
    onSuccess: (data) => {
      setSasUris(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const { axios: deleteAxios, loading: deleteLoading } = useHttpClient({
    onSuccess: (data) => {
      fetchData();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onDownloadClick = () => {
    const data = selectedRows.map((a) => a.name);
    downloadAxios({
      url: "/Blob/GenerateSasUris",
      method: "POST",
      body: data,
      headers: null,
    });
  };
  const onDeleteClick = () => {
    const data = [selectedRows.map((a) => a.name)];
    deleteAxios({
      url: "/Blob/BlobRecordDelete",
      method: "DELETE",
      body: data,
      headers: null,
    });
  };
  return (
    <div className={styles.Actions} data-testid="Actions">
      <Space wrap>
        <Button
          type="primary"
          icon={<DownloadOutlined />}
          onClick={onDownloadClick}
          size="large"
        >
          Download Selection
        </Button>

        <Button
          type="primary"
          icon={<DeleteOutlined />}
          onClick={onDeleteClick}
          danger
          size="large"
        >
          Delete Selection
        </Button>
      </Space>
    </div>
  );
};

export default Actions;
