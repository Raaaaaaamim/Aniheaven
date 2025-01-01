import React from "react";
import { FaDiscord, FaGithub, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-background border-t border-border/10">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <Link to="/" className="block">
              <img
                src="/textLogo.svg"
                alt="AniHeaven"
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-sm text-text/60  leading-relaxed font-sans">
              Your premier destination for high-quality anime streaming.
            </p>
            <div className="flex items-center gap-6 pt-2">
              <a
                href="#"
                className="text-text/40 hover:text-primary transition-all duration-300 transform hover:scale-110"
                aria-label="Discord"
              >
                <FaDiscord className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-text/40 hover:text-primary transition-all duration-300 transform hover:scale-110"
                aria-label="Twitter"
              >
                <FaTwitter className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-text/40 hover:text-primary transition-all duration-300 transform hover:scale-110"
                aria-label="GitHub"
              >
                <FaGithub className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-text/90 uppercase tracking-wider">
              Navigation
            </h3>
            <ul className="space-y-3">
              {[
                "Home",
                "Popular Anime",
                "New Releases",
                "My Watchlist",
                "Browse All",
              ].map((item) => (
                <li key={item}>
                  <Link
                    to="/"
                    className="text-sm text-text/50 hover:text-primary transition-all duration-300"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-text/90 uppercase tracking-wider">
              Genres
            </h3>
            <ul className="space-y-3">
              {[
                "Action & Adventure",
                "Romance & Drama",
                "Slice of Life",
                "Fantasy & Magic",
                "Sci-Fi & Mecha",
                "Sports & Competition",
              ].map((genre) => (
                <li key={genre}>
                  <Link
                    to="/"
                    className="text-sm text-text/50 hover:text-primary transition-all duration-300"
                  >
                    {genre}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Legal */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-text/90 uppercase tracking-wider">
              Support & Legal
            </h3>
            <ul className="space-y-3">
              {[
                "Help Center",
                "Terms of Service",
                "Privacy Policy",
                "Content Guidelines",
                "DMCA",
                "Contact Us",
              ].map((item) => (
                <li key={item}>
                  <Link
                    to="/"
                    className="text-sm text-text/50 hover:text-primary transition-all duration-300"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border/10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-text/40">
              {currentYear} AniHeaven. All rights reserved.
            </p>
            <div className="flex items-center gap-8">
              <Link
                to="/"
                className="text-sm text-text/40 hover:text-primary transition-all duration-300"
              >
                About
              </Link>
              <Link
                to="/"
                className="text-sm text-text/40 hover:text-primary transition-all duration-300"
              >
                Blog
              </Link>
              <Link
                to="/"
                className="text-sm text-text/40 hover:text-primary transition-all duration-300"
              >
                FAQ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
