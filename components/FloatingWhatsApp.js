"use client";

import WhatsAppButton from "./WhatsAppButton";
import useTonight from "../lib/useTonight";

export default function FloatingWhatsApp() {
  const tonight = useTonight();
  const message = tonight
    ? `Hi African Simba, I want to book a table for ${tonight.night.name}.`
    : "Hi African Simba, I have a question.";

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
