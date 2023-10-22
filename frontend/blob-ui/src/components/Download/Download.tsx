import React, { Dispatch, FC, SetStateAction } from "react";
import styles from "./Download.module.css";
import { Button, Card, List, Typography } from "antd";

interface DownloadProps {
  sasUris: string[];
  setSasUris: Dispatch<SetStateAction<string[]>>;
}

const Download: FC<DownloadProps> = ({ sasUris, setSasUris }) => {
  return (
    <div className={styles.Download} data-testid="Download">
      <List
        header={
          <div>
            Click any link to start download{" "}
            <Button type="primary" onClick={() => setSasUris([])}>
              Clear
            </Button>
          </div>
        }
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
