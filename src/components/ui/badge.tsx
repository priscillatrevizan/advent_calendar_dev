import * as React from "react";
import { Slot } from "@radix-ui/react-slot@1.1.2";
import { cva, type VariantProps } from "class-variance-authority@0.7.1";
import styles from "./badge.module.css";

const badgeVariants = cva(styles.badge, {
  variants: {
    variant: {
      default: styles.badgeDefault,
      secondary: styles.badgeSecondary,
      destructive: styles.badgeDestructive,
      outline: styles.badgeOutline,
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={`${badgeVariants({ variant })} ${className || ''}`}
      {...props}
    />
  );
}

export { Badge, badgeVariants };