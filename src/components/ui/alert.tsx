import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority@0.7.1";
import styles from "./alert.module.css";

const alertVariants = cva("", {
  variants: {
    variant: {
      default: styles.alertDefault,
      destructive: styles.alertDestructive,
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={`${styles.alert} ${alertVariants({ variant })} ${className || ''}`}
      {...props}
    />
  );
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={`${styles.title} ${className || ''}`}
      {...props}
    />
  );
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={`${styles.description} ${className || ''}`}
      {...props}
    />
  );
}

export { Alert, AlertTitle, AlertDescription };