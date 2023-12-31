import React, { Dispatch, FC, SetStateAction, useEffect } from "react";
import styles from "./Table.module.css";
import type { ColumnsType } from "antd/es/table";
import { Table as AntTable } from "antd";
import useHttpClient from "../../services/HttpClient";
import BlobRecord from "../../models/BlobRecord";
import { getFileTypeIconProps } from "@fluentui/react-file-type-icons";
import { Icon } from "@fluentui/react/lib/Icon";

interface TableProps {
  data: BlobRecord[];
  setSelectedRows: Dispatch<SetStateAction<BlobRecord[]>>;
}

const columns: ColumnsType<BlobRecord> = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Type",
    dataIndex: "type",
  },
  {
    title: "Icon",
    dataIndex: "type",
    render: (type: string) => {
      return (
        <Icon
          {...getFileTypeIconProps({
            extension: type.replace(".", ""),
            size: 48,
          })}
        />
      );
    },
  },
  {
    title: "Uploaded Date and Time",
    dataIndex: "uploadDateTime",
    render: (date: string) => {
      var utc = new Date(date);
      var offset = utc.getTimezoneOffset();
      var local = new Date(utc.getTime() + offset * 60000);
      return (
        <p>
          {local.toLocaleDateString("en-US")}{" "}
          {local.toLocaleTimeString("en-US")}
        </p>
      );
    },
  },
  {
    title: "Number of Downloads",
    dataIndex: "timesDownloaded",
  },
  {
    title: "Resource Uri",
    dataIndex: "uri",
  },
];

const Table: FC<TableProps> = ({ data, setSelectedRows }) => {
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: BlobRecord[]) => {
      setSelectedRows(selectedRows);
    },
    getCheckboxProps: (record: BlobRecord) => ({
      name: record.name,
    }),
  };

  return (
    <div className={styles.Table} data-testid="Table">
      <AntTable
        pagination={{ pageSize: 3 }}
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
        rowKey={"name"}
      />{" "}
    </div>
  );
};

export default Table;
