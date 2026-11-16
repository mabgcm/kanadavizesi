import { MessageCircle } from 'lucide-react';

const WHATSAPP_URL =
  'https://wa.me/13656985944?text=Merhaba%2C%20Kanada%20vizesi%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum.';

export function WhatsAppButton() {
  return (
    <a
      className="whatsapp-float"
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp'tan bize yazın"
    >
      <MessageCircle aria-hidden="true" />
      <span>WhatsApp&apos;tan yazın</span>
    </a>
  );
}
