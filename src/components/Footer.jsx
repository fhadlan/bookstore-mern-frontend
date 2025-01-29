import React from "react";
import footerLogo from "../assets/footer-logo.png";

import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="bg-gray-900 px-4 py-10 text-white">
      {/* Top Section */}
      <div className="container mx-auto flex flex-col items-center justify-between gap-8 md:flex-row">
        {/* Left Side - Logo and Nav */}
        <div className="w-full md:w-1/2">
          <img src={footerLogo} alt="Logo" className="mb-5 w-36" />
          <ul className="flex flex-col gap-4 md:flex-row">
            <li>
              <a href="#home" className="hover:text-primary">
                Home
              </a>
            </li>
            <li>
              <a href="#services" className="hover:text-primary">
                Services
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-primary">
                About Us
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-primary">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Right Side - Newsletter */}
        <div className="w-full md:w-1/2">
          <p className="mb-4">
            Subscribe to our newsletter to receive the latest updates, news, and
            offers!
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-l-md bg-[#eaeaea] px-4 py-2 text-black focus:outline-none"
            />
            <button className="bg-primary hover:bg-primary-dark rounded-r-md px-6 py-2">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="container mx-auto mt-10 flex flex-col items-center justify-between border-t border-gray-700 pt-6 md:flex-row">
        {/* Left Side - Privacy Links */}
        <ul className="mb-4 flex gap-6 md:mb-0">
          <li>
            <a href="#privacy" className="hover:text-primary">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#terms" className="hover:text-primary">
              Terms of Service
            </a>
          </li>
        </ul>

        {/* Right Side - Social Icons */}
        <div className="flex gap-6">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary"
          >
            <FaFacebook size={24} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary"
          >
            <FaTwitter size={24} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary"
          >
            <FaInstagram size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
