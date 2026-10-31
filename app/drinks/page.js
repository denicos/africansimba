import Image from "next/image";

import Button from "../../components/Button";
import AgeGate from "../../components/AgeGate";
import PageHeader from "../../components/PageHeader";
import RevealList from "../../components/RevealList";
import WhatsAppButton from "../../components/WhatsAppButton";
import { MARTELL_BOTTLES, OTHER_BOTTLES } from "../../data/drinks";
import { MARTELL_LOGO } from "../../data/site";
import { pageMetadata } from "../../lib/metadata";
import { bottleMessages } from "../../lib/whatsapp";

export const metadata = pageMetadata({
  title: "Order Martell & Premium Drinks in Kampala | African Simba Events",
  description:
    "Order Martell, Don Julio, Clase Azul and more in Kampala on WhatsApp, from African Simba Events, the official Martell brand ambassador in Uganda.",
  path: "/drinks",
});

function BottleCard({ bottle, large }) {
  return (
    <li className={large ? "bottle-card bottle-card-large" : "bottle-card"}>
      <div className="bottle-image">
        <Image
          src={`/images/drinks/${bottle.image}`}
          alt={bottle.alt}
          fill
          sizes={large ? "(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 25vw" : "(max-width: 600px) 50vw, 20vw"}
          quality={75}
          loading="lazy"
        />
      </div>
      <div className="bottle-body">
        <h3>{bottle.name}</h3>
        <p>{bottle.description}</p>
        <div className="bottle-actions">
          <WhatsAppButton action="order" item={bottle.name} message={bottleMessages.order(bottle.name)} size="small">
            Order on WhatsApp
          </WhatsAppButton>
          <WhatsAppButton
            action="ask_price"
            item={bottle.name}
            message={bottleMessages.price(bottle.name)}
            variant="primary" size="small"
            icon={false}
          >
            Ask for Price
          </WhatsAppButton>
        </div>
      </div>
    </li>
  );
}

export default function DrinksPage() {
  return (
    <>
      <AgeGate />
      <PageHeader
        eyebrow="Drinks"
        title="Order Martell, Don Julio, Clase Azul and more in Kampala"
        lead="Pick your bottle and order on WhatsApp. Message us for today's prices."
      />

      <section className="section section-tight" aria-labelledby="martell-heading">
        <div className="container">
          <div className="martell-banner">
            <Image
              src={MARTELL_LOGO.src}
              alt={MARTELL_LOGO.alt}
              width={MARTELL_LOGO.width}
              height={MARTELL_LOGO.height}
              sizes="272px"
              quality={90}
              priority
              className="martell-logo"
            />
            <div>
              <p className="eyebrow">Our signature</p>
              <h2 id="martell-heading">Martell · Official Brand Ambassador in Uganda</h2>
            </div>
          </div>
          <RevealList className="bottle-grid bottle-grid-large">
            {MARTELL_BOTTLES.map((bottle) => (
              <BottleCard key={bottle.name} bottle={bottle} large />
            ))}
          </RevealList>
        </div>
      </section>

      <section className="section" aria-labelledby="also-heading">
        <div className="container">
          <p className="eyebrow">More bottles</p>
          <h2 id="also-heading">Also available</h2>
          <ul className="bottle-grid">
            {OTHER_BOTTLES.map((bottle) => (
              <BottleCard key={bottle.name} bottle={bottle} />
            ))}
          </ul>
        </div>
      </section>

      <section className="section section-raised" aria-labelledby="wines-heading">
        <div className="container center">
          <p className="eyebrow">Wine</p>
          <h2 id="wines-heading">Wines from our Magnum store</h2>
          <p className="lead">Looking for wine? Visit Magnum, our own wine store in Kololo, Kampala.</p>
          <div className="button-row button-row-center">
            <Button href="/magnum">
              Visit Magnum
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
