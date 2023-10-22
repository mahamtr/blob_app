import React, { Dispatch, FC, SetStateAction } from "react";
import styles from "./Actions.module.css";
import { Button, Select, Space, Typography } from "antd";
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
        <Typography.Text>Expiration Time</Typography.Text>
        <Select
          defaultValue="5"
          style={{ width: 100 }}
          // onChange={handleChange}
          options={[
            {
              label: "Minutes",
              options: [
                { label: "5", value: "5" },
                { label: "10", value: "10" },
                { label: "30", value: "30" },
              ],
            },
            {
              label: "Hours",
              options: [
                { label: "1", value: "1" },
                { label: "3", value: "3" },
                { label: "6", value: "6" },
                { label: "12", value: "12" },
                { label: "24", value: "24" },
              ],
            },
          ]}
        />

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
