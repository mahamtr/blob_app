import React, { useState } from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Table from "./Table";
import BlobRecord from "../../models/BlobRecord";

describe("<Table />", () => {
  test("it should mount", () => {
    const [selectedRows, setSelectedRows] = useState<BlobRecord[]>([]);
    render(<Table data={[]} setSelectedRows={setSelectedRows} />);

    const table = screen.getByTestId("Table");

    expect(table).toBeInTheDocument();
  });
});
