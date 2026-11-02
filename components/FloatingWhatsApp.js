"use client";

import { useEffect, useRef, useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";

import WhatsAppButton from "./WhatsAppButton";
import useTonight from "../lib/useTonight";
import { nightMessages } from "../lib/whatsapp";

const LABEL_AFTER_TAP_MS = 2500;

// The link itself never moves or hides, only the green circle inside it does, so it can be tapped at any moment.
export default function FloatingWhatsApp() {
  const tonight = useTonight();
  const [isTapped, setIsTapped] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const message = tonight ? nightMessages.book(tonight.night) : "Hi African Simba, I have a question.";
  const hint = tonight && !tonight.isNextUp ? "Book a table tonight" : "Chat with us";

  const handlePointerDown = () => {
    setIsTapped(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setIsTapped(false), LABEL_AFTER_TAP_MS);
  };

  return (
    <WhatsAppButton
      action="general_enquiry"
      item="Floating button"
      message={message}
      variant={null}
      icon={false}
      className={isTapped ? "whatsapp-float is-engaged" : "whatsapp-float"}
      label={`${hint} on WhatsApp`}
      onPointerDown={handlePointerDown}
    >
      <span className="whatsapp-float-ring" />
      <span className="whatsapp-float-in">
        <span className="whatsapp-float-bubble">
          <FaWhatsapp aria-hidden="true" />
        </span>
      </span>
      <span className="whatsapp-float-label">{hint}</span>
    </WhatsAppButton>
  );
}
