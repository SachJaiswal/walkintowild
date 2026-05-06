"use client";

import React from "react";
import Link from "next/link";
import "./style.css";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: string;
  variant?: "primary" | "secondary";
  className?: string;
};

const Button: React.FC<ButtonProps> = ({ href, variant = "primary", className = "", children, ...rest }) => {
  const cls = `btn btn--${variant} ${className}`.trim();

  if (href) {
    return (
      <Link href={href} className={cls} {...(rest as any)}>
        {children}
      </Link>
    );
  }

  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
};

export default Button;
