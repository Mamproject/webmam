import { cx } from "class-variance-authority";
import type { FC, PropsWithChildren } from "react";

const MdxStyler: FC<PropsWithChildren<{ className?: string }>> = ({ children, className }) => {
  return (
    <article
      className={cx(
        "prose-headings:font-antonio prose mx-auto whitespace-normal prose-headings:text-purple prose-a:text-purple prose-a:no-underline prose-a:hover:underline",
        className,
      )}
    >
      {children}
    </article>
  );
};

export default MdxStyler;
