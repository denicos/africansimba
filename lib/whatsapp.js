import { SITE } from "../data/site";

export function whatsappUrl(message) {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

const nightPlace = (night) => (night.area ? `${night.venue}, ${night.area}` : night.venue);

export const nightMessages = {
  book: (night) => `Hi African Simba, I want to book a table for ${night.name} at ${nightPlace(night)}.`,
  live: (night) => `Hi African Simba, I'd like to book a table for ${night.name} at ${nightPlace(night)}.`,
  vip: (night) => `Hi African Simba, I'd like to reserve a VIP table for ${night.name} at ${nightPlace(night)}.`,
  reserve: (night) => `Hi African Simba, I want to reserve a Martell bottle for ${night.name} at ${nightPlace(night)}.`,
};

export const bottleMessages = {
  order: (name) => `Hi African Simba, I want to order 1 ${name}.`,
  price: (name) => `Hi African Simba, what is the price of ${name}?`,
};
