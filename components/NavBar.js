"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiMenu, FiX } from "react-icons/fi";
import WhatsAppButton from "./WhatsAppButton";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/nights", label: "Our Nights" },
  { href: "/drinks", label: "Drinks" },
  { href: "/magnum", label: "Magnum" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact-us", label: "Contact" },
];

function isActive(pathname, href) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export default function NavBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="site-header">
      <div className="container site-header-inner">
        <Link href="/" className="site-logo" aria-label="African Simba Events home">
          <Image src="/logos/simba_white.webp" alt="African Simba Events logo" width={72} height={60} priority />
        </Link>

        <nav id="site-nav" className={open ? "site-nav is-open" : "site-nav"} aria-label="Main">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="site-nav-link"
              aria-current={isActive(pathname, link.href) ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="site-header-actions">
          <WhatsAppButton
            action="book_table"
            item="General"
            message="Hi African Simba, I want to book a table."
            className="btn btn-gold btn-small"
            icon={false}
          >
            Book a Table
          </WhatsAppButton>
          <button
            type="button"
            className="site-menu-button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="site-nav"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
          </button>
        </div>
      </div>
    </header>
  );
}
