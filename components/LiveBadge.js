"use client";

import Vinyl from "./Vinyl";
import WhatsAppButton from "./WhatsAppButton";
import { nightMessages } from "../lib/whatsapp";

// The one badge for tonight's night, used by the hero card, the week list and Meet Your Host.
export default function LiveBadge({ tonight }) {
  const { night, badge, isHappening } = tonight;

  if (!isHappening) return <span className="week-badge">{badge}</span>;

  return (
    <WhatsAppButton
      action="book_table"
      item={night.name}
      message={nightMessages.live(night)}
      variant={null}
      icon={false}
      className="live-badge"
      label={`Live now – book a table for ${night.name} on WhatsApp`}
    >
      <Vinyl />
      <span className="live-badge-pill">
        <span className="live-badge-dot">
          <i className="live-badge-ping" />
          <i className="live-badge-core" />
        </span>
        <span className="live-badge-text">
          <span className="live-badge-text-now">Happening now</span>
          <span className="live-badge-text-live">LIVE 🔥</span>
          <span className="live-badge-text-join">Join us tonight →</span>
        </span>
        <span className="live-badge-eq">
          <i />
          <i />
          <i />
        </span>
      </span>
    </WhatsAppButton>
  );
}
