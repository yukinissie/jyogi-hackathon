import { render, screen } from "@testing-library/react";
import Home from "./page";

describe("Home", () => {
  it("renders Next.js logo", () => {
    render(<Home />);
    const logo = screen.getByAltText("Next.js logo");
    expect(logo).toBeInTheDocument();
  });

  it("renders Vercel logomark", () => {
    render(<Home />);
    const vercelLogo = screen.getByAltText("Vercel logomark");
    expect(vercelLogo).toBeInTheDocument();
  });

  it("renders navigation links", () => {
    render(<Home />);
    expect(screen.getByText("Deploy now")).toBeInTheDocument();
    expect(screen.getByText("Read our docs")).toBeInTheDocument();
    expect(screen.getByText("Learn")).toBeInTheDocument();
    expect(screen.getByText("Examples")).toBeInTheDocument();
    expect(screen.getByText(/Go to nextjs.org/)).toBeInTheDocument();
  });
});
