import React, { Dispatch, FC, SetStateAction, useEffect } from "react";
import styles from "./Table.module.css";
import type { ColumnsType } from "antd/es/table";
import { Table as AntTable } from "antd";
import useHttpClient from "../../services/HttpClient";
import BlobRecord from "../../models/BlobRecord";

interface TableProps {
  data: BlobRecord[];
  setSelectedRows: Dispatch<SetStateAction<BlobRecord[]>>;
}

const columns: ColumnsType<BlobRecord> = [
  {
    title: "Name",
    dataIndex: "name",
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: "Type",
    dataIndex: "type",
  },
  {
    title: "Uploaded Date and Time",
    dataIndex: "uploadDateTime",
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
        pagination={{ pageSize: 10 }}
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
      />{" "}
    </div>
  );
};

export default Table;
