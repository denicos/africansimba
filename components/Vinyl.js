// A small record that turns like a turntable while a night is live. Stays still with reduced motion.
export default function Vinyl() {
  return (
    <svg className="vinyl" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="11.5" fill="#0b0b0b" stroke="rgba(239, 178, 9, 0.7)" strokeWidth="1" />
      <circle cx="12" cy="12" r="8.75" fill="none" stroke="rgba(255, 255, 255, 0.14)" strokeWidth="0.6" />
      <circle cx="12" cy="12" r="6.75" fill="none" stroke="rgba(255, 255, 255, 0.14)" strokeWidth="0.6" />
      <path d="M12 2.75 A9.25 9.25 0 0 1 21.25 12" fill="none" stroke="rgba(255, 255, 255, 0.45)" strokeWidth="0.9" strokeLinecap="round" />
      <circle cx="12" cy="12" r="4" fill="#efb209" />
      <circle cx="12" cy="12" r="1" fill="#0b0b0b" />
    </svg>
  );
}
