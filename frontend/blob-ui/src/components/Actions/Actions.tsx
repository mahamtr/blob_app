import React, { FC } from "react";
import styles from "./Actions.module.css";
import { Button, Space } from "antd";
import { DownloadOutlined, DeleteOutlined } from "@ant-design/icons";

interface ActionsProps {}

const Actions: FC<ActionsProps> = () => (
  <div className={styles.Actions} data-testid="Actions">
    <Space wrap>
      <Button type="primary" icon={<DownloadOutlined />} size="large">
        Download Selection
      </Button>

      <Button type="primary" icon={<DeleteOutlined />} danger size="large">
        Delete Selection
      </Button>
    </Space>
  </div>
);

export default Actions;
