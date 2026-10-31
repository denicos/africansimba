import Image from "next/image";
import Link from "next/link";

import PartnersSection from "../components/PartnersSection";
import PhotoStrip from "../components/PhotoStrip";
import WeekList from "../components/WeekList";
import WhatsAppButton from "../components/WhatsAppButton";
import { SITE } from "../data/site";
import { pageMetadata } from "../lib/metadata";
import { photos } from "./gallery/data";

export const metadata = pageMetadata({
  title: SITE.title,
  description: SITE.description,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <Image
          src="/new/1c51433f-f816-4ff9-9eac-9e49dbd7f66c 3.webp"
          alt="Crowd under teal lights with a flame show at an African Simba Events night in Kampala"
          fill
          priority
          sizes="100vw"
          quality={70}
          className="hero-image"
        />
        <div className="container hero-content">
          <p className="eyebrow">Official Martell Brand Ambassador in Uganda</p>
          <h1>Kampala nightlife, five nights a week</h1>
          <p className="lead">
            African Simba Events brings you the best weekly nights at Thrones, Nomad and Vanquish, with Martell at every
            one.
          </p>
          <div className="button-row">
            <a href="#this-week" className="btn btn-gold">
              See this week
            </a>
            <WhatsAppButton action="book_table" item="Homepage hero" message="Hi African Simba, I want to book a table.">
              Book a Table
            </WhatsAppButton>
          </div>
        </div>
      </section>

      <section id="this-week" className="section" aria-labelledby="this-week-heading">
        <div className="container">
          <p className="eyebrow">Monday to Sunday</p>
          <h2 id="this-week-heading">This Week in Kampala</h2>
          <WeekList />
        </div>
      </section>

      <section className="section section-raised" aria-labelledby="drinks-heading">
        <div className="container split">
          <div>
            <p className="eyebrow">Drinks</p>
            <h2 id="drinks-heading">Martell and premium bottles, one message away</h2>
            <p className="lead">Order Martell, Don Julio, Clase Azul and more in Kampala on WhatsApp.</p>
            <div className="button-row">
              <Link href="/drinks" className="btn btn-gold">
                View drinks
              </Link>
              <Link href="/magnum" className="btn btn-outline">
                Visit Magnum, our wine store
              </Link>
            </div>
          </div>
          <div className="split-image">
            <Image
              src="/images/drinks/martell-xo.png"
              alt="Bottle of Martell XO cognac"
              fill
              sizes="(max-width: 800px) 100vw, 50vw"
              quality={70}
              loading="lazy"
            />
          </div>
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
            <Link href="/gallery" className="btn btn-outline">
              See the full gallery
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
