import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FindDonorForm from '../components/FindDonorForm';
import { getDonors } from '../utils/api';
import { Sparkles, UserCheck, LockKeyhole } from 'lucide-react';
import img from '../../asset/img.png';
import { Plus, Minus } from "lucide-react";

import { TrendingUp, HeartHandshake, DollarSign } from "lucide-react";

const API_ORIGIN = (import.meta.env.VITE_API_URL || "http://localhost:5000/api").replace(/\/api\/?$/, "");

const trustCards = [
  {
    title: "High Success Rates",
    description:
      "Our rigorous protocols consistently lead to 92.2% frozen egg survival and high clinical pregnancy rates, surpassing industry averages.",
    icon: <TrendingUp size={28} className="text-[#EA7FB5]" />,
  },
  {
    title: "Comprehensive Guarantees",
    description:
      "Enjoy financial security and peace of mind with our Blastocyst, PGT-A, and Live Birth Guarantees.",
    icon: <HeartHandshake size={28} className="text-[#EA7FB5]" />,
  },
  {
    title: "Transparent Pricing & Financing",
    description:
      "We offer clear, fixed pricing with no hidden costs, supported by flexible financing options from trusted partners.",
    icon: <DollarSign size={28} className="text-[#EA7FB5]" />,
  },
];



const faqs = [
  {
    question: "What makes Lucina’s eggs higher quality?",
    answer:
      "All eggs are frozen at peak maturity, screened by board-certified REIs, and backed by outcome-based guarantees.",
  },
  {
    question: "Can I use the same donor for a sibling later?",
    answer:
      "Absolutely. We offer cohort reservation and sibling planning support.",
  },
  {
    question: "When can we start treatment?",
    answer:
      "Immediately—our eggs are frozen, pre-screened, and ready to ship to your clinic within days.",
  },
  {
    question: "Can Lucina ship to my country?",
    answer:
      "Yes! We partner with IVF clinics in Europe, Asia, the Middle East, Latin America, and beyond.",
  },
  {
    question: "Do I need to be in San Diego to work with Lucina?",
    answer:
      "No—our eggs ship directly to your clinic anywhere in California, the U.S., or abroad.",
  },
];


const features = [
  {
    icon: <Sparkles size={34} strokeWidth={1.5} />,
    title: "Vast & Diverse Choices",
    description:
      "Explore over 3,500+ meticulously screened, ready-to-ship donor eggs from a rich tapestry of ethnicities and backgrounds, available now.",
  },
  {
    icon: <UserCheck size={34} strokeWidth={1.5} />,
    title: "Personalized Matching",
    description:
      "Our exclusive RefEggction™ AI uses facial recognition to help you find donors who share your desired resemblance—streamlining your search by up to 70%.",
  },
  {
    icon: <LockKeyhole size={34} strokeWidth={1.5} />,
    title: "Immediate Access",
    description:
      "Browse profiles instantly with no upfront fees. Our frozen eggs are immediately available and shipped from our San Diego lab to clinics across California, the U.S., and abroad.",
  },
];

const RACES = [
  "American Indian",
  "Black",
  "Caucasian",
  "Chinese",
  "Japanese",
  "Latina",
  "Other Asian",
];
const defaultDonors = [
  {
    _id: "1",
    donorId: "BD1757-001",
    firstName: "Emma",
    age: 26,
    eyeColor: "Brown",
    hairColor: "Black",
    racialBackground: "Chinese",
    education: "College completed or equivalent",
    height: { feet: 5, inches: 3 },
    bloodType: "O+",
    availability: "Available",
    featured: true,
  },
  {
    _id: "2",
    donorId: "HA2596-001",
    firstName: "Sophia",
    age: 22,
    eyeColor: "Blue",
    hairColor: "Blonde",
    racialBackground: "Caucasian",
    education: "College in enrolled or equivalent",
    height: { feet: 5, inches: 4 },
    bloodType: "A+",
    availability: "Available",
    featured: true,
  },
  {
    _id: "3",
    donorId: "MA2127-001",
    firstName: "Yuki",
    age: 28,
    eyeColor: "Brown",
    hairColor: "Brown",
    racialBackground: "Japanese",
    education: "College in progress or equivalent",
    height: { feet: 5, inches: 4 },
    bloodType: "B+",
    availability: "Available",
    featured: true,
  },
  {
    _id: "4",
    donorId: "UG5400-001",
    firstName: "Isabella",
    age: 19,
    eyeColor: "Brown",
    hairColor: "Black",
    racialBackground: "Caucasian",
    education: "College in progress or equivalent",
    height: { feet: 5, inches: 4 },
    bloodType: "O+",
    availability: "Available",
    featured: true,
  },
  {
    _id: "5",
    donorId: "LA3201-001",
    firstName: "Maria",
    age: 24,
    eyeColor: "Brown",
    hairColor: "Dark Brown",
    racialBackground: "Latina",
    education: "College completed or equivalent",
    height: { feet: 5, inches: 5 },
    bloodType: "A-",
    availability: "Available",
    featured: false,
  },
  {
    _id: "6",
    donorId: "OA1104-001",
    firstName: "Priya",
    age: 27,
    eyeColor: "Dark Brown",
    hairColor: "Black",
    racialBackground: "Other Asian",
    education: "Masters completed",
    height: { feet: 5, inches: 4 },
    bloodType: "AB+",
    availability: "Available",
    featured: false,
  },
  {
    _id: "7",
    donorId: "BL4588-001",
    firstName: "Aaliyah",
    age: 25,
    eyeColor: "Hazel",
    hairColor: "Black",
    racialBackground: "Black",
    education: "College completed",
    height: { feet: 5, inches: 6 },
    bloodType: "B-",
    availability: "Available",
    featured: false,
  },
  {
    _id: "8",
    donorId: "AI2210-001",
    firstName: "Maya",
    age: 23,
    eyeColor: "Brown",
    hairColor: "Dark Brown",
    racialBackground: "American Indian",
    education: "College enrolled",
    height: { feet: 5, inches: 3 },
    bloodType: "O-",
    availability: "Available",
    featured: false,
  },
];

const BG_COLORS = {
  'White':'#F5E6D3','Hispanic or Latina':'#DBBF8C','Black or African American':'#C49A6C',
  'Chinese':'#F5DEB3','Japanese':'#FFF5E4','Other Asian':'#F0E68C',
  'American Indian or Alaska Native':'#D2A06C','Native Hawaiian or other Pacific Islander':'#C4956A',
};

const DonorCard = ({ donor }) => (
  <article className="bg-white rounded-[24px] shadow-[0_6px_24px_rgba(124,63,160,0.08)] overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_10px_32px_rgba(124,63,160,0.14)]">
    <div className="relative h-[180px] flex items-center justify-center" style={{ background: '#f8f4ee' }}>
      <span className="absolute left-4 bottom-2 rounded-full bg-gradient-to-r from-pink-400/80 to-purple-400/80 text-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[1.5px] text-[#7B3FA0] shadow-sm">
        {donor.racialBackground || 'Ethnicity'}
      </span>
      {donor.profileImage ? (
        <img src={`${API_ORIGIN}${donor.profileImage}`} alt={donor.firstName} className="h-[110px] w-[110px] rounded-full object-cover border-4 border-white shadow-md" />
      ) : (
        <div className="h-[110px] w-[110px] rounded-full bg-white/90 border-4 border-white shadow-md flex items-center justify-center text-[42px] font-serif text-[#8C5BB3]">{donor.firstName?.charAt(0) || 'D'}</div>
      )}
    </div>

    <div className="p-5 text-[#3E3750]">
      <h3 className="font-serif text-[22px] text-[#1D1633] mb-3">{donor.donorId || 'Donor ID'}</h3>
      <div className="space-y-2 text-[14px]">
        <div className="flex justify-between gap-3 pb-2"><span className="text-gray-500 font-normal">Race</span><span className="text-right text-black font-bold">{donor.racialBackground || '—'}</span></div>
        <div className="flex justify-between gap-3 pb-2"><span className="text-gray-500 font-normal">Age</span><span className="text-right text-black font-bold">{donor.age || '—'}</span></div>
        <div className="flex justify-between gap-3 pb-2"><span className="text-gray-500 font-normal">Education</span><span className="text-right text-black font-bold">{donor.education || '—'}</span></div>
        <div className="flex justify-between gap-3 pb-2"><span className="text-gray-500 font-normal">Height</span><span className="text-right text-black font-bold">{donor.height ? `${donor.height.feet}'${donor.height.inches}"` : '—'}</span></div>
        <div className="flex justify-between gap-3"><span className="text-gray-500 font-normal">Blood Type</span><span className="text-right text-black font-bold">{donor.bloodType || '—'}</span></div>
      </div>
    </div>
  </article>
);

const FindEggDonor = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRace, setSelectedRace] = useState('');

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const params = selectedRace ? { racialBackground: selectedRace } : {};
        const res = await getDonors(params);
        const apiDonors = Array.isArray(res?.data) ? res.data : [];
        setDonors(apiDonors.length ? apiDonors : defaultDonors);
      } catch {
        setDonors(defaultDonors);
      } finally {
        setLoading(false);
      }
    };

    fetchDonors();
  }, [selectedRace]);

  const visibleDonors = donors.filter((donor) =>
    !selectedRace || donor.racialBackground === selectedRace
  );
  const raceOptions = Array.from(
    new Set([
      ...RACES,
      ...donors.map((donor) => donor.racialBackground).filter(Boolean),
    ])
  );
  const groupedDonors = visibleDonors.reduce((groups, donor) => {
    const race = donor.racialBackground || "Other";
    return {
      ...groups,
      [race]: [...(groups[race] || []), donor],
    };
  }, {});
  const groupedEntries = [
    ...raceOptions
      .map((race) => [race, groupedDonors[race] || []])
      .filter(([, raceDonors]) => raceDonors.length > 0),
    ...Object.entries(groupedDonors).filter(([race]) => !raceOptions.includes(race)),
  ];

  const toggleFAQ = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <>
      <section className="bg-white py-16 lg:py-24 overflow-hidden">
  <div className="container">
    <div className="hero-grid grid lg:grid-cols-[1.15fr_0.85fr] gap-20 items-center">

      <div>
        <h1 className="font-serif text-[clamp(38px,6vw,69px)] leading-[1.08] text-[#1D1633] mb-6">
          Find Your Perfect Egg Donor —{" "}
          <span className="text-[#E97BB0]">
            Backed by Science,
            <br />
            Guided by Compassion
          </span>
        </h1>

        <p className=" font-montserrat text-[#3E3750] text-[18px] leading-[1.5] mb-6 max-w-[700px]">
          Discover the right match for you, in looks, values, and potential.
          At Lucina Egg Bank in San Diego, California, you'll find one of the
          nation's largest and most diverse frozen donor egg databases,
          featuring over 3,500+ meticulously screened profiles.
        </p>

        <p className=" font-montserrat text-[#3E3750] text-[18px] leading-[1.5] max-w-[700px]">
          With FDA-compliant donors, proven survival rates above 90%, and
          advanced matching through RefEggction™ AI, you gain immediate access
          to high-quality donor eggs—ready to ship to your clinic without delay.
        </p>
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


      <section className="py-20 bg-white">
        <div className="container max-w-[1700px]">

          <h2 className="font-serif text-[clamp(36px,4vw,60px)] leading-tight mb-8">
            <span className="text-[#E97BB0]">
              Lucina’s Unique Approach
            </span>{" "}
            <span className="text-[#1D1633]">
              to Donor Discovery
            </span>
          </h2>

          <p className=" font-montserrat text-[#3E3750] text-[22px] mb-14">
            We make finding your ideal donor simpler, faster, and more personal.
          </p>

          <div className=" font-montserrat grid lg:grid-cols-3 gap-8">
            {features.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-[8px] shadow-[0_4px_20px_rgba(0,0,0,0.08)] px-10 py-12 text-center h-full flex flex-col"
              >
                <div className="w-[84px] h-[84px] rounded-full border border-[#EB7DAE] flex items-center justify-center mx-auto mb-8 text-[#EB7DAE]">
                  {item.icon}
                </div>

                <h3 className="font-serif text-[24px] text-[#8C6BA9] mb-6">
                  {item.title}
                </h3>

                <p className="text-[#3E3750] text-[16px] leading-[1.6] flex-1">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>


      <section className="bg-white pt-12">
        <div className="container">

          <h2 className="font-serif text-[clamp(36px,4vw,48px)] leading-tight mb-6">
            <span className="text-[#1D1633]">
              Explore Our
            </span>{" "}
            <span className="text-[#E97BB0]">
              Donor Gallery
            </span>
          </h2>

          <p className="font-montserrat text-[#3E3750] text-[18px] leading-[1.6] max-w-[750px] mb-10">
            Find a donor who shares your cultural background, academic achievements, talents, or physical traits. Our diverse, searchable gallery makes it easy.
          </p>

          <div className="flex flex-wrap gap-3 mb-10">
            <button
              onClick={() => setSelectedRace('')}
              className={`px-5 py-3 rounded-full text-[14px] font-semibold transition ${!selectedRace ? 'bg-[#D56AA0] text-white' : 'bg-white border border-[#D8D8D8] text-[#6A6275] hover:border-[#D56AA0]'}`}>
              All Ethnicities
            </button>

            {raceOptions.map((race) => (
              <button
                key={race}
                onClick={() => setSelectedRace(race)}
                className={`px-5 py-3 rounded-full text-[14px] font-semibold transition ${selectedRace === race ? 'bg-[#D56AA0] text-white' : 'bg-white border border-[#D8D8D8] text-[#6A6275] hover:border-[#D56AA0]'}`}
              >
                {race}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* Donor Gallery */}
      <section id="donors-section" className=" bg-white">
        <div className="container">
          {loading ? (
            <div className="text-center py-[60px]"><div className="spinner mx-auto" /></div>
          ) : visibleDonors.length === 0 ? (
            <div className="text-center py-[60px] text-[#6B7280]">
              <div className="text-[48px] mb-4">🔍</div>
              <h3>No donors found</h3>
            </div>
          ) : (
            <div className="space-y-12">
              {groupedEntries.map(([race, raceDonors]) => (
                <div key={race}>
                  <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-[2.5px] text-[#D56AA0]">
                        Donor Category
                      </span>
                      <h3 className="font-serif text-[30px] text-[#1D1633]">
                        {race}
                      </h3>
                    </div>
                    <span className="text-sm font-semibold text-[#6A6275]">
                      {raceDonors.length} {raceDonors.length === 1 ? "donor" : "donors"}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                    {raceDonors.map((d) => <DonorCard key={d._id || d.donorId} donor={d} />)}
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="mt-10 space-y-3">
            <div className="flex items-start gap-3">
              <span className="w-3 h-3 rounded-full bg-[#E97BB0] mt-2" />
              <p className="text-[18px] text-[#3E3750]">
                <strong>Search with precision:</strong> Filter by ethnicity &
                heritage, education & occupation, physical features,
                donor motivations, and more.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <span className="w-3 h-3 rounded-full bg-[#E97BB0] mt-2" />
              <p className="text-[18px] text-[#3E3750]">
                <strong>Optimize visual matching:</strong> Leverage comprehensive
                profiles and RefEggction™ AI to refine your choices — all free.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20  overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left Video */}
            <div className="flex justify-center">
              <div className="w-full max-w-[550px]">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-auto rounded-full"
                >
                  <source
                    src="https://lucinaeggbank.com/wp-content/uploads/2025/09/Egg-donor_2.mp4"
                    type="video/mp4"
                  />
                </video>
              </div>
            </div>

            {/* Right Content */}
            <div>
              <h2 className="font-serif text-[clamp(38px,5vw,48px)] leading-tight text-[#1D1633] mb-8">
                <span className="text-[#E879B3]">
                  Discover ReflEggction™ AI:
                </span>{" "}
                See Yourself
              
                in Your Donor
              </h2>

              <p className="font-montserrat text-[#3E3558] text-lg leading-relaxed max-w-[650px] mb-10">
                Your donor choice is emotional. Lucina's ReflEggction™ AI offers a
                unique way to find a deeper connection by matching donors to your
                facial features—instantly and for free. Your photos and personal
                information remain secure and confidential, ensuring privacy and
                security.
              </p>

              {/* Features Image */}
              <div className="mb-10">
                <img
                  src={img}
                  alt="Lucina Steps"
                  className="w-full max-w-[620px]"
                />
              </div>

              {/* CTA Button */}
              <button className=" font-montserrat group inline-flex items-center gap-3 bg-[#E879B3] hover:bg-[#7B3FA0] text-white font-semibold px-10 py-5 rounded-full transition-all duration-300 hover:underline underline-offset-1">
                Try Lucina ReflEggction AI

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>

          </div>
        </div>
      </section>


      <section className="py-20 ">
      <div className="container mx-auto px-6">
        {/* Heading */}
        <div className="mb-14">
          <h2 className="font-serif text-[clamp(40px,5vw,48px)] leading-tight text-[#1D1633]">
            Trust in <span className="text-[#EA7FB5]">Every Step</span>
          </h2>

          <p className="  font-montserrat mt-6 text-[18px] text-[#2D2348] max-w-5xl leading-relaxed">
            Lucina’s commitment to your success is unwavering, backed by proven
            results and clear assurances.
          </p>
        </div>

        {/* Cards */}
        <div className="grid lg:grid-cols-3 gap-6">
          {trustCards.map((card, index) => (
            <div
              key={index}
              className="bg-[#F6ECEF] rounded-xl px-8 py-10 text-center shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full border border-[#EA7FB5] flex items-center justify-center">
                {card.icon}
              </div>

              <h3 className="font-serif text-[22px]  text-[#EA7FB5] mb-5">
                {card.title}
              </h3>

              <p className="  font-montserrat text-[#2D2348] text-[14px] leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-5 mt-14">
          {/* Pink Button */}
          <button className="group inline-flex items-center justify-center gap-3 bg-[#E879B3] hover:bg-[#7B3FA0] text-white font-semibold text-[18px] px-10 py-5 rounded-full transition-all duration-300 min-w-[420px]">
            <span className="group-hover:underline underline-offset-4">
              Learn More About Lucina’s Guarantees
            </span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>

          {/* Purple Button */}
          <button className="group inline-flex items-center justify-center gap-3 bg-[#8D67B3] hover:bg-[#E879B3] text-white font-semibold text-[18px] px-10 py-5 rounded-full transition-all duration-300 min-w-[350px]">
            <span className="group-hover:underline underline-offset-4">
              Explore Financial Resources
            </span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>
      </div>
    </section>


      <section className="py-8 bg-white overflow-hidden">
        <div
          className="w-full"
          style={{
            background: "#5B4371",
            borderTopLeftRadius: "250px",
            borderBottomRightRadius: "250px",
            
          }}
        >
          <div className="max-w-[1400px] mx-auto px-2 lg:px-12 py-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">

              {/* Left Content */}
              <div className="max-w-[700px]">
                <h2 className="font-serif text-white text-[clamp(42px,5vw,48px)] leading-tight ml-10 mb-10">
                  Your Journey, Supported
                </h2>

                <p className="font-montserrat text-white text-[18px] leading-relaxed mb-8 ml-10 ">
                  “ReflEggction helped us find a donor who looked just like
                  me — right down to the dimples. Two cycles later, our
                  daughter was born. We never imagined this kind of hope
                  could feel so real.”
                </p>

                <p className="text-white font-bold text-[20px] ml-10">
                  — Sophia & Jake, New Jersey
                </p>
              </div>

              {/* Right Image */}
              <div className="flex justify-center lg:justify-end">
                <div className="relative">

                  

                  {/* Image */}
                  <img
                    src="https://lucinaeggbank.com/wp-content/uploads/2024/05/image-4.webp"
                    alt="Baby"
                    className="w-[260px] md:w-[320px] lg:w-[360px] rounded-[120px] object-cover"
                  />

                  

                </div>
              </div>

            </div>
          </div>
        </div>
      </section>



      <section className="py-20 bg-white">
      <div className="max-w-[1500px] mx-auto px-6">

        {/* Heading */}
        <h2 className="text-center font-serif text-[clamp(42px,5vw,48px)] mb-14">
          <span className="text-[#EA7FB5]">FAQs:</span>{" "}
          <span className="text-[#1D1633]">
            Quick Answers for Your Donor Search
          </span>
        </h2>

        {/* FAQ List */}
        <div>
           <div className="border-t border-[#D7BEE8]" />
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-t border-[#D7BEE8]"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full py-10 flex items-center justify-between text-left"
              >
                <h3 className="font-montserrat text-[20px] md:text-[22px] font-semibold text-[#111827]">
                  {faq.question}
                </h3>

                <span className="text-[#A77AC9] flex-shrink-0 ml-4">
                  {openIndex === index ? (
                    <Minus size={30} strokeWidth={1.5} />
                  ) : (
                    <Plus size={30} strokeWidth={1.5} />
                  )}
                </span>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index
                    ? "max-h-[300px] pb-10"
                    : "max-h-0"
                }`}
              >
                <p className="font-montserrat text-[18px] text-[#2D2348] leading-relaxed pr-12">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}

          <div className="flex justify-center">
          <button className="group inline-flex items-center justify-center gap-3 bg-[#E879B3] hover:bg-[#7B3FA0] text-white font-semibold text-[18px] px-8 py-5 rounded-full transition-all duration-300 min-w-[320px]">
            <span className="font-montserrat group-hover:underline underline-offset-2">
              Get more Questions
            </span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>
        </div>
      </div>
    </section>


<section className="py-10 bg-white">
  <div
    className="max-w-[1800px] mx-auto rounded-[28px] px-8 lg:px-14 py-16 lg:py-20 mx-6"
    style={{
      background:
        "linear-gradient(90deg, #8B68A9 0%, #B978B0 50%, #E56FA0 100%)",
    }}
  >
    <div className="flex flex-col lg:flex-row items-center justify-between gap-12">

      {/* Left Content */}
      <div className="max-w-[1000px]">
        <h2 className="font-serif text-white text-[clamp(48px,5vw,48px)] leading-tight mb-8">
          Ready to Meet Your Donor?
        </h2>

        <p className="font-montserrat text-white text-[18px] leading-relaxed max-w-[1100px]">
          Start your personalized donor search with advanced filters—all
          free, all accessible now. Build your family, together.
        </p>
      </div>

      {/* CTA Button */}
      <div className="flex-shrink-0">
        <Link
          to="/find-an-egg-donor"
          className="group bg-white text-[#E56FA0] font-semibold text-[16px]
          min-w-[320px] h-[70px] rounded-[18px]
          flex items-center justify-center
          transition-all duration-300
          hover:bg-[#7B3FA0] hover:text-white"
        >
          <span className="font-montserrat group-hover:underline underline-offset-2">
            Begin Your Donor Search
          </span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
      </div>

    </div>
  </div>
</section>



    
    
          




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

      <style>{`
        @media (max-width:1200px) { .donors-grid { grid-template-columns:repeat(3,1fr)!important; } }
        @media (max-width:768px)  { .donors-grid { grid-template-columns:repeat(2,1fr)!important; } }
        @media (max-width:480px)  { .donors-grid { grid-template-columns:1fr!important; } }
        @media (max-width:900px)  { .find-form-grid { grid-template-columns:1fr!important; } }
      `}</style>
    </>
  );
};

export default FindEggDonor;
