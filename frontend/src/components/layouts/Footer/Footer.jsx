import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-background/95 text-text/80 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Navigation */}
          <div className="flex flex-col gap-3">
            <h4 className="text-text text-sm font-medium mb-1">Navigation</h4>
            <Link to="/browse" className="text-xs hover:text-primary">
              Browse Anime
            </Link>
            <Link to="/trending" className="text-xs hover:text-primary">
              Trending
            </Link>
            <Link to="/latest" className="text-xs hover:text-primary">
              Latest Episodes
            </Link>
            <Link to="/movies" className="text-xs hover:text-primary">
              Movies
            </Link>
            <Link to="/genres" className="text-xs hover:text-primary">
              Genres
            </Link>
          </div>

          {/* Connect With Us */}
          <div className="flex flex-col gap-3">
            <h4 className="text-text text-sm font-medium mb-1">
              Connect With Us
            </h4>
            <a
              href="#"
              className="text-xs hover:text-primary flex items-center gap-2"
            >
              <FaYoutube className="w-4 h-4" /> Youtube
            </a>
            <a
              href="#"
              className="text-xs hover:text-primary flex items-center gap-2"
            >
              <FaFacebookF className="w-4 h-4" /> Facebook
            </a>
            <a
              href="#"
              className="text-xs hover:text-primary flex items-center gap-2"
            >
              <FaTwitter className="w-4 h-4" /> X
            </a>
            <a
              href="#"
              className="text-xs hover:text-primary flex items-center gap-2"
            >
              <FaInstagram className="w-4 h-4" /> Instagram
            </a>
            <a
              href="#"
              className="text-xs hover:text-primary flex items-center gap-2"
            >
              <FaTiktok className="w-4 h-4" /> TikTok
            </a>
          </div>

          {/* Features */}
          <div className="flex flex-col gap-3">
            <h4 className="text-text text-sm font-medium mb-1">Features</h4>
            <Link to="/watchlist" className="text-xs hover:text-primary">
              My Watchlist
            </Link>
            <Link to="/history" className="text-xs hover:text-primary">
              Watch History
            </Link>
            <Link to="/notifications" className="text-xs hover:text-primary">
              Notifications
            </Link>
            <Link to="/settings" className="text-xs hover:text-primary">
              Settings
            </Link>
            <Link to="/help" className="text-xs hover:text-primary">
              Help Center
            </Link>
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-3">
            <h4 className="text-text text-sm font-medium mb-1">Legal</h4>
            <Link to="/terms" className="text-xs hover:text-primary">
              Terms of Service
            </Link>
            <Link to="/privacy" className="text-xs hover:text-primary">
              Privacy Policy
            </Link>
            <Link to="/disclaimer" className="text-xs hover:text-primary">
              Content Disclaimer
            </Link>
            <Link to="/dmca" className="text-xs hover:text-primary">
              DMCA Notice
            </Link>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-4 border-t border-text/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col gap-2">
            <p className="text-[11px] text-text/60"> 2024 AniHeaven, LLC</p>
            <p className="text-[11px] text-text/60">
              This is a personal project for educational purposes only. Not for
              commercial use. All rights belong to their respective owners.
            </p>
          </div>
          <div className="flex gap-4">
            <Link
              to="/api-attribution"
              className="text-[11px] text-text/60 hover:text-primary"
            >
              API Attribution
            </Link>
            <Link
              to="/content-notice"
              className="text-[11px] text-text/60 hover:text-primary"
            >
              Content Sources & Notice
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
