import React, { useRef, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { submitDonorApplication } from '../utils/api';
import { getTestimonials } from '../utils/api';
import { CheckCircle, Upload, Star, ChevronDown, ChevronUp } from 'lucide-react';
import ReCAPTCHA from 'react-google-recaptcha';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import PurpleArrowIcon  from '../../asset/arrow2.png';
import whiteArrowIcon  from '../../asset/arrow.png';

import {
  ClipboardList,
  Heart,
  ShieldCheck,
  Search,
  Hand,
  RefreshCcw,
  HeartHandshake,
  Wallet,
  Download,
} from "lucide-react";

const benefits = [
  {
    icon: "💲",
    title: "Generous Compensation",
    desc: "Most donors earn $8,000 – $15,000 + Premiums. Highly qualified donors can earn up to $50,000 per cycle, with a total potential of up to $300,000 for 6 cycles.",
  },
  {
    icon: "🏥",
    title: "Zero Out-of-Pocket Expenses",
    desc: "Lucina covers 100% of all medical expenses and travel costs to our San Diego clinic. There are absolutely no hidden fees or charges for you, ever.",
  },
  {
    icon: "💰",
    title: "Referral Bonus",
    desc: "Earn $1,000 for every friend you refer who donates, helping even more families grow while earning extra.",
  },
  {
    icon: "✔",
    title: "Flexible & Streamlined Process",
    desc: "Our quick, easy process is designed to fit your lifestyle, typically taking 6 to 10 weeks from application to retrieval, with no waiting to be chosen once approved.",
  },
  {
    icon: "🤝",
    title: "Dedicated Support",
    desc: "You'll have a personal donor support specialist and a compassionate team guiding you every step of the way.",
  },
  {
    icon: "🛡",
    title: "Complete Privacy",
    desc: "All donations are anonymous, ensuring your identity and personal information remain confidential.",
  },
];
const BirdIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <path d="M6 12 C2 7,2 2,6 1 C10 0,12 5,10 10Z" fill="#E8619A"/>
    <path d="M12 12 C14 6,20 3,24 7 C28 11,22 16,16 12Z" fill="#E8619A" opacity="0.7"/>
    <ellipse cx="10" cy="10" rx="5" ry="4" fill="#9B5EC0"/>
  </svg>
);

/* ── Hero ── */
const DonorHero = () => (
  <section className=" py-[30px] overflow-hidden">
  <div className="container mx-auto px-6">
    <div className="grid lg:grid-cols-2 gap-16 items-center">

      {/* Left Content */}
      <div>
        <h1
          className="font-serif font-bold leading-[1.1] mb-8"
          style={{ fontSize: "clamp(42px,5vw,70px)" }}
        >
          <span className="text-[#E67FB0]">
            Turn Compassion Into Action.
          </span>{" "}
          <span className="text-[#2F2F2F]">
            Become an Egg Donor Today
          </span>
        </h1>

        <div className="space-y-6 text-[#2F2F2F]">
          <p className="font-montserrat text-[18px] leading-[1.5] max-w-[750px]">
            If you've ever wanted to do something truly meaningful,
            egg donation with Lucina is a life-changing opportunity.
          </p>

          <p className="font-montserrat text-[18px] leading-[1.5] max-w-[750px]">
            Our compassionate gift helps build families for LGBTQ+
            individuals, cancer survivors, single parents, and
            couples who have faced years of hoping.
          </p>

          <p className="font-montserrat text-[18px] leading-[1.5] max-w-[750px]">
            Based in San Diego, California, Lucina Egg Bank welcomes
            donors from across the U.S. With all travel costs covered
            to our San Diego clinic, you'll feel valued, supported,
            and cared for every step of the way.
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-12 flex flex-col gap-5 max-w-[460px]">

          <a
            href="#apply-section"
            className="bg-[#8D68B5] hover:bg-[#E67FB0] text-white font-bold text-white font-semibold text-[20px] rounded-full h-[64px] flex items-center justify-center transition-all duration-300"
          >
            Apply Online in Just 2 Minutes
            <img
            src={whiteArrowIcon}
            alt="arrow"
            className="ml-3 w-6 h-6"
          />
          </a>

          <a
            href="#spanish"
            className="bg-[#E67FB0] hover:bg-[#7B3FA0] text-white text-white font-semibold text-[20px] rounded-full h-[64px] flex items-center justify-center transition-all duration-300"
          >
            ¿Hablas español y quieres donar óvulos?
            <img
            src={whiteArrowIcon}
            alt="arrow"
            className="ml-3 w-6 h-6"
          />
          </a>

        </div>
      </div>

      {/* Right Image */}
      <div className="flex justify-center lg:justify-end">
        <img
          src="https://lucinaeggbank.com/wp-content/uploads/2023/12/5aaa6eab-ed-right-768x743_10f60eo000000000000028.webp"
          alt="Egg Donor"
          className="w-full max-w-[550px] h-auto object-contain"
        />
      </div>

    </div>
  </div>
</section>
);

/* ── Benefits ── */
const BenefitsSection = () => (
  <section id="learn-more" className="py-24 bg-[#F7F5F6]">
  <div className="container mx-auto px-4">
    
    {/* Heading */}
   {/* Heading */}
    <div className="mb-14">
      <h2 className="text-center font-serif text-[24px] md:text-[52px] leading-[1.2] text-[#2A2335]">
        Why Donate with Lucina:
        <span className="text-[#E87BB4]">
          {" "}Unmatched Support & Reward
        </span>
      </h2>

      <p className="font-montserrat mt-5 text-[18px] text-[#4D4D5C] leading-relaxed max-w-3xl mx-auto text-center">
        Lucina Egg Bank is one of the nation’s leading programs, offering an
        unparalleled experience that is both profoundly meaningful and highly
        rewarding.
      </p>
    </div>

    {/* Cards */}
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {benefits.map((item) => (
        <div
          key={item.title}
          className="bg-white rounded-[22px] px-8 py-10 text-center shadow-[0_4px_18px_rgba(0,0,0,0.06)]"
        >
          {/* Icon */}
          <div className="w-16 h-16 mx-auto mb-6 rounded-full border border-[#EC7DAE] flex items-center justify-center text-[28px] text-[#EC7DAE]">
            {item.icon}
          </div>

          {/* Title */}
          <h3 className="font-serif text-[28px] text-[#1F1830] mb-5">
            {item.title}
          </h3>

          {/* Desc */}
          <p className="font-montserrat text-[16px] leading-[1.8] text-[#52525B]">
            {item.desc}
          </p>
        </div>
      ))}
    </div>

    {/* Button */}
    <div className="flex justify-center mt-12">
      <button className="group inline-flex items-center rounded-full bg-[#E87BB4] hover:bg-[#7B3FA0] text-white text-white font-semibold px-8 py-4 text-[18px] transition-all">
        Check If You Qualify & Apply Now

        <img
          src={whiteArrowIcon}
          alt="arrow"
          className="ml-3 w-6 h-6 transition-transform duration-300 group-hover:translate-x-1"
        />
      </button>
    </div>

  </div>
</section>
);

const safetyCards = [
  {
    icon: ClipboardList,
    title: "Safe & Proven Protocols",
    desc: "All procedures are routine, performed by skilled medical professionals using established, low-risk protocols.",
  },
  {
    icon: Heart,
    title: "No Impact on Future Fertility",
    desc: "Egg donation develops eggs your body would naturally discard, with no known long-term adverse risks to your future fertility.",
  },
  {
    icon: ShieldCheck,
    title: "Individualized Care",
    desc: "Personalized stimulation plans prioritize your health and comfort, typically aiming for 15–20 eggs retrieved for optimal safety and success.",
  },
  {
    icon: Search,
    title: "Comprehensive Screening",
    desc: "Rigorous pre-donation health and genetic screenings ensure your eligibility and safety.",
  },
];

const PrioritYSection = () => (
  <section className="py-24 overflow-hidden">
  <div className="container mx-auto px-4">
    
    {/* Heading */}
    <div className="max-w-3xl mx-auto text-center mb-20">
      <h2 className="font-serif text-[28px] md:text-[48px] leading-[1.1] text-[#1D1733]">
        Your <span className="text-[#E87BB4]">Health</span>, Your{" "}
        <span className="text-[#E87BB4]">Safety</span>, Our{" "}
        <span className="text-[#E87BB4]">Priority</span>
      </h2>

      <p className="font-montserrat mt-6 text-[17px] leading-[1.7] text-[#2D2D42]">
        Your well-being is paramount. Lucina’s experienced medical team ensures{" "}
        <span className="text-[#8B5FAF]">
          your health and safety are our top priority,
        </span>{" "}
        guided by FDA regulations and over 30 years of expertise.
      </p>
    </div>

    {/* Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {safetyCards.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="border border-[#B68CD3] rounded-t-[180px] rounded-b-none bg-transparent min-h-[445px] px-8 pt-10 pb-8 text-center flex flex-col items-center"
          >
            {/* Icon Circle */}
            <div className="w-[160px] h-[160px] rounded-full border border-[#F08AB9] bg-[#FCF4F8] flex items-center justify-center mb-14">
              <Icon
                size={58}
                strokeWidth={1.8}
                className="text-[#E87BB4]"
              />
            </div>

            {/* Title */}
            <h3 className="font-montserrat font-semibold text-[18px] md:text-[18px] text-[#111827] mb-4">
              {item.title}
            </h3>

            {/* Description */}
            <p className="font-montserrat text-[15px] leading-[1.5] text-[#2D2D42]">
              {item.desc}
            </p>
          </div>
        );
      })}
    </div>
  </div>
</section>
);

const steps = [
  {
    step: "Step 1",
    icon: Hand,
    title: "Apply Online in 2 Minutes",
    desc: "Answer a few quick questions to see if you meet initial eligibility. Get an instant pre-qualification notification.",
  },
  {
    step: "Step 2",
    icon: ClipboardList,
    title: "Complete Screenings",
    desc: "If pre-qualified, you'll undergo comprehensive medical and psychological screenings, all conveniently arranged.",
  },
  {
    step: "Step 3",
    icon: RefreshCcw,
    title: "Begin Your Cycle",
    desc: "Once approved, you can start your donation journey — no waiting for a match. You'll take medications to prepare your body.",
  },
  {
    step: "Step 4",
    icon: HeartHandshake,
    title: "Donation & Retrieval",
    desc: "The quick, safe retrieval is performed under light sedation at our San Diego clinic.",
  },
  {
    step: "Step 5",
    icon: Wallet,
    title: "Receive Your Compensation",
    desc: "You're compensated directly on-site, immediately after your donation.",
  },
];
/* ── Process Steps ── */
const ProcessSection = () => (
  <section className="py-24 bg-[#FAF4F8]">
  <div className="max-w-[1500px] mx-auto px-4">

    {/* Heading */}
    <div className="text-center mb-14">
      <h2 className="font-serif font-semibold text-[24px] md:text-[48px] leading-[1.1] text-[#1E1A35]">
        <span className="text-[#EB7EB2]">
          How Egg Donation Works:
        </span>{" "}
        A Guided Journey
      </h2>

      <p className="font-montserrat mt-6 text-[18px] text-[#2D2D42]">
        We make the process simple and empowering every step of the way.
      </p>
    </div>

    {/* Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">

      {steps.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="bg-white rounded-[10px] px-6 py-8 text-center min-h-[330px] flex flex-col items-center shadow-sm"
          >
            {/* Icon Circle */}
            <div className="w-[68px] h-[68px] rounded-full border border-[#F28ABA] flex items-center justify-center mb-5">
              <Icon
                size={30}
                strokeWidth={1.8}
                className="text-[#EB7EB2]"
              />
            </div>

            {/* Step */}
            <p className="text-[#8E6AAE] text-[16px] mb-3">
              {item.step}
            </p>

            {/* Title */}
            <h3 className="font-serif font-bold text-[24px] leading-[1.2] text-[#8E6AAE] mb-5">
              {item.title}
            </h3>

            {/* Description */}
            <p className="font-montserrat text-[15px] leading-[1.55] text-[#2D2D42]">
              {item.desc}
            </p>
          </div>
        );
      })}
    </div>

    {/* Bottom Text */}
    <div className="text-center mt-10">
      <h3 className="font-serif text-[24px] md:text-[30px] text-[#8E6AAE] mb-8">
        Get the Complete Egg Donation Process Guide
      </h3>

      {/* Download Button */}
      <button
        className="
          group
          inline-flex
          items-center
          gap-3
          px-10
          py-4
          rounded-full
          
          bg-white
          text-[#EB7EB2]
          font-semibold
          text-[18px]
          transition-all
          duration-300
          hover:text-white
          hover:border-transparent
          hover:bg-gradient-to-r
          hover:from-[#7B3FA0]
          hover:to-[#EB7EB2]
          
        "
        style={{
    border: "2px solid #EB7EB2",
  }}
      >
        Download Now

        

        <Download
          size={20}
          className=""
        />
      </button>
    </div>

  </div>
</section>
);

/* ── Qualifications ── */
const QualificationsSection = () => (
  <section className="py-12 overflow-hidden">
  <div className="max-w-[1350px] mx-auto px-4">
    <div className="grid lg:grid-cols-2 gap-20 items-center">

      {/* Left Image */}
     <div className="flex justify-center lg:justify-start">
        <img
          src="https://lucinaeggbank.com/wp-content/uploads/2023/09/image-1.webp"
          alt="Egg Donor"
          className="w-full max-w-[520px] h-auto object-contain"
        />
      </div>

      {/* Right Content */}
      <div className="max-w-[620px]">

        <h2 className="font-serif text-[34px] md:text-[52px] leading-[1.05] text-[#1D1B38] mb-8">
          Do You Qualify to{" "}
          <span className="text-[#EA84B7]">
            Become an Egg Donor?
          </span>
        </h2>

        <p className="font-montserrat text-[18px] font-semibold text-[#1D1B38] leading-[1.5] mb-8">
          Egg donation is carefully regulated to ensure everyone’s safety.
          You may qualify if you:
        </p>

        <div className="space-y-2 mb-12">

          <div className="font-montserrat flex items-start gap-4">
            <div className="w-4 h-4 rounded-full bg-[#EA84B7] mt-2 shrink-0" />
            <p className="text-[18px] text-[#1D1B38]">
              Are between <strong>19 and 31 years old.</strong>
            </p>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-4 h-4 rounded-full bg-[#EA84B7] mt-2 shrink-0" />
            <p className="text-[18px] text-[#1D1B38]">
              Maintain a healthy lifestyle (non-smoker,{" "}
              <strong>BMI under 28</strong>).
            </p>
          </div>

          <div className="font-montserrat flex items-start gap-4">
            <div className="w-4 h-4 rounded-full bg-[#EA84B7] mt-2 shrink-0" />
            <p className="text-[18px] text-[#1D1B38]">
              Have no major hereditary health conditions.
            </p>
          </div>

          <div className="font-montserrat flex items-start gap-4">
            <div className="w-4 h-4 rounded-full bg-[#EA84B7] mt-2 shrink-0" />
            <p className="text-[18px] text-[#1D1B38]">
              Are committed to completing the process.
            </p>
          </div>

        </div>

        {/* CTA Button */}
       <button
          className="
            group
            inline-flex
            items-center
            gap-3
            px-10
            py-5
            rounded-full
            bg-[#8C67AF]
            text-white
            text-[20px]
            font-semibold
            transition-all
            duration-300
            hover:bg-[#EA84B7]
          "
        >
          Start Your 2-Minute Application Now

          <img
            src={whiteArrowIcon}
            alt="arrow"
            className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1"
          />
        </button>

      </div>
    </div>
  </div>
</section>
);

/* ── Donor Testimonials ── */
const DonorTestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState([
    {
      name: "Natalie S.",
      content:
        "Lucina's Team is helpful and totally supportive. Elaine and Rachel made sure I was comfortable every step of the way and made the donation cycle so much easier.",
      rating: 5,
    },
    {
      name: "Patricia J.",
      content:
        "Third time donating to this program. It's been straightforward every time, and I feel supported, valued, and appreciated from start to finish.",
      rating: 5,
    },
    {
      name: "Olivia R.",
      content:
        "I have donated twice with Lucina Egg Bank and my experience both times was positive. The process took a while to complete but I learned a lot.",
      rating: 5,
    },
    {
      name: "Emma W.",
      content:
        "The staff is caring and makes sure I'm comfortable throughout the process. Everything was explained clearly.",
      rating: 5,
    },
  ]);

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 30000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const visibleTestimonials = [
    ...testimonials,
    ...testimonials,
  ];

  return (
    <section className="py-28 bg-[#F5EDF7] overflow-hidden " style={{
          background: "#e8dff1",
          borderTopRightRadius: "220px",
          borderBottomLeftRadius: "220px",
        }}>
      <div className="max-w-[1400px] mx-auto pl-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-14 pr-10">
          <h2 className="font-serif text-[32px] md:text-[44px] text-[#8B67AF]">
            What Egg Donors Are Saying
          </h2>

          <div className="flex gap-3">
            <button
              onClick={prevSlide}
              className="
                w-14 h-14
                rounded-full
                bg-[#DCCDE6]
                flex items-center justify-center
                transition-all duration-300
                hover:bg-[#EA84B7]
              "
            >
              <img
                src={PurpleArrowIcon}
                alt="Previous"
                className="w-6 h-6 rotate-180"
              />
            </button>

            <button
              onClick={nextSlide}
              className="
                w-14 h-14
                rounded-full
                bg-[#DCCDE6]
                flex items-center justify-center
                transition-all duration-300
                hover:bg-[#EA84B7]
              "
            >
              <img
                src={PurpleArrowIcon}
                alt="Next"
                className="w-6 h-6"
              />
            </button>
          </div>
        </div>

        {/* Slider */}
        <div className="overflow-hidden">
          <div
            className="flex gap-10 transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${current * 640}px)`,
            }}
          >
            {visibleTestimonials.map((item, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[500px] h-[300px] px-14 py-12 border border-[#C8B3DA]"
                style={{
                  background: "#DCCDE6",
                  borderTopLeftRadius: "220px",
                  borderTopRightRadius: "220px",
                  borderBottomLeftRadius: "220px",


                  // borderBottomRightRadius: "220px",
                }}
              >
                <div className="h-full flex flex-col justify-between">

                  <p className="font-montserrat text-[#8B67AF] text-[18px] leading-[1.8]">
                    {item.content}
                    <span className="font-semibold underline ml-2 cursor-pointer">
                      Read More
                    </span>
                  </p>

                  <div className="text-center">
                    <h3 className="font-semibold text-[22px] text-[#8B67AF]">
                      {item.name}
                    </h3>

                    <div className="flex justify-center gap-1 mt-4">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          fill="#8B67AF"
                          color="#8B67AF"
                        />
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

/* ── FAQ ── */

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [activeTab, setActiveTab] = useState("Process");

  const faqData = {
    Process: [
      {
        q: "Is egg donation safe?",
        a: "Yes. All procedures are FDA-regulated and performed by experienced medical professionals using established low-risk protocols. Your health and safety are always our top priority.",
      },
      {
        q: "Does the egg donation procedure hurt?",
        a: "Most donors experience only mild discomfort. The egg retrieval procedure is performed under light sedation, and recovery is typically quick.",
      },
      {
        q: "Will egg donation affect my fertility in the future?",
        a: "No. Egg donation uses eggs your body would naturally discard each month and does not reduce your future fertility.",
      },
      {
        q: "How many times can you donate eggs?",
        a: "According to medical guidelines, donors may typically donate up to six times depending on their health and eligibility.",
      },
      {
        q: "How long will I need to wait between donations?",
        a: "Most donors wait several months between cycles to ensure optimal health and recovery.",
      },
      {
        q: "Do I have to be on bed rest?",
        a: "No. Most donors return to normal activities within a day or two after retrieval, although strenuous activity should be avoided temporarily.",
      },
      {
        q: "Why is my weight or BMI important?",
        a: "BMI is one of several health factors used to ensure a safe and successful donation process for both donor and recipients.",
      },
      {
        q: "Can I become an Egg Donor when I am pregnant?",
        a: "No. You must wait until after pregnancy and recovery before being considered for donation.",
      },
      {
        q: "Can I donate even though I am currently on cycle suppression?",
        a: "Eligibility depends on your medical history and medications. Our medical team will review your individual situation.",
      },
      {
        q: "Is egg donation painful?",
        a: "Most donors report minimal discomfort. The retrieval procedure is performed under sedation and monitored by specialists.",
      },
    ],

    Compensation: [
      {
        q: "How much can I earn as an egg donor?",
        a: "Most donors earn between $8,000 and $15,000+, while highly qualified donors may earn significantly more.",
      },
      {
        q: "When do I receive compensation?",
        a: "Compensation is typically provided immediately following a successful retrieval.",
      },
    ],

    Privacy: [
      {
        q: "Is my identity confidential?",
        a: "Yes. All donor information is handled with strict confidentiality and privacy protections.",
      },
      {
        q: "Will recipients know who I am?",
        a: "No identifying information is shared unless a specific donor arrangement requires it.",
      },
    ],

    "Location & Travel": [
      {
        q: "Do I need to travel?",
        a: "Some travel may be required depending on your location, but Lucina coordinates and covers approved travel expenses.",
      },
      {
        q: "Are travel expenses covered?",
        a: "Yes. Approved travel, accommodations, and medical expenses are covered by the program.",
      },
    ],
  };

  return (
    <section className="py-24">
      <div className="max-w-[1450px] mx-auto px-6">

        {/* Heading */}
        <h2 className="font-serif text-[28px] md:text-[48px] leading-[1.1] text-[#1E1A35] mb-10">
          <span className="text-[#EA84B7]">FAQs:</span>{" "}
          Quick Answers About Egg Donation
        </h2>

        {/* Tabs */}
        <div className="inline-flex flex-wrap border border-[#B58CCF] rounded-full overflow-hidden mb-10">
          {Object.keys(faqData).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setOpenIndex(null);
              }}
              className={`px-8 md:px-12 py-4 text-[14px] md:text-[15px] transition-all duration-300 ${
                activeTab === tab
                  ? "bg-[#8C67AF] text-white"
                  : "bg-white text-[#1E1A35] hover:bg-[#F3EDF8]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="border-t border-[#D9C7E7]">
          {faqData[activeTab].map((faq, index) => (
            <div
              key={index}
              className="border-b border-[#D9C7E7]"
            >
              <button
                onClick={() =>
                  setOpenIndex(
                    openIndex === index ? null : index
                  )
                }
                className="w-full flex items-center justify-between py-5 text-left"
              >
                <span className="text-[18px] md:text-[28px] font-medium text-[#111827]">
                  {faq.q}
                </span>

                <span className="text-[#9A72BA] text-[30px] font-light">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index
                    ? "max-h-[300px] pb-5"
                    : "max-h-0"
                }`}
              >
                <p className="text-[16px] leading-[1.8] text-[#555555] pr-10">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="flex justify-center mt-12">
          <button
            className="
              group
              inline-flex
              items-center
              gap-3
              px-8
              py-4
              rounded-full
              bg-[#EA84B7]
              hover:bg-[#8C67AF]
              text-white
              font-semibold
              transition-all
              duration-300
            "
          >
            Got More Questions?

            <img
              src={whiteArrowIcon}
              alt="arrow"
              className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>
        </div>

      </div>
    </section>
  );
};



/* ── Application Form ── */


const LegacyApplicationForm = () => {
  const [files, setFiles] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <section
      id="apply-section"
      className=" py-12"
    >
      <div className="max-w-[1200px] mx-auto px-4">

        <h2 className="font-serif text-white text-[56px] leading-none mb-4">
          Find Out If You Qualify To Become An Egg Donor
        </h2>

        <p className="text-white text-[18px] leading-[1.6] max-w-[1300px] mb-6">
          Becoming an egg donor is a powerful way to help others on their journey
          to parenthood. To ensure the health and safety of everyone involved,
          egg donation is carefully regulated by the FDA.
        </p>

        <p className="text-white text-[18px] leading-[1.6] max-w-[1300px] mb-8">
          Before you begin your egg donation journey, it's important to understand
          the process and any potential medical risks. A consultation with your
          doctor is strongly recommended so you can make an informed decision
          with confidence.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-[16px] p-5"
        >

          <div className="grid grid-cols-3 gap-4">

            <div>
              <label className="block text-[14px] mb-1">
                First Name *
              </label>

              <input
                {...register("firstName")}
                placeholder="First Name"
                className="w-full h-[42px] border border-[#D7D7D7] px-3 rounded-[2px]"
              />
            </div>

            <div>
              <label className="block text-[14px] mb-1">
                Last Name *
              </label>

              <input
                {...register("lastName")}
                placeholder="Last Name"
                className="w-full h-[42px] border border-[#D7D7D7] px-3 rounded-[2px]"
              />
            </div>

            <div>
              <label className="block text-[14px] mb-1">
                Email *
              </label>

              <input
                {...register("email")}
                placeholder="Email address"
                className="w-full h-[42px] border border-[#D7D7D7] px-3 rounded-[2px]"
              />
            </div>

            <div>
              <label className="block text-[14px] mb-1">
                Cell Number *
              </label>

              <input
                {...register("phone")}
                placeholder="Ex. (000) 000-0000"
                className="w-full h-[42px] border border-[#D7D7D7] px-3 rounded-[2px]"
              />
            </div>

            <div>
              <label className="block text-[14px] mb-1">
                Date of Birth *
              </label>

              <input
                type="date"
                {...register("dob")}
                className="w-full h-[42px] border border-[#D7D7D7] px-3 rounded-[2px]"
              />
            </div>

            <div>
              <label className="block text-[14px] mb-1">
                Country *
              </label>

              <select
                {...register("country")}
                className="w-full h-[42px] border border-[#D7D7D7] px-3 rounded-[2px]"
              >
                <option>Select</option>
                <option>USA</option>
                <option>Canada</option>
                <option>UK</option>
              </select>
            </div>

            <div>
              <label className="block text-[14px] mb-1">
                Height (ft) *
              </label>

              <input
                {...register("heightFt")}
                placeholder="Example: 5ft"
                className="w-full h-[42px] border border-[#D7D7D7] px-3 rounded-[2px]"
              />
            </div>

            <div>
              <label className="block text-[14px] mb-1">
                Height (in) *
              </label>

              <input
                {...register("heightIn")}
                placeholder="Example: 7in"
                className="w-full h-[42px] border border-[#D7D7D7] px-3 rounded-[2px]"
              />
            </div>

            <div>
              <label className="block text-[14px] mb-1">
                Weight (lbs) *
              </label>

              <input
                {...register("weight")}
                placeholder="Example: 120 lbs"
                className="w-full h-[42px] border border-[#D7D7D7] px-3 rounded-[2px]"
              />
            </div>

            <div>
              <label className="block text-[14px] mb-1">
                Eye Color *
              </label>

              <select
                {...register("eyeColor")}
                className="w-full h-[42px] border border-[#D7D7D7] px-3 rounded-[2px]"
              >
                <option>Select</option>
                <option>Brown</option>
                <option>Blue</option>
                <option>Green</option>
              </select>
            </div>

            <div>
              <label className="block text-[14px] mb-1">
                Natural Hair Color *
              </label>

              <select
                {...register("hairColor")}
                className="w-full h-[42px] border border-[#D7D7D7] px-3 rounded-[2px]"
              >
                <option>Select</option>
                <option>Black</option>
                <option>Brown</option>
                <option>Blonde</option>
              </select>
            </div>

            <div>
              <label className="block text-[14px] mb-1">
                Religious Affiliation *
              </label>

              <select
                {...register("religion")}
                className="w-full h-[42px] border border-[#D7D7D7] px-3 rounded-[2px]"
              >
                <option>Select</option>
                <option>Christian</option>
                <option>Hindu</option>
                <option>Muslim</option>
              </select>
            </div>
                        <div>
              <label className="block text-[14px] mb-1">
                Racial Background *
              </label>

              <select
                {...register("racialBackground")}
                className="w-full h-[42px] border border-[#D7D7D7] px-3 rounded-[2px]"
              >
                <option>Select</option>
                <option>Asian</option>
                <option>Black</option>
                <option>White</option>
                <option>Hispanic</option>
              </select>
            </div>

            <div>
              <label className="block text-[14px] mb-1">
                What is your highest level of education *
              </label>

              <select
                {...register("education")}
                className="w-full h-[42px] border border-[#D7D7D7] px-3 rounded-[2px]"
              >
                <option>Select</option>
                <option>High School</option>
                <option>College</option>
                <option>Masters</option>
                <option>PhD</option>
              </select>
            </div>

            <div>
              <label className="block text-[14px] mb-1">
                Have you donated before *
              </label>

              <select
                {...register("donatedBefore")}
                className="w-full h-[42px] border border-[#D7D7D7] px-3 rounded-[2px]"
              >
                <option>Select</option>
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>

          </div>

          {/* Education Highlights */}
          <div className="mt-4">
            <label className="block text-[14px] mb-1">
              Education Highlights *
            </label>

            <input
              {...register("educationHighlights")}
              placeholder="Please include your education history."
              className="w-full h-[42px] border border-[#D7D7D7] px-3 rounded-[2px]"
            />
          </div>

          {/* Ethnic Origin */}
          <div className="mt-4">
            <label className="block text-[14px] mb-1">
              Ethnic Origin
            </label>

            <input
              {...register("ethnicOrigin")}
              placeholder="Ethnic Origin"
              className="w-full h-[42px] border border-[#D7D7D7] px-3 rounded-[2px]"
            />
          </div>

          {/* Upload + Info */}
          <div className="grid grid-cols-2 gap-8 mt-6">

            <div>
              <p className="text-[13px] leading-[1.8] text-[#555]">
                Please upload at least 2 photos to complete the application. We recommend you upload 3-5 photos, but the more photos, the merrier!
              </p>

              <p className="text-[13px] leading-[1.8] text-[#555] mt-2">
                *Check sample pictures here.
              </p>

              <p className="text-[13px] leading-[1.8] text-[#555]">
                Make sure the photo you upload is not larger than 2 MB.
              </p>
            </div>

            <div
              className="
                border
                border-dashed
                border-[#D6D6D6]
                rounded-md
                h-[120px]
                flex
                flex-col
                items-center
                justify-center
                cursor-pointer
              "
              onClick={() =>
                document.getElementById("fileInput").click()
              }
            >
              <Upload
                size={24}
                className="text-[#E879B3] mb-2"
              />

              <p className="text-[15px] text-[#555] mb-3">
                Drop files here or
              </p>

              <button
                type="button"
                className="
                  bg-[#E879B3]
                  text-white
                  px-5
                  py-2
                  rounded-full
                  text-[14px]
                "
              >
                Select files
              </button>

              <input
                id="fileInput"
                type="file"
                multiple
                className="hidden"
                onChange={(e) =>
                  setFiles(Array.from(e.target.files))
                }
              />
            </div>

          </div>

          {/* Files List */}
          {files.length > 0 && (
            <div className="mt-4 space-y-2">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="
                    flex
                    justify-between
                    items-center
                    bg-[#F8F8F8]
                    border
                    px-3
                    py-2
                    rounded
                  "
                >
                  <span>{file.name}</span>

                  <button
                    type="button"
                    className="text-red-500"
                    onClick={() =>
                      setFiles(
                        files.filter(
                          (_, i) => i !== index
                        )
                      )
                    }
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Agreement + Recaptcha */}
          <div className="flex justify-between items-start mt-8 gap-10">

            <div className="flex-1">

              <h4 className="font-semibold mb-4">
                I have read and agree this is an anonymous donation and
                won't have contact with or information of the recipient family.
              </h4>

              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  {...register("agree")}
                />

                <span>Agree</span>
              </label>

              <p className="text-[12px] text-[#666] mt-4">
                By submitting this form, you agree to our Privacy Policy
                and Terms of Use.
              </p>

            </div>

            {/* Fake Recaptcha UI */}
            <div
              className="
                border
                border-[#DADADA]
                w-[300px]
                h-[78px]
                flex
                items-center
                justify-between
                px-4
              "
            >
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 border border-black"></div>
                <span className="text-[14px]">
                  I'm not a robot
                </span>
              </div>

              <div className="text-[10px] text-gray-500">
                reCAPTCHA
              </div>
            </div>

          </div>

          {/* Submit */}
          <div className="mt-10">
            <button
              type="submit"
              className="
                bg-[#8B67AF]
                hover:bg-[#E879B3]
                text-white
                px-12
                py-3
                rounded-full
                font-medium
                transition-all
                duration-300
              "
            >
              Submit
            </button>
          </div>

        </form>
      </div>
    </section>
  );
};


const ApplicationForm = () => {
  const [files, setFiles] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [captchaError, setCaptchaError] = useState("");
  const recaptchaRef = useRef(null);
  const fileInputRef = useRef(null);
  const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const maxFiles = 5;
  const maxFileSize = 2 * 1024 * 1024;
  const allowedFileTypes = [
    "application/pdf",
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "image/heic",
    "image/heif",
  ];
  const allowedFileExtension = /\.(pdf|jpe?g|png|webp|heic|heif)$/i;
  const inputClass = "w-full h-[42px] border border-[#D7D7D7] px-3 rounded-[2px] focus:outline-none focus:border-[#8B67AF]";
  const selectClass = `${inputClass} donor-application-select`;
  const errorClass = "text-[#E879B3] text-[12px] mt-1";

  const fields = [
    { name: "firstName", label: "First Name", placeholder: "First Name", rules: { required: "First name is required" } },
    { name: "lastName", label: "Last Name", placeholder: "Last Name", rules: { required: "Last name is required" } },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Email address",
      rules: {
        required: "Email is required",
        pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email address" },
      },
    },
    { name: "cellNumber", label: "Cell Number", type: "tel", placeholder: "Ex. (000) 000-0000", rules: { required: "Cell number is required" } },
    { name: "dateOfBirth", label: "Date of Birth", type: "date", rules: { required: "Date of birth is required" } },
    { name: "country", label: "Country", type: "select", options: ["USA", "Outside of USA"], rules: { required: "Country is required" } },
    { name: "heightFt", label: "Height (ft)", type: "number", placeholder: "Example: 5", extra: { min: 3, max: 7 }, rules: { required: "Height feet is required" } },
    { name: "heightIn", label: "Height (in)", type: "number", placeholder: "Example: 7", extra: { min: 0, max: 11 }, rules: { required: "Height inches is required" } },
    { name: "weight", label: "Weight (lbs)", type: "number", placeholder: "Example: 120", extra: { min: 50 }, rules: { required: "Weight is required" } },
    { name: "eyeColor", label: "Eye Color", type: "select", options: ["Brown", "Blue", "Green", "Hazel", "Gray"], rules: { required: "Eye color is required" } },
    { name: "hairColor", label: "Natural Hair Color", type: "select", options: ["Black", "Brown", "Blonde", "Red", "Other"], rules: { required: "Hair color is required" } },
    { name: "religiousAffiliation", label: "Religious Affiliation", type: "select", options: ["Christian", "Hindu", "Muslim", "Jewish", "None", "Other"], rules: { required: "Religious affiliation is required" } },
    { name: "racialBackground", label: "Racial Background", type: "select", options: ["Asian", "Black", "White", "Hispanic", "Mixed", "Other"], rules: { required: "Racial background is required" } },
    { name: "education", label: "What is your highest level of education", type: "select", options: ["High School", "College", "Masters", "PhD"], rules: { required: "Education is required" } },
    { name: "hasDonatedBefore", label: "Have you donated before", type: "select", options: ["Yes", "No"], rules: { required: "Please select an option" } },
  ];

  const validateFiles = (selectedFiles) => {
    const validFiles = [];

    selectedFiles.forEach((file) => {
      const isAllowedType = allowedFileTypes.includes(file.type) || allowedFileExtension.test(file.name);

      if (!isAllowedType) {
        toast.error(`${file.name} is not allowed. Please upload only PDF or image files.`);
        return;
      }

      if (file.size > maxFileSize) {
        toast.error(`${file.name} is larger than 2 MB.`);
        return;
      }

      validFiles.push(file);
    });

    return validFiles;
  };

  const addFiles = (selectedFiles) => {
    const validFiles = validateFiles(Array.from(selectedFiles || []));
    if (!validFiles.length) return;

    setFiles((currentFiles) => {
      const merged = [...currentFiles, ...validFiles].slice(0, maxFiles);
      if (currentFiles.length + validFiles.length > maxFiles) {
        toast.error(`You can upload up to ${maxFiles} files.`);
      }
      return merged;
    });
  };

  const formatFileSize = (size) => {
    if (size < 1024 * 1024) {
      return `${Math.ceil(size / 1024)} KB`;
    }

    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  };

  const onSubmit = async (data) => {
    const currentRecaptchaToken = recaptchaRef.current?.getValue() || recaptchaToken;

    if (!recaptchaSiteKey) {
      setCaptchaError("reCAPTCHA is not configured. Add VITE_RECAPTCHA_SITE_KEY to the frontend environment.");
      return;
    }

    if (!currentRecaptchaToken) {
      setCaptchaError("Please complete the reCAPTCHA verification.");
      return;
    }

    setLoading(true);
    setCaptchaError("");

    try {
      const formData = new FormData();
      const payload = {
        ...data,
        agreedToAnonymous: data.agreedToAnonymous ? "true" : "false",
        recaptchaToken: currentRecaptchaToken,
        "g-recaptcha-response": currentRecaptchaToken,
      };

      Object.entries(payload).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          formData.append(key, value);
        }
      });

      files.forEach((file) => {
        formData.append("uploadedFiles", file);
      });

      await submitDonorApplication(formData);
      setSubmitted(true);
      setFiles([]);
      setPhone("");
      setRecaptchaToken("");
      recaptchaRef.current?.reset();
      reset();
      toast.success("Application submitted successfully.");
    } catch (err) {
      toast.error(err.message || "Application submission failed. Please try again.");
      setRecaptchaToken("");
      recaptchaRef.current?.reset();
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <section id="apply-section" className="py-12">
        <div className="max-w-[1200px] mx-auto px-4 text-center">
          <CheckCircle size={52} color="#EA7FB5" className="mx-auto mb-4" />
          <h2 className="font-serif text-white text-[44px] leading-tight mb-4">
            Thank You!
          </h2>
          <p className="text-white/90 text-[18px] leading-[1.6] max-w-[760px] mx-auto mb-8">
            We've received your donor application. A team member will review it and reach out shortly.
          </p>
          <button
            type="button"
            className="bg-[#E879B3] hover:bg-[#8B67AF] text-white px-8 py-3 rounded-full font-medium transition-all duration-300"
            onClick={() => setSubmitted(false)}
          >
            Submit Another Application
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="apply-section" className="py-12">
      <div className="max-w-[1200px] mx-auto px-4">
        <h2 className="font-serif text-white text-[clamp(36px,5vw,56px)] leading-none mb-4">
          Find Out If You Qualify To Become An Egg Donor
        </h2>

        <p className="text-white text-[18px] leading-[1.6] max-w-[1300px] mb-6">
          Becoming an egg donor is a powerful way to help others on their journey
          to parenthood. To ensure the health and safety of everyone involved,
          egg donation is carefully regulated by the FDA.
        </p>

        <p className="text-white text-[18px] leading-[1.6] max-w-[1300px] mb-8">
          Before you begin your egg donation journey, it's important to understand
          the process and any potential medical risks. A consultation with your
          doctor is strongly recommended so you can make an informed decision
          with confidence.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="donor-application-form bg-white rounded-[16px] p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {fields.map((field) => (
              <div key={field.name}>
                <label className="block text-[14px] mb-1">
                  {field.label} *
                </label>

                {field.name === "cellNumber" ? (
                  <>
                    <PhoneInput
                      country={"in"}
                      enableSearch
                      preferredCountries={["in", "us", "ca", "gb"]}
                      countryCodeEditable={false}
                      disableCountryCode={false}
                      value={phone}
                      onChange={(value) => {
                        setPhone(value);
                        setValue("cellNumber", value, { shouldValidate: true });
                      }}
                    />
                    <input
                      type="hidden"
                      {...register("cellNumber", field.rules)}
                    />
                  </>
                ) : field.type === "select" ? (
                  <select {...register(field.name, field.rules)} className={selectClass}>
                    <option value="">Select</option>
                    {field.options.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type || "text"}
                    {...register(field.name, field.rules)}
                    placeholder={field.placeholder || ""}
                    className={inputClass}
                    {...(field.extra || {})}
                  />
                )}

                {errors[field.name] && <p className={errorClass}>{errors[field.name].message}</p>}
              </div>
            ))}
          </div>

          <div className="mt-4">
            <label className="block text-[14px] mb-1">
              Education Highlights *
            </label>
            <input
              {...register("educationHighlights", { required: "Education highlights are required" })}
              placeholder="Please include your education history."
              className={inputClass}
            />
            {errors.educationHighlights && <p className={errorClass}>{errors.educationHighlights.message}</p>}
          </div>

          <div className="mt-4">
            <label className="block text-[14px] mb-1">
              Ethnic Origin *
            </label>
            <input
              {...register("ethnicOrigin", { required: "Ethnic origin is required" })}
              placeholder="Ethnic Origin"
              className={inputClass}
            />
            {errors.ethnicOrigin && <p className={errorClass}>{errors.ethnicOrigin.message}</p>}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
            <div>
              <p className="font-montserrat text-[13px] leading-[1.8] text-[#555]">
                Please upload at least 2 photos to complete the application. We recommend you upload 3-5 photos, but the more photos, the merrier!
              </p>
              <p className="font-montserrat text-[13px] leading-[1.8] text-[#555] mt-2">
                *Check sample pictures here.

              </p>
              <p className="font-montserrat text-[13px] leading-[1.8] text-[#555]">
                Make sure the photo you upload is not larger than 2 MB or if you are not sure then take a screenshot of your photo and upload the screenshot
              </p>
            </div>

            <div
              className="border border-dashed border-[#D6D6D6] rounded-md h-[120px] flex flex-col items-center justify-center cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => {
                event.preventDefault();
                addFiles(event.dataTransfer.files);
              }}
            >
              <Upload size={24} className="text-[#E879B3] mb-2" />
              <p className="text-[15px] text-[#555] mb-3">
                Drop files here or
              </p>
              <button type="button" className="bg-[#E879B3] text-white px-5 py-2 rounded-full text-[14px]">
                Select files
              </button>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf,image/jpeg,image/jpg,image/png,image/webp,image/heic,image/heif"
                className="hidden"
                onChange={(event) => {
                  addFiles(event.target.files);
                  event.target.value = "";
                }}
              />
            </div>
          </div>

          {files.length > 0 && (
            <div className="mt-4 space-y-2">
              {files.map((file, index) => (
                <div key={`${file.name}-${index}`} className="flex justify-between items-center bg-[#F8F8F8] border px-3 py-2 rounded">
                  <span className="truncate pr-4">
                    {file.name}
                    <span className="text-[#777] ml-2 text-[12px]">{formatFileSize(file.size)}</span>
                  </span>
                  <button
                    type="button"
                    className="text-red-500"
                    onClick={() => setFiles(files.filter((_, fileIndex) => fileIndex !== index))}
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-col lg:flex-row justify-between items-start mt-8 gap-10">
            <div className="flex-1">
              <h4 className="font-montserrat font-bold mb-4 text-[18px]">
                I have read and agree this is an anonymous donation and won't have contact with or information of the recipient family.
              </h4>

              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  {...register("agreedToAnonymous", { required: "You must agree before submitting" })}
                />
                <span>Agree</span>
              </label>
              {errors.agreedToAnonymous && <p className={errorClass}>{errors.agreedToAnonymous.message}</p>}

              <p className="text-[12px] text-[#666] mt-4">
                By submitting this form, you agree to our Privacy Policy and Terms of Use.
              </p>
            </div>

            <div className="max-w-full overflow-x-auto">
              {recaptchaSiteKey ? (
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={recaptchaSiteKey}
                  onChange={(token) => {
                    setRecaptchaToken(token || "");
                    setCaptchaError("");
                  }}
                  onExpired={() => {
                    setRecaptchaToken("");
                    setCaptchaError("reCAPTCHA expired. Please verify again.");
                  }}
                  onErrored={() => {
                    setRecaptchaToken("");
                    setCaptchaError("reCAPTCHA could not load. Please refresh and try again.");
                  }}
                />
              ) : (
                <p className="rounded-md border border-[#E879B3]/50 bg-[#FFF4FA] px-4 py-3 text-sm text-[#7B3FA0]">
                  reCAPTCHA is not configured. Add VITE_RECAPTCHA_SITE_KEY to the frontend environment.
                </p>
              )}
              {captchaError && <p className={errorClass}>{captchaError}</p>}
            </div>
          </div>

          <div className="mt-10">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#8B67AF] hover:bg-[#E879B3] text-white px-12 py-3 rounded-full font-medium transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};


/* helpers */
const SectionLabel = ({children}) => (
  <div className="text-[12px] font-bold uppercase tracking-[1.5px] text-[#7B3FA0] mt-7 mb-[18px] pb-2 border-b-2 border-[#F3EEF8]">{children}</div>
);
const FI = ({label,name,reg,errors,type='text',placeholder='',rules={},required=true,extra={}}) => (
  <div className="form-group">
    <label className="form-label">{label}{required&&<span className="required"> *</span>}</label>
    <input {...reg(name,{...( required?{required:'Required'}:{}), ...rules})} type={type} className="form-input" placeholder={placeholder} {...extra}/>
    {errors[name]&&<p className="form-error">{errors[name].message}</p>}
  </div>
);
const SelectFI = ({label,name,reg,errors,options}) => (
  <div className="form-group">
    <label className="form-label">{label} <span className="required">*</span></label>
    <select {...reg(name,{required:'Required'})} className="form-select">
      <option value="">Select</option>
      {options.map(o=><option key={o}>{o}</option>)}
    </select>
    {errors[name]&&<p className="form-error">{errors[name].message}</p>}
  </div>
);

const BecomeEggDonor = () => (
  <>
    <DonorHero />
    <BenefitsSection />
    <PrioritYSection />
    <ProcessSection />
    <QualificationsSection />
    <DonorTestimonialsSection />
    <FAQSection />
    <section className="section bg-[#5B4371]" style={{
          background: "#5B4371",
          borderTopLeftRadius: "220px",
          borderBottomRightRadius: "220px",
        }} >
      <div className="container"><ApplicationForm /></div>
    </section>
  </>
);

export default BecomeEggDonor;
