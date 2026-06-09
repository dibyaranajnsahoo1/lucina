import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { submitContactForm } from '../utils/api';
import { Phone, Mail, MapPin, Clock, CheckCircle } from 'lucide-react';

const ContactUs = () => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await submitContactForm(data);
      setSubmitted(true); reset();
      toast.success("Message sent! We'll be in touch soon.");
    } catch (err) { toast.error(err.message || 'Failed. Please try again.'); }
    finally { setLoading(false); }
  };

  return (
    <>
      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <span className="text-[11px] font-bold tracking-[2.5px] uppercase text-white/50 block mb-2.5">Get in Touch</span>
          <h1 className="text-white mb-4">We're Here to <span className="text-[#F093B4]">Help</span></h1>
          <p>Whether you're an intended parent, aspiring egg donor, or clinic partner — our compassionate team is ready to answer your questions.</p>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <div className="grid gap-[72px] items-start contact-grid" style={{ gridTemplateColumns: '1fr 1.3fr' }}>
            {/* Left — Info */}
            <div>
              <h2 className="font-serif text-[clamp(22px,3vw,32px)] mb-2">Contact Information</h2>
              <p className="text-[#6B7280] mb-8 leading-[1.7]">Our team typically responds within 1 business day.</p>
              <div className="flex flex-col gap-3.5 mb-8">
                {[
                  { icon:<Phone size={20}/>, label:'Phone', value:'858-345-3274', href:'tel:8583453274' },
                  { icon:<Mail size={20}/>,  label:'Email', value:'info@lucinaeggbank.com', href:'mailto:info@lucinaeggbank.com' },
                  { icon:<MapPin size={20}/>,label:'Office', value:'3661 Valley Centre Dr., Suite 160, San Diego, CA 92130' },
                  { icon:<Clock size={20}/>, label:'Hours',  value:'Monday–Friday, 9:00 AM – 5:00 PM PST' },
                ].map(c=>(
                  <div key={c.label} className="flex gap-4 items-start bg-[#FBF3FB] rounded-[14px] p-[18px] px-5 border border-[#EDD8F5] transition-all duration-200">
                    <div className="w-11 h-11 bg-[#7B3FA0] rounded-xl flex items-center justify-center text-white flex-shrink-0">{c.icon}</div>
                    <div>
                      <div className="text-[11px] font-bold tracking-[1px] uppercase text-[#9B5EC0] mb-0.5">{c.label}</div>
                      {c.href
                        ? <a href={c.href} className="text-[15px] font-semibold text-[#1A1A2E] no-underline">{c.value}</a>
                        : <div className="text-[14px] font-medium text-[#1A1A2E] leading-relaxed">{c.value}</div>}
                    </div>
                  </div>
                ))}
              </div>
              {/* Map */}
              <div className="rounded-[14px] overflow-hidden border border-[#EDD8F5]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3349.8!2d-117.2340!3d32.9259!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzLCsDU1JzMzLjMiTiAxMTfCsDE0JzAyLjQiVw!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                  width="100%" height="220" className="border-0 block" allowFullScreen="" loading="lazy" title="Lucina Egg Bank Location"
                />
              </div>
            </div>

            {/* Right — Form */}
            {submitted ? (
              <div className="text-center py-[60px] px-10 bg-white rounded-[24px] shadow-[0_8px_40px_rgba(107,45,139,0.10)] border border-[#EDD8F5]">
                <CheckCircle size={56} color="#7B3FA0" className="mx-auto mb-[18px]"/>
                <h3 className="font-serif text-[28px] mb-3">Message Sent!</h3>
                <p className="text-[#6B7280] leading-relaxed mb-6">Thank you for reaching out. We'll get back to you within 1-2 business days.</p>
                <button className="btn btn-pink" onClick={()=>setSubmitted(false)}>Send Another Message</button>
              </div>
            ) : (
              <div className="bg-white rounded-[24px] p-10 shadow-[0_8px_40px_rgba(107,45,139,0.10)] border border-[#EDD8F5]">
                <h3 className="font-serif text-[24px] mb-1.5">Send Us a Message</h3>
                <p className="text-[#6B7280] text-[14px] mb-7">Fill out the form and we'll get back to you as soon as possible.</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Full Name <span className="required">*</span></label>
                      <input {...register('name',{required:'Name is required'})} className="form-input" placeholder="Your full name"/>
                      {errors.name&&<p className="form-error">{errors.name.message}</p>}
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email <span className="required">*</span></label>
                      <input {...register('email',{required:'Email is required',pattern:{value:/^\S+@\S+\.\S+$/,message:'Invalid email'}})} type="email" className="form-input" placeholder="your@email.com"/>
                      {errors.email&&<p className="form-error">{errors.email.message}</p>}
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Phone Number</label>
                      <input {...register('phone')} type="tel" className="form-input" placeholder="+1 (555) 000-0000"/>
                    </div>
                    <div className="form-group">
                      <label className="form-label">I am an... <span className="required">*</span></label>
                      <select {...register('inquiryType',{required:'Please select'})} className="form-select">
                        <option value="">Select your role</option>
                        <option value="Intended Parent">Intended Parent</option>
                        <option value="Egg Donor">Egg Donor</option>
                        <option value="Clinic Partner">Clinic / Medical Partner</option>
                        <option value="General">General Inquiry</option>
                        <option value="Other">Other</option>
                      </select>
                      {errors.inquiryType&&<p className="form-error">{errors.inquiryType.message}</p>}
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Subject <span className="required">*</span></label>
                    <input {...register('subject',{required:'Subject is required'})} className="form-input" placeholder="What can we help you with?"/>
                    {errors.subject&&<p className="form-error">{errors.subject.message}</p>}
                  </div>
                  <div className="form-group">
                    <label className="form-label">Message <span className="required">*</span></label>
                    <textarea {...register('message',{required:'Message is required',minLength:{value:10,message:'Message too short'}})} className="form-textarea" placeholder="Tell us about your situation or questions…" rows={5}/>
                    {errors.message&&<p className="form-error">{errors.message.message}</p>}
                  </div>
                  <div className="form-group">
                    <label className="checkbox-wrapper">
                      <input type="checkbox" {...register('agreedToTerms',{required:'You must agree'})}/>
                      <span className="text-[12px] text-[#6B7280] leading-relaxed">
                        By submitting, you agree to our <a href="#" className="text-[#7B3FA0]">Privacy Policy</a> and consent to receive communications from Lucina Egg Bank.
                      </span>
                    </label>
                    {errors.agreedToTerms&&<p className="form-error">{errors.agreedToTerms.message}</p>}
                  </div>
                  <button type="submit" className="btn btn-pink btn-lg w-full" disabled={loading}>
                    {loading?<><span className="spinner w-[18px] h-[18px] border-2"></span> Sending…</>:'Send Message →'}
                  </button>
                  <p className="text-[11px] text-[#9CA3AF] text-center mt-2.5">🔒 Your information is 100% secure.</p>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="section bg-[#F8F0F8]">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Quick Links</span>
            <h2 className="section-title">What Would You Like <span className="text-[#E8619A]">to Do?</span></h2>
          </div>
          <div className="grid-3">
            {[
              { emoji:'🔍', title:'Find an Egg Donor',    desc:'Browse 3,500+ diverse, screened egg donors instantly for free.', link:'/find-an-egg-donor',  cta:'Browse Donors' },
              { emoji:'🌸', title:'Become an Egg Donor',  desc:'Apply in just 2 minutes and start your donation journey.',       link:'/become-an-egg-donor', cta:'Apply Now' },
              { emoji:'💰', title:'Financial Resources',   desc:'Learn about our pricing, financing options, and guarantee programs.', link:'/financial-resources', cta:'Explore Options' },
            ].map(q=>(
              <a key={q.title} href={q.link}
                className="bg-white rounded-[20px] p-8 px-7 border border-[#EDD8F5] shadow-[0_2px_12px_rgba(107,45,139,0.06)] flex flex-col gap-3 no-underline text-inherit transition-all duration-200 hover:shadow-[0_8px_32px_rgba(107,45,139,0.14)] hover:-translate-y-[3px]"
              >
                <div className="text-[36px]">{q.emoji}</div>
                <h4 className="text-[20px] font-serif text-[#1A1A2E]">{q.title}</h4>
                <p className="text-[14px] text-[#6B7280] leading-[1.65] flex-1">{q.desc}</p>
                <span className="text-[14px] font-semibold text-[#7B3FA0]">{q.cta} →</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <style>{`@media(max-width:900px){.contact-grid{grid-template-columns:1fr!important}}`}</style>
    </>
  );
};

export default ContactUs;
