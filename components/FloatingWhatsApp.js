"use client";

import WhatsAppButton from "./WhatsAppButton";
import useTonight from "../lib/useTonight";
import { nightMessages } from "../lib/whatsapp";

export default function FloatingWhatsApp() {
  const tonight = useTonight();
  const message = tonight ? nightMessages.book(tonight.night) : "Hi African Simba, I have a question.";

  return (
    <WhatsAppButton
      action="general_enquiry"
      item="Floating button"
      message={message}
      className="whatsapp-float"
      label="Chat with African Simba Events on WhatsApp"
    />
  );
}
