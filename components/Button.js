import { forwardRef } from "react";
import Link from "next/link";

// Every button on the site. Variants: "primary" (gold on hover), "whatsapp" (green on hover), "outline".
// With href it's a link (external opens a new tab), without href it's a button. Styles are in globals.css.
const Button = forwardRef(function Button({ variant = "primary", size, href, external, className, children, ...props }, ref) {
  const classes = [variant && "btn", variant && `btn-${variant}`, size && `btn-${size}`, className].filter(Boolean).join(" ");

  if (external) {
    return (
      <a ref={ref} href={href} target="_blank" rel="noopener noreferrer" className={classes} {...props}>
        {children}
      </a>
    );
  }
  if (href?.startsWith("#")) {
    return (
      <a ref={ref} href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }
  if (href) {
    return (
      <Link ref={ref} href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }
  return (
    <button ref={ref} type="button" className={classes} {...props}>
      {children}
    </button>
  );
});

export default Button;
