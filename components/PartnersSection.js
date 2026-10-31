import PartnerCards from "./PartnerCards";

export default function PartnersSection() {
  return (
    <section className="section" aria-labelledby="partners-heading">
      <div className="container">
        <p className="eyebrow">Who we work with</p>
        <h2 id="partners-heading">Our partners in Kampala</h2>
        <PartnerCards />
      </div>
    </section>
  );
}
