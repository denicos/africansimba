import { SITE } from "../data/site";

export function whatsappUrl(message) {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const nightMessages = {
  book: (night) => `Hi African Simba, I want to book a table for ${night.name} at ${night.venue}.`,
  reserve: (night) => `Hi African Simba, I want to reserve a Martell bottle for ${night.name} at ${night.venue}.`,
};

export const bottleMessages = {
  order: (name) => `Hi African Simba, I want to order 1 ${name}.`,
  price: (name) => `Hi African Simba, what is the price of ${name}?`,
};
