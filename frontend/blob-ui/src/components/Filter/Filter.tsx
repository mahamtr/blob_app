import React, { ChangeEventHandler, Dispatch, FC, SetStateAction } from "react";
import styles from "./Filter.module.css";
import Search, { SearchProps } from "antd/es/input/Search";

interface FilterProps {
  setFilterValue: Dispatch<SetStateAction<string>>;
  filterValue: string;
}

const Filter: FC<FilterProps> = ({ filterValue, setFilterValue }) => {
  const onSearch = (e: string) => {
    setFilterValue(e);
  };

  return (
    <div className={styles.Filter} data-testid="Filter">
      <Search
        value={filterValue}
        allowClear
        placeholder="input search text"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          onSearch(event.target.value)
        }
        enterButton
      />
    </div>
  );
};

export default Filter;
