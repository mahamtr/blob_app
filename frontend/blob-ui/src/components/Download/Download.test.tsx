import React, { useState } from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Download from "./Download";

describe("<Download />", () => {
  test("it should mount", () => {
    const [sasUris, setSasUris] = useState<string[]>([]);

    render(<Download sasUris={sasUris} setSasUris={setSasUris} />);

    const download = screen.getByTestId("Download");

    expect(download).toBeInTheDocument();
  });
});
