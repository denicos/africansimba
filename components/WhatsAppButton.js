"use client";

import { FaWhatsapp } from "react-icons/fa6";
import Button from "./Button";
import { whatsappUrl } from "../lib/whatsapp";

// Every WhatsApp link on the site goes through here so each click is tracked in GA4.
export default function WhatsAppButton({ action, item, message, variant = "whatsapp", icon = true, label, children, ...props }) {
  const handleClick = () => {
    if (typeof window.gtag === "function") {
      window.gtag("event", "whatsapp_click", { whatsapp_action: action, item_name: item });
    }
  };

  return (
    <Button variant={variant} href={whatsappUrl(message)} external aria-label={label} onClick={handleClick} {...props}>
      {icon && <FaWhatsapp aria-hidden="true" />}
      {children}
    </Button>
  );
}
