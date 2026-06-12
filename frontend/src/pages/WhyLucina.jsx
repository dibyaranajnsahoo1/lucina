import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import FindDonorForm from '../components/FindDonorForm';
import whiteArrowIcon  from '../../asset/arrow.png';
import PurpleArrowIcon  from '../../asset/arrow2.png';

import {
  CheckCircle2,
  TrendingUp,
  DollarSign,
  ScanFace,
} from "lucide-react";

const promiseCards = [
  {
    icon: CheckCircle2,
    title: "Comprehensive Guarantees",
    desc: "Lucina’s Blastocyst, PGT-A, and Live Birth Guarantees offer financial peace of mind and additional cohorts until success is achieved.",
    button: "Explore Guarantee Programs",
    pink: false,
  },
  {
    icon: TrendingUp,
    title: "Clinical Excellence",
    desc: "Our results consistently surpass industry norms. We achieve these benchmarks through meticulous donor screening, advanced vitrification techniques, and partnerships with the nation's premier IVF clinics.",
    note: "Surpassing industry standards annually.",
    pink: false,
  },
  {
    icon: DollarSign,
    title: "$0 Upfront Costs & Transparent Pricing",
    desc: "Start your donor search freely and instantly. All pricing is fixed and transparent, with no hidden fees. Financing options include 0% interest plans and a 100% refund guarantee.",
    button: "Explore Financial Resources",
    pink: false,
  },
  {
    icon: ScanFace,
    title: "Pioneering AI Matching",
    desc: "Lucina ReflEggction AI is the U.S.'s first AI-powered donor-matching tool. It uses facial recognition and phenotypic analysis to connect you with donors who resemble your desired traits.",
    button: "Try Lucina ReflEggction AI",
    pink: true,
  },
];

const whoWeServeData = [
  {
    title: "For Intended Parents",
    desc: "Browse 3,500+ donor profiles and benefit from ReflEggction®—our AI-powered tool that helps match you with a donor based on facial and phenotypic traits. Eggs ship globally, and every part of the process is designed to support and simplify your experience.",
    btn: "Find a Donor",
    link: "/find-an-egg-donor",
    image:
      "https://lucinaeggbank.com/wp-content/uploads/2025/08/Group-48098387.webp",
    reverse: false,
  },
  {
    title: "For Egg Donors",
    desc: "Make a lasting impact while earning $8,000-$15,000+ per cycle. All medical and travel costs are fully covered. The process typically takes 6 to 10 weeks from application to retrieval, with no wait time once approved. Plus, earn up to $1,000 for every friend you refer who donates, helping even more families grow.",
    btn: "Become an Egg Donor",
    link: "/become-an-egg-donor",
    image:
      "https://lucinaeggbank.com/wp-content/uploads/2025/08/Group-48098386.webp",
    reverse: true,
  },
  {
    title: "For Clinics & Partners",
    desc: "Seamlessly integrate Lucina's donor gallery and manage the full donor process with high-quality frozen eggs. Partnering with the premier San Diego egg bank requires no contracts or fees.",
    btn: "Become a Partner",
    link: "/contact-us",
    image:
      "https://lucinaeggbank.com/wp-content/uploads/2025/08/Group-48098385.webp",
    reverse: false,
  },
];

const stories = [
  {
    image:
      "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=400",
    title: "Our journey welcoming Caroline",
    content:
      "When my husband and I decided to start a family in 2022, we were thrilled but faced the reality of Canada's unique situation for egg donation. Since only altruistic donations are allowed in Canada, finding a suitable donor can take time and effort. We turned our attention to the United States, where egg donation is regulated differently. Our research led us to Lucina Egg Bank and we were impressed by their comprehensive approach.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1544717305-2782549b5136?w=400",
    title: "Finding the perfect donor",
    content:
      "The donor matching process was much easier than we expected. The support team guided us through every step, answered our questions, and made us feel confident in our decision. The transparency and professionalism made all the difference.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400",
    title: "A dream finally realized",
    content:
      "After years of trying to grow our family, we finally found hope through Lucina Egg Bank. The process was smooth, organized, and filled with compassionate support. Today we are proud parents and forever grateful.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400",
    title: "Exceptional support from start to finish",
    content:
      "Every interaction with the Lucina team was positive. They truly care about families and donors alike. Their communication and attention to detail gave us peace of mind throughout the journey.",
  },
];

const BirdIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <path d="M6 12 C2 7,2 2,6 1 C10 0,12 5,10 10Z" fill="#E8619A"/>
    <path d="M12 12 C14 6,20 3,24 7 C28 11,22 16,16 12Z" fill="#E8619A" opacity="0.7"/>
    <ellipse cx="10" cy="10" rx="5" ry="4" fill="#9B5EC0"/>
  </svg>
);

const ReadySection = () => (

  
  <section className="py-12 bg-white">
    <div
      className="max-w-[1800px] mx-auto px-8 lg:px-16 py-16 lg:py-20 rounded-[28px] ml-10 mr-10"
      style={{
        background:
          "linear-gradient(90deg, #8B68A9 0%, #C67AB1 50%, #E56FA0 100%)",
      }}
    >
      <div className="flex items-center gap-6 mb-10">
        <h2 className="font-serif text-white text-[clamp(42px,5vw,58px)] leading-none whitespace-nowrap">
          Ready to Begin?
        </h2>

        <div className="flex-1 h-px bg-white/30" />
      </div>

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
              src={PurpleArrowIcon}
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
              src={PurpleArrowIcon}
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



const WhyLucina = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % stories.length);
  };

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? stories.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % stories.length);
    }, 30000);

    return () => clearInterval(timer);
  }, []);

  return (
  <>
    {/* Hero */}
     <section className="overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left Content */}
          <div>

            <h1 className="font-serif leading-[1.05]">
              <span className="block text-[#EB84B8] font-bold text-[42px] md:text-[48px] lg:text-[58px]">
                Where Hope Meets Science:
              </span>

              <span className="block text-[#222] font-bold text-[42px] md:text-[48px] lg:text-[58px] mt-2">
                Your Path to Parenthood
              </span>

              <span className="block text-[#222] font-bold text-[42px] md:text-[48px] lg:text-[58px]">
                Begins Here
              </span>
            </h1>

            <p className="font-montserrat mt-8 max-w-[760px] text-[#333] text-[16px] md:text-[18px] leading-[1.5]">
              At Lucina Egg Bank in San Diego, California, we understand the deeply
              personal journey of building a family. With over 30 years of
              experience, we combine medical precision and heartfelt support to help
              make parenthood possible for everyone facing fertility or genetic
              challenges. We’re committed to inclusivity, safety, and ethics,
              ensuring your path is guided with confidence and peace of mind.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 mt-10">

              <a
                href="/find-an-egg-donor"
                className="
                  group
                  inline-flex
                  items-center
                  gap-3
                  bg-[#8C67AF]
                  hover:bg-[#EB84B8]
                  text-white
                  font-semibold
                  px-10
                  py-5
                  rounded-full
                  transition-all
                  duration-300
                "
              >
                Find a Donor

                <img
                  src={whiteArrowIcon}
                  alt="arrow"
                  className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>

              <Link
                to="/become-an-egg-donor"
                className="
                  group
                  inline-flex
                  items-center
                  gap-3
                  bg-[#EB84B8]
                  hover:bg-[#8C67AF]
                  text-white
                  font-semibold
                  px-10
                  py-5
                  rounded-full
                  transition-all
                  duration-300
                "
              >
                Become an Egg Donor

                <img
                  src={whiteArrowIcon}
                  alt="arrow"
                  className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

            </div>

          </div>

          {/* Right Image */}
          <div className="flex justify-centerpt  lg:justify-end">
            <img
              src="https://lucinaeggbank.com/wp-content/uploads/2022/04/right-image-1-768x743-1.webp"
              alt="Happy Family"
              className="
                w-full
                max-w-[600px]
                h-auto
                object-contain
                mt-5
              "
            />
          </div>

        </div>
      </div>
    </section>

     {/* Stats */}
    <section className="py-16 ">
  <div className="container mx-auto px-4">
    <div className="bg-gradient-to-r from-[#8C67AF] to-[#EA77AD] rounded-[28px] px-16 py-14">

      {/* Heading */}
      <div className="flex items-center gap-8 mb-12">
        <h2 className="font-serif text-white text-[36px] md:text-[54px] leading-none whitespace-nowrap">
          Lucina Egg Bank’s Outcomes
        </h2>

        <div className="flex-1 h-[1px] bg-white/40"></div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">

        <div>
          <div className="text-white font-bold text-[48px] md:text-[84px] leading-none">
            92.2%
          </div>

          <p className="text-white font-semibold text-[24px] md:text-[28px] leading-[1.1] mt-4">
            Survival rate
          </p>
        </div>

        <div>
          <div className="text-white font-bold text-[48px] md:text-[84px] leading-none">
            89.1%
          </div>

          <p className="text-white font-semibold text-[24px] md:text-[28px] leading-[1.1] mt-4">
            ICSI fertilization
          </p>
        </div>

        <div>
          <div className="text-white font-bold text-[48px] md:text-[84px] leading-none">
            54.1%
          </div>

          <p className="text-white font-semibold text-[24px] md:text-[28px] leading-[1.1] mt-4">
            Blastocyst formation
          </p>
        </div>

        <div>
          <div className="text-white font-bold text-[48px] md:text-[84px] leading-none">
            61.5%
          </div>

          <p className="text-white font-semibold text-[24px] md:text-[28px] leading-[1.1] mt-4">
            Clinical pregnancy
            <br />
            success rate
          </p>
        </div>

      </div>
    </div>
  </div>
    </section>

     <section className="py-20]">
      <div className="container mx-auto px-4">

        {/* Heading */}
        <div className="mb-14">
          <h2 className="font-serif text-[28px] md:text-[48px] leading-tight text-[#221B35]">
            <span className="text-[#EB7EB2]">
              The Lucina Promise:
            </span>{" "}
            Unrivaled Assurance for Your Journey
          </h2>

          <p className=" font-montserrat mt-5 text-[14px] md:text-[18px] text-[#4D4D5C] max-w-[1000px]">
            We stand by every egg, every cycle, every family. Your peace of mind
            is our priority, backed by unparalleled support and transparency.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6">

          {promiseCards.map((card, index) => {
            const Icon = card.icon;

            return (
              <div
                key={index}
                className="
                  bg-white
                  rounded-[20px]
                  p-8
                  shadow-[0_4px_20px_rgba(0,0,0,0.06)]
                  border
                  border-[#ECE7EF]
                  min-h-[290px]
                  flex
                  flex-col
                "
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-full bg-[#EB7EB2] flex items-center justify-center mb-6">
                  <Icon
                    size={28}
                    strokeWidth={2.5}
                    className="text-white"
                  />
                </div>

                {/* Title */}
                <h3 className="font-montserrat text-[20px] md:text-[24px] font-semibold text-[#8B67AF] mb-5">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="font-montserrat text-[#4D4D5C] text-[18px] leading-[1.8] flex-1">
                  {card.desc}
                </p>

                {/* Note */}
                {card.note && (
                  <p className="mt-6 italic font-semibold text-[#8B67AF]">
                    {card.note}
                  </p>
                )}

                {/* Button */}
                {card.button && (
                  <div className="mt-8">
                    <button
                      className={`
                        group
                        inline-flex
                        items-center
                        gap-3
                        px-7
                        py-4
                        rounded-full
                        text-white
                        font-semibold
                        transition-all
                        duration-300
                        ${
                          card.pink
                            ? "bg-[#EB7EB2] hover:bg-[#8B67AF]"
                            : "bg-[#8B67AF] hover:bg-[#EB7EB2]"
                        }
                      `}
                    >
                      {card.button}

                      <img
                        src={whiteArrowIcon}
                        alt="arrow"
                        className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </button>
                  </div>
                )}
              </div>
            );
          })}

        </div>
      </div>
    </section>


    {/* Who We Serve */}
     <section className="py-20 lg:py-28 mt-12 bg-[#F8F6F7] overflow-hidden">
      <div className="container mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-20">
          <h2 className="font-serif text-[28px] md:text-[56px] leading-tight text-[#221B35]">
            <span className="text-[#EB7EB2]">
              Who We Serve:
            </span>{" "}
            Three Paths, One Shared Purpose
          </h2>
        </div>

        {/* Rows */}
        <div className="space-y-16 lg:space-y-20">
          {whoWeServeData.map((item, index) => (
            <div
              key={index}
              className={`
                grid
                lg:grid-cols-2
                
                items-center
                ${
                  item.reverse
                    ? "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1"
                    : ""
                }
              `}
            >
              {/* Content */}
              <div
                className={`
                  max-w-[620px]
                  ${item.reverse ? "lg:ml-auto" : ""}
                `}
              >
                <h3 className="font-serif font-bold text-[32px] md:text-[46px] text-[#221B35] leading-tight mb-4">
                  {item.title}
                </h3>

                <p className="font-montserrat text-[#4D4D5C] text-[16px] md:text-[17px] leading-[1.8] mb-8">
                  {item.desc}
                </p>

                <Link
                  to={item.link}
                  className={`
                    group
                    inline-flex
                    items-center
                    gap-3
                    px-8
                    py-4
                    rounded-full
                    text-white
                    font-semibold
                    transition-all
                    duration-300
                    ${
                      item.title === "For Egg Donors"
                        ? "bg-[#EB7EB2] hover:bg-[#8C67AF]"
                        : "bg-[#8C67AF] hover:bg-[#EB7EB2]"
                    }
                  `}
                >
                  {item.btn}

                  <img
                    src={whiteArrowIcon}
                    alt="arrow"
                    className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </div>

              {/* Image Only */}
              <div
                className={`
                  flex
                  ${
                    item.reverse
                      ? "justify-center lg:justify-start"
                      : "justify-center lg:justify-end"
                  }
                `}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="
                    w-full
                    max-w-[820px]
                    h-auto
                    object-contain
                    select-none
                  "
                />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>

   <section className="py-20 mt-10 bg-[#F4EDF8] overflow-hidden"  style={{
          background: "#e8dff1",
          borderTopLeftRadius: "220px",
          borderBottomRightRadius: "220px",
        }}>
  <div className="max-w-6xl mx-auto px-4">

    {/* Header */}
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-14">

      <h2 className="font-serif text-center ml-20 lg:text-left text-[24px] md:text-[48px] leading-tight">
        <span className="text-[#EA84B7]">
          Stories of Hope:
        </span>{" "}
        <span className="text-[#221B35]">
          Real Families. Real Joy.
        </span>
      </h2>

      {/* Arrows */}
      <div className="flex justify-center lg:justify-end gap-4 mt-8 lg:mt-0">

        <button
          onClick={prevSlide}
          className="
            w-16 h-16
            rounded-full
            border
            border-[#B895D4]
            flex items-center justify-center
            hover:bg-white
            transition-all duration-300
            bg-[#CAB7CC] 
          "
        >
          <img
            src={PurpleArrowIcon}
            alt="Previous"
            className="w-7 h-7 rotate-180"
          />
        </button>

        <button
          onClick={nextSlide}
          className="
            w-16 h-16
            rounded-full
            border
            border-[#5B4371]
            flex items-center justify-center
            hover:bg-white
            transition-all duration-300
            bg-[#CAB7CC]
          "
        >
          <img
            src={PurpleArrowIcon}
            alt="Next"
            className="w-7 h-7"
          />
        </button>

      </div>
    </div>

    {/* Story Card */}
    <div
      className="
        bg-[#5B4371]
        rounded-tl-[120px]
        rounded-br-[120px]
        lg:rounded-tl-[180px]
        lg:rounded-br-[180px]
        px-8
        py-12
        md:px-20
        md:py-20
      "
    >
      <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-14">

        {/* Image */}
        <div className="flex-shrink-0">
          <img
            src={stories[current].image}
            alt={stories[current].title}
            className="
              w-[120px]
              h-[120px]
              md:w-[130px]
              md:h-[130px]
              rounded-full
              object-cover
            "
          />
        </div>

        {/* Content */}
        <div className="text-white flex-1 text-center lg:text-left">

          <h3 className="font-semibold font-montserrat text-white text-[18px] md:text-[24px] mb-6">
            {stories[current].title}
          </h3>

          <p className="font-montserrat text-[17px] md:text-[18px] leading-[1.5] text-white/95">
            {stories[current].content}

            <span className="underline font-semibold ml-2 cursor-pointer">
              Read More
            </span>
          </p>

        </div>

      </div>
    </div>

  </div>
    </section>

    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">

        <div className="max-w-[1200px] mx-auto text-center">

          <h2 className="font-serif text-[34px] md:text-[50px] leading-[1.15]">
            <span className="text-[#EB7EB2]">
              Join the Lucina Community:
            </span>{" "}
            <span className="text-[#221B35]">
              Inclusive. Ethical. Global.
            </span>
          </h2>

          <p
            className="
              font-montserrat
              text-[#333]
              text-[18px]
              md:text-[18px]
              leading-[1.8]
              max-w-[1050px]
              mx-auto
              mt-10
            "
          >
            Lucina proudly supports LGBTQ+ families, cancer survivors,
            single parents, hopeful couples. With our extensive network
            of IVF clinic partners in California, across the U.S. and abroad,
            global coordination and support are always within reach.
          </p>

          <div className="flex flex-wrap justify-center gap-6 mt-14">

            <Link
              to="/find-an-egg-donor"
              className="
                group
                min-w-[200px]
                h-[55px]
                px-6
                rounded-full
                bg-[#EB7EB2]
                text-white
                font-semibold
                text-[18px]
                flex
                items-center
                justify-center
                transition-all
                duration-300
                hover:bg-[#8C67AF]
              "
            >
              Find a Donor

              <img
                src={whiteArrowIcon}
                alt=""
                className="ml-3 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            <Link
              to="/contact-us"
              className="
                group
                min-w-[220px]
                h-[55px]
                px-10
                rounded-full
                border-2
                border-[#EB7EB2]
                text-[#EB7EB2]
                bg-white
                font-semibold
                text-[18px]
                flex
                items-center
                justify-center
                transition-all
                duration-300
                hover:bg-[#EB7EB2]
                hover:text-white
              "
            >
              Become a Partner

              <img
                src={PurpleArrowIcon}
                alt=""
                className="ml-3 w-5 h-5 group-hover:hidden"
              />

              <img
                src={whiteArrowIcon}
                alt=""
                className="ml-3 w-5 h-5 hidden group-hover:block"
              />
            </Link>

          </div>

        </div>

      </div>
    </section>

    <ReadySection />

   

   

    {/* Form */}
      {/* Find Donor Form */}
      <section className="py-12 bg-white">
        <div
          className="max-w-[1800px] mx-auto px-8 lg:px-16 py-16"
          style={{
            background: "#5B4371",
            borderTopLeftRadius: "250px",
            borderBottomRightRadius: "250px",
          }}
        >
       <FindDonorForm />
      </div>
    </section>

    <style>{`@media(max-width:900px){.who-grid{grid-template-columns:1fr!important;direction:ltr!important}}`}</style>
  </>
  );
};

export default WhyLucina;
