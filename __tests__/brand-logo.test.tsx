import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { BrandLogo } from "@/components/ui/BrandLogo";

// Mock Next.js Image component
vi.mock("next/image", () => ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  default: ({ fill, priority, alt, ...props }: { fill?: boolean; priority?: boolean; alt?: string; [key: string]: unknown }) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img alt={alt || "mock image"} {...props} />;
  },
}));

describe("BrandLogo Component", () => {
  it("renders Audi logo for Audi vehicles", () => {
    render(<BrandLogo vehicle="Audi RS6" />);
    const img = screen.getByAltText("AUDI Logo");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "/public/logos/audi.png");
  });

  it("renders Lamborghini logo for Lamborghini vehicles", () => {
    render(<BrandLogo vehicle="Lamborghini Urus" />);
    const img = screen.getByAltText("LAMBORGHINI Logo");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "/public/logos/lamborghini.png");
  });

  it("renders Porsche logo for Porsche vehicles", () => {
    render(<BrandLogo vehicle="Porsche Cayenne" />);
    const img = screen.getByAltText("PORSCHE Logo");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "/public/logos/porsche.png");
  });

  it("renders default fallback when vehicle is unknown", () => {
    render(<BrandLogo vehicle="Unknown Car" />);
    expect(screen.getByText("Constructeur")).toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("renders fallback when image fails to load", () => {
    render(<BrandLogo vehicle="Audi RS6" />);
    const img = screen.getByAltText("AUDI Logo");
    
    // Simulate error
    fireEvent.error(img);

    expect(screen.getByText("Ajoutez audi.png")).toBeInTheDocument();
  });

  it("renders icon variant correctly", () => {
    render(<BrandLogo vehicle="Audi RS6" variant="icon" />);
    const img = screen.getByAltText("AUDI Logo");
    expect(img).toBeInTheDocument();
    expect(img).toHaveClass("object-contain p-1");
  });
});
