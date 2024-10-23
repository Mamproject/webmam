import { antonio } from "@/assets/fonts";
import type { ElementType, FC, PropsWithChildren } from "react";

interface HeadingProps {
  color?: "purple" | "white" | "black";
  className?: string;
  level: 1 | 2 | 3;
}

const Heading: FC<PropsWithChildren<HeadingProps>> = ({ color = "black", className, children, level }) => {
  const settings = {
    1: {
      className: "text-3xl md:text-4xl mb-8 uppercase",
      tag: "h1",
    },
    2: {
      className: "text-2xl md:text-3xl mb-8 uppercase",
      tag: "h2",
    },
    3: {
      className: "text-lg md:text-xl mb-2",
      tag: "h3",
    },
  };
  const Tag = settings[level].tag as ElementType;
  const levelClass = settings[level].className;

  return <Tag className={`${antonio.className} text-${color} ${levelClass} ${className}`}>{children}</Tag>;
};

export default Heading;
