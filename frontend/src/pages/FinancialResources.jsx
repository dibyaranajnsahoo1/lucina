import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
import FindDonorForm from '../components/FindDonorForm';

const FAQs = [
  { q:'How much does it cost to use an egg donor?', a:'The total cost typically ranges from $20,000 to $40,000, including egg bank fees, IVF costs, and medications. Lucina offers transparent pricing with no hidden fees.' },
  { q:'Does Lucina offer financing options?', a:'Yes! Lucina partners with several fertility financing companies to offer low-interest loans and 0% interest plans. Our coordinators can help explore the best option for your budget.' },
  { q:'What does the Live Birth Guarantee include?', a:'Our Live Birth Guarantee provides additional egg cohorts at reduced prices if your first cycle does not result in a live birth. Contact our team for full eligibility details.' },
  { q:'Are there any discounts available?', a:'Yes. Lucina offers discounts for military families, cancer survivors, LGBTQ+ individuals, and returning patients. Multi-cohort packages are also available at reduced per-cohort prices.' },
  { q:'What financing partners does Lucina work with?', a:'Lucina works with leading fertility financing companies including Future Family, Prosper Healthcare Lending, and others. Our team can help you navigate the best option.' },
];

const FinancialResources = () => {
  const [openFaq, setOpenFaq] = useState(null);
  return (
    <>
      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <span className="text-[11px] font-bold tracking-[2.5px] uppercase text-white/50 block mb-2.5">Financial Resources</span>
          <h1 className="text-white mb-4">Making Parenthood <span className="text-[#F093B4]">Financially Accessible</span></h1>
          <p>Flexible pricing, financing, and guarantee programs to support every family's journey.</p>
          <div className="flex gap-4 justify-center flex-wrap mt-6">
            <a href="#find-donor-section" className="btn btn-pink btn-lg">Get Started Today</a>
            <Link to="/contact-us" className="btn btn-outline-white btn-lg">Talk to Our Team</Link>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="section bg-white">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Transparent Pricing</span>
            <h2 className="section-title">No Hidden Fees. <span className="text-[#E8619A]">No Surprises.</span></h2>
            <p className="section-desc">Browse our complete donor gallery instantly for free. You only pay when you're ready to move forward.</p>
          </div>
          <div className="grid-3 items-start">
            {[
              { icon:'🔍', title:'Browse for Free',   price:'$0',            sub:'upfront to browse',      features:['Full access to 3,500+ donor profiles','Filter by ethnicity & traits','AI-powered ReflEggction® matching','No credit card required'], cta:'Browse Donors', href:'/find-an-egg-donor', highlight:false },
              { icon:'🥚', title:'Cohort Purchase',   price:'From $18,000',  sub:'per donor egg cohort',   features:['6-cohort egg bank standard','Exclusive or shared cohort options','FDA-screened and quarantined eggs','Global clinical shipping included','Blastocyst guarantee available'], cta:'Get Started', href:'#find-donor-section', highlight:true },
              { icon:'🛡️', title:'Guarantee Programs',price:'Ask Us',        sub:'for eligibility & pricing',features:['Blastocyst Guarantee Program','PGT-A Guarantee Program','Live Birth Guarantee Program','Additional cohorts if needed','Peace of mind for your journey'], cta:'Learn More', href:'/contact-us', highlight:false },
            ].map(plan=>(
              <div key={plan.title}
                className={`rounded-[24px] p-9 px-7 flex flex-col gap-3.5 transition-all duration-200 ${plan.highlight ? 'text-white shadow-[0_12px_48px_rgba(107,45,139,0.3)] scale-[1.03]' : 'bg-white border border-[#EDD8F5] shadow-[0_2px_12px_rgba(107,45,139,0.06)]'}`}
                style={{ background: plan.highlight ? 'linear-gradient(135deg,#4A1A6E,#7B3FA0)' : undefined }}
              >
                <div className="text-[36px]">{plan.icon}</div>
                <h3 className={`text-[22px] font-serif ${plan.highlight ? 'text-white' : 'text-[#1A1A2E]'}`}>{plan.title}</h3>
                <div className={`font-serif text-[34px] font-semibold leading-none ${plan.highlight ? 'text-white' : 'text-[#7B3FA0]'}`}>{plan.price}</div>
                <div className={`text-[12px] -mt-2 ${plan.highlight ? 'text-white/70' : 'text-[#9B5EC0]'}`}>{plan.sub}</div>
                <ul className="flex flex-col gap-2 flex-1">
                  {plan.features.map(f=>(
                    <li key={f} className="flex items-start gap-2 text-[13px]">
                      <CheckCircle size={14} color={plan.highlight?'#F093B4':'#7B3FA0'} className="flex-shrink-0 mt-0.5"/>
                      <span className={plan.highlight ? 'text-white/85' : 'text-[#4A4A5A]'}>{f}</span>
                    </li>
                  ))}
                </ul>
                <a href={plan.href} className={`btn btn-sm justify-center ${plan.highlight ? 'btn-white' : 'btn-pink'}`}>{plan.cta} →</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantees */}
      <section className="section bg-[#F8F0F8]">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Our Promise</span>
            <h2 className="section-title">Guarantee Programs for <span className="text-[#E8619A]">Your Peace of Mind</span></h2>
          </div>
          <div className="grid-3">
            {[
              { icon:'🌱', title:'Blastocyst Guarantee', desc:"If your initial cohort does not produce at least one blastocyst, Lucina will provide an additional cohort from the same or a different donor at a significantly reduced price.", tag:'Most Popular' },
              { icon:'🧬', title:'PGT-A Guarantee',      desc:"If the biopsied embryos do not include at least one euploid embryo, you'll receive an additional cohort at reduced cost—ensuring you always have a viable embryo to transfer.", tag:'' },
              { icon:'👶', title:'Live Birth Guarantee', desc:"Our most comprehensive guarantee: if your cycle does not result in a live birth, you'll receive additional egg cohorts at special pricing until you achieve your goal.", tag:'Best Value' },
            ].map(g=>(
              <div key={g.title} className="relative bg-white rounded-[20px] p-8 px-6 border border-[#EDD8F5] shadow-[0_2px_12px_rgba(107,45,139,0.06)] flex flex-col gap-3.5 transition-all duration-200 hover:shadow-[0_8px_32px_rgba(107,45,139,0.14)] hover:-translate-y-[3px]">
                {g.tag && <div className="absolute -top-3 right-5 bg-[#E8619A] text-white px-3.5 py-1 rounded-full text-[11px] font-bold">{g.tag}</div>}
                <div className="text-[36px]">{g.icon}</div>
                <h4 className="text-[20px] font-serif text-[#1A1A2E]">{g.title}</h4>
                <p className="text-[14px] text-[#6B7280] leading-[1.7] flex-1">{g.desc}</p>
                <Link to="/contact-us" className="btn btn-outline-purple btn-sm">Learn More</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cost Breakdown + Financing */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid gap-[72px] items-start finance-grid" style={{ gridTemplateColumns:'1fr 1fr' }}>
            <div>
              <span className="section-tag">Financing</span>
              <h2 className="section-title mb-6">Flexible Financing <span className="text-[#E8619A]">Made Easy</span></h2>
              <p className="text-[#6B7280] text-[15px] leading-[1.75] mb-7">We know the financial aspect can be daunting. Lucina works with top financing partners to make parenthood accessible.</p>
              {[
                { icon:'💳', title:'0% Interest Plans',    desc:'Qualify for interest-free financing through our lending partners.' },
                { icon:'🏦', title:'Low-Interest Loans',   desc:'Access competitive fertility-specific loan programs with flexible repayment up to 84 months.' },
                { icon:'🏥', title:'Insurance Guidance',   desc:'Our team can help you navigate your insurance benefits and identify coverage.' },
                { icon:'🎖️', title:'Special Discounts',    desc:'Military families, LGBTQ+, cancer survivors, and returning patients receive meaningful discounts.' },
              ].map(f=>(
                <div key={f.title} className="flex gap-3.5 items-start mb-5">
                  <div className="w-11 h-11 bg-[#F3EEF8] rounded-xl flex items-center justify-center text-[20px] flex-shrink-0 border border-[#EDD8F5]">{f.icon}</div>
                  <div>
                    <div className="font-semibold text-[15px] mb-[3px] text-[#1A1A2E]">{f.title}</div>
                    <div className="text-[13px] text-[#6B7280] leading-[1.6]">{f.desc}</div>
                  </div>
                </div>
              ))}
              <Link to="/contact-us" className="btn btn-pink btn-lg mt-3">Talk to Our Financial Team →</Link>
            </div>

            <div className="bg-[#FBF3FB] rounded-[20px] p-9 border border-[#EDD8F5]">
              <h4 className="text-[20px] font-serif text-center mb-6">Cost Overview</h4>
              {[
                { label:'Egg Bank Fee (cohort)',      range:'$18,000–$25,000' },
                { label:'IVF Cycle Cost',             range:'$10,000–$15,000' },
                { label:'Medications',                range:'$3,000–$5,000' },
                { label:'Legal & Escrow',             range:'$500–$1,500' },
                { label:'Genetic Testing (PGT-A)',    range:'$2,000–$5,000' },
                { label:'Monitoring & Ultrasounds',   range:'$1,000–$2,000' },
              ].map((item,i,arr)=>(
                <div key={item.label} className={`flex justify-between items-center py-3 ${i < arr.length-1 ? 'border-b border-[#EDD8F5]' : ''}`}>
                  <span className="text-[14px] text-[#4A4A5A]">{item.label}</span>
                  <span className="font-semibold text-[14px] text-[#7B3FA0]">{item.range}</span>
                </div>
              ))}
              <div className="mt-5 px-[18px] py-3.5 bg-[#7B3FA0] rounded-xl flex justify-between items-center">
                <span className="text-white font-semibold text-[14px]">Typical Total Range</span>
                <span className="text-white font-bold text-[17px]">$34,500–$53,500</span>
              </div>
              <p className="text-[11px] text-[#9CA3AF] mt-2.5 text-center">*Estimates only. Actual costs vary by clinic, location, and needs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Discounts */}
      <section className="section bg-[#2D1353]">
        <div className="container">
          <div className="section-header">
            <span className="text-[11px] font-bold tracking-[2.5px] uppercase text-white/50 block mb-2">Special Pricing</span>
            <h2 className="text-white font-serif text-[clamp(26px,3.5vw,42px)] mb-0">
              Discounts That <span className="text-[#F093B4]">Make a Difference</span>
            </h2>
          </div>
          <div className="grid-4">
            {[
              { emoji:'🏅', title:'Military & First Responders', desc:'Special pricing for active duty, veterans, and first responders.' },
              { emoji:'🌈', title:'LGBTQ+ Families',            desc:'We proudly support all family structures with accessible pricing.' },
              { emoji:'💪', title:'Cancer Survivors',           desc:'Reduced pricing for cancer survivors who faced treatment-related infertility.' },
              { emoji:'🔁', title:'Returning Patients',         desc:'Meaningful discounts when purchasing additional cohorts.' },
            ].map(d=>(
              <div key={d.title} className="bg-white/[0.07] rounded-[16px] p-7 px-5 border border-white/10 text-center">
                <div className="text-[36px] mb-3">{d.emoji}</div>
                <h4 className="text-white text-[15px] mb-2">{d.title}</h4>
                <p className="text-white/60 text-[13px] leading-[1.6]">{d.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-9">
            <Link to="/contact-us" className="btn btn-pink btn-lg">Contact Us to Learn About Discounts</Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-white">
        <div className="container max-w-[800px]">
          <div className="section-header">
            <span className="section-tag">FAQ</span>
            <h2 className="section-title">Financial <span className="text-[#E8619A]">Questions Answered</span></h2>
          </div>
          {FAQs.map((faq,i)=>(
            <div key={i} className="faq-item">
              <button className="faq-question" onClick={()=>setOpenFaq(openFaq===i?null:i)}>
                {faq.q}
                <div className="faq-icon">{openFaq===i?<ChevronUp size={15}/>:<ChevronDown size={15}/>}</div>
              </button>
              <div className={`faq-answer ${openFaq===i?'open':''}`}><p>{faq.a}</p></div>
            </div>
          ))}
        </div>
      </section>

      {/* Form */}
      <section id="find-donor-section" className="section bg-[#F8F0F8]">
        <div className="container">
          <div className="grid gap-[72px] items-center form-cta-grid" style={{ gridTemplateColumns:'1fr 1.2fr' }}>
            <div>
              <span className="section-tag">Get Started</span>
              <h2 className="section-title">Ready to Explore <span className="text-[#E8619A]">Your Options?</span></h2>
              <p className="text-[#6B7280] text-[15px] leading-[1.75] mb-6">Fill out our quick form and a Lucina specialist will reach out to discuss your financial options and provide donor gallery access.</p>
              {['Zero upfront costs to browse donors','Personalized financing guidance','No obligation — just information'].map(f=>(
                <div key={f} className="flex gap-2.5 items-center text-[14px] mb-2.5">
                  <CheckCircle size={16} color="#7B3FA0"/> {f}
                </div>
              ))}
            </div>
            <FindDonorForm title="Talk to Our Financial Team" subtitle="We'll help you understand all your options."/>
          </div>
        </div>
      </section>

      <style>{`
        @media(max-width:900px){
          .finance-grid { grid-template-columns:1fr!important; }
          .form-cta-grid { grid-template-columns:1fr!important; }
        }
      `}</style>
    </>
  );
};

export default FinancialResources;
