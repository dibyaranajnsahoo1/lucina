import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
import FindDonorForm from '../components/FindDonorForm';
import whiteArrowIcon  from '../../asset/arrow.png';

import purpleArrowIcon  from '../../asset/arrow2.png';

const FAQs = [
  { q:'How much does it cost to use an egg donor?', a:'The total cost typically ranges from $20,000 to $40,000, including egg bank fees, IVF costs, and medications. Lucina offers transparent pricing with no hidden fees.' },
  { q:'Does Lucina offer financing options?', a:'Yes! Lucina partners with several fertility financing companies to offer low-interest loans and 0% interest plans. Our coordinators can help explore the best option for your budget.' },
  { q:'What does the Live Birth Guarantee include?', a:'Our Live Birth Guarantee provides additional egg cohorts at reduced prices if your first cycle does not result in a live birth. Contact our team for full eligibility details.' },
  { q:'Are there any discounts available?', a:'Yes. Lucina offers discounts for military families, cancer survivors, LGBTQ+ individuals, and returning patients. Multi-cohort packages are also available at reduced per-cohort prices.' },
  { q:'What financing partners does Lucina work with?', a:'Lucina works with leading fertility financing companies including Future Family, Prosper Healthcare Lending, and others. Our team can help you navigate the best option.' },
];

const financialPartners = [
  {
    lender: "CapexMD",
    highlights: [
      "Fertility specialists",
      "Competitive rates",
      "24-hour approval",
    ],
  },
  {
    lender: "PatientFi",
    highlights: [
      "Soft credit check",
      "Next-day funds",
      "No hidden fees",
    ],
  },
  {
    lender: "Comerica Bank (0% Interest Credit Cards)",
    highlights: ["Quick access", "Up to $25K"],
  },
  {
    lender: "Comerica Bank (HELOC)",
    highlights: ["Up to $500K revolving line", "Low rates"],
  },
  {
    lender: "Comerica Bank (Business Credit)",
    highlights: ["Up to $200K business lines", "Variable rate"],
  },
  {
    lender: "Prosper Healthcare Lending",
    highlights: ["Quick approval", "Funds in ~3 days"],
  },
  {
    lender: "Prosper HELOC",
    highlights: ["Home equity financing", "Bank-paid closing costs"],
  },
  {
    lender: "SoFi Personal Loans",
    highlights: ["Fixed rates", "Same-day approval"],
  },
  {
    lender: "GAIA",
    highlights: ["Fertility financing", "Treatment guarantees"],
  },
];

const FinancialResources = () => {
  const [openFaq, setOpenFaq] = useState(null);
  return (
    <>
      {/* Hero */}
      <section className="bg-white overflow-hidden">
        <div className="container">
          <div className="hero-grid grid lg:grid-cols-[1.15fr_0.85fr] gap-20 items-center">
      
            <div>
              <h1 className="font-bold mt-10 font-serif text-[clamp(38px,6vw,69px)] leading-[1.08] text-[#E97BB0]  mb-6">
                Financing Your Path to Parenthood:{" "}
                <span className="text-[#1D1633]">
                  Clear, Accessible, Supported
                </span>
              </h1>
      
              <p className=" font-montserrat text-[#3E3750] text-[18px] leading-[1.5] mb-6 max-w-[700px]">
                The dream of parenthood should never be out of reach.
With over 30 years of experience, Lucina Egg Bank makes donor egg parenthood more accessible through zero upfront costs, fixed pricing, and meaningful discounts for military families and multi-cohort plans.
              </p>
      
              <p className=" font-montserrat text-[#3E3750] text-[18px] leading-[1.5] max-w-[700px]">
               Located in San Diego, California, we work with leading financial partners to provide simple, stress-free fertility financing. Backed by FDA-screened donors and success guarantees—including refund options—you can move forward with clarity and confidence.
              </p>
              <Link
                        to="/find-an-egg-donor"
                        className="inline-flex items-center gap-2 px-9 mt-10 py-5 rounded-full bg-[#E86BA3] text-white hover:bg-[#8369B2] hover:text-white hover:underline underline-offset-1"
                      >
                        <span className="text-[18px] font-semibold font-montserrat">
                         Talk to a Financial Coordinator
                        </span>
                        <img
                          src={whiteArrowIcon}
                          alt="arrow"
                          className="w-5 h-5"
                        />
                      </Link>
            </div>
      
            <div className="relative flex justify-center lg:justify-end">
              <img
                src="https://lucinaeggbank.com/wp-content/uploads/2021/03/symbol-in-tytle.svg"
                alt=""
                className="absolute left-[-30px] lg:left-[20px] top-[80px] w-[140px] lg:w-[180px] opacity-90 z-0"
              />
      
              <div className="relative z-10">
                <img
                  src="https://lucinaeggbank.com/wp-content/uploads/2022/04/ip-right-768x743-1.webp"
                  alt="Baby"
                  className="w-full max-w-[430px] lg:max-w-[520px]"
                />
              </div>
            </div>
      
            </div>
          </div>
            </section>

       <section className="py-12 overflow-hidden">
        <div className="max-w-[1350px] mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
      
            {/* Left Image */}
           <div className="flex justify-center lg:justify-start">
              <img
                src="https://lucinaeggbank.com/wp-content/uploads/2025/05/parents.webp"
                alt="Egg Donor"
                className="w-full max-w-[520px] h-auto object-contain"
              />
            </div>
      
            {/* Right Content */}
            <div className="max-w-[620px]">
      
              <h2 className="font-serif text-[34px] md:text-[52px] leading-[1.05] text-[#1D1B38] mb-8">
                Lucina’s Commitment{" "}
                <span className="text-[#EA84B7]">
                  to Affordability
                </span>
              </h2>
      
              <p className="font-montserrat text-[18px] font-semibold text-[#1D1B38] leading-[1.5] mb-8">
                We believe financial ease should be part of your family-building dream. That’s why we offer:
              </p>
      
              <div className="space-y-2 mb-12">
      
                <div className="font-montserrat flex items-start gap-4">
                  <div className="w-4 h-4 rounded-full bg-[#EA84B7] mt-2 shrink-0" />
                  <p className="text-[18px] text-[#1D1B38]">
                   <strong> No upfront fees</strong> before you choose your donor
                  </p>
                </div>
      
                <div className="flex items-start gap-4">
                  <div className="w-4 h-4 rounded-full bg-[#EA84B7] mt-2 shrink-0" />
                  <p className="text-[18px] text-[#1D1B38]">
                   <strong> Transparent, fixed pricing—</strong>no hidden costs or surprise fees
                  </p>
                </div>
      
                <div className="font-montserrat flex items-start gap-4">
                  <div className="w-4 h-4 rounded-full bg-[#EA84B7] mt-2 shrink-0" />
                  <p className="text-[18px] text-[#1D1B38]">
                    <strong>Exclusive discounts</strong> for military families and multi-cohort purchases
                  </p>
                </div>
      
              
      
              </div>
      
              
      
            </div>
          </div>
        </div>
      </section>

      <section
        className="py-24 md:py-10"
        style={{
          background: "#916BB0",
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6">

          <div className="text-center">

            <h2
              className="
                font-serif
                text-white
                text-[34px]
                md:text-[36px]
                lg:text-[42px]
                leading-tight
                mb-6
              "
            >
              Explore Your Fertility Financing Options
            </h2>

            <p
              className="
                max-w-[1150px]
                mx-auto
                text-white
                text-[14px]
                md:text-[16px]
                leading-[1.7]
                font-medium
                mb-4
              "
            >
              Whether you’re planning ahead or ready to take the next step,
              Lucina partners with trusted financial institutions to offer
              flexible, patient-friendly payment plans. Explore simplified
              options, designed with your peace of mind at heart.
            </p>

            <p
              className="
                max-w-[1100px]
                mx-auto
                text-white
                text-[14px]
                md:text-[16px]
                leading-[1.7]
                font-medium
              "
            >
              Each provider below offers unique benefits—click to view full
              details and choose the plan that’s right for your journey.
            </p>

          </div>

        </div>
      </section>

      <section className="py-16 bg-[#F8F6F7]">
        <div className="container mx-auto px-4">

          {/* Heading */}
          <div className="text-center mb-8">
            <h2 className="font-serif text-[28px] md:text-[52px] leading-none text-[#231B35]">
              Our Trusted{" "}
              <span className="text-[#EB7EB2]">
                Financial Partners
              </span>
            </h2>
          </div>

          {/* Table */}
          <div className="overflow-hidden border border-[#CFC7D4] rounded-[10px] bg-white">

            {/* Header */}
            <div className="grid grid-cols-[30%_70%] bg-[#EB7EB2] text-white font-semibold text-[16px]">
              <div className="px-5 py-4 border-r border-white/20">
                Lender
              </div>

              <div className="px-5 py-4">
                Highlight
              </div>
            </div>

            {/* Rows */}
            {financialPartners.map((item, index) => (
              <div
                key={index}
                className={`
                  grid
                  grid-cols-[30%_70%]
                  min-h-[72px]
                  ${
                    index % 2 === 1
                      ? "bg-[#F4EEF8]"
                      : "bg-white"
                  }
                `}
              >
                {/* Lender */}
                <div className="px-5 py-5 flex items-center border-r border-[#E7E1EB]">
                  <h3 className="font-serif text-[#8C67AF] text-[22px] leading-[1.4]">
                    {item.lender}
                  </h3>
                </div>

                {/* Highlights */}
                <div className="px-5 py-4 flex flex-col justify-center">

                  <div className="flex flex-wrap gap-x-6 gap-y-2">

                    {item.highlights.map((point, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2"
                      >
                        <span className="w-[9px] h-[9px] rounded-full bg-[#EB7EB2] border border-[#B885D5]" />

                        <span className="text-[#4A4A5A] text-[16px]">
                          {point}
                        </span>
                      </div>
                    ))}

                  </div>

                  <a
                    href="#"
                    className="
                      mt-3
                      text-[#8C67AF]
                      text-[13px]
                      font-semibold
                      inline-flex
                      items-center
                      gap-2
                      hover:underline
                    "
                  >
                    Click for Full Details

                    <img
                      src={purpleArrowIcon}
                      alt="arrow"
                      className="w-4 h-4"
                    />
                  </a>

                </div>
              </div>
            ))}

          </div>

        </div>
      </section>

      <section className="py-20 lg:py-28 bg-[#F8F4F8] overflow-hidden">
        <div className="container mx-auto px-4">

          <div className="grid lg:grid-cols-2 items-center gap-10 lg:gap-16">

            {/* Left Content */}
            <div>

              <h2 className="font-serif text-[34px] md:text-[52px] leading-[1.15] mb-8">
                <span className="text-[#221B35]">
                  Need Help
                </span>{" "}
                <span className="text-[#EB7EB2]">
                  Choosing the Right Partner?
                </span>
              </h2>

              <p
                className="
                  text-[#3F3F4F]
                  text-[18px]
                  md:text-[22px]
                  leading-[1.65]
                  max-w-[820px]
                  mb-10
                "
              >
                Not sure where to begin? Our financial coordinators are here
                to guide you, answer your questions, and help you explore
                solutions that suit your family-building goals.
              </p>

              <button
                className="
                  group
                  inline-flex
                  items-center
                  justify-center
                  gap-4
                  min-w-[330px]
                  md:min-w-[500px]
                  h-[72px]
                  px-10
                  rounded-full
                  bg-[#E56FA0]
                  hover:bg-[#8C67AF]
                  text-white
                  text-[22px]
                  font-medium
                  transition-all
                  duration-300
                "
              >
                Talk to a Financial Coordinator

                <img
                  src={whiteArrowIcon}
                  alt=""
                  className="
                    w-6
                    h-6
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                />
              </button>

            </div>

            {/* Right Image Only */}
            <div className="flex justify-center lg:justify-end">

              <img
                src="https://lucinaeggbank.com/wp-content/uploads/2025/08/need-help-choose-1024x624.webp"
                alt="Need Help Choosing the Right Partner"
                className="
                  w-full
                  max-w-[760px]
                  h-auto
                  object-contain
                  select-none
                "
              />

            </div>

          </div>

        </div>
      </section>

      <section className="py-12 bg-[#F8F6F7]">
        <div className="container mx-auto px-4">

          <div
            className="
              bg-gradient-to-r
              from-[#8C67AF]
              to-[#E574A8]
              rounded-[28px]
              px-8
              md:px-16
              py-12
              md:py-16
            "
          >

            {/* Heading */}
            <div className="flex items-center gap-8 mb-10">

              <h2
                className="
                  font-serif
                  text-white
                  text-[34px]
                  md:text-[48px]
                  leading-none
                  whitespace-nowrap
                "
              >
                Ready to Learn More About Lucina’s Guarantees?
              </h2>

              <div className="hidden lg:block flex-1 h-[1px] bg-white/40" />

            </div>

            {/* Content */}
            <div className="grid lg:grid-cols-[1.3fr_0.9fr] items-center gap-12">

              <div>
                <p
                  className="
                    text-white
                    text-[22px]
                    md:text-[24px]
                    leading-[1.45]
                    max-w-[900px]
                  "
                >
                  We offer multiple protection options to give you confidence
                  through every step of your fertility journey. Learn how our
                  exclusive guarantees protect your investment and enhance
                  your chances of success.
                </p>
              </div>

              <div className="flex justify-start lg:justify-end">

                <Link
                  to="/guarantee-programs"
                  className="
                    group
                    bg-white
                    text-[#8C67AF]
                    rounded-full
                    min-w-[320px]
                    md:min-w-[450px]
                    h-[68px]
                    px-10
                    font-semibold
                    text-[20px]
                    inline-flex
                    items-center
                    justify-center
                    gap-3
                    transition-all
                    duration-300
                    hover:scale-[1.02]
                    hover:bg-[#8C67AF]
                    hover:text-white
                  "
                >
                  Explore Guarantee Programs

                  <img
                    src={purpleArrowIcon}
                    alt=""
                    className="
                      w-5
                      h-5
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                    "
                  />
                </Link>

              </div>

            </div>

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
