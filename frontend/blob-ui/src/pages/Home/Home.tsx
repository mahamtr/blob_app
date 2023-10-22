import React, { FC } from "react";
import styles from "./Home.module.css";
import Actions from "../../components/Actions/Actions";
import Filter from "../../components/Filter/Filter";
import Table from "../../components/Table/Table";
import Upload from "../../components/Upload/Upload";
import Download from "../../components/Download/Download";

interface HomeProps {}

const Home: FC<HomeProps> = () => (
  <div className={styles.Home} data-testid="Home">
    <div className={styles.Row}>
      <Filter />
      <Actions />
    </div>
    <Table />
    <div className={styles.Row}>
      <Upload />
      <Download />
    </div>
  </div>
);

export default Home;
