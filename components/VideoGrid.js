"use client";

import { useState } from "react";
import Image from "next/image";
import { FaPlay } from "react-icons/fa6";

// Shows a local thumbnail and only loads YouTube after a tap, which saves mobile data.
export default function VideoGrid({ videos }) {
  const [playing, setPlaying] = useState(null);

  return (
    <ul className="video-grid">
      {videos.map((video) => (
        <li key={video.id} className="video-card">
          <div className="video-frame">
            {playing === video.id ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1`}
                title={video.title}
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <button type="button" className="video-play" onClick={() => setPlaying(video.id)} aria-label={`Play video: ${video.title}`}>
                <Image src={video.thumbnail} alt={video.alt} fill sizes="(max-width: 700px) 100vw, 33vw" quality={65} loading="lazy" />
                <span className="video-play-icon">
                  <FaPlay aria-hidden="true" />
                </span>
              </button>
            )}
          </div>
          <h3>{video.title}</h3>
          <p>{video.location}</p>
        </li>
      ))}
    </ul>
  );
}
