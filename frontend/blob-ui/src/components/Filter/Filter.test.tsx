import React, { useState } from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Filter from "./Filter";

describe("<Filter />", () => {
  test("it should mount", () => {
    const [filterValue, setFilterValue] = useState<string>("");
    render(
      <Filter filterValue={filterValue} setFilterValue={setFilterValue} />
    );

    const filter = screen.getByTestId("Filter");

    expect(filter).toBeInTheDocument();
  });
});
