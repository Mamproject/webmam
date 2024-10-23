export enum ColorVariant {
  Purple = "purple",
  White = "white",
}

export const oppositeVariant = (variant: ColorVariant) =>
  variant === ColorVariant.Purple ? ColorVariant.White : ColorVariant.Purple;
