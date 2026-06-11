import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import logo from '../../asset/Lucina-logo.webp';
import whiteArrowIcon  from '../../asset/arrow.png';
import purpleArrowIcon  from '../../asset/arrow2.png';
import star  from '../../asset/star.png';
import downArrow   from '../../asset/down.png';



const Navbar = () => {
   const location = useLocation();
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
      <header className={`sticky top-0 z-[999] transition-all shadow-sm duration-300 ${scrolled ? 'bg-navy shadow-[0_2px_20px_rgba(0,0,0,0.25)]' : 'bg-white'}`}>
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
                `navbar-link-text px-3 py-[7px] rounded-md text-[14px] font-medium transition-all duration-200 whitespace-nowrap no-underline ${
                  scrolled
                    ? isActive ? 'text-white bg-white/10' : 'text-white/80 hover:text-[#E8619A]'
                    : isActive ? 'text-[#7B3FA0] bg-[#F3EEF8]' : 'text-[#4A4A5A] hover:text-[#7B3FA0] hover:bg-none'
                }`
              }
            >
              Find an Egg Donor
            </NavLink>

            {/* ReflEggction AI badge */}
            <div className="relative z-[1] flex items-center justify-center overflow-visible px-3 py-1 rounded-md transition-all duration-200">
              <NavLink
                to="/find-an-egg-donor"
                className={({ isActive }) =>
                  `lucina-highlight-text ${scrolled ? 'scrolled' : ''} relative inline-flex items-center justify-center ai-gradient-text text-[14px] font-semibold leading-none no-underline ${
                    scrolled
                      ? isActive
                        ? 'text-white'
                        : 'hover:text-[#E8619A]'
                      : isActive
                        ? 'text-[#7B3FA0]'
                        : ''
                  }`
                }
              >
                Lucina ReflEggction AI
              </NavLink>
            </div>

            <NavLink
              to="/why-choose-lucina"
              className={({ isActive }) =>
                `navbar-link-text px-3 py-[7px] rounded-md text-[14px] font-medium transition-all duration-200 whitespace-nowrap no-underline ${
                  scrolled
                    ? isActive ? 'text-white bg-white/10' : 'text-white/80 hover:text-[#E8619A]'
                    : isActive ? 'text-[#7B3FA0] bg-[#F3EEF8]' : 'text-[#4A4A5A] hover:text-[#7B3FA0] hover:bg-none'
                }`
              }
            >
              Why Lucina
            </NavLink>

            <NavLink
              to="/become-an-egg-donor"
              className={({ isActive }) =>
                `navbar-link-text px-3 py-[7px] rounded-md text-[14px] font-medium transition-all duration-200 whitespace-nowrap no-underline ${
                  scrolled
                    ? isActive ? 'text-white bg-white/10' : 'text-white/80 hover:text-[#E8619A]'
                    : isActive ? 'text-[#7B3FA0] bg-[#F3EEF8]' : 'text-[#4A4A5A] hover:text-[#7B3FA0] hover:bg-none'
                }`
              }
            >
              Become an Egg Donor
            </NavLink>

            {/* Resources Dropdown */}
            <div className="relative" onMouseEnter={() => setResourcesOpen(true)} onMouseLeave={() => setResourcesOpen(false)}>
              <button
                className={`navbar-link-text flex items-center gap-[6px] px-3 py-[7px] rounded-md text-[14px] font-medium transition-all duration-200 bg-transparent border-0 cursor-pointer ${
                  scrolled
                    ? 'text-white/80 hover:text-[#E8619A]'
                    : 'text-[#4A4A5A] hover:text-[#7B3FA0] hover:bg-none'
                }`}
              >
                Resources

                <img
                  src={downArrow}
                  alt="down arrow"
                  className="w-4 h-4"
                />
              </button>
              {resourcesOpen && (
                <div className="absolute top-[calc(100%+10px)] left-0 bg-white rounded-[10px] shadow-[0_8px_32px_rgba(0,0,0,0.18)] min-w-[190px] overflow-hidden border border-gray-100 z-50 animate-[dropIn_0.15s_ease]">
                  <NavLink to="/financial-resources" className="navbar-link-text block px-[18px] py-3 text-[14px] text-[#4A4A5A] hover:bg-none hover:text-[#6B2D8B] transition-all duration-150 no-underline" onClick={() => setResourcesOpen(false)}>Financial Resources</NavLink>
                  <NavLink to="/blog"                className="navbar-link-text block px-[18px] py-3 text-[14px] text-[#4A4A5A] hover:bg-none hover:text-[#6B2D8B] transition-all duration-150 no-underline" onClick={() => setResourcesOpen(false)}>Blog</NavLink>
                  <NavLink to="/contact-us"          className="navbar-link-text block px-[18px] py-3 text-[14px] text-[#4A4A5A] hover:bg-none hover:text-[#6B2D8B] transition-all duration-150 no-underline" onClick={() => setResourcesOpen(false)}>Contact Us</NavLink>
                </div>
              )}
            </div>

            {/* Clinics Dropdown */}
            <div className="relative" onMouseEnter={() => setClinicsOpen(true)} onMouseLeave={() => setClinicsOpen(false)}>
              <button
                className={`navbar-link-text flex items-center gap-[6px] px-3 py-[7px] rounded-md text-[14px] font-medium transition-all duration-200 bg-transparent border-0 cursor-pointer ${
                  scrolled
                    ? 'text-white/80 hover:text-[#E8619A]'
                    : 'text-[#4A4A5A] hover:text-[#7B3FA0]'
                }`}
              >
                Clinics

                <img
                  src={downArrow}
                  alt="down arrow"
                  className="w-5 h-5"
                />
              </button>
              {clinicsOpen && (
                <div className="absolute top-[calc(100%+10px)] left-0 bg-white rounded-[10px] shadow-[0_8px_32px_rgba(0,0,0,0.18)] min-w-[190px] overflow-hidden border border-gray-100 z-50 animate-[dropIn_0.15s_ease]">
                  <NavLink to="/contact-us" className="navbar-link-text block px-[18px] py-3 text-[14px] text-[#4A4A5A] hover:text-[#6B2D8B] transition-all duration-150 no-underline" onClick={() => setClinicsOpen(false)}>Become a Partner</NavLink>
                </div>
              )}
            </div>
            {/* CTA Button */}
         <Link
          to="/find-an-egg-donor"
          className={`group hidden lg:inline-flex items-center gap-3 flex-shrink-0 px-7 py-3 border-[2px] rounded-full text-[15px] font-semibold transition-all duration-300 whitespace-nowrap no-underline ${
            scrolled
              ? 'border-white/70 text-white hover:bg-[#E84D8A] hover:border-[#E84D8A] hover:text-white'
              : 'border-[#7B3FA0] text-[#7B3FA0] hover:bg-[#7B3FA0] hover:border-[#7B3FA0] hover:text-white'
          }`}
        >
          Donor Gallery Access

          <img
            src={scrolled ? whiteArrowIcon : purpleArrowIcon}
            alt="arrow"
            className={`w-7 h-7 transition-all duration-300 ${
              !scrolled ? 'group-hover:hidden' : ''
            }`}
          />

          {!scrolled && (
            <img
              src={whiteArrowIcon}
              alt="arrow"
              className="hidden w-7 h-7 group-hover:block"
            />
          )}
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
        {location.pathname !== "/become-an-egg-donor" && (
          <div className="bg-gradient-to-r from-[#E8619A] to-[#7B3FA0] text-white text-center px-5 py-[8px] text-[14px] font-medium">
            <img
              src={star}
              alt="star"
              className="inline-block w-5 h-5 mr-2 align-middle"
            />

            Flash Sale: Select donors with special pricing & blastocyst guarantees.

            <Link
              to="/find-an-egg-donor"
              className="view-donor-btn inline-block ml-3.5 px-4 py-1 border-[1.5px] border-white rounded-full text-[13px] font-semibold no-underline transition-all duration-200"
            >
              <span className="animated-gradient-text">
                View Eligible Donors
              </span>
            </Link>
          </div>
        )}







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
                  `navbar-link-text block px-4 py-[13px] text-[15px] font-medium rounded-lg transition-all duration-200 no-underline ${isActive ? 'bg-white/10 text-white' : 'text-white/75 hover:bg-white/10 hover:text-white'}`
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
        .navbar-link-text { font-family: 'Montserrat', 'Helvetica Neue', Arial, sans-serif; }
        .lucina-highlight-text::before {
          content: "Find Donor With";
          position: absolute;
          top: -25px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
          overflow: visible;
          width: max-content;
          color: #8a62a5;
          -webkit-text-fill-color: #8a62a5;
          border-radius: 999px;
          background: linear-gradient(91deg, rgba(138, 98, 165, .24) 0, rgba(237, 117, 168, .24) 100%);
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 10px;
          padding: 7px 8px;
          font-weight: 600;
          line-height: 8px;
          white-space: nowrap;
          pointer-events: none;
        }
        .lucina-highlight-text.scrolled::before {
          color: #ffffff;
          -webkit-text-fill-color: #ffffff;
          background: rgba(255, 255, 255, 0.12);
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.16);
        }
        @media (max-width: 1100px) {
          .nav-link { padding: 7px 9px; font-size: 13px; }
        }
      `}</style>
    </>
  );
};

export default Navbar;
