import PageHeader from "../../components/PageHeader";
import PhotoGallery from "../../components/PhotoGallery";
import { pageMetadata } from "../../lib/metadata";
import { listPhotos } from "../../lib/photos";

export const metadata = pageMetadata({
  title: "Past Events in Kampala | African Simba Events",
  description: "A look back at past African Simba Events nights in Kampala, with photos of the crowds, DJs and live performances.",
  path: "/past-events",
});

// Photos come from public/images/past-events/. Add a line here to give a new photo its own description.
const ALT_TEXT = {
  "afro_vibez.webp": "Crowd at an Afro Vibes night in Kampala",
  "awilo.webp": "Guests celebrating with a performer in the crowd",
  "azul.webp": "Guests opening a bottle at a table",
  "bookings_hero.webp": "Guests dancing with their hands in the air",
  "ceo_2.avif": "African Simba hosting on the microphone in a black outfit",
  "cover.webp": "Performer on stage with a flame show behind",
  "crowd_green.webp": "Large crowd under green lights",
  "crowd_hero_group.webp": "Crowd under pink and purple lights",
  "dj_on_deck.webp": "DJ with green hair in front of the African Simba Events logo",
  "djs.webp": "Two DJs posing for the camera",
  "don_julio.webp": "LED performer lit in gold above the crowd",
  "event_anniversary.webp": "Afro Vibes anniversary Bantu Edition event poster",
  "fiesta_sunday.webp": "Two guests posing on stage",
  "gbb.webp": "Two performers celebrating in glittering outfits",
  "mc_ase.webp": "MC in a denim jacket performing on the microphone",
  "middle_event.webp": "Crowd in the club under blue lights",
  "moses.webp": "Saxophonist in a hat performing live",
  "muleba_video_poster.webp": "Performers dancing on an outdoor festival stage",
  "one_light_night.webp": "Guest with a glass of rosé in sunglasses",
  "petrie.webp": "MC on stage under spotlights",
  "petrie_hero.webp": "Performers on stage in orange and purple light",
  "rays.webp": "Performer in the middle of red light beams",
  "red_bg.webp": "Stage and crowd under red lights",
  "roger.webp": "Black and white portrait of a DJ at the decks",
  "simba.webp": "African Simba under a yellow spotlight",
  "skales.webp": "Singer in a patterned outfit performing live",
  "skales_portrait.webp": "Singer in a white patterned outfit on stage",
  "vault.webp": "Guests enjoying the night under soft lights",
  "xylophone_moses.webp": "Saxophonist in a hat and patterned jacket playing live",
};

export default function PastEventsPage() {
  const photos = listPhotos(
    "images/past-events",
    (file, index) => ALT_TEXT[file] || `Past African Simba Events night in Kampala, photo ${index + 1}`
  );

  return (
    <>
      <PageHeader eyebrow="Past Events" title="Past events in Kampala" lead="A look back at some of our favourite nights." />
      <section className="section section-tight">
        <div className="container">
          <PhotoGallery photos={photos} />
        </div>
      </section>
    </>
  );
}
