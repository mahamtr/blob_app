import React, { FC } from 'react';
import styles from './Download.module.css';

interface DownloadProps {}

const Download: FC<DownloadProps> = () => (
  <div className={styles.Download} data-testid="Download">
    Download Component
  </div>
);

export default Download;
