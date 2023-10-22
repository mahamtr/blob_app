import React, { FC } from "react";
import styles from "./Upload.module.css";
import Dragger from "antd/es/upload/Dragger";
import { InboxOutlined } from "@ant-design/icons";

interface UploadProps {
  fetchData: () => void;
}

const Upload: FC<UploadProps> = ({ fetchData }) => {
  const props = {
    name: "file",
    multiple: true,
    action: process.env.REACT_APP_BACKEND_URL + "/Blob/UploadBlobRecords",
    onChange(info: any) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        console.log(`${info.file.name} file uploaded successfully.`);
        fetchData();
      } else if (status === "error") {
        console.log(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e: any) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  return (
    <div className={styles.Upload} data-testid="Upload">
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibited from
          uploading company data or other banned files.
        </p>
      </Dragger>
    </div>
  );
};

export default Upload;
