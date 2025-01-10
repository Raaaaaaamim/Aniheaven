import { motion } from "framer-motion";
import React from "react";
import { FaDiscord, FaGithub, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-gradient-to-t from-background via-background/95 to-transparent overflow-hidden">
      {/* Subtle Gradient Orbs */}
      <div className="absolute -bottom-[250px] left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[128px]" />
      <div className="absolute -bottom-[250px] right-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[128px]" />
      <div className="relative container mx-auto px-4 py-16">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-8">
            <Link to="/" className="block">
              <img
                src="/textLogo.svg"
                alt="AniHeaven"
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-secText text-sm leading-relaxed">
              Discover and track your favorite anime series in one place. Join
              our community of anime enthusiasts.
            </p>
            <div className="flex items-center gap-5">
              {[
                { icon: FaDiscord, href: "#" },
                { icon: FaTwitter, href: "#" },
                { icon: FaGithub, href: "#" },
              ].map(({ icon: Icon, href }, index) => (
                <motion.a
                  key={index}
                  href={href}
                  whileHover={{ y: -3 }}
                  className="group relative"
                >
                  <div className="relative p-2.5 bg-third rounded-lg border border-border/20 transition-all duration-300 group-hover:border-border/40">
                    <Icon className="w-5 h-5 text-text/60 group-hover:text-text transition-colors duration-300" />
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-8">
            <h3 className="text-text font-medium">Navigation</h3>
            <div className="grid grid-cols-1 gap-3">
              {[
                "Home",
                "Popular Anime",
                "New Releases",
                "My Watchlist",
                "Browse All",
              ].map((item) => (
                <Link
                  key={item}
                  to="/"
                  className="text-secText text-sm hover:text-text transition-colors duration-300 w-fit"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Genres */}
          <div className="space-y-8">
            <h3 className="text-text font-medium">Popular Genres</h3>
            <div className="grid grid-cols-1 gap-3">
              {[
                "Action",
                "Romance",
                "Slice of Life",
                "Fantasy",
                "Sci-Fi",
                "Sports",
              ].map((genre) => (
                <Link
                  key={genre}
                  to="/"
                  className="text-secText text-sm hover:text-text transition-colors duration-300 w-fit"
                >
                  {genre}
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-8">
            <h3 className="text-text font-medium">Join Newsletter</h3>
            <div className="space-y-4">
              <p className="text-secText text-sm">
                Get notified about the latest anime releases and updates.
              </p>
              <div className="space-y-3">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full bg-third border border-border/20 rounded-lg px-4 py-2.5 text-sm text-text placeholder:text-grayText focus:outline-none focus:border-border/40 transition-all duration-300"
                  />
                </div>
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-4 py-2.5 bg-third hover:bg-border/20 border border-border/20 hover:border-border/40 rounded-lg text-text text-sm transition-all duration-300"
                >
                  Subscribe
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-secText text-sm">
              {currentYear} AniHeaven. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              {["Terms", "Privacy", "Support"].map((item) => (
                <Link
                  key={item}
                  to="/"
                  className="text-secText text-sm hover:text-text transition-colors duration-300"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
