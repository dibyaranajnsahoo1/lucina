import React, { useState, useEffect } from 'react';
import { Search, Filter, X, Eye } from 'lucide-react';
import FindDonorForm from '../components/FindDonorForm';
import { getDonors } from '../utils/api';

const RACES = ['Chinese','Japanese','Other Asian','Black or African American','Hispanic or Latina','White','American Indian or Alaska Native','Native Hawaiian or other Pacific Islander'];
const EYE_COLORS = ['Blue','Brown','Green','Hazel','Dark Brown'];
const HAIR_COLORS = ['Black','Blonde','Brown','Red','Dark Brown'];
const AVAILABILITIES = ['Available','Reserved'];

const defaultDonors = [
  { _id:'1', donorId:'LEB-D1001', firstName:'Emma',    age:24, eyeColor:'Blue',       hairColor:'Blonde',     racialBackground:'White',                   education:'College completed',  height:{feet:5,inches:6}, availability:'Available', featured:true },
  { _id:'2', donorId:'LEB-D1002', firstName:'Sophia',  age:26, eyeColor:'Brown',      hairColor:'Brown',      racialBackground:'Hispanic or Latina',        education:'Masters completed',  height:{feet:5,inches:4}, availability:'Available', featured:true },
  { _id:'3', donorId:'LEB-D1003', firstName:'Aisha',   age:23, eyeColor:'Dark Brown', hairColor:'Black',      racialBackground:'Black or African American', education:'College completed',  height:{feet:5,inches:7}, availability:'Available', featured:true },
  { _id:'4', donorId:'LEB-D1004', firstName:'Mei',     age:25, eyeColor:'Dark Brown', hairColor:'Black',      racialBackground:'Chinese',                  education:'College completed',  height:{feet:5,inches:3}, availability:'Available', featured:true },
  { _id:'5', donorId:'LEB-D1005', firstName:'Priya',   age:27, eyeColor:'Dark Brown', hairColor:'Dark Brown', racialBackground:'Other Asian',              education:'Masters completed',  height:{feet:5,inches:5}, availability:'Available', featured:false },
  { _id:'6', donorId:'LEB-D1006', firstName:'Yuki',    age:24, eyeColor:'Dark Brown', hairColor:'Black',      racialBackground:'Japanese',                 education:'College in progress',height:{feet:5,inches:2}, availability:'Available', featured:false },
  { _id:'7', donorId:'LEB-D1007', firstName:'Isabella',age:22, eyeColor:'Green',      hairColor:'Red',        racialBackground:'White',                   education:'College enrolled',   height:{feet:5,inches:8}, availability:'Reserved',  featured:false },
  { _id:'8', donorId:'LEB-D1008', firstName:'Aaliyah', age:28, eyeColor:'Hazel',      hairColor:'Dark Brown', racialBackground:'Black or African American', education:'College completed',  height:{feet:5,inches:5}, availability:'Available', featured:false },
];

const BG_COLORS = {
  'White':'#F5E6D3','Hispanic or Latina':'#DBBF8C','Black or African American':'#C49A6C',
  'Chinese':'#F5DEB3','Japanese':'#FFF5E4','Other Asian':'#F0E68C',
  'American Indian or Alaska Native':'#D2A06C','Native Hawaiian or other Pacific Islander':'#C4956A',
};

const AvailBadge = ({ status }) => {
  const colors = { Available: { bg:'#DCFCE7', color:'#15803D' }, Reserved: { bg:'#FEF3C7', color:'#B45309' }, Unavailable: { bg:'#FEE2E2', color:'#B91C1C' } };
  const s = colors[status] || colors.Unavailable;
  return <span className="px-2.5 py-[3px] rounded-full text-[11px] font-bold" style={{ background: s.bg, color: s.color }}>{status}</span>;
};

const DonorCard = ({ donor }) => (
  <div className="bg-white rounded-[16px] overflow-hidden border border-[#EDD8F5] shadow-[0_2px_12px_rgba(107,45,139,0.06)] transition-all duration-200 hover:shadow-[0_8px_32px_rgba(107,45,139,0.14)] hover:-translate-y-[3px]">
    <div className="h-[210px] relative overflow-hidden flex items-center justify-center" style={{ background: BG_COLORS[donor.racialBackground] || '#F0EEF8' }}>
      {donor.profileImage
        ? <img src={`http://localhost:5000${donor.profileImage}`} alt={donor.firstName} className="w-full h-full object-cover" />
        : <div className="font-serif text-[72px] font-semibold text-[#9B5EC0] opacity-40">{donor.firstName?.charAt(0)}</div>
      }
      <div className="absolute top-2.5 right-2.5"><AvailBadge status={donor.availability} /></div>
    </div>
    <div className="p-4">
      <div className="text-[11px] text-[#9B5EC0] font-semibold tracking-[1px] uppercase mb-[3px]">ID: {donor.donorId}</div>
      <div className="font-serif text-[22px] font-medium text-[#1A1A2E] mb-2">{donor.firstName}</div>
      <div className="flex flex-wrap gap-1.5 mb-2">
        <span className="text-[11px] bg-[#F3EEF8] text-[#7B3FA0] px-2 py-[3px] rounded font-medium">Age {donor.age}</span>
        {donor.height && <span className="text-[11px] bg-[#F3EEF8] text-[#7B3FA0] px-2 py-[3px] rounded font-medium">{donor.height.feet}'{donor.height.inches}"</span>}
        <span className="text-[11px] bg-[#F3EEF8] text-[#7B3FA0] px-2 py-[3px] rounded font-medium">{donor.eyeColor} Eyes</span>
        <span className="text-[11px] bg-[#F3EEF8] text-[#7B3FA0] px-2 py-[3px] rounded font-medium">{donor.hairColor} Hair</span>
      </div>
      <div className="text-[13px] text-[#7B3FA0] font-medium mb-3">{donor.education}</div>
      <a href="#find-donor-section" className="btn btn-pink btn-sm w-full justify-center">
        <Eye size={13} /> View Profile
      </a>
    </div>
  </div>
);

const FindEggDonor = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ racialBackground:'', eyeColor:'', hairColor:'', availability:'' });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const params = {};
        Object.entries(filters).forEach(([k,v]) => { if (v) params[k] = v; });
        if (search) params.search = search;
        const res = await getDonors(params);
        setDonors(res.data?.length ? res.data : defaultDonors);
      } catch { setDonors(defaultDonors); }
      finally { setLoading(false); }
    };
    fetchDonors();
  }, [filters, search]);

  const handleFilter = (k, v) => setFilters(p => ({ ...p, [k]: p[k] === v ? '' : v }));
  const clearAll = () => { setFilters({ racialBackground:'', eyeColor:'', hairColor:'', availability:'' }); setSearch(''); };
  const hasFilters = search || Object.values(filters).some(Boolean);

  // Group by race
  const grouped = {};
  donors.forEach(d => {
    if (!grouped[d.racialBackground]) grouped[d.racialBackground] = [];
    grouped[d.racialBackground].push(d);
  });

  return (
    <>
      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <span className="text-[11px] font-bold tracking-[2.5px] uppercase text-white/50 block mb-2.5">Find an Egg Donor</span>
          <h1 className="text-white mb-4">Find Your Perfect <span className="text-[#F093B4]">Egg Donor</span></h1>
          <p>Browse 3,500+ diverse, thoroughly screened donors. Filter by ethnicity, physical traits, and more.</p>
          <div className="flex gap-3 justify-center flex-wrap mt-6">
            <a href="#find-donor-section" className="btn btn-pink btn-lg">Apply for Gallery Access</a>
            <a href="#donors-section"    className="btn btn-outline-white btn-lg">Browse Donors</a>
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <div className="bg-[#F8F0F8] border-b border-[#EDD8F5] py-5">
        <div className="container">
          <div className="flex gap-3 items-center flex-wrap">
            <div className="flex-1 min-w-[220px] flex items-center gap-2.5 bg-white border-[1.5px] border-[#D4B8E8] rounded-full px-[18px] py-2.5">
              <Search size={16} color="#7B3FA0" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search by Donor ID or name…"
                className="border-0 outline-none text-[14px] flex-1 text-[#1A1A2E] bg-transparent"
              />
            </div>
            <button className="btn btn-outline-purple btn-sm" onClick={() => setShowFilters(!showFilters)}>
              <Filter size={14} /> Filters {Object.values(filters).some(Boolean) && `(${Object.values(filters).filter(Boolean).length})`}
            </button>
            {hasFilters && <button className="btn btn-sm text-[#7B3FA0]" onClick={clearAll}><X size={13} /> Clear</button>}
          </div>

          {showFilters && (
            <div className="bg-white rounded-[16px] p-6 mt-3.5 border border-[#EDD8F5] shadow-[0_4px_20px_rgba(107,45,139,0.08)]">
              <FilterGroup label="Racial Background" options={RACES}      k="racialBackground" filters={filters} onFilter={handleFilter} />
              <div className="grid gap-5 mt-5" style={{ gridTemplateColumns: 'repeat(3,1fr)' }}>
                <FilterGroup label="Eye Color"    options={EYE_COLORS}    k="eyeColor"    filters={filters} onFilter={handleFilter} />
                <FilterGroup label="Hair Color"   options={HAIR_COLORS}   k="hairColor"   filters={filters} onFilter={handleFilter} />
                <FilterGroup label="Availability" options={AVAILABILITIES} k="availability" filters={filters} onFilter={handleFilter} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Donor Gallery */}
      <section id="donors-section" className="section bg-white">
        <div className="container">
          {loading ? (
            <div className="text-center py-[60px]"><div className="spinner mx-auto" /></div>
          ) : donors.length === 0 ? (
            <div className="text-center py-[60px] text-[#6B7280]">
              <div className="text-[48px] mb-4">🔍</div>
              <h3>No donors found</h3>
              <button className="btn btn-pink mt-5" onClick={clearAll}>Clear Filters</button>
            </div>
          ) : (
            Object.keys(grouped).map(race => (
              <div key={race} className="mb-[52px]">
                <div className="flex items-center gap-3.5 mb-6 pb-3 border-b-2 border-[#F3EEF8]">
                  <h3 className="font-serif text-[26px] font-medium text-[#1A1A2E]">{race}</h3>
                  <span className="bg-[#F3EEF8] text-[#7B3FA0] px-3 py-[3px] rounded-full text-[12px] font-semibold">{grouped[race].length} donors</span>
                </div>
                <div className="donors-grid grid gap-5" style={{ gridTemplateColumns: 'repeat(4,1fr)' }}>
                  {grouped[race].map(d => <DonorCard key={d._id || d.donorId} donor={d} />)}
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Find Donor Form */}
      <section id="find-donor-section" className="section bg-[#F8F0F8]">
        <div className="container">
          <div className="grid gap-[72px] items-center find-form-grid" style={{ gridTemplateColumns: '1fr 1.2fr' }}>
            <div>
              <span className="text-[11px] font-bold tracking-[2px] uppercase text-[#7B3FA0] block mb-3">For Intended Parents</span>
              <h2 className="font-serif text-[clamp(26px,3.5vw,42px)] mb-4">
                Find Your Perfect <span className="text-[#E8619A]">Egg Donor</span>
              </h2>
              <p className="text-[#6B7280] text-[15px] leading-[1.75] mb-6">
                Create a free account to access our complete donor database with detailed profiles and our AI-powered ReflEggction® matching tool.
              </p>
              {['Instant access to 3,500+ donor profiles','AI facial recognition matching','Zero upfront costs','Global egg shipping'].map(f => (
                <div key={f} className="flex gap-2.5 items-center text-[14px] mb-2.5">
                  <span className="text-[#7B3FA0] font-bold text-[16px]">✓</span> {f}
                </div>
              ))}
            </div>
            <FindDonorForm title="Get Donor Gallery Access" subtitle="Start browsing our complete donor database for free." />
          </div>
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

const FilterGroup = ({ label, options, k, filters, onFilter }) => (
  <div>
    <div className="text-[11px] font-bold tracking-[1.5px] uppercase text-[#6B7280] mb-2.5">{label}</div>
    <div className="flex flex-wrap gap-2">
      {options.map(opt => (
        <button
          key={opt}
          onClick={() => onFilter(k, opt)}
          className="px-3.5 py-[5px] rounded-full border-[1.5px] text-[12px] font-medium cursor-pointer transition-all duration-200"
          style={{
            borderColor: filters[k]===opt ? '#7B3FA0' : '#D4B8E8',
            background:  filters[k]===opt ? '#7B3FA0' : 'white',
            color:       filters[k]===opt ? 'white'   : '#4A4A5A',
          }}
        >{opt}</button>
      ))}
    </div>
  </div>
);

export default FindEggDonor;
