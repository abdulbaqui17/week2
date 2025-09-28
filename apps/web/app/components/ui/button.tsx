"use client";

import * as React from "react";
import Link, { type LinkProps } from "next/link";

import { cn } from "../../lib/utils";

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#05010d]";

const variants = {
  default:
    "bg-white/10 text-white shadow-[0_18px_45px_-30px_rgba(124,58,237,0.8)] hover:bg-white/20 focus-visible:ring-white/50",
  outline:
    "border border-white/25 text-white hover:border-white hover:bg-white/10 focus-visible:ring-white/50",
  ghost:
    "text-white/80 hover:text-white hover:bg-white/10 focus-visible:ring-white/40",
};

type Variant = keyof typeof variants;

interface ButtonBaseProps {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
}

interface ButtonAsButton extends ButtonBaseProps,
  React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: undefined;
}

interface ButtonAsLink
  extends ButtonBaseProps,
    LinkProps,
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> {}

type ButtonProps = ButtonAsButton | ButtonAsLink;

export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ variant = "default", className, children, ...props }, ref) => {
    const classes = cn(baseClasses, variants[variant], className);

    if ("href" in props && props.href) {
      const { href, ...linkProps } = props;
      return (
        <Link
          href={href}
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={classes}
          {...linkProps}
        >
          {children}
        </Link>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={classes}
        {...(props as ButtonAsButton)}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
