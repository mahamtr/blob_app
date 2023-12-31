import React, {
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import styles from "./Actions.module.css";
import { Button, Select, Space, Typography } from "antd";
import { DownloadOutlined, DeleteOutlined } from "@ant-design/icons";
import BlobRecord from "../../models/BlobRecord";
import useHttpClient from "../../services/HttpClient";
import { LoadContext } from "../../LoadContext";

interface ActionsProps {
  selectedRows: BlobRecord[];
  setSasUris: Dispatch<SetStateAction<string[]>>;
  fetchData: () => void;
}

const Actions: FC<ActionsProps> = ({ selectedRows, setSasUris, fetchData }) => {
  const { isLoading, setIsLoading } = useContext(LoadContext);

  const [selectedTimeToExpire, setSelectedTimeToExpire] = useState("5");
  const { axios: downloadAxios, loading: downloadLoading } = useHttpClient({
    onSuccess: (data) => {
      setSasUris(data);
      fetchData();
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
      url: "/Blob/GenerateSasUris/" + selectedTimeToExpire,
      method: "POST",
      body: data,
      headers: null,
    });
  };
  const onDeleteClick = () => {
    const data = selectedRows.map((a) => a.name);
    deleteAxios({
      url: "/Blob/BlobRecordDelete",
      method: "DELETE",
      body: data,
      headers: null,
    });
  };

  useEffect(() => {
    if (deleteLoading || downloadLoading) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [deleteLoading, downloadLoading]);

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
          onChange={setSelectedTimeToExpire}
          value={selectedTimeToExpire}
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
                { label: "1", value: "60" },
                { label: "3", value: "180" },
                { label: "6", value: "360" },
                { label: "12", value: "720" },
                { label: "24", value: "1440" },
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
