import React from 'react';
import { Link } from 'react-router-dom';

/* ── Bird Logo for Footer ── */
const FooterLogo = () => (
  <div className="flex flex-col items-center gap-1.5 mb-6">
    <svg width="56" height="60" viewBox="0 0 56 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="28" cy="40" rx="16" ry="19" fill="#7B3FA0" opacity="0.85"/>
      <ellipse cx="18" cy="38" rx="8"  ry="12" fill="#9B5EC0" opacity="0.6"/>
      <path d="M12 22 C5 14, 3 6, 10 3 C16 1, 20 9, 18 18Z" fill="#E8619A"/>
      <path d="M26 22 C28 12, 38 6, 44 12 C50 18, 44 26, 36 22Z" fill="#E8619A" opacity="0.7"/>
      <ellipse cx="20" cy="20" rx="9" ry="6" fill="#9B5EC0"/>
      <circle cx="23" cy="17" r="2" fill="#4A1A6E"/>
    </svg>
    <div className="text-center">
      <div className="font-sans text-[22px] font-extrabold tracking-[4px] text-[#4A1A6E] uppercase">LUCINA</div>
      <div className="font-sans text-[10px] text-[#9B5EC0] tracking-[3px] uppercase">— Egg Bank —</div>
    </div>
  </div>
);

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
  <footer className="bg-white border-t border-[#F0E8F8]">
    <div className="container pt-14 pb-8 px-8">
      <div className="grid gap-12 items-start footer-grid">
        {/* Column 1 — Logo + Address */}
        <div className="flex flex-col">
          <FooterLogo />
          <div className="text-[14px] text-[#4A4A5A] leading-[1.7]">
            <p className="mb-1">3661 Valley Centre Dr., Suite 160</p>
            <p className="mb-3">San Diego, CA 92130</p>
            <p className="mb-0.5">Tel. <a href="tel:8583453274" className="text-[#7B3FA0] no-underline">858-345-3274</a></p>
            <p className="mb-3">Fax. 858-345-3278</p>
            <p><a href="mailto:info@lucinaeggbank.com" className="text-[#7B3FA0] no-underline">info@lucinaeggbank.com</a></p>
          </div>
        </div>

        {/* Column 2 — Services */}
        <div>
          <h5 className="font-sans text-[15px] font-bold text-[#1A1A2E] mb-[18px]">Services</h5>
          <ul className="flex flex-col gap-2.5">
            <li><Link to="/find-an-egg-donor"   className="text-[14px] text-[#6B7280] no-underline hover:text-[#7B3FA0] transition-colors duration-200">Find a Donor</Link></li>
            <li><Link to="/become-an-egg-donor" className="text-[14px] text-[#6B7280] no-underline hover:text-[#7B3FA0] transition-colors duration-200">Become an Egg Donor</Link></li>
            <li><a href="#"                     className="text-[14px] text-[#6B7280] no-underline hover:text-[#7B3FA0] transition-colors duration-200">Clinics</a></li>
            <li><a href="#"                     className="text-[14px] text-[#6B7280] no-underline hover:text-[#7B3FA0] transition-colors duration-200">Join our Referral Program</a></li>
          </ul>
        </div>

        {/* Column 3 — About */}
        <div>
          <h5 className="font-sans text-[15px] font-bold text-[#1A1A2E] mb-[18px]">About</h5>
          <ul className="flex flex-col gap-2.5">
            <li><Link to="/why-choose-lucina"   className="text-[14px] text-[#6B7280] no-underline hover:text-[#7B3FA0] transition-colors duration-200">Why Lucina</Link></li>
            <li><Link to="/financial-resources" className="text-[14px] text-[#6B7280] no-underline hover:text-[#7B3FA0] transition-colors duration-200">Financial Resources</Link></li>
            <li><Link to="/blog"                className="text-[14px] text-[#6B7280] no-underline hover:text-[#7B3FA0] transition-colors duration-200">Blog</Link></li>
            <li><Link to="/contact-us"          className="text-[14px] text-[#6B7280] no-underline hover:text-[#7B3FA0] transition-colors duration-200">Contact Us</Link></li>
            <li><a href="#"                     className="text-[14px] text-[#6B7280] no-underline hover:text-[#7B3FA0] transition-colors duration-200">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Column 4 — CTA + Socials */}
        <div className="flex flex-col items-start">
          <Link
            to="/find-an-egg-donor"
            className="inline-flex items-center px-6 py-[11px] border-[1.5px] border-[#7B3FA0] rounded-full text-[14px] font-semibold text-[#7B3FA0] mb-7 transition-all duration-200 no-underline hover:bg-[#7B3FA0] hover:text-white"
          >
            View Egg Donors
          </Link>
          <div className="flex gap-2 flex-wrap">
            <SocialCircle label="FB"  href="https://www.facebook.com/LucinaEggBank" />
            <SocialCircle label="TT"  href="https://www.tiktok.com/@lucinaeggbank" />
            <SocialCircle label="IG"  href="https://www.instagram.com/lucinaeggbank" />
            <SocialCircle label="P"   href="https://www.pinterest.com/lucinaeggbank" />
            <SocialCircle label="LI"  href="https://www.linkedin.com/company/lucinaeggbank/" />
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-[#F0E8F8] mt-10 pt-5 text-center text-[13px] text-[#9CA3AF]">
        Copyright {new Date().getFullYear()} © All rights reserved
      </div>
    </div>

    <style>{`
      .footer-grid {
        grid-template-columns: 1.4fr 1fr 1fr 1fr;
        gap: 48px;
      }
      @media (max-width: 1024px) { .footer-grid { grid-template-columns: 1fr 1fr; gap: 36px; } }
      @media (max-width: 600px)  { .footer-grid { grid-template-columns: 1fr; gap: 28px; } .footer-grid > div:first-child { align-items: center; text-align: center; } }
    `}</style>
  </footer>
);

export default Footer;
