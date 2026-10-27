import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";
import BlogLayout, { BlogIndex } from "../pages/BlogLayout";

describe("BlogIndex", () => {
  it("renders all 6 article cards", () => {
    render(
      <MemoryRouter>
        <BlogIndex />
      </MemoryRouter>,
    );
    expect(screen.getByText(/CTC, Gross, Net Salary/)).toBeInTheDocument();
    expect(screen.getByText(/PF & ESI Compliance Guide/)).toBeInTheDocument();
    expect(screen.getByText(/What to Include in a Payslip/)).toBeInTheDocument();
    expect(screen.getByText(/Payroll Processing in India 2026/)).toBeInTheDocument();
    expect(screen.getByText(/EPF Calculation 2026/)).toBeInTheDocument();
    expect(screen.getByText(/Professional Tax Rates 2026/)).toBeInTheDocument();
  });

  it("renders read more links", () => {
    render(
      <MemoryRouter>
        <BlogIndex />
      </MemoryRouter>,
    );
    const links = screen.getAllByText(/Read more/);
    expect(links).toHaveLength(6);
  });
});

describe("BlogLayout headings", () => {
  const renderAt = (path) =>
    render(
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route path="/blog" element={<BlogLayout />}>
            <Route index element={<p>index</p>} />
            <Route path="post" element={<h1>Post title</h1>} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );

  it("uses the blog name as the h1 on the index", () => {
    renderAt("/blog");
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("DoAide Payroll Blog");
  });

  it("leaves the only h1 to the post on article pages", () => {
    renderAt("/blog/post");
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Post title");
  });
});
