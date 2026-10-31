import { FiClock, FiMapPin } from "react-icons/fi";

import AgeGate from "../../components/AgeGate";
import PageHeader from "../../components/PageHeader";
import PhotoGallery from "../../components/PhotoGallery";
import WhatsAppButton from "../../components/WhatsAppButton";
import { MAGNUM } from "../../data/site";
import { pageMetadata } from "../../lib/metadata";
import { listPhotos } from "../../lib/photos";

export const metadata = pageMetadata({
  title: "Magnum Wine Store in Kololo, Kampala | African Simba Events",
  description:
    "Magnum is our wine store in Kololo, Kampala. Order wine or ask for prices on WhatsApp, from the team at African Simba Events.",
  path: "/magnum",
});

export default function MagnumPage() {
  const photos = listPhotos("images/magnum", (_file, index) => `Magnum wine store in Kololo, Kampala, photo ${index + 1}`);

  return (
    <>
      <AgeGate />
      <PageHeader eyebrow="Our store" title="Magnum – Our wine store in Kololo, Kampala" lead="Wine for your table, your home or your next celebration.">
        <div className="button-row">
          <WhatsAppButton action="order" item="Magnum" message="Hi African Simba, I want to order wine from Magnum.">
            Order on WhatsApp
          </WhatsAppButton>
          <WhatsAppButton
            action="ask_price"
            item="Magnum"
            message="Hi African Simba, what are the prices of the wines at Magnum?"
            className="btn btn-outline"
            icon={false}
          >
            Ask for Price
          </WhatsAppButton>
        </div>
      </PageHeader>

      <section className="section section-tight">
        <div className="container">
          <ul className="night-details">
            <li>
              <FiMapPin aria-hidden="true" />
              <span>
                <strong>Location</strong> Kololo, Kampala
              </span>
            </li>
            <li>
              <FiClock aria-hidden="true" />
              <span>
                <strong>Opening hours</strong> {MAGNUM.hours || "Message us on WhatsApp for today's hours"}
              </span>
            </li>
          </ul>
        </div>
      </section>

      <section className="section section-tight" aria-labelledby="magnum-photos">
        <div className="container">
          <h2 id="magnum-photos">Inside Magnum</h2>
          <PhotoGallery photos={photos} emptyText="Photos of Magnum coming soon" />
        </div>
      </section>

      <section className="section section-tight" aria-labelledby="magnum-map">
        <div className="container">
          <h2 id="magnum-map">Find us</h2>
          {MAGNUM.mapEmbedUrl ? (
            <iframe
              className="map-embed"
              src={MAGNUM.mapEmbedUrl}
              title="Map showing Magnum wine store in Kololo, Kampala"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : (
            <div className="photo-placeholder">
              <p>Map coming soon. Message us on WhatsApp for directions.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
