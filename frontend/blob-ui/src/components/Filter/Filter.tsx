import React, { FC } from "react";
import styles from "./Filter.module.css";
import Search, { SearchProps } from "antd/es/input/Search";

interface FilterProps {}

const Filter: FC<FilterProps> = () => {
  const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
    console.log(info?.source, value);

  return (
    <div className={styles.Filter} data-testid="Filter">
      <Search
        placeholder="input search text"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={onSearch}
      />
    </div>
  );
};

export default Filter;
