import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { submitDonorApplication } from '../utils/api';
import { getTestimonials } from '../utils/api';
import { CheckCircle, Upload, Star, ChevronDown, ChevronUp } from 'lucide-react';

const BirdIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <path d="M6 12 C2 7,2 2,6 1 C10 0,12 5,10 10Z" fill="#E8619A"/>
    <path d="M12 12 C14 6,20 3,24 7 C28 11,22 16,16 12Z" fill="#E8619A" opacity="0.7"/>
    <ellipse cx="10" cy="10" rx="5" ry="4" fill="#9B5EC0"/>
  </svg>
);

/* ── Hero ── */
const DonorHero = () => (
  <section className="relative overflow-hidden py-[90px] pb-[70px]" style={{ background: 'linear-gradient(145deg,#2D1353 0%,#4A1A6E 100%)' }}>
    <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 30% 50%,rgba(232,97,154,0.15) 0%,transparent 60%)' }} />
    <div className="container relative z-10">
      <div className="grid gap-[60px] items-center donor-hero-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
        <div>
          <div className="inline-flex items-center gap-1.5 bg-[rgba(232,97,154,0.2)] border border-[rgba(232,97,154,0.4)] px-4 py-1.5 rounded-full text-[13px] font-semibold text-[#F093B4] mb-6">
            🌸 Earn $8K–$15K Per Cycle
          </div>
          <h1 className="text-white mb-5 font-serif font-normal leading-[1.1]" style={{ fontSize: 'clamp(32px,4.5vw,54px)' }}>
            Turn Compassion Into Action.<br/>
            <span className="text-[#F093B4]">Become an Egg Donor Today</span>
          </h1>
          <p className="text-white/80 text-[16px] leading-[1.75] mb-8 max-w-[520px]">
            If you've ever wanted to do something truly meaningful, egg donation with Lucina is a life-changing opportunity. Help build families for LGBTQ+ individuals, cancer survivors, single parents, and couples who have faced years of hoping.
          </p>
          <div className="flex gap-4 flex-wrap">
            <a href="#apply-section" className="btn btn-pink btn-lg">Apply Online in Just 2 Minutes</a>
            <a href="#learn-more"    className="btn btn-outline-white btn-lg">Learn More</a>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-[360px] h-[420px] overflow-hidden border-[6px] border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.3)]" style={{ borderRadius: '50% 50% 48% 52% / 46% 46% 54% 54%' }}>
            <img src="https://images.unsplash.com/photo-1570174537484-8f83764f2e9b?w=600" alt="Egg Donor" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </div>
    <style>{`@media(max-width:768px){.donor-hero-grid{grid-template-columns:1fr!important}}`}</style>
  </section>
);

/* ── Benefits ── */
const BenefitsSection = () => (
  <section id="learn-more" className="section bg-white">
    <div className="container">
      <div className="section-header">
        <div className="flex justify-center mb-2"><BirdIcon /></div>
        <span className="section-tag">Why Donate with Lucina</span>
        <h2 className="section-title">Unmatched <span style={{color:'#E8619A'}}>Support &amp; Reward</span></h2>
        <p className="section-desc">Lucina offers an experience that is both profoundly meaningful and highly rewarding.</p>
      </div>
      <div className="grid-3">
        {[
          { icon:'💰', title:'Generous Compensation',    desc:'Most donors earn $8,000–$15,000+. Highly qualified donors can earn up to $50,000 per cycle. Paid directly on-site after retrieval.' },
          { icon:'🏥', title:'Zero Out-of-Pocket',       desc:'100% of all medical expenses and travel costs are covered. You will have no hidden fees or out-of-pocket expenses ever.' },
          { icon:'👥', title:'Referral Bonus',           desc:'Earn $1,000 for every friend you refer who successfully completes a donation cycle with Lucina.' },
          { icon:'⚡', title:'Flexible & Streamlined',  desc:'Typically 6 to 10 weeks from application to retrieval. No waiting to be matched with intended parents.' },
          { icon:'💖', title:'Dedicated Support',        desc:'A personal donor specialist guides you from your 2-minute application to post-retrieval care and beyond.' },
          { icon:'🔒', title:'Complete Privacy',         desc:'All donations are anonymous. Your identity and personal information remain 100% confidential always.' },
        ].map(b => (
          <div key={b.title} className="bg-[#FBF3FB] rounded-[20px] p-8 px-6 border border-[#EDD8F5] transition-all duration-200 flex flex-col gap-3 hover:shadow-[0_8px_32px_rgba(107,45,139,0.12)] hover:-translate-y-[3px]">
            <div className="text-[36px]">{b.icon}</div>
            <h4 className="text-[18px] mb-2">{b.title}</h4>
            <p className="text-[14px] text-[#6B7280] leading-[1.65]">{b.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ── Process Steps ── */
const ProcessSection = () => (
  <section className="section bg-[#F8F0F8]">
    <div className="container">
      <div className="grid gap-[72px] items-center process-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
        <div>
          <span className="section-tag">The Process</span>
          <h2 className="section-title mb-9">
            How Egg Donation Works:<br/><span style={{color:'#E8619A'}}>A Guided Journey</span>
          </h2>
          {[
            { num:1, title:'Apply Online in 2 Minutes',  desc:'Answer a few quick questions to see if you meet initial eligibility. Get an instant pre-qualification notification.' },
            { num:2, title:'Complete Screenings',        desc:'If pre-qualified, undergo comprehensive medical and psychological screenings, all conveniently arranged near you.' },
            { num:3, title:'Begin Your Cycle',           desc:'Once approved, start your donation journey—no waiting. Take medications to prepare your body under expert guidance.' },
            { num:4, title:'Donation & Retrieval',       desc:'The quick, safe retrieval takes 15–20 minutes under light sedation at our San Diego clinic.' },
            { num:5, title:'Receive Compensation',       desc:"You're compensated directly on-site, immediately after your donation." },
          ].map((s,i) => (
            <div key={s.num} className={`flex gap-[18px] items-start ${i < 4 ? 'mb-6' : ''}`}>
              <div className={`w-12 h-12 flex-shrink-0 rounded-full flex items-center justify-center font-serif text-[20px] font-semibold ${i === 0 ? 'bg-[#7B3FA0] text-white' : 'bg-[#F3EEF8] text-[#7B3FA0] border-2 border-[#D4B8E8]'}`}>
                {s.num}
              </div>
              <div>
                <h4 className="text-[16px] font-semibold mb-1">Step {s.num}: {s.title}</h4>
                <p className="text-[14px] text-[#6B7280] leading-[1.6]">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="relative flex items-center justify-center">
          <div className="w-[360px] h-[460px] overflow-hidden shadow-[0_16px_56px_rgba(107,45,139,0.18)] border-[6px] border-white" style={{ borderRadius: '50% 50% 48% 52% / 46% 46% 54% 54%' }}>
            <img src="https://images.unsplash.com/photo-1576671081837-49000212a370?w=600" alt="process" className="w-full h-full object-cover" />
          </div>
          <div className="absolute bottom-7 -left-5 bg-white rounded-[16px] p-4 px-5 shadow-[0_8px_32px_rgba(107,45,139,0.16)] flex gap-3.5 items-center">
            <div className="w-12 h-12 bg-[#F3EEF8] rounded-full flex items-center justify-center font-serif text-[22px] font-semibold text-[#7B3FA0]">6-10</div>
            <div>
              <div className="font-bold text-[14px] text-[#1A1A2E]">Weeks Total</div>
              <div className="text-[12px] text-[#6B7280]">Application to Retrieval</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <style>{`@media(max-width:900px){.process-grid{grid-template-columns:1fr!important}}`}</style>
  </section>
);

/* ── Qualifications ── */
const QualificationsSection = () => (
  <section className="section bg-white">
    <div className="container">
      <div className="grid gap-[72px] items-center qual-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
        <div>
          <span className="section-tag">Requirements</span>
          <h2 className="section-title">Do You Qualify to<br/><span style={{color:'#E8619A'}}>Become an Egg Donor?</span></h2>
          <p className="text-[#6B7280] mb-7 text-[15px] leading-[1.7]">You may qualify if you meet these basic criteria:</p>
          {['Are between 19 and 31 years old','Maintain a healthy lifestyle (non-smoker, BMI under 28)','Have no major hereditary health conditions','Are committed to completing the full process'].map(q => (
            <div key={q} className="flex items-center gap-3 mb-3.5">
              <CheckCircle size={20} color="#7B3FA0" />
              <span className="text-[15px] text-[#4A4A5A]">{q}</span>
            </div>
          ))}
          <a href="#apply-section" className="btn btn-pink btn-lg mt-7 inline-flex">
            Start Your 2-Minute Application →
          </a>
        </div>
        <div className="flex justify-center">
          <div className="w-[360px] h-[420px] overflow-hidden shadow-[0_12px_48px_rgba(107,45,139,0.16)] border-[6px] border-white" style={{ borderRadius: '50% 50% 48% 52%' }}>
            <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600" alt="Donor" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </div>
    <style>{`@media(max-width:900px){.qual-grid{grid-template-columns:1fr!important}}`}</style>
  </section>
);

/* ── Donor Testimonials ── */
const DonorTestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState([
    { name:'Evelyn S.',  content:'I donated two years back when I was still in college. The experience was incredibly rewarding and the team was so supportive throughout.', rating:5 },
    { name:'Hannah W.',  content:"As a first-time donor, Lucina's team took the time to answer all of my questions, making me feel comfortable and confident every step.", rating:5 },
    { name:'Amara A.',   content:'I have donated twice with Lucina Egg Bank, and my experience both times was positive. A compassionate team that prioritized my safety.', rating:5 },
    { name:'Wang Y.',    content:"The experience couldn't have been more positive. I've donated twice, and they are great to work with. Both of my coordinators were amazing.", rating:5 },
  ]);

  useEffect(() => {
    getTestimonials({ displayOn:'donor-page', limit:6 })
      .then(res => { if (res.data?.length) setTestimonials(res.data); })
      .catch(() => {});
  }, []);

  return (
    <section className="section bg-[#F8F0F8]">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Donor Reviews</span>
          <h2 className="section-title">What Egg Donors <span style={{color:'#E8619A'}}>Are Saying</span></h2>
        </div>
        <div className="grid-2">
          {testimonials.map((t,i) => (
            <div key={i} className="bg-white rounded-[20px] p-7 px-6 border border-[#EDD8F5] shadow-[0_2px_12px_rgba(107,45,139,0.06)]">
              <div className="flex gap-1 mb-3">
                {[...Array(t.rating||5)].map((_,si) => <Star key={si} size={14} fill="#E8619A" color="#E8619A" />)}
              </div>
              <p className="italic text-[#4A4A5A] leading-[1.75] mb-3.5 text-[15px]">
                "{t.shortContent || t.content}"
              </p>
              <div className="font-semibold text-[#7B3FA0]">— {t.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ── FAQ ── */
const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const faqs = [
    { q:'Is egg donation safe?', a:'Yes. All procedures are FDA-regulated and performed by skilled medical professionals using safe, low-risk protocols. Your health and safety are our top priorities.' },
    { q:'Will egg donation affect my future fertility?', a:'No. Donation uses eggs your body would naturally discard. There are no known long-term adverse risks to your future fertility.' },
    { q:'How much will I earn?', a:'First-time donors receive $8,000–$15,000+. Highly qualified donors may earn up to $50,000 per cycle. Compensation is paid directly on-site after retrieval.' },
    { q:'How long does the process take?', a:"The streamlined process typically takes 6 to 10 weeks from application to retrieval. Unlike other programs, you don't need to wait to be matched." },
    { q:'Are there any out-of-pocket expenses?', a:'No. Lucina covers all travel costs, medical expenses, and related fees. You will have no out-of-pocket expenses ever.' },
    { q:'Is my identity kept confidential?', a:'Yes, all donations are anonymous. No identifying information is ever exchanged with intended parents.' },
  ];
  return (
    <section className="section bg-white">
      <div className="container max-w-[800px]">
        <div className="section-header">
          <span className="section-tag">FAQ</span>
          <h2 className="section-title">Common Questions <span style={{color:'#E8619A'}}>Answered</span></h2>
        </div>
        {faqs.map((faq,i) => (
          <div key={i} className="faq-item">
            <button className="faq-question" onClick={() => setOpenIndex(openIndex===i?null:i)}>
              {faq.q}
              <div className="faq-icon">{openIndex===i?<ChevronUp size={15}/>:<ChevronDown size={15}/>}</div>
            </button>
            <div className={`faq-answer ${openIndex===i?'open':''}`}><p>{faq.a}</p></div>
          </div>
        ))}
      </div>
    </section>
  );
};

/* ── Application Form ── */
const ApplicationForm = () => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [files, setFiles] = useState([]);
  const { register, handleSubmit, formState:{ errors }, watch, reset } = useForm();
  const country = watch('country');

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const fd = new FormData();
      Object.keys(data).forEach(k => { if (data[k] != null && data[k] !== '') fd.append(k, data[k]); });
      files.forEach(f => fd.append('uploadedFiles', f));
      await submitDonorApplication(fd);
      setSubmitted(true); reset(); setFiles([]);
      toast.success('Application submitted! Check your email for confirmation.');
    } catch (err) { toast.error(err.message || 'Submission failed.'); }
    finally { setLoading(false); }
  };

  if (submitted) return (
    <div className="text-center py-[60px] px-10 bg-white rounded-[24px] shadow-[0_8px_40px_rgba(107,45,139,0.12)] border border-[#EDD8F5]">
      <CheckCircle size={60} color="#7B3FA0" className="mx-auto mb-5"/>
      <h3 className="font-serif text-[30px] mb-3">Application Submitted!</h3>
      <p className="text-[#6B7280] mb-6 leading-relaxed">Thank you for applying! Check your email for your confirmation and application ID. We'll review within 2-3 business days.</p>
      <button className="btn btn-pink" onClick={()=>setSubmitted(false)}>Submit Another</button>
    </div>
  );

  return (
    <div id="apply-section" className="max-w-[860px] mx-auto">
      <div className="section-header">
        <span className="section-tag">Apply Now</span>
        <h2 className="section-title">Find Out If You Qualify To Become An <span style={{color:'#E8619A'}}>Egg Donor</span></h2>
        <p className="section-desc">Complete the form below. It only takes a few minutes!</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-[24px] p-12 shadow-[0_8px_40px_rgba(107,45,139,0.10)] border border-[#EDD8F5]">
        <SectionLabel>Personal Information</SectionLabel>
        <div className="form-row">
          <FI label="First Name" name="firstName" reg={register} errors={errors} placeholder="First name" />
          <FI label="Last Name"  name="lastName"  reg={register} errors={errors} placeholder="Last name"  />
        </div>
        <div className="form-row">
          <FI label="Email"       name="email"       reg={register} errors={errors} type="email" placeholder="your@email.com" rules={{pattern:{value:/^\S+@\S+\.\S+$/,message:'Invalid email'}}}/>
          <FI label="Cell Number" name="cellNumber"  reg={register} errors={errors} type="tel"   placeholder="+1 (555) 000-0000"/>
        </div>
        <div className="form-row">
          <FI label="Date of Birth" name="dateOfBirth" reg={register} errors={errors} type="date"/>
          <div className="form-group">
            <label className="form-label">Country <span className="required">*</span></label>
            <select {...register('country',{required:'Required'})} className="form-select">
              <option value="">Select country</option>
              <option value="USA">USA</option>
              <option value="Outside of USA">Outside of USA</option>
            </select>
            {errors.country&&<p className="form-error">{errors.country.message}</p>}
          </div>
        </div>

        {country==='USA'&&(
          <>
            <div className="form-group">
              <label className="form-label">Street Address</label>
              <input {...register('street')} className="form-input" placeholder="Street address"/>
            </div>
            <div className="form-row" style={{gridTemplateColumns:'1fr 1fr 120px'}}>
              <FI label="City" name="city" reg={register} errors={errors} placeholder="City" required={false}/>
              <div className="form-group">
                <label className="form-label">State</label>
                <select {...register('state')} className="form-select">
                  <option value="">State</option>
                  {['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming'].map(s=><option key={s}>{s}</option>)}
                </select>
              </div>
              <FI label="ZIP" name="zipCode" reg={register} errors={errors} placeholder="ZIP" required={false}/>
            </div>
          </>
        )}
        {country==='Outside of USA'&&(
          <div className="form-row">
            <FI label="City"             name="city"     reg={register} errors={errors} placeholder="City"     required={false}/>
            <FI label="State / Province" name="province" reg={register} errors={errors} placeholder="Province" required={false}/>
          </div>
        )}

        <SectionLabel>Physical Information</SectionLabel>
        <div className="form-row" style={{gridTemplateColumns:'repeat(3,1fr)'}}>
          <FI label="Height (ft)" name="heightFt" reg={register} errors={errors} type="number" placeholder="5" extra={{min:4,max:7}}/>
          <FI label="Height (in)" name="heightIn" reg={register} errors={errors} type="number" placeholder="6" extra={{min:0,max:11}}/>
          <FI label="Weight (lbs)"name="weight"   reg={register} errors={errors} type="number" placeholder="130"/>
        </div>
        <div className="form-row">
          <SelectFI label="Eye Color" name="eyeColor" reg={register} errors={errors} options={['Blue','Light Blue','Dark Blue','Brown','Light Brown','Dark Brown','Green','Hazel']}/>
          <SelectFI label="Natural Hair Color" name="hairColor" reg={register} errors={errors} options={['Black','Blonde','Light Blonde','Dark Blonde','Strawberry Blonde','Brown','Light Brown','Dark Brown','Red']}/>
        </div>

        <SectionLabel>Background</SectionLabel>
        <div className="form-row">
          <SelectFI label="Racial Background" name="racialBackground" reg={register} errors={errors} options={['Chinese','Japanese','Other Asian','American Indian or Alaska Native','Black or African American','Hispanic or Latina','Native Hawaiian or other Pacific Islander','White']}/>
          <SelectFI label="Religious Affiliation" name="religiousAffiliation" reg={register} errors={errors} options={['Christian','Catholic','Jewish','Muslim','Hindu','Buddhist','Other religion','N/A']}/>
        </div>
        <div className="form-row">
          <SelectFI label="Highest Education Level" name="education" reg={register} errors={errors} options={['High school not completed','High school completed','College enrolled','College in progress','College completed','Masters enrolled','Masters completed','PhD completed']}/>
          <SelectFI label="Have you donated before?" name="hasDonatedBefore" reg={register} errors={errors} options={['Yes','No']}/>
        </div>
        <FI label="Ethnic Origin (be specific, e.g. French, Japanese)" name="ethnicOrigin" reg={register} errors={errors} placeholder="e.g. Irish, German"/>

        <SectionLabel>Photo Upload</SectionLabel>
        <p className="text-[13px] text-[#6B7280] mb-3">Please upload at least 2 photos (3–5 recommended). Max 64MB per file, max 5 files.</p>
        <div
          className="border-2 border-dashed border-[#D4B8E8] rounded-xl p-9 px-6 text-center cursor-pointer bg-[#FBF3FB] transition-all duration-200 hover:border-[#7B3FA0] hover:bg-[#F3EEF8]"
          onClick={()=>document.getElementById('fileInput').click()}
        >
          <Upload size={32} color="#7B3FA0" className="mx-auto mb-2.5"/>
          <p className="text-[#4A4A5A] font-medium">Click to upload or drag &amp; drop</p>
          <p className="text-[#9B5EC0] text-[13px] mt-1">JPG, PNG, WebP, HEIC (Max 64MB each)</p>
          <input id="fileInput" type="file" multiple accept=".jpg,.jpeg,.png,.webp,.heic,.heif" onChange={e=>setFiles(prev=>[...prev,...Array.from(e.target.files)].slice(0,5))} className="hidden"/>
        </div>
        {files.length>0&&(
          <div className="flex flex-col gap-2 mt-3">
            {files.map((f,i)=>(
              <div key={i} className="flex justify-between items-center px-3.5 py-2 bg-[#F3EEF8] rounded-lg text-[14px]">
                <span>📄 {f.name}</span>
                <button type="button" onClick={()=>setFiles(files.filter((_,ii)=>ii!==i))} className="text-[#E8619A] font-bold text-[18px] cursor-pointer">×</button>
              </div>
            ))}
          </div>
        )}

        <div className="form-group mt-6">
          <label className="checkbox-wrapper">
            <input type="checkbox" {...register('agreedToAnonymous',{required:'You must agree'})}/>
            <span className="text-[14px] text-[#4A4A5A] leading-relaxed"><strong>I have read and agree this is an anonymous donation and won't have contact with the recipient family.</strong></span>
          </label>
          {errors.agreedToAnonymous&&<p className="form-error">{errors.agreedToAnonymous.message}</p>}
        </div>
        <p className="text-[12px] text-[#9CA3AF] mb-4">By submitting, you agree to our <a href="#" className="text-[#7B3FA0]">Privacy Policy</a> and <a href="#" className="text-[#7B3FA0]">Terms of Use</a>.</p>

        <button type="submit" className="btn btn-pink btn-lg w-full" disabled={loading}>
          {loading?<><span className="spinner w-5 h-5 border-2"></span> Submitting…</>:'Submit Application →'}
        </button>
      </form>
    </div>
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
    <ProcessSection />
    <QualificationsSection />
    <DonorTestimonialsSection />
    <FAQSection />
    <section className="section bg-[#F8F0F8]">
      <div className="container"><ApplicationForm /></div>
    </section>
  </>
);

export default BecomeEggDonor;
