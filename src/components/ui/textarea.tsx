import * as React from "react";
import styles from "./textarea.module.css";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={`${styles.textarea} ${className || ''}`}
      {...props}
    />
  );
}

export { Textarea };