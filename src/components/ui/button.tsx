import * as React from "react";
import { Slot } from "@radix-ui/react-slot@1.1.2";
import { cva, type VariantProps } from "class-variance-authority@0.7.1";
import styles from "./button.module.css";

const buttonVariants = cva(styles.button, {
  variants: {
    variant: {
      default: styles.buttonDefault,
      destructive: styles.buttonDestructive,
      outline: styles.buttonOutline,
      secondary: styles.buttonSecondary,
      ghost: styles.buttonGhost,
      link: styles.buttonLink,
    },
    size: {
      default: styles.sizeDefault,
      sm: styles.sizeSm,
      lg: styles.sizeLg,
      icon: styles.sizeIcon,
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={`${buttonVariants({ variant, size })} ${className || ''}`}
      {...props}
    />
  );
}

export { Button, buttonVariants };