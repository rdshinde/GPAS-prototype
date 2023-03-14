import { render } from "@testing-library/react";
import { AuthHandler } from "../../components";

test("renders AuthHandler component without errors", () => {
  render(<AuthHandler />);
});

test("shows loader when isLoading is true", () => {
  const { getByTestId } = render(<AuthHandler />);
  const loader = getByTestId("loader");
  expect(loader).toBeInTheDocument();
});

test("does not show loader when isLoading is false", () => {
  const { queryByTestId } = render(<AuthHandler />);
  const loader = queryByTestId("loader");
  expect(loader).not.toBeInTheDocument();
});

test("shows stepper chain when chosenRoute is true", () => {
  const { getByTestId } = render(<AuthHandler />);
  const stepper = getByTestId("stepper");
  expect(stepper).toBeInTheDocument();
});

test("does not show stepper chain when chosenRoute is false", () => {
  const { queryByTestId } = render(<AuthHandler />);
  const stepper = queryByTestId("stepper");
  expect(stepper).not.toBeInTheDocument();
});

test("renders footer with correct text", () => {
  const { getByText } = render(<AuthHandler />);
  const footerText = getByText(
    /&copy;2023 VisualDAuth\. All rights reserved\./i
  );
  expect(footerText).toBeInTheDocument();
});
