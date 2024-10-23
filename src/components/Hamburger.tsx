import type { ColorVariant } from "@/types/theme";
import type { FC } from "react";

interface HamburgerProps {
  variant: ColorVariant;
  onClick: VoidFunction;
}

const Hamburger: FC<HamburgerProps> = ({ variant, onClick }) => {
  const Bar = <div className={`h-[6px] w-full md:h-[7px] bg-${variant}`} />;

  return (
    <button onClick={onClick} className="flex h-6 w-8 flex-col justify-between md:h-7 md:w-10">
      {Bar}
      {Bar}
      {Bar}
    </button>
  );
};

export default Hamburger;
