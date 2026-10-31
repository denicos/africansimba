"use client";

import { FaWhatsapp } from "react-icons/fa6";
import { whatsappUrl } from "../lib/whatsapp";

// Every WhatsApp link on the site goes through here so each click is tracked in GA4.
export default function WhatsAppButton({ action, item, message, className = "btn btn-whatsapp", icon = true, label, children }) {
  const handleClick = () => {
    if (typeof window.gtag === "function") {
      window.gtag("event", "whatsapp_click", { whatsapp_action: action, item_name: item });
    }
  };

  return (
    <a
      href={whatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label={label}
      onClick={handleClick}
    >
      {icon && <FaWhatsapp aria-hidden="true" />}
      {children}
    </a>
  );
}
