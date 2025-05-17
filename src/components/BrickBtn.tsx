import type { FC, HTMLAttributes } from "react";
import brickBtn from "@/assets/brick_btn.png";
import Image from "next/image";
import { cx } from "class-variance-authority";

interface BrickBtnProps extends HTMLAttributes<HTMLButtonElement> {}

const BrickBtn: FC<BrickBtnProps> = ({ className, children, ...props }) => {
  return (
    <button
      className={cx(
        className,
        "group relative h-20 w-88 transition hover:scale-[1.02] focus-visible:scale-[1.02]",
      )}
      {...props}
    >
      <div className="absolute inset-0 transition group-hover:drop-shadow-md group-focus-visible:drop-shadow-md">
        <Image fill src={brickBtn} alt="Brick button" />
      </div>
      <div className="relative left-2 mx-auto grid h-12 w-42 place-items-center px-2 text-base font-semibold leading-tight text-purple">
        <div className="text-center">{children}</div>
      </div>
    </button>
  );
};

export default BrickBtn;
