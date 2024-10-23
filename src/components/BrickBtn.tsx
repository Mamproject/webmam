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
        "group relative h-[5rem] w-[22rem] transition hover:scale-[1.02] focus-visible:scale-[1.02]",
      )}
      {...props}
    >
      <div className="absolute inset-0 transition group-hover:drop-shadow-md group-focus-visible:drop-shadow-md">
        <Image fill src={brickBtn} alt="Brick button" />
      </div>
      <div className="relative left-[0.5rem] mx-auto grid h-[3rem] w-[10.5rem] place-items-center px-2 text-base font-semibold leading-tight text-purple">
        <div className="text-center">{children}</div>
      </div>
    </button>
  );
};

export default BrickBtn;
