import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { UiProvider } from "../../context/ui/UiProvider";
import { AuthButton } from "../../components";
import dotenv from "dotenv";
dotenv.config();
describe("AuthButton", () => {
  it("should render a button with default styles", () => {
    const { getByRole } = render(
      <UiProvider>
        <AuthButton />
      </UiProvider>
    );
    const button = getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("bg-inherit");
    expect(button).toHaveAttribute("title", "Authenticate using VisualDAuth.");
  });

  it("should render children when provided", () => {
    const { getByText } = render(
      <UiProvider>
        <AuthButton>
          <span>Custom Button Text</span>
        </AuthButton>
      </UiProvider>
    );
    const button = getByText("Custom Button Text");
    expect(button).toBeInTheDocument();
  });

  // it("should open the modal when clicked", () => {
  //   const { getByRole, getByText } = render(
  //     <UiProvider>
  //       <AuthButton />
  //     </UiProvider>
  //   );
  //   const button = getByRole("button");
  //   fireEvent.click(button);
  //   const modalTitle = getByText("VisualDAuth");
  //   expect(modalTitle).toBeInTheDocument();
  // });

  //   it("should not render when modal is open", () => {
  //     const { getByRole, queryByRole } = render(
  //       <UiProvider initialState={{ isModalOpen: true }}>
  //         <AuthButton />
  //       </UiProvider>
  //     );
  //     const button = queryByRole("button");
  //     expect(button).toBeNull();
  //   });
});
