import React, { useState } from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Actions from "./Actions";
import BlobRecord from "../../models/BlobRecord";

describe("<Actions />", () => {
  test("it should mount", () => {
    const [selectedRows, setSelectedRows] = useState<BlobRecord[]>([]);
    const [sasUris, setSasUris] = useState<string[]>([]);

    const fetchData = () => {};
    render(
      <Actions
        selectedRows={selectedRows}
        setSasUris={setSasUris}
        fetchData={fetchData}
      />
    );

    const actions = screen.getByTestId("Actions");

    expect(actions).toBeInTheDocument();
  });
});
