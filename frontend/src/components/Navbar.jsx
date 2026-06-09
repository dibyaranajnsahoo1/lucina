import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import logo from '../../asset/Lucina-logo.webp';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [clinicsOpen, setClinicsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* ─── Main Navbar ─── */}
      <header className={`sticky top-0 z-[999] transition-all duration-300 ${scrolled ? 'bg-navy shadow-[0_2px_20px_rgba(0,0,0,0.25)]' : 'bg-white'}`}>
        <div className="container flex items-center h-[95px] gap-3">
          <Link to="/" className="no-underline flex items-center flex-shrink-0">
            <img
              src={logo}
              alt="Lucina Egg Bank"
              className={`h-[75px] w-auto block transition-all duration-300 ${scrolled ? 'brightness-0 invert' : ''}`}
            />
          </Link>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center flex-1 justify-end gap-0.5">
            <NavLink
              to="/find-an-egg-donor"
              className={({ isActive }) =>
                `px-3 py-[7px] rounded-md text-[14px] font-medium transition-all duration-200 whitespace-nowrap no-underline ${
                  scrolled
                    ? isActive ? 'text-white bg-white/10' : 'text-white/80 hover:text-white hover:bg-white/10'
                    : isActive ? 'text-[#7B3FA0] bg-[#F3EEF8]' : 'text-[#4A4A5A] hover:text-[#7B3FA0] hover:bg-none'
                }`
              }
            >
              Find an Egg Donor
            </NavLink>

            {/* ReflEggction AI badge */}
            <NavLink
              to="/find-an-egg-donor"
              className={({ isActive }) =>
                `flex flex-col items-center justify-center px-3 py-1 rounded-md transition-all duration-200 no-underline ${
                  scrolled
                    ? isActive
                      ? 'bg-white/10'
                      : 'hover:bg-white/10'
                    : isActive
                      ? 'bg-[#F3EEF8]'
                      : ''
                }`
              }
            >
              <span
                className={`text-[10px] px-3 py-1 rounded-full font-semibold tracking-[0.3px] transition-all duration-200 ${
                  scrolled
                    ? 'bg-white/15 text-white'
                    : 'bg-[#EEDCF5] text-[#8E5BB3]'
                }`}
              >
                Find Donor With
              </span>

              <span className="ai-gradient-text text-[14px] font-semibold leading-none mt-[2px]">
                Lucina ReflEggction AI
              </span>
            </NavLink>

            <NavLink
              to="/why-choose-lucina"
              className={({ isActive }) =>
                `px-3 py-[7px] rounded-md text-[14px] font-medium transition-all duration-200 whitespace-nowrap no-underline ${
                  scrolled
                    ? isActive ? 'text-white bg-white/10' : 'text-white/80 hover:text-white hover:bg-white/10'
                    : isActive ? 'text-[#7B3FA0] bg-[#F3EEF8]' : 'text-[#4A4A5A] hover:text-[#7B3FA0] hover:bg-[#F3EEF8]'
                }`
              }
            >
              Why Lucina
            </NavLink>

            <NavLink
              to="/become-an-egg-donor"
              className={({ isActive }) =>
                `px-3 py-[7px] rounded-md text-[14px] font-medium transition-all duration-200 whitespace-nowrap no-underline ${
                  scrolled
                    ? isActive ? 'text-white bg-white/10' : 'text-white/80 hover:text-white hover:bg-white/10'
                    : isActive ? 'text-[#7B3FA0] bg-[#F3EEF8]' : 'text-[#4A4A5A] hover:text-[#7B3FA0] hover:bg-none'
                }`
              }
            >
              Become an Egg Donor
            </NavLink>

            {/* Resources Dropdown */}
            <div className="relative" onMouseEnter={() => setResourcesOpen(true)} onMouseLeave={() => setResourcesOpen(false)}>
              <button className={`flex items-center gap-[3px] px-3 py-[7px] rounded-md text-[14px] font-medium transition-all duration-200 bg-transparent border-0 cursor-pointer ${
                scrolled ? 'text-white/80 hover:text-white hover:bg-white/10' : 'text-[#4A4A5A] hover:text-[#7B3FA0] hover:bg-none'
              }`}>
                Resources <ChevronDown size={13} />
              </button>
              {resourcesOpen && (
                <div className="absolute top-[calc(100%+10px)] left-0 bg-white rounded-[10px] shadow-[0_8px_32px_rgba(0,0,0,0.18)] min-w-[190px] overflow-hidden border border-gray-100 z-50 animate-[dropIn_0.15s_ease]">
                  <NavLink to="/financial-resources" className="block px-[18px] py-3 text-[14px] text-[#4A4A5A] hover:bg-[#F3EEF8] hover:text-[#6B2D8B] transition-all duration-150 no-underline" onClick={() => setResourcesOpen(false)}>Financial Resources</NavLink>
                  <NavLink to="/blog"                className="block px-[18px] py-3 text-[14px] text-[#4A4A5A] hover:bg-[#F3EEF8] hover:text-[#6B2D8B] transition-all duration-150 no-underline" onClick={() => setResourcesOpen(false)}>Blog</NavLink>
                  <NavLink to="/contact-us"          className="block px-[18px] py-3 text-[14px] text-[#4A4A5A] hover:bg-[#F3EEF8] hover:text-[#6B2D8B] transition-all duration-150 no-underline" onClick={() => setResourcesOpen(false)}>Contact Us</NavLink>
                </div>
              )}
            </div>

            {/* Clinics Dropdown */}
            <div className="relative" onMouseEnter={() => setClinicsOpen(true)} onMouseLeave={() => setClinicsOpen(false)}>
              <button className={`flex items-center gap-[3px] px-3 py-[7px] rounded-md text-[14px] font-medium transition-all duration-200 bg-transparent border-0 cursor-pointer ${
                scrolled ? 'text-white/80 hover:text-white hover:bg-white/10' : 'text-[#4A4A5A] hover:text-[#7B3FA0] hover:bg-[#F3EEF8]'
              }`}>
                Clinics <ChevronDown size={13} />
              </button>
              {clinicsOpen && (
                <div className="absolute top-[calc(100%+10px)] left-0 bg-white rounded-[10px] shadow-[0_8px_32px_rgba(0,0,0,0.18)] min-w-[190px] overflow-hidden border border-gray-100 z-50 animate-[dropIn_0.15s_ease]">
                  <NavLink to="/contact-us" className="block px-[18px] py-3 text-[14px] text-[#4A4A5A] hover:bg-[#F3EEF8] hover:text-[#6B2D8B] transition-all duration-150 no-underline" onClick={() => setClinicsOpen(false)}>Become a Partner</NavLink>
                </div>
              )}
            </div>
            {/* CTA Button */}
          <Link
            to="/find-an-egg-donor"
            className={`hidden lg:inline-flex flex-shrink-0 px-[22px] py-[10px] border-[1.5px] rounded-full text-[14px] font-semibold transition-all duration-200 whitespace-nowrap no-underline ${
              scrolled
                ? 'border-white/70 text-white hover:bg-white hover:text-[#4A1A6E]'
                : 'border-[#7B3FA0] text-[#7B3FA0] hover:bg-[#7B3FA0] hover:text-white'
            }`}
          >
            Donor Gallery Access&nbsp;→
          </Link>
          </nav>

          

          {/* Mobile hamburger */}
          <button
            className="lg:hidden ml-auto p-1.5 bg-transparent border-0 cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X size={22} color={scrolled ? "white" : "#1A1A2E"} /> : <Menu size={22} color={scrolled ? "white" : "#1A1A2E"} />}
          </button>
        </div>

        {/* ─── Announcement Bar ─── */}
        <div className="bg-gradient-to-r from-[#E8619A] to-[#7B3FA0] text-white text-center px-5 py-[10px] text-[14px] font-medium">
          <span role="img" aria-label="sale">🎀</span>
          &nbsp;Flash Sale: Select donors with special pricing &amp; blastocyst guarantees.&nbsp;
          <a
            href="/find-an-egg-donor"
            className="view-donor-btn inline-block ml-3.5 px-4 py-1 border-[1.5px] border-white rounded-full text-[13px] font-semibold no-underline transition-all duration-200"
          >
            <span className="animated-gradient-text">
              View Eligible Donors
            </span>
          </a>
        </div>
      </header>

      {/* ─── Mobile Menu ─── */}
      {mobileOpen && (
        <>
          <div className="fixed inset-0 bg-black/40 z-[1000]" onClick={() => setMobileOpen(false)} />
          <nav className="fixed top-0 right-0 w-[300px] h-screen bg-[#2D1353] z-[1001] pt-20 px-6 pb-8 flex flex-col gap-1 overflow-y-auto">
            {[
              { to: '/', label: 'Home' },
              { to: '/find-an-egg-donor',   label: 'Find an Egg Donor' },
              { to: '/why-choose-lucina',   label: 'Why Lucina' },
              { to: '/become-an-egg-donor', label: 'Become an Egg Donor' },
              { to: '/financial-resources', label: 'Financial Resources' },
              { to: '/blog',                label: 'Blog' },
              { to: '/contact-us',          label: 'Contact Us' },
            ].map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `block px-4 py-[13px] text-[15px] font-medium rounded-lg transition-all duration-200 no-underline ${isActive ? 'bg-white/10 text-white' : 'text-white/75 hover:bg-white/10 hover:text-white'}`
                }
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
            <Link
              to="/find-an-egg-donor"
              className="btn btn-pink mt-4 w-full justify-center"
              onClick={() => setMobileOpen(false)}
            >
              Donor Gallery Access →
            </Link>
          </nav>
        </>
      )}

      <style>{`
        @keyframes dropIn { from { opacity:0; transform:translateY(-6px); } to { opacity:1; transform:translateY(0); } }
        .bg-navy { background-color: #533b63; }
        @media (max-width: 1100px) {
          .nav-link { padding: 7px 9px; font-size: 13px; }
        }
      `}</style>
    </>
  );
};

export default Navbar;
