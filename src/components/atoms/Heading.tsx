import { ReactNode } from "react";

const HEADING_TAGS = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
};

type HeadingProps = {
  as?: keyof typeof HEADING_TAGS;
  children: ReactNode
};

export default function Heading({ as, children, ...props }: HeadingProps) {
  const headingStyles = {
    backgroundImage: "var(--accent-gradient)",
    webkitBackgroundClip: "text",
    webkitTextFillColor: "transparent",
    backgroundSize: "400%",
    backgroundPosition: "0%",
  };

  switch (as) {
    case "h1":
      return (
        <h1 style={headingStyles} {...props}>{children}</h1>
      );
    case "h2":
      return <h2 {...props}>{children}</h2>;
    case "h3":
      return <h3 {...props}>{children}</h3>;
    case "h4":
      return <h4 {...props}>{children}</h4>;
    case "h5":
      return <h5 {...props}>{children}</h5>;
    case "h6":
      return <h6 {...props}>{children}</h6>;
    default:
    return <h1 style={headingStyles} {...props}>{children}</h1>
  }
}
