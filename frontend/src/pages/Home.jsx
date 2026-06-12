import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getTestimonials } from '../utils/api';
import whiteArrowIcon  from '../../asset/arrow.png';
import purpleArrowIcon  from '../../asset/arrow2.png';
import parentIcon from '../../asset/Intended.png';
import donorIcon from '../../asset/female.png';
import partnerIcon from '../../asset/doclogo.png';




/* ══════════════════════════════════════════
   SECTION 1 — HERO
══════════════════════════════════════════ */
const HeroSection = () => (
  <section className="bg-white py-[30px] pb-[80px] overflow-hidden">
    <div className="container grid grid-cols-2 gap-[60px]  hero-inner">
      {/* Left */}
      <div>
       <p className="font-montserrat text-[16px] text-[#7B3FA0] font-semibold mb-4 flex items-center gap-2">
        ─── Lucina Egg Bank
      </p>
        <h1 className="font-serif text-[clamp(50px,5.5vw,63px)] font-medium text-[#1A1A2E] leading-[1.1] mb-6">
          Largest Egg Bank With Top<br />10% of Egg Donors
        </h1>
        <p className="text-[20px] text-[#4A4A5A] leading-[1.3] mb-9">
          For over 30 years, Lucina Egg Bank has helped bring dreams to life,
          providing unparalleled care for intended parents and a supportive, rewarding
          experience for every egg donor. Located in San Diego, California, we combine
          medical precision with unwavering compassion, making every path to
          parenthood clear, supported, and full of hope for all aspiring families.
        </p>
        <div className="flex gap-4 flex-wrap">
          <Link
          to="/find-an-egg-donor"
          className="inline-flex items-center gap-2 px-9 py-5 rounded-full bg-[#E86BA3] text-white hover:bg-[#E86BA3] hover:text-white hover:underline underline-offset-1"
        >
          <span className="text-[18px] font-semibold font-montserrat">
            Find a Donor
          </span>
          <img
            src={whiteArrowIcon}
            alt="arrow"
            className="w-5 h-5"
          />
        </Link>

        <Link
          to="/become-an-egg-donor"
          className="inline-flex items-center gap-2 px-9 py-5 rounded-full bg-[#8a62a5] text-white hover:bg-[#8a62a5] hover:text-white hover:underline underline-offset-1"
        >
          <span className="text-[18px] font-semibold font-montserrat">
            Become an Egg Donor
          </span>
          <img
            src={whiteArrowIcon}
            alt="arrow"
            className="w-5 h-5"
          />
        </Link>
        </div>
      </div>

      {/* Right Side Image */}
      <div className="relative flex items-center justify-center hero-right">
        <img
          src="https://lucinaeggbank.com/wp-content/uploads/2025/09/Lucina-EggBank.webp"
          alt="Lucina Egg Bank"
          className="w-full h-full object-contain"
        />
      </div>
    </div>

    <style>{`
      @media (max-width: 900px) {
        .hero-inner { grid-template-columns: 1fr !important; }
        .hero-right  { display: none; }
      }
      .btn-pink:hover,
      .btn-purple:hover {
        background-color: inherit;
        color: inherit;
        text-decoration: underline;
        transform: none;
        box-shadow: none;
      }
        
    `}</style>
  </section>
);

/* ══════════════════════════════════════════
   SECTION 2 — PATH TO PARENTHOOD
══════════════════════════════════════════ */
const BirdIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <path d="M6 12 C2 7, 2 2, 6 1 C10 0, 12 5, 10 10Z" fill="#E8619A"/>
    <path d="M12 12 C14 6, 20 3, 24 7 C28 11, 22 16, 16 12Z" fill="#E8619A" opacity="0.7"/>
    <ellipse cx="10" cy="10" rx="5" ry="4" fill="#9B5EC0"/>
  </svg>
);

const PathSection = () => (
  <section className="section bg-white">
    <div className="container">
      <div className="">
        <div className="flex items-start">
          <img
            src="https://lucinaeggbank.com/wp-content/uploads/2021/03/symbol-in-tytle.svg"
            alt="Lucina Symbol"
            className="w-[50px] h-auto shrink-0 "
          />

          <div className="">
            <h2 className="font-serif text-[clamp(38px,4vw,48px)] font-medium leading-[1.1]">
              Your Path to Parenthood Starts Here
            </h2>

            <p className="text-[#4A4A5A] text-[18px] leading-[1.5] mt-6 max-w-[680px] font-montserrat">
              At Lucina, every family-building journey matters because every family is
              unique. We are here to support all aspiring parents, including gay dads,
              single fathers, and couples navigating fertility or genetic needs.
            </p>
          </div>
        </div>
      </div>

      <div className="grid-3 mt-10">
        {[
          {
            icon: parentIcon,
            label: 'For Intended Parents',
            desc: 'Choose from a wide, diverse donor pool with instant availability, transparent pricing, and advanced matching tools.',
            cta: 'Find a Donor',
            link: '/find-an-egg-donor',
          },
          {
            icon: donorIcon,
            label: 'For Egg Donors',
            desc: 'Give the life-changing gift of hope through a rewarding experience backed by expert care and total support from our San Diego-based team.',
            cta: 'Become an Egg Donor',
            link: '/become-an-egg-donor',
          },
          {
            icon: partnerIcon,
            label: 'For Clinics & Partners',
            desc: 'Partner with a Southern California leader in egg donation known for dependable coordination, secure shipping, and full-spectrum donor management.',
            cta: 'Become a Partner',
            link: '/contact-us',
          },
        ].map(c => (
          <div key={c.label} className="bg-[#ed75A81A] rounded-[20px] p-9 px-7 flex flex-col items-center text-center gap-3.5 transition-all duration-200 border  hover:shadow-[0_8px_32px_rgba(107,45,139,0.12)] hover:-translate-y-[3px]">
            <div className="w-16 h-16 bg-[#8a62a5] rounded-full flex items-center justify-center">
              <img
                src={c.icon}
                alt={c.label}
                className="w-8 h-8 object-contain"
              />
            </div>
            <h3 className="font-serif text-[42px] font-medium text-[#7B3FA0]">{c.label}</h3>
            <p className="text-[18px] text-[#4A4A5A] leading-[1.4] flex-1 font-montserrat ">{c.desc}</p>
              <Link
                to={c.link}
                className="group btn btn-sm inline-flex items-center gap-2 bg-[#E86BA3] text-white border-0 hover:bg-[#8a62a5] hover:text-white "
              >
                <span className="group-hover:underline">
                  {c.cta}
                </span>
                <img
                  src={whiteArrowIcon}
                  alt="arrow"
                  className="w-4 h-4"
                />
              </Link>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ══════════════════════════════════════════
   SECTION 3 — LUCINA ADVANTAGE
══════════════════════════════════════════ */
const AdvantageSection = () => {
  const items = [
    { icon: '💎', title: 'Leading Expertise & Trust',       desc: 'Benefit from over 30 years of trusted experience and rigorous FDA-screened donors, ensuring the highest standards of safety and quality.', link: 'Learn More About Lucina', to: '/why-choose-lucina' },
    { icon: '🔍', title: 'Innovative Matching',             desc: 'Discover ReflEggction® AI, the first facial recognition tool of its kind in the U.S., designed to help you find a donor who shares your desired resemblance—streamlining your search by up to 70%.', link: 'Try Lucina Refleggction AI', to: '/find-an-egg-donor' },
    { icon: '⭐', title: 'Unparalleled Choices & Immediate Access', desc: 'Explore the largest and most diverse donor pool with over 3,500+ meticulously screened donors, available now for global shipping to your clinic or local IVF partners in San Diego and across California—eliminating wait times.', link: 'Explore Our Donor Gallery', to: '/find-an-egg-donor' },
    
  ];

  return (
    <section className="section bg-white">
      <div className="container">
        <div className="grid items-center adv-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
          {/* Left — Text */}
          <div className="max-w-[760px]">
          {/* Heading */}
          <div className="relative">
          {/* Icon */}
          <img
            src="https://lucinaeggbank.com/wp-content/uploads/2021/03/symbol-in-tytle.svg"
            alt=""
            className="absolute -left-7 -top-[16px] w-[50px]"
          />

          {/* Heading */}
          <div className="pl-[18px]">
            <h2 className="font-serif text-[58px] leading-[0.95] font-normal text-[#1F1A2E]">
              Your Lucina Advantage:
            </h2>

            <h3 className="font-serif text-[52px] leading-[1] font-normal text-[#E987B3]">
              Science, Support, Success
            </h3>
          </div>
        </div>
          <p className="font-montserrat text-[18px] leading-[1.5] text-[#26263A] max-w-[680px] mb-6 mt-4">
            We make what's complex feel simple—because building your family should
            never be uncertain.
          </p>

          {/* Feature List */}
          <div>
            {items.map((item, i) => (
              <div
                key={item.title}
                className="flex items-start gap-5 py-6 border-t-2 border-[#D9C8E8]"
              >
                {/* Icon */}
                <div className="w-[36px] h-[36px] rounded-full border border-[#E7C7D8] flex items-center justify-center shrink-0 mt-1">
                  {item.icon}
                </div>

                {/* Content */}
                <div className="max-w-[620px]">
                  <h4 className="font-serif text-[22px] leading-[1.3] font-black text-[#1F1A2E] mb-3">
                    {item.title}
                  </h4>

                  <p className=" font-montserrat text-[16px] leading-[1.55] text-[#3F3F53] mb-4">
                    {item.desc}
                  </p>

                 <Link
                  to={item.to}
                  className="group inline-flex items-center gap-2 font-montserrat text-[#8C5BB3] hover:underline text-[16px] font-black hover:text-[#E8619A] transition-colors duration-300"
                >
                  {item.link}

                  <img
                    src={purpleArrowIcon}
                    alt=""
                    className="w-4 h-4 transition-all duration-300 group-hover:opacity-70"
                  />
                </Link>
                </div>
              </div>
            ))}

            {/* Bottom Divider */}
            <div className="border-t-2 border-[#D9C8E8]" />
          </div>
        </div>

          {/* Right — Image */}
         <div className="adv-img-wrap">
          <img
            src="https://lucinaeggbank.com/wp-content/uploads/2022/04/big-Group.webp"
            alt="Happy family"
            className="w-full h-full object-cover"
          />
        </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .adv-grid { grid-template-columns: 1fr !important; }
          .adv-img-wrap { display: none; }
        }
      `}</style>
    </section>
  );
};

/* ══════════════════════════════════════════
   SECTION 4 — SECOND ADVANTAGE
══════════════════════════════════════════ */
const AdvantageSection2 = () => (
  <section className="section ">
    <div className="container">
      <div className="grid gap-[80px] items-center adv2-grid" style={{ gridTemplateColumns: '1fr 1.2fr' }}>
        {/* Left — Oval image */}
       <div className="adv2-img-wrap">
          <img
            src="https://lucinaeggbank.com/wp-content/uploads/2024/09/Group-48098373-1.webp"
            alt="Lucina Egg Bank"
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Right — Items */}
        <div>
          {[
            {
              icon: "🔒",
              title: "Guaranteed Peace of Mind",
              desc: "From embryo development to live birth, our Blastocyst, PGT-A, and Live Birth Guarantee Programs offer built-in financial security and assurance of success.",
              link: "Explore Guarantee Programs",
              to: "/financial-resources",
            },
            {
              icon: "💰",
              title: "Transparent & Accessible",
              desc: "Browse donors instantly with zero upfront costs—pay only when you commit. We also offer flexible financing options and meaningful discounts to make parenthood accessible.",
              link: "Explore Financial Resources",
              to: "/financial-resources",
            },
            {
              icon: "📈",
              title: "Proven Outcomes",
              desc: "Our commitment to excellence delivers results that speak for themselves, with a 92.2% frozen egg survival rate and 61.5% clinical pregnancy success rate in 2022—consistently surpassing industry averages.",
              link: "View Our Success Data",
              to: "/why-choose-lucina",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="flex items-start gap-5 py-6 border-t-2 border-[#D9C8E8]"
            >
              {/* Icon */}
              <div className="w-[36px] h-[36px] rounded-full border border-[#E7C7D8] flex items-center justify-center shrink-0 mt-1">
                {item.icon}
              </div>

              {/* Content */}
              <div className="max-w-[620px]">
                <h4 className="font-serif text-[22px] leading-[1.3] font-black text-[#1F1A2E] mb-3">
                  {item.title}
                </h4>

                <p className="font-montserrat text-[16px] leading-[1.55] text-[#3F3F53] mb-4">
                  {item.desc}
                </p>

                <Link
                  to={item.to}
                  className="group inline-flex items-center gap-2 font-montserrat text-[#8C5BB3] hover:underline text-[16px] font-black hover:text-[#E8619A] transition-colors duration-300"
                >
                  {item.link}

                  <img
                    src={purpleArrowIcon}
                    alt=""
                    className="w-4 h-4 transition-all duration-300 group-hover:opacity-70"
                  />
                </Link>
              </div>
            </div>
          ))}

          <div className="border-t border-[#D9C8E8]" />
        </div>
      </div>
    </div>
    <style>{`
      @media (max-width: 900px) {
        .adv2-grid { grid-template-columns: 1fr !important; }
        .adv2-img-wrap { display: none; }
      }
    `}</style>
  </section>
);

/* ══════════════════════════════════════════
   SECTION 5 — TESTIMONIALS
══════════════════════════════════════════ */
const DEFAULT_TESTIMONIALS = [
  {
    name: "Maria & John",
    content:
      "I could recall the exact moment when my hubby and I decided we were going to have a baby. It was one of the happiest decisions of our lives and Lucina made it possible.",
  },
  {
    name: "Anonymous",
    content:
      "Although I always knew I would have trouble getting pregnant, I did not know my husband and I would face such a long journey. Lucina gave us hope again.",
  },
  {
    name: "Sarah M.",
    content:
      "When my husband and I decided to start a family in 2022, we were thrilled but faced the reality of infertility. The team at Lucina supported us every step.",
  },
  {
    name: "Jennifer",
    content:
      "After multiple failed cycles, Lucina Egg Bank made our dream possible. We are forever grateful for the support and care we received.",
  },
];

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState(DEFAULT_TESTIMONIALS);
  const [currentIndex, setCurrentIndex] = useState(0);

  const repeatedTestimonials = [...testimonials, ...testimonials];

  useEffect(() => {
    getTestimonials({ limit: 4 })
      .then((res) => {
        if (res?.data?.length) {
          setTestimonials(res.data.slice(0, 4));
        }
      })
      .catch(() => {});
  }, []);

  const next = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  const prev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  // Auto Slide
  useEffect(() => {
    const interval = setInterval(() => {
      next();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  // Infinite Loop Reset
  useEffect(() => {
    if (currentIndex >= testimonials.length) {
      const timer = setTimeout(() => {
        setCurrentIndex(0);
      }, 700);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, testimonials.length]);

  return (
    <section className="section bg-white overflow-hidden py-16">
      <div className="max-w-[1800px] ml-auto mr-0 pl-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-12 flex-wrap gap-4 pr-6">
          <div className="flex items-center gap-3">
            <img
              src="https://lucinaeggbank.com/wp-content/uploads/2021/03/symbol-in-tytle.svg"
              alt="Lucina Symbol"
              className="w-[50px] h-auto shrink-0"
            />

            <h2 className="font-serif font-medium text-[clamp(28px,4vw,52px)] leading-tight">
              Stories of <span className="text-[#E8619A]">Hope</span>. Real{" "}
              <span className="text-[#E8619A]">Families</span>. Real{" "}
              <span className="text-[#E8619A]">Joy</span>.
            </h2>
          </div>

          <div className="flex gap-3">
            <button
              onClick={prev}
              className="w-[56px] h-[56px] rounded-full border-2 border-[#7B3FA0] bg-[#EDE8F5] flex items-center justify-center hover:scale-105 transition"
            >
              <img
                src={purpleArrowIcon}
                alt="Previous"
                className="w-5 h-5 rotate-180"
              />
            </button>

            <button
              onClick={next}
              className="w-[56px] h-[56px] rounded-full border-2 border-[#7B3FA0] bg-[#EDE8F5] flex items-center justify-center hover:scale-105 transition"
            >
              <img
                src={purpleArrowIcon}
                alt="Next"
                className="w-5 h-5"
              />
            </button>
          </div>
        </div>

        {/* Slider */}
        <div className="overflow-hidden">
          <div
            className="flex gap-8 transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(calc(-${currentIndex} * 45%))`,
            }}
          >
            {repeatedTestimonials.map((item, index) => {
              const activeIndex = currentIndex % testimonials.length;
              const isPrimary =
                index === activeIndex ||
                index === activeIndex + 1;

              return (
                <div
                  key={index}
                  className={`shrink-0 w-[35%] min-h-[120px] p-8 lg:p-10 transition-all duration-700 ${
                    isPrimary
                      ? "bg-[#EDE8F5] opacity-100"
                      : "bg-[#F3EEF8] opacity-40"
                  }`}
                  style={{
                    borderRadius: "180px 180px 0 180px",
                    border: "1px solid #D9C8E8",
                  }}
                >
                  <p className="font-montserrat text-[16px] leading-[1.8] text-[#8D6DAF]">
                    {item.content}
                  </p>

                  <Link
                    to="/why-choose-lucina"
                    className="inline-block mt-10 text-[18px] font-bold text-[#8C5BB3] underline"
                  >
                    Read More
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
/* ══════════════════════════════════════════
   SECTION 6 — READY TO BEGIN
══════════════════════════════════════════ */
const ReadySection = () => (
  <section className="py-12 bg-white">
    <div
      className="max-w-[1800px] mx-auto px-8 lg:px-16 py-16 lg:py-20 rounded-[28px] ml-10 mr-10"
      style={{
        background:
          "linear-gradient(90deg, #8B68A9 0%, #C67AB1 50%, #E56FA0 100%)",
      }}
    >
      {/* Top Row */}
      <div className="flex items-center gap-6 mb-10">
        <h2 className="font-serif text-white text-[clamp(42px,5vw,58px)] leading-none whitespace-nowrap">
          Ready to Begin?
        </h2>

        <div className="flex-1 h-px bg-white/30" />
      </div>

      {/* Bottom Row */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-10">
        <div className="max-w-[700px]">
          <p className="font-montserrat text-white text-[20px] leading-[1.35] font-medium">
            We’re ready when you are—whether you’re searching
            <br />
            for the perfect donor or stepping up to become one.
            <br />
            Let’s take this next step together.
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <Link
            to="/find-an-egg-donor"
            className="font-montserrat group min-w-[250px] h-[60px] rounded-full bg-white text-[#8B68A9] font-semibold text-[18px] flex items-center justify-center transition-all duration-300 hover:bg-[#7B3FA0] hover:text-white hover:underline"
          >
            Find a Donor

            <img
              src={purpleArrowIcon}
              alt=""
              className="ml-2 w-5 h-5 group-hover:hidden"
            />

            <img
              src={whiteArrowIcon}
              alt=""
              className="ml-2 w-5 h-5 hidden group-hover:block"
            />
          </Link>

          <Link
            to="/become-an-egg-donor"
            className="font-montserrat group min-w-[350px] h-[60px] rounded-full bg-white text-[#8B68A9] font-semibold text-[18px] flex items-center justify-center transition-all duration-300 hover:bg-[#7B3FA0] hover:text-white hover:underline"
          >
            Become an Egg Donor

            <img
              src={purpleArrowIcon}
              alt=""
              className="ml-2 w-5 h-5 group-hover:hidden"
            />

            <img
              src={whiteArrowIcon}
              alt=""
              className="ml-2 w-5 h-5 hidden group-hover:block"
            />
          </Link>
        </div>
      </div>
    </div>
  </section>
);

/* ══════════════════════════════════════════
   SECTION 7 — FIND YOUR PERFECT DONOR
══════════════════════════════════════════ */
const FindDonorSection = () => {
  const [userType, setUserType] = useState("");

  return (
    <section className="py-10 bg-white">
      <div
        className="w-full min-h-[480px] flex items-center"
        style={{
          background: "#5B4371",
          borderTopLeftRadius: "220px",
          borderBottomRightRadius: "220px",
        }}
      >
        <div className="max-w-[1600px] w-full mx-auto px-8 lg:px-20">
          {/* Top Label */}
          <div className="flex items-center gap-4 mb-5">
            <div className="w-[55px] h-[2px] bg-white/80" />
            <p className="text-white text-[16px] tracking-[8px] uppercase">
              For Intended Parents
            </p>
          </div>

          {/* Heading */}
          <div className="flex items-center gap-4 mb-6">
            <img
              src="https://lucinaeggbank.com/wp-content/uploads/2021/03/symbol-in-tytle.svg"
              alt="Lucina Symbol"
              className="w-[58px] h-auto"
            />

            <h2 className="font-serif text-white text-[clamp(42px,5vw,58px)] font-normal leading-none">
              Find Your Perfect Egg Donor
            </h2>
          </div>

          {/* Sub Heading */}
          <p className="text-white text-[20px] mb-3 ml-[72px]">
            Confirm if you are an Intended Parent
          </p>

          {/* Select */}
          <div className="relative max-w-[550px] ml-[72px]">
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="w-full h-[64px] px-8 pr-16 rounded-2xl border border-white/60 bg-[#7B688A] text-white text-[18px] appearance-none outline-none cursor-pointer"
            >
              <option value="">I am an</option>
              <option value="intended-parent">
                Intended Parent
              </option>
              <option value="egg-donor">
                Egg Donor
              </option>
              <option value="clinic">
                Clinic / Partner
              </option>
            </select>

            <svg
              className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M6 9L12 15L18 9"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {userType && (
            <div className="mt-8 ml-[72px]">
              <Link
                to={
                  userType === "egg-donor"
                    ? "/become-an-egg-donor"
                    : "/find-an-egg-donor"
                }
                className="inline-flex items-center justify-center px-10 h-[60px] rounded-full bg-[#E8619A] text-white font-semibold hover:opacity-90 transition"
              >
                Continue →
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};




/* ══════════════════════════════════════════
   MAIN HOME
══════════════════════════════════════════ */
const Home = () => (
  <>
    <HeroSection />
    <PathSection />
    <AdvantageSection />
    <AdvantageSection2 />
    <TestimonialsSection />
    <ReadySection />
    <FindDonorSection />
  </>
);

export default Home;
