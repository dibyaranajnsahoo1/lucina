import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import FindDonorForm from '../components/FindDonorForm';

const BirdIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <path d="M6 12 C2 7,2 2,6 1 C10 0,12 5,10 10Z" fill="#E8619A"/>
    <path d="M12 12 C14 6,20 3,24 7 C28 11,22 16,16 12Z" fill="#E8619A" opacity="0.7"/>
    <ellipse cx="10" cy="10" rx="5" ry="4" fill="#9B5EC0"/>
  </svg>
);

const WhyLucina = () => (
  <>
    {/* Hero */}
    <section className="page-hero">
      <div className="container">
        <span className="text-[11px] font-bold tracking-[2.5px] uppercase text-white/50 block mb-2.5">Why Choose Us</span>
        <h1 className="text-white mb-4">Where Hope Meets Science:<br/><span className="text-[#F093B4]">Your Path to Parenthood</span></h1>
        <p>With over 30 years of experience, we combine medical precision and heartfelt support to make parenthood possible for everyone.</p>
        <div className="flex gap-4 justify-center flex-wrap mt-7">
          <a href="#find-donor-section" className="btn btn-pink btn-lg">Find a Donor</a>
          <Link to="/become-an-egg-donor" className="btn btn-outline-white btn-lg">Become an Egg Donor</Link>
        </div>
      </div>
    </section>

    {/* Who We Serve */}
    <section className="section bg-white">
      <div className="container">
        <div className="section-header">
          <div className="flex justify-center mb-2"><BirdIcon/></div>
          <span className="section-tag">Who We Serve</span>
          <h2 className="section-title">Three Paths, <span className="text-[#E8619A]">One Shared Purpose</span></h2>
        </div>
        {[
          { title:'For Intended Parents', desc:"Browse 3,500+ donor profiles and benefit from ReflEggction®—our AI-powered tool that helps match you with a donor based on facial and phenotypic traits. Eggs ship globally, and every part of the process is designed to support your experience.", img:'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=600', cta:'Find a Donor', href:'/find-an-egg-donor', reverse:false },
          { title:'For Egg Donors', desc:'Make a lasting impact while earning $8,000–$15,000+ per cycle. All medical and travel costs are fully covered. The process typically takes 6 to 10 weeks from application to retrieval, with no wait time once approved.', img:'https://images.unsplash.com/photo-1570174537484-8f83764f2e9b?w=600', cta:'Become an Egg Donor', href:'/become-an-egg-donor', reverse:true },
          { title:'For Clinics & Partners', desc:"Seamlessly integrate Lucina's donor gallery and manage the full donor process with high-quality frozen eggs. Partnering with the premier San Diego egg bank requires no contracts or fees.", img:'https://images.unsplash.com/photo-1576671081837-49000212a370?w=600', cta:'Become a Partner', href:'/contact-us', reverse:false },
        ].map(item=>(
          <div key={item.title} className="grid gap-[72px] items-center mb-20 who-grid" style={{ gridTemplateColumns:'1fr 1fr', direction: item.reverse ? 'rtl' : 'ltr' }}>
            <div style={{ direction:'ltr' }}>
              <h3 className="font-serif text-[clamp(24px,3vw,36px)] mb-4 text-[#1A1A2E]">{item.title}</h3>
              <p className="text-[#6B7280] text-[15px] leading-[1.75] mb-6">{item.desc}</p>
              <Link to={item.href} className="btn btn-pink">{item.cta} →</Link>
            </div>
            <div style={{ direction:'ltr' }}>
              <div className="overflow-hidden shadow-[0_12px_48px_rgba(107,45,139,0.16)] border-[6px] border-white h-[380px]" style={{ borderRadius:'50% 50% 48% 52% / 46% 46% 54% 54%' }}>
                <img src={item.img} alt={item.title} className="w-full h-full object-cover"/>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* The Lucina Promise */}
    <section className="section bg-[#2D1353] text-white">
      <div className="container">
        <div className="section-header">
          <span className="text-[11px] font-bold tracking-[2.5px] uppercase text-white/50 block mb-2">The Lucina Promise</span>
          <h2 className="text-white font-serif text-[clamp(26px,3.5vw,42px)] mb-3">
            Unrivaled Assurance <span className="text-[#F093B4]">for Your Journey</span>
          </h2>
          <p className="text-white/60 text-[15px]">We stand by every egg, every cycle, every family.</p>
        </div>
        <div className="grid-2">
          {[
            { icon:'🛡️', title:'Comprehensive Guarantees',             desc:'Our Blastocyst, PGT-A, and Live Birth Guarantees offer financial peace of mind and additional cohorts until success is achieved.' },
            { icon:'📈', title:'Industry-Leading Success Rates',        desc:'In 2022, Lucina achieved a 92.2% frozen egg survival rate, 89.1% ICSI fertilization rate, and 61.5% clinical pregnancy success rate.' },
            { icon:'💰', title:'$0 Upfront Costs & Transparent Pricing',desc:'Start your donor search freely and instantly. You only pay when ready to proceed. All pricing is fixed and transparent, no hidden fees.' },
            { icon:'⚡', title:'Pioneering AI Matching: ReflEggction®', desc:"The U.S.'s first AI-powered donor-matching tool using facial recognition and phenotypic analysis, cutting search time by up to 70%." },
          ].map(item=>(
            <div key={item.title} className="bg-white/[0.06] rounded-[16px] p-7 px-6 border border-white/10 flex gap-[18px] items-start">
              <div className="w-[52px] h-[52px] bg-[rgba(232,97,154,0.2)] rounded-[14px] flex items-center justify-center text-[24px] flex-shrink-0">{item.icon}</div>
              <div>
                <h4 className="text-white mb-2 text-[17px]">{item.title}</h4>
                <p className="text-white/60 text-[14px] leading-[1.65]">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Stats */}
    <section className="section bg-white">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Proven Outcomes</span>
          <h2 className="section-title">Our Results <span className="text-[#E8619A]">Speak for Themselves</span></h2>
        </div>
        <div className="grid-4">
          {[
            { num:'92.2%', label:'Frozen Egg Survival Rate (2022)' },
            { num:'89.1%', label:'ICSI Fertilization Rate (2022)' },
            { num:'61.5%', label:'Clinical Pregnancy Rate (2022)' },
            { num:'3,500+',label:'Diverse Donors Available Now' },
          ].map(s=>(
            <div key={s.label} className="text-center py-8 px-5 bg-[#FBF3FB] rounded-[16px] border border-[#EDD8F5]">
              <div className="font-serif text-[48px] font-semibold text-[#7B3FA0] leading-none">{s.num}</div>
              <div className="text-[13px] text-[#6B7280] mt-2 leading-[1.4]">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Form */}
    <section id="find-donor-section" className="section bg-[#F8F0F8]">
      <div className="container max-w-[700px]">
        <FindDonorForm title="Find Your Perfect Egg Donor" subtitle="Get instant access to our complete donor gallery." />
      </div>
    </section>

    <style>{`@media(max-width:900px){.who-grid{grid-template-columns:1fr!important;direction:ltr!important}}`}</style>
  </>
);

export default WhyLucina;
