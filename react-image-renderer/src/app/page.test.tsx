import { render, screen } from "@testing-library/react";
import Home from "./page";

describe("Home", () => {
  it("just one image", () => {
    render(<Home />);
    const image = screen.getByTestId("home-image");
    expect(image).toBeInTheDocument();
  });
});
