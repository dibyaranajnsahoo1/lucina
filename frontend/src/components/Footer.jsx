import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../asset/Lucina-logo.webp';



/* ── Social Icon ── */
const SocialCircle = ({ label, href }) => (
  <a
    href={href || '#'}
    target="_blank"
    rel="noopener"
    className="w-9 h-9 rounded-full border-[1.5px] border-[#D4B8E8] flex items-center justify-center text-[11px] font-bold text-[#7B3FA0] transition-all duration-200 no-underline hover:bg-[#7B3FA0] hover:text-white hover:border-[#7B3FA0]"
  >
    {label}
  </a>
);

const Footer = () => (
  <footer className="bg-white py-12">
  <div className="max-w-[1800px] mx-auto px-8">
    <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr_1fr_220px] gap-16 items-start">

      {/* Logo */}
      <div>
        <img
          src={logo}
          alt="Lucina Egg Bank"
          className="w-[150px]"
        />
      </div>

      {/* Contact */}
      <div>
        <h3 className="font-serif text-[22px] text-[#1D1633] mb-6">
          Lucina Egg Bank
        </h3>

        <div className="space-y-3 text-[14px] text-[#36304A]">
          <p>3661 Valley Centre Dr., Suite 160</p>
          <p>San Diego, CA 92130</p>

          <p className="pt-2">
            Tel. 858-345-3274
          </p>

          <p>
            Fax. 858-345-3278
          </p>

          <p>
            info@lucinaeggbank.com
          </p>
        </div>
      </div>

      {/* Services + About */}
      <div className="grid grid-cols-2 gap-20">
        <div>
          <h3 className="font-serif text-[22px] text-[#1D1633] mb-6">
            Services
          </h3>

          <ul className="space-y-5 text-[14px]">
            <li>
              <Link
                to="/find-an-egg-donor"
                className="text-[#36304A] hover:text-[#8C5BB3]"
              >
                Find a Donor
              </Link>
            </li>

            <li>
              <Link
                to="/become-an-egg-donor"
                className="text-[#36304A] hover:text-[#8C5BB3]"
              >
                Become an Egg Donor
              </Link>
            </li>

            <li>
              <a
                href="#"
                className="text-[#36304A] hover:text-[#8C5BB3]"
              >
                Clinics
              </a>
            </li>

            <li>
              <a
                href="#"
                className="text-[#36304A] hover:text-[#8C5BB3]"
              >
                Join our Referral Program
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-serif text-[22px] text-[#1D1633] mb-6">
            About
          </h3>

          <ul className="space-y-5 text-[14px]">
            <li>
              <Link
                to="/why-choose-lucina"
                className="text-[#36304A] hover:text-[#8C5BB3]"
              >
                Why Lucina
              </Link>
            </li>

            <li>
              <Link
                to="/financial-resources"
                className="text-[#36304A] hover:text-[#8C5BB3]"
              >
                Financial Resources
              </Link>
            </li>

            <li>
              <Link
                to="/blog"
                className="text-[#36304A] hover:text-[#8C5BB3]"
              >
                Blog
              </Link>
            </li>

            <li>
              <Link
                to="/contact-us"
                className="text-[#36304A] hover:text-[#8C5BB3]"
              >
                Contact Us
              </Link>
            </li>

            <li>
              <a
                href="#"
                className="text-[#36304A] hover:text-[#8C5BB3]"
              >
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* CTA + Social */}
      <div className="flex flex-col items-end">
        <Link
          to="/find-an-egg-donor"
          className="h-[50px] px-8 rounded-full border border-[#8C5BB3] text-[#8C5BB3] font-semibold flex items-center justify-center hover:bg-[#8C5BB3] hover:text-white transition"
        >
          View Egg Donors
        </Link>

        <div className="flex gap-3 mt-8">
          {["FB", "TT", "IG", "P", "LI"].map((item) => (
            <a
              key={item}
              href="#"
              className="w-8 h-8 rounded-full border border-[#DCCBE8] flex items-center justify-center text-[12px] text-[#8C5BB3] hover:bg-[#8C5BB3] hover:text-white transition"
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </div>

    <div className="text-center mt-12 text-[14px] text-[#36304A]">
      Copyright 2026 © All rights reserved
    </div>
  </div>
</footer>
);

export default Footer;
