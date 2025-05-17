import type { FC, PropsWithChildren, JSX } from "react";

interface ContainerProps {
  id?: string;
  horizontal?: boolean;
  className?: string;
  element?: keyof JSX.IntrinsicElements;
}

const Container: FC<PropsWithChildren<ContainerProps>> = ({ horizontal, className, children, element = "div", id }) => {
  const classes = [horizontal && "mx-4 md:mx-10 lg:mx-20 2xl:max-w-(--breakpoint-xl) 2xl:mx-auto", className]
    .filter(Boolean)
    .join(" ");
  const Tag = element;

  return (
    <Tag id={id} className={classes}>
      {children}
    </Tag>
  );
};

export default Container;
