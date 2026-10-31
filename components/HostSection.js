import { FaInstagram } from "react-icons/fa6";

import CoverFlow from "./CoverFlow";
import { VENUES } from "../data/nights";
import { HOST, HOST_FULL_NAME } from "../data/site";
import { venueLogo } from "../lib/photos";

export default function HostSection() {
  const venueLogos = Object.fromEntries(Object.keys(VENUES).map((venue) => [venue, venueLogo(venue)]));

  return (
    <section className="section host-section" aria-labelledby="host-heading">
      <div className="container">
        <div className="host-heading">
          <div>
            <p className="eyebrow">Your host, five nights a week</p>
            <h2 id="host-heading">Meet Your Host</h2>
            <p className="host-name">{HOST_FULL_NAME}</p>
            {HOST.bio && <p className="lead">{HOST.bio}</p>}
          </div>
          {HOST.instagram && (
            <a href={HOST.instagram} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              <FaInstagram aria-hidden="true" /> Follow on Instagram
            </a>
          )}
        </div>
        <CoverFlow venueLogos={venueLogos} />
      </div>
    </section>
  );
}
