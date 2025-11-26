"use client";

import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle@1.1.2";
import { cva, type VariantProps } from "class-variance-authority@0.7.1";
import styles from "./toggle.module.css";

const toggleVariants = cva(styles.toggle, {
  variants: {
    variant: {
      default: styles.toggleDefault,
      outline: styles.toggleOutline,
    },
    size: {
      default: styles.sizeDefault,
      sm: styles.sizeSm,
      lg: styles.sizeLg,
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

function Toggle({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={`${toggleVariants({ variant, size })} ${className || ''}`}
      {...props}
    />
  );
}

export { Toggle, toggleVariants };