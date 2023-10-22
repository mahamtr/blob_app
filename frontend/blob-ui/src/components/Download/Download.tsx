import React, { FC } from "react";
import styles from "./Download.module.css";
import { Card, List, Typography } from "antd";

interface DownloadProps {
  sasUris: string[];
}

const Download: FC<DownloadProps> = ({ sasUris }) => {
  console.log(sasUris);

  return (
    <div className={styles.Download} data-testid="Download">
      <List
        header={<div>Click any link to start download</div>}
        dataSource={sasUris}
        renderItem={(item) => (
          <List.Item>
            <Typography.Text mark>
              <a href={item}>{item} </a>
            </Typography.Text>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Download;
