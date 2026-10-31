import { withNextVideo } from "next-video/process";
/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: "/home", destination: "/", permanent: true },
      { source: "/events", destination: "/nights", permanent: true },
      { source: "/bookings", destination: "/nights", permanent: true },
      { source: "/store/:path*", destination: "/", permanent: true },
      { source: "/cart", destination: "/", permanent: true },
      { source: "/contactus", destination: "/contact-us", permanent: true },
    ];
  },
};

export default withNextVideo(nextConfig);
