import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import App from "./App";

afterEach(() => {
  cleanup();
});

describe("App", () => {
  it("shows corrected initial summary totals", () => {
    render(<App />);

    expect(screen.getByText("$5,800.00")).toBeInTheDocument();
    expect(screen.getByText("$1,570.00")).toBeInTheDocument();
    expect(screen.getByText("$4,230.00")).toBeInTheDocument();
  });

  it("does not add transactions with zero amount", () => {
    render(<App />);

    fireEvent.change(screen.getByLabelText("Description"), {
      target: { value: "Test invalid" },
    });
    fireEvent.change(screen.getByLabelText("Amount"), {
      target: { value: "0" },
    });
    const formHeading = screen.getByRole("heading", {
      name: "Add Transaction",
    });
    const form = formHeading.parentElement.querySelector("form");
    fireEvent.submit(form);

    expect(screen.queryByText("Test invalid")).not.toBeInTheDocument();
  });
});
