"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react@0.487.0";
import { DayPicker } from "react-day-picker@8.10.1";

import { cn } from "./utils";
import { buttonVariants } from "./button";
import styles from "./calendar.module.css";

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(styles.container, className)}
      classNames={{
        months: styles.months,
        month: styles.month,
        caption: styles.caption,
        caption_label: styles.caption_label,
        nav: styles.nav,
        nav_button: cn(buttonVariants({ variant: "outline" }), styles.nav_button),
        nav_button_previous: styles.nav_button_previous,
        nav_button_next: styles.nav_button_next,
        table: styles.table,
        head_row: styles.head_row,
        head_cell: styles.head_cell,
        row: styles.row,
        cell: cn(
          styles.cell,
          props.mode === "range" ? styles.cell_range_mode : styles.cell_normal,
        ),
        day: cn(buttonVariants({ variant: "ghost" }), styles.day),
        day_range_start: styles.day_range_start,
        day_range_end: styles.day_range_end,
        day_selected: styles.day_selected,
        day_today: styles.day_today,
        day_outside: styles.day_outside,
        day_disabled: styles.day_disabled,
        day_range_middle: styles.day_range_middle,
        day_hidden: styles.day_hidden,
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft className={cn("size-4", className)} {...props} />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight className={cn("size-4", className)} {...props} />
        ),
      }}
      {...props}
    />
  );
}

export { Calendar };
