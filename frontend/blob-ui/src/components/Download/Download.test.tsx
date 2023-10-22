import React, { useState } from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Download from "./Download";

describe("<Download />", () => {
  test("it should mount", () => {
    render(<Download sasUris={[]} />);

    const download = screen.getByTestId("Download");

    expect(download).toBeInTheDocument();
  });
});
