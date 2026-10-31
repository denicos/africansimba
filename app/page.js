import Image from "next/image";

import Button from "../components/Button";
import HeroVideo from "../components/HeroVideo";
import HostSection from "../components/HostSection";
import MartellShowcase from "../components/MartellShowcase";
import PartnersSection from "../components/PartnersSection";
import PhotoStrip from "../components/PhotoStrip";
import TonightCard, { HeroGlow, TonightTitle } from "../components/TonightCard";
import WeekList from "../components/WeekList";
import WhatsAppButton from "../components/WhatsAppButton";
import { SITE } from "../data/site";
import { pageMetadata } from "../lib/metadata";
import { venueLogos } from "../lib/photos";
import { photos } from "./gallery/data";

export const metadata = pageMetadata({
  title: SITE.title,
  description: SITE.description,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <TonightTitle />
      <section className="hero">
        <Image
          src="/videos/hero-poster.jpg"
          alt="A group of friends dancing under colourful lights at a nightclub"
          fill
          priority
          sizes="100vw"
          quality={70}
          className="hero-image"
        />
        <HeroVideo />
        <HeroGlow />
        <div className="container hero-content">
          <div>
            <p className="eyebrow">Official Martell Brand Ambassador in Uganda</p>
            <h1>Kampala nightlife, five nights a week</h1>
            <p className="lead">
              African Simba Events brings you the best weekly nights at Thrones, Nomad and Vanquish, with Martell at every
              one.
            </p>
            <div className="button-row">
              <Button href="#this-week">
                See this week
              </Button>
              <WhatsAppButton action="book_table" item="Homepage hero" message="Hi African Simba, I want to book a table.">
                Book a Table
              </WhatsAppButton>
            </div>
          </div>
          <TonightCard venueLogos={venueLogos()} />
        </div>
      </section>

      <section id="this-week" className="section" aria-labelledby="this-week-heading">
        <div className="container">
          <p className="eyebrow">Monday to Sunday</p>
          <h2 id="this-week-heading">This Week in Kampala</h2>
          <WeekList />
        </div>
      </section>

      <HostSection />

      <section className="section section-raised" aria-labelledby="drinks-heading">
        <div className="container split">
          <div>
            <p className="eyebrow">Drinks</p>
            <h2 id="drinks-heading">Martell and premium bottles, one message away</h2>
            <p className="lead">Order Martell, Don Julio, Clase Azul and more in Kampala on WhatsApp.</p>
            <div className="button-row">
              <Button href="/drinks">
                View drinks
              </Button>
              <Button href="/magnum" variant="outline">
                Visit Magnum, our wine store
              </Button>
            </div>
          </div>
          <MartellShowcase />
        </div>
      </section>

      <PartnersSection />

      <section className="section section-raised" aria-labelledby="gallery-heading">
        <div className="container">
          <p className="eyebrow">Gallery</p>
          <h2 id="gallery-heading">Inside our nights</h2>
        </div>
        <PhotoStrip photos={photos} />
        <div className="container">
          <div className="button-row">
            <Button href="/gallery" variant="outline">
              See the full gallery
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
