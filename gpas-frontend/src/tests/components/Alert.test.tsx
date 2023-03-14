import React from "react";
import { render } from "@testing-library/react";
import { Toaster } from "react-hot-toast";
import { Alert } from "../../components";
import dotenv from "dotenv";
dotenv.config();

describe("Alert", () => {
  it("should render a toast container", () => {
    const { getByRole } = render(<Alert />);
    const container = getByRole("alert");
    expect(container).toBeInTheDocument();
  });
  it("should set the position prop correctly", () => {
    const { getByRole } = render(<Alert />);
    const container = getByRole("alert");
    expect(container).toHaveAttribute("data-position", "top-center");
  });
  it("should set the reverseOrder prop correctly", () => {
    const { getByRole } = render(<Alert />);
    const container = getByRole("alert");
    expect(container).toHaveAttribute("data-reverse-order", "false");
  });
  it("should set the gutter prop correctly", () => {
    const { getByRole } = render(<Alert />);
    const container = getByRole("alert");
    expect(container).toHaveAttribute("data-gutter", "8");
  });
  it("should set the containerClassName prop correctly", () => {
    const { getByRole } = render(<Alert />);
    const container = getByRole("alert");
    expect(container).toHaveClass("");
  });
  it("should set the containerStyle prop correctly", () => {
    const { getByRole } = render(<Alert />);
    const container = getByRole("alert");
    expect(container).toHaveStyle({});
  });
  it("should set the toast options correctly", () => {
    const { getByRole } = render(<Alert />);
    const container = getByRole("alert");
    expect(container).toHaveAttribute(
      "data-toast-options",
      JSON.stringify({
        className: "",
        duration: 3000,
        style: {
          background: "#363636",
          color: "#fff",
        },
        success: {
          duration: 4000,
        },
      })
    );
  });
});
