import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getTestimonials } from '../utils/api';

/* ══════════════════════════════════════════
   SECTION 1 — HERO
══════════════════════════════════════════ */
const HeroSection = () => (
  <section className="bg-white py-[60px] pb-[80px] overflow-hidden">
    <div className="container grid grid-cols-2 gap-[60px] items-center hero-inner">
      {/* Left */}
      <div>
        <p className="text-[14px] text-[#7B3FA0] font-semibold mb-4 flex items-center gap-2">— Lucina Egg Bank</p>
        <h1 className="font-serif text-[clamp(36px,4.5vw,58px)] font-medium text-[#1A1A2E] leading-[1.1] mb-6">
          Largest Egg Bank With Top<br />10% of Egg Donors
        </h1>
        <p className="text-[15px] text-[#4A4A5A] leading-[1.75] mb-9 max-w-[540px]">
          For over 30 years, Lucina Egg Bank has helped bring dreams to life,
          providing unparalleled care for intended parents and a supportive, rewarding
          experience for every egg donor. Located in San Diego, California, we combine
          medical precision with unwavering compassion, making every path to
          parenthood clear, supported, and full of hope for all aspiring families.
        </p>
        <div className="flex gap-4 flex-wrap">
          <Link to="/find-an-egg-donor"   className="btn btn-pink btn-lg">Find a Donor &nbsp;→</Link>
          <Link to="/become-an-egg-donor" className="btn btn-purple btn-lg">Become an Egg Donor &nbsp;→</Link>
        </div>
      </div>

      {/* Right Side Image */}
      <div className="relative h-[500px] flex items-center justify-center hero-right">
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
      <div className="text-center max-w-[680px] mx-auto">
        <div className="flex justify-center mb-2"><BirdIcon /></div>
        <h2 className="font-serif text-[clamp(28px,4vw,46px)] font-medium">
          Your Path to Parenthood Starts Here
        </h2>
        <p className="text-[#4A4A5A] text-[15px] leading-[1.7] max-w-[620px] mt-3">
          At Lucina, every family-building journey matters because every family is unique. We are here to support all aspiring parents, including gay dads, single fathers, and couples navigating fertility or genetic needs.
        </p>
      </div>

      <div className="grid-3 mt-10">
        {[
          { icon: '👶', label: 'For Intended Parents', desc: 'Choose from a wide, diverse donor pool with instant availability, transparent pricing, and advanced matching tools.', cta: 'Find a Donor', link: '/find-an-egg-donor' },
          { icon: '🌸', label: 'For Egg Donors',        desc: 'Give the life-changing gift of hope through a rewarding experience backed by expert care and total support from our San Diego-based team.', cta: 'Become an Egg Donor', link: '/become-an-egg-donor' },
          { icon: '🏥', label: 'For Clinics & Partners', desc: 'Partner with a Southern California leader in egg donation known for dependable coordination, secure shipping, and full-spectrum donor management.', cta: 'Become a Partner', link: '/contact-us' },
        ].map(c => (
          <div key={c.label} className="bg-[#FBF3FB] rounded-[20px] p-9 px-7 flex flex-col items-center text-center gap-3.5 transition-all duration-200 border border-[#EDD8F5] hover:shadow-[0_8px_32px_rgba(107,45,139,0.12)] hover:-translate-y-[3px]">
            <div className="w-16 h-16 bg-[#7B3FA0] rounded-full flex items-center justify-center text-[26px]">
              {c.icon}
            </div>
            <h3 className="font-serif text-[24px] font-medium text-[#7B3FA0]">{c.label}</h3>
            <p className="text-[14px] text-[#4A4A5A] leading-[1.7] flex-1">{c.desc}</p>
            <Link to={c.link} className="btn btn-pink btn-sm">{c.cta} &nbsp;→</Link>
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
    { icon: '🛡️', title: 'Guaranteed Peace of Mind',        desc: 'From embryo development to live birth, our Blastocyst, PGT-A, and Live Birth Guarantee Programs offer built-in financial security and assurance of success.', link: 'Explore Guarantee Programs', to: '/financial-resources' },
    { icon: '💳', title: 'Transparent & Accessible',        desc: 'Browse donors instantly with zero upfront costs—pay only when you commit. We also offer flexible financing options and meaningful discounts to make parenthood accessible.', link: 'Explore Financial Resources', to: '/financial-resources' },
    { icon: '📊', title: 'Proven Outcomes',                  desc: 'Our commitment to excellence delivers results that speak for themselves, with a 92.2% frozen egg survival rate and 61.5% clinical pregnancy success rate in 2022—consistently surpassing industry averages.', link: 'View Our Success Data', to: '/why-choose-lucina' },
  ];

  return (
    <section className="section bg-white">
      <div className="container">
        <div className="grid gap-[80px] items-center adv-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
          {/* Left — Text */}
          <div>
            <div className="flex mb-2.5"><BirdIcon /></div>
            <h2 className="font-serif font-medium text-[clamp(26px,3.5vw,42px)] mb-1.5">
              Your Lucina Advantage:
            </h2>
            <h3 className="font-serif italic text-[#E8619A] text-[clamp(22px,3vw,36px)] font-normal mb-[18px]">
              Science, Support, Success
            </h3>
            <p className="text-[15px] text-[#4A4A5A] leading-[1.7] mb-9">
              We make what's complex feel simple—because building your family should never be uncertain.
            </p>

            <div className="flex flex-col gap-0">
              {items.map((item, i) => (
                <div key={item.title} className={`flex gap-4 items-start ${i < items.length - 1 ? 'pb-5 mb-5 border-b border-[#EDD8F5]' : ''}`}>
                  <div className="w-[42px] h-[42px] bg-[#F3EEF8] rounded-full flex items-center justify-center text-[18px] flex-shrink-0 border-[1.5px] border-[#EDD8F5]">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-[17px] font-semibold text-[#1A1A2E] mb-1.5">{item.title}</h4>
                    <p className="text-[13px] text-[#6B7280] leading-[1.65] mb-1.5">{item.desc}</p>
                    <Link to={item.to} className="text-[13px] font-semibold text-[#7B3FA0] no-underline">
                      {item.link} →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Image */}
          <div className="adv-img-wrap relative flex items-center justify-center h-[480px]">
            <div className="absolute z-10 top-[10px] left-0">
              <svg width="70" height="90" viewBox="0 0 70 90"><path d="M50 5 C30-15, 0 20, 15 55 C25 78, 65 85, 65 55 C65 35, 75 15, 50 5Z" fill="#7B3FA0" opacity="0.75"/></svg>
            </div>
            <div className="w-[360px] h-[360px] rounded-full overflow-hidden border-[8px] border-white shadow-[0_12px_48px_rgba(107,45,139,0.18)] relative z-20">
              <img src="https://images.unsplash.com/photo-1609220136736-443140cffec6?w=500&q=80" alt="Happy family" className="w-full h-full object-cover" />
            </div>
            <div className="absolute z-10 bottom-[10px] right-0">
              <svg width="60" height="80" viewBox="0 0 60 80"><path d="M40 75 C20 95, 0 60, 15 35 C25 15, 55 5, 55 35 C55 55, 65 65, 40 75Z" fill="#E8619A" opacity="0.6"/></svg>
            </div>
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
  <section className="section bg-[#FDFBFF]">
    <div className="container">
      <div className="grid gap-[80px] items-center adv2-grid" style={{ gridTemplateColumns: '1fr 1.2fr' }}>
        {/* Left — Oval image */}
        <div className="adv2-img-wrap relative flex items-center justify-center h-[420px]">
          <div className="absolute z-10 top-0 left-[10px]">
            <svg width="60" height="75" viewBox="0 0 60 75"><path d="M45 5 C25-12, 0 18, 12 48 C22 72, 58 78, 58 48 C58 30, 66 15, 45 5Z" fill="#E8619A" opacity="0.65"/></svg>
          </div>
          <div className="w-[280px] h-[360px] overflow-hidden border-[6px] border-white shadow-[0_10px_40px_rgba(107,45,139,0.16)] relative z-20" style={{ borderRadius: '50% / 55% 55% 45% 45%' }}>
            <img src="https://images.unsplash.com/photo-1519627305757-9f7b9dfe1524?w=400&q=80" alt="Baby sleeping" className="w-full h-full object-cover" />
          </div>
          <div className="absolute z-10 bottom-0 right-[10px]">
            <svg width="55" height="70" viewBox="0 0 55 70"><path d="M38 65 C18 85, 0 55, 12 30 C22 10, 52 2, 52 32 C52 52, 60 62, 38 65Z" fill="#7B3FA0" opacity="0.7"/></svg>
          </div>
        </div>

        {/* Right — Items */}
        <div>
          {[
            { icon: '🔒', title: 'Guaranteed Peace of Mind',   desc: 'From embryo development to live birth, our Blastocyst, PGT-A, and Live Birth Guarantee Programs offer built-in financial security and assurance of success.', link: 'Explore Guarantee Programs', to: '/financial-resources' },
            { icon: '💰', title: 'Transparent & Accessible',   desc: 'Browse donors instantly with zero upfront costs—pay only when you commit. We also offer flexible financing options and meaningful discounts to make parenthood accessible.', link: 'Explore Financial Resources', to: '/financial-resources' },
            { icon: '📈', title: 'Proven Outcomes',            desc: 'Our commitment to excellence delivers results that speak for themselves, with a 92.2% frozen egg survival rate and 61.5% clinical pregnancy success rate in 2022—consistently surpassing industry averages.', link: 'View Our Success Data', to: '/why-choose-lucina' },
          ].map((item, i, arr) => (
            <div key={item.title} className={`flex gap-[18px] items-start ${i < arr.length - 1 ? 'pb-[22px] mb-[22px] border-b border-[#EDD8F5]' : ''}`}>
              <div className="w-11 h-11 bg-[#F3EEF8] rounded-full flex items-center justify-center text-[20px] flex-shrink-0 border-[1.5px] border-[#EDD8F5]">
                {item.icon}
              </div>
              <div>
                <h4 className="text-[18px] font-semibold text-[#1A1A2E] mb-1.5">{item.title}</h4>
                <p className="text-[14px] text-[#6B7280] leading-[1.65] mb-2">{item.desc}</p>
                <Link to={item.to} className="text-[13px] font-semibold text-[#7B3FA0] no-underline">{item.link} →</Link>
              </div>
            </div>
          ))}
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
  { name: 'Maria & John', content: 'I could recall the exact moment when my hubby and I decided we were going to have a baby. It was...' },
  { name: 'Anonymous',    content: 'Although I always knew I would have trouble getting pregnant, I did not know my husband and I would...' },
  { name: 'Sarah M.',     content: 'When my husband and I decided to start a family in 2022, we were thrilled but faced the reality o...' },
  { name: 'Jennifer',     content: 'After multiple failed cycles, Lucina Egg Bank made our dream possible. We are forever grateful...' },
];

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState(DEFAULT_TESTIMONIALS);
  const [idx, setIdx] = useState(1);

  useEffect(() => {
    getTestimonials({ limit: 6 })
      .then(res => { if (res.data?.length) setTestimonials(res.data); })
      .catch(() => {});
  }, []);

  const prev = () => setIdx(i => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setIdx(i => (i + 1) % testimonials.length);

  const visible = [-1, 0, 1].map(offset => {
    const i = (idx + offset + testimonials.length) % testimonials.length;
    return { ...testimonials[i], offset };
  });

  return (
    <section className="section bg-white overflow-hidden">
      <div className="container">
        {/* Header */}
        <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <BirdIcon />
            <h2 className="font-serif font-medium text-[clamp(24px,3.5vw,40px)]">
              Stories of <span className="text-[#E8619A]">Hope</span>.
              &nbsp;Real <span className="text-[#E8619A]">Families</span>.
              &nbsp;Real <span className="text-[#E8619A]">Joy</span>.
            </h2>
          </div>
          <div className="flex gap-2.5">
            <button
              onClick={prev}
              className="w-11 h-11 rounded-full border-[1.5px] border-[#D4B8E8] bg-white flex items-center justify-center text-[#7B3FA0] cursor-pointer transition-all duration-200 hover:bg-[#7B3FA0] hover:text-white hover:border-[#7B3FA0]"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              className="w-11 h-11 rounded-full border-[1.5px] border-[#D4B8E8] bg-white flex items-center justify-center text-[#7B3FA0] cursor-pointer transition-all duration-200 hover:bg-[#7B3FA0] hover:text-white hover:border-[#7B3FA0]"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="testi-track grid gap-5" style={{ gridTemplateColumns: '1fr 1.15fr 1fr', alignItems: 'center' }}>
          {visible.map((t, i) => (
            <div key={i} className={`transition-all duration-300 p-10 px-8 ${t.offset === 0 ? 'bg-[#EDE8F5] min-h-[220px]' : 'bg-[#F3EEF8] opacity-70 min-h-[180px]'}`} style={{ borderRadius: '48% 52% 60% 40% / 44% 44% 56% 56%' }}>
              <p className="text-[15px] text-[#4A4A5A] leading-[1.7] italic">
                {t.shortContent || t.content}
              </p>
              {t.offset === 0 && (
                <Link to="/why-choose-lucina" className="inline-block mt-4 text-[14px] font-semibold text-[#7B3FA0] no-underline border-b-[1.5px] border-[#7B3FA0]">
                  Read More
                </Link>
              )}
              {t.offset !== 0 && (
                <a href="#" className="inline-block mt-4 text-[14px] font-semibold text-[#9B5EC0] no-underline border-b-[1.5px] border-[#9B5EC0]">
                  Read More
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .testi-track { grid-template-columns: 1fr !important; }
          .testi-track > div:not(:nth-child(2)) { display: none; }
        }
      `}</style>
    </section>
  );
};

/* ══════════════════════════════════════════
   SECTION 6 — READY TO BEGIN
══════════════════════════════════════════ */
const ReadySection = () => (
  <section className="py-[72px]" style={{ background: 'linear-gradient(135deg, #4A1A6E 0%, #7B3FA0 50%, #E8619A 100%)' }}>
    <div className="container flex items-center justify-between gap-10 flex-wrap">
      <div className="flex-1 min-w-[280px]">
        <h2 className="font-serif text-[clamp(32px,4vw,50px)] text-white font-normal mb-4">
          Ready to Begin?
        </h2>
        <div className="w-[60px] h-0.5 bg-white/50 mb-5" />
        <p className="text-[15px] text-white/80 leading-[1.7] max-w-[400px]">
          We're ready when you are—whether you're searching for the perfect donor or stepping up to become one. Let's take this next step together.
        </p>
      </div>
      <div className="flex gap-4 flex-wrap flex-shrink-0">
        <Link to="/find-an-egg-donor"   className="btn btn-white">Find a Donor &nbsp;→</Link>
        <Link to="/become-an-egg-donor" className="btn btn-outline-white">Become an Egg Donor &nbsp;→</Link>
      </div>
    </div>
  </section>
);

/* ══════════════════════════════════════════
   SECTION 7 — FIND YOUR PERFECT DONOR
══════════════════════════════════════════ */
const FindDonorSection = () => {
  const [userType, setUserType] = useState('');
  return (
    <section className="py-[90px] relative overflow-hidden" style={{ background: '#4A1A6E', borderRadius: '0 0 60px 0' }}>
      <div className="absolute top-[-60px] right-[-60px] w-[500px] h-[500px] pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(232,97,154,0.15) 0%, transparent 60%)' }} />
      <div className="container relative z-10">
        <p className="text-[13px] font-semibold text-white/60 tracking-[2px] uppercase mb-4">— For Intended Parents</p>
        <div className="flex items-center gap-3 mb-5">
          <BirdIconWhite />
          <h2 className="font-serif text-[clamp(28px,4vw,52px)] text-white font-normal">
            Find Your Perfect Egg Donor
          </h2>
        </div>
        <p className="text-[16px] text-white/75 mb-8">Confirm if you are an Intended Parent</p>
        <div className="relative max-w-[420px]">
          <select
            value={userType}
            onChange={e => setUserType(e.target.value)}
            className="w-full py-4 px-5 pr-12 rounded-xl border-[1.5px] border-white/30 text-[15px] font-medium cursor-pointer outline-none appearance-none"
            style={{ background: 'rgba(255,255,255,0.12)', color: userType ? 'white' : 'rgba(255,255,255,0.7)', backdropFilter: 'blur(8px)' }}
          >
            <option value="" style={{ color: '#1A1A2E', background: 'white' }}>I am an</option>
            <option value="intended-parent" style={{ color: '#1A1A2E', background: 'white' }}>Intended Parent</option>
            <option value="egg-donor"       style={{ color: '#1A1A2E', background: 'white' }}>Egg Donor</option>
            <option value="clinic"          style={{ color: '#1A1A2E', background: 'white' }}>Clinic / Partner</option>
          </select>
          <ChevronDown />
        </div>
        {userType && (
          <div className="mt-6">
            <Link to={userType === 'egg-donor' ? '/become-an-egg-donor' : '/find-an-egg-donor'} className="btn btn-pink btn-lg">
              Continue &nbsp;→
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

const BirdIconWhite = () => (
  <svg width="32" height="32" viewBox="0 0 28 28" fill="none">
    <path d="M6 12 C2 7, 2 2, 6 1 C10 0, 12 5, 10 10Z" fill="rgba(255,255,255,0.7)"/>
    <path d="M12 12 C14 6, 20 3, 24 7 C28 11, 22 16, 16 12Z" fill="rgba(255,255,255,0.5)"/>
    <ellipse cx="10" cy="10" rx="5" ry="4" fill="rgba(255,255,255,0.85)"/>
  </svg>
);

const ChevronDown = () => (
  <svg className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M5 7.5L10 12.5L15 7.5" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

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
