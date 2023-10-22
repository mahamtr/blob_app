import React, { FC } from "react";
import styles from "./Download.module.css";
import { List, Typography } from "antd";

interface DownloadProps {
  sasUris: string[];
}

const Download: FC<DownloadProps> = ({ sasUris }) => {
  console.log(sasUris);

  return (
    <div className={styles.Download} data-testid="Download">
      <List
        header={<div>Header</div>}
        footer={<div>Footer</div>}
        bordered
        dataSource={sasUris}
        renderItem={(item) => (
          <List.Item>
            <Typography.Text mark>
              {" "}
              <a href={item}>{item} </a>
            </Typography.Text>
          </List.Item>
        )}
      />{" "}
    </div>
  );
};

export default Download;
