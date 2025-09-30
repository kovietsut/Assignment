import { render } from "../../../tests/test-utils";
import Iconify from "../Iconify";

describe("Iconify Component", () => {
  it("renders without crashing", () => {
    const { container } = render(<Iconify icon="mdi:home" />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders with custom width and height props", () => {
    const { container } = render(
      <Iconify icon="mdi:home" width={24} height={24} />
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders with custom styles", () => {
    const customStyle = { color: "red", fontSize: "20px" };
    const { container } = render(<Iconify icon="mdi:home" sx={customStyle} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders with different icon names", () => {
    const { container, rerender } = render(<Iconify icon="mdi:home" />);
    expect(container.firstChild).toBeInTheDocument();

    rerender(<Iconify icon="mdi:settings" />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
