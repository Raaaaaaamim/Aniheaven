import React from "react";
import { FaDiscord, FaGithub, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-background/95 border-t border-text/5 mt-auto">
      <div className="container mx-auto px-4 py-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="block">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                AniHeaven
              </h2>
            </Link>
            <p className="text-sm text-text/70 leading-relaxed">
              Your gateway to the world of anime. Stream your favorite shows in high quality with both sub and dub options.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a
                href="#"
                className="text-text/50 hover:text-primary transition-colors"
                aria-label="Discord"
              >
                <FaDiscord className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-text/50 hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <FaTwitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-text/50 hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <FaGithub className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-text/90 uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {["Home", "Popular", "New Releases", "My List"].map((item) => (
                <li key={item}>
                  <Link
                    to="/"
                    className="text-sm text-text/60 hover:text-primary transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold text-text/90 uppercase tracking-wider mb-4">
              Categories
            </h3>
            <ul className="space-y-2">
              {[
                "Action",
                "Romance",
                "Slice of Life",
                "Fantasy",
                "Adventure",
              ].map((genre) => (
                <li key={genre}>
                  <Link
                    to="/"
                    className="text-sm text-text/60 hover:text-primary transition-colors"
                  >
                    {genre}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-text/90 uppercase tracking-wider mb-4">
              Legal
            </h3>
            <ul className="space-y-2">
              {[
                "Terms of Service",
                "Privacy Policy",
                "Cookie Policy",
                "DMCA",
              ].map((item) => (
                <li key={item}>
                  <Link
                    to="/"
                    className="text-sm text-text/60 hover:text-primary transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-text/5">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-text/50 text-center sm:text-left">
              {currentYear} AniHeaven. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link
                to="/"
                className="text-xs text-text/50 hover:text-primary transition-colors"
              >
                About Us
              </Link>
              <Link
                to="/"
                className="text-xs text-text/50 hover:text-primary transition-colors"
              >
                Contact
              </Link>
              <Link
                to="/"
                className="text-xs text-text/50 hover:text-primary transition-colors"
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
