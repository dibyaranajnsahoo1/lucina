import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { submitContactForm } from '../utils/api';
import { CheckCircle } from 'lucide-react';
import PhoneInput from "react-phone-input-2";
import ReCAPTCHA from 'react-google-recaptcha';
import "react-phone-input-2/lib/style.css";

const ContactUs = () => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [phone, setPhone] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [captchaError, setCaptchaError] = useState("");
  const recaptchaRef = useRef(null);
  const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();

  const onSubmit = async (data) => {
    const currentRecaptchaToken = recaptchaRef.current?.getValue() || recaptchaToken;

    if (recaptchaSiteKey && !currentRecaptchaToken) {
      setCaptchaError("Please complete the reCAPTCHA verification.");
      return;
    }

    setLoading(true);
    setCaptchaError("");

    try {
      await submitContactForm({
        ...data,
        inquiryType: data.inquiryType || "General",
        subject: data.subject || `${data.inquiryType || "General"} Inquiry`,
        recaptchaToken: currentRecaptchaToken,
        "g-recaptcha-response": currentRecaptchaToken,
      });
      setSubmitted(true);
      reset();
      setPhone("");
      setRecaptchaToken("");
      recaptchaRef.current?.reset();
      toast.success("Message sent! We'll be in touch soon.");
    } catch (err) {
      setRecaptchaToken("");
      recaptchaRef.current?.reset();
      toast.error(err.message || 'Failed. Please try again.');
    }
    finally { setLoading(false); }
  };

  return (
    <>
      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          {/* <span className="text-[11px] font-bold tracking-[2.5px] uppercase text-white/50 block mb-2.5">Get in Touch</span> */}
          <h1 className="text-white mb-4">Contact US</h1>
          {/* <p>Whether you're an intended parent, aspiring egg donor, or clinic partner — our compassionate team is ready to answer your questions.</p> */}
        </div>
      </section>

      <section className="py-16 bg-[#F8F6F7]">
  <div className="container mx-auto px-4">

    <div className="grid lg:grid-cols-[1.05fr_1fr] gap-0">

      {/* LEFT FORM */}
      <div className="pr-0 lg:pr-10">

        <div className="flex items-center gap-4 mb-5">
          <div className="w-10 h-[2px] bg-[#8C67AF]" />
          <p className="uppercase tracking-[6px] text-[#8C67AF] text-[14px]">
            Get in Touch with Lucina Egg Bank
          </p>
        </div>

        <div className="flex items-start gap-3 mb-8">
          <img
            src="https://lucinaeggbank.com/wp-content/uploads/2021/03/symbol-in-tytle.svg"
            alt=""
            className="w-12 mt-2"
          />

          <h2 className="font-serif text-[#221B35] text-[40px] md:text-[48px] leading-[1.05]">
            We Are Ready to Answer
            <br />
            Any Questions!
          </h2>
        </div>

        {submitted && (
          <div className="mb-5 flex items-center gap-3 rounded-md border border-[#8C67AF]/20 bg-white px-5 py-4 text-[#221B35]">
            <CheckCircle size={22} className="shrink-0 text-[#8C67AF]" />
            <p className="text-sm font-medium">Message sent! We'll be in touch soon.</p>
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>

          <div>
            <input
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 2,
                  message: "Please enter your full name",
                },
              })}
              type="text"
              placeholder="Name"
              autoComplete="name"
              className="w-full h-[56px] rounded-md border border-[#D8D0DD] bg-[#F4EFF5] px-5 outline-none"
            />
            {errors.name && (
              <p className="text-[#D85A9F] text-sm mt-2">{errors.name.message}</p>
            )}
          </div>

          <div>
            <select
              {...register("inquiryType", {
                required: "Please select an option",
              })}
              className="w-full h-[56px] rounded-md border border-[#D8D0DD] bg-[#F4EFF5] px-5 outline-none text-[#666]"
            >
              <option value="">I'm a</option>
              <option value="Intended Parent">Intended Parent</option>
              <option value="Egg Donor">Egg Donor</option>
              <option value="Clinic Partner">Clinic / Partner</option>
              <option value="General">General Inquiry</option>
            </select>
            {errors.inquiryType && (
              <p className="text-[#D85A9F] text-sm mt-2">{errors.inquiryType.message}</p>
            )}
          </div>

          <div>
            <PhoneInput
              containerClass="contact-phone"
              inputClass="contact-phone-control"
              buttonClass="contact-phone-button"
              dropdownClass="contact-phone-dropdown"
              country={"in"}
              enableSearch
              preferredCountries={["in", "us", "ca", "gb"]}
              countryCodeEditable={false}
              disableCountryCode={false}
              value={phone}
              onChange={(value) => {
                setPhone(value);
                setValue("phone", value);
              }}
              inputProps={{
                name: "phone",
                autoComplete: "tel",
                placeholder: "Phone Number",
              }}
            />
            <input type="hidden" {...register("phone")} />
          </div>

          <div>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
                },
              })}
              type="email"
              placeholder="Email"
              autoComplete="email"
              className="w-full h-[56px] rounded-md border border-[#D8D0DD] bg-[#F4EFF5] px-5 outline-none"
            />
            {errors.email && (
              <p className="text-[#D85A9F] text-sm mt-2">{errors.email.message}</p>
            )}
          </div>

          <div>
            <textarea
              {...register("message", {
                required: "Message is required",
              })}
              rows="4"
              placeholder="Message"
              className="w-full rounded-md border border-[#D8D0DD] bg-[#F4EFF5] p-5 outline-none resize-none"
            />
            {errors.message && (
              <p className="text-[#D85A9F] text-sm mt-2">{errors.message.message}</p>
            )}
          </div>

          <div className="text-[12px] text-[#555] leading-[1.7]">
            By submitting this form, you agree to our Privacy Policy and Terms
            of Use and consent to receive communications from Lucina Egg Bank.
          </div>

          {recaptchaSiteKey && (
            <div className="max-w-full overflow-x-auto">
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
                  setCaptchaError("reCAPTCHA could not load. Please try again.");
                }}
              />
            </div>
          )}
          {captchaError && (
            <p className="text-[#D85A9F] text-sm mt-2">{captchaError}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="
              mt-4
              h-[56px]
              px-12
              rounded-full
              bg-[#8C67AF]
              text-white
              font-semibold
              hover:bg-[#D85A9F]
              transition
              disabled:cursor-not-allowed
              disabled:opacity-70
            "
          >
            {loading ? "Submitting..." : "Submit"}
          </button>

        </form>

      </div>

      {/* RIGHT CONTACT CARD */}
      <div
        className="
          bg-[#5B4371]
          text-white
          mt-10
          lg:mt-0
          px-8
          md:px-14
          py-14
          rounded-tl-[180px]
          rounded-br-[180px]
        "
      >

        <div className="flex items-center gap-4 mb-10">
          <div className="w-10 h-[2px] bg-white" />
          <span className="uppercase tracking-[5px] text-[14px]">
            Contact information
          </span>
        </div>

        <div className="flex items-start gap-3 mb-12">
          <img
            src="https://lucinaeggbank.com/wp-content/uploads/2021/03/symbol-in-tytle.svg"
            alt=""
            className="w-10"
          />

          <h3 className="font-serif text-[34px] text-white md:text-[42px] leading-none">
            Contact Us at Our LA Office
          </h3>
        </div>

        <div className="space-y-12">

          <div>
            <p className="text-[18px] leading-[1.8]">
              3661 Valley Centre Dr., Suite 160
              <br />
              San Diego, CA 92130
            </p>
          </div>

          <div>
            <h4 className="font-serif text-white text-[30px] mb-4">
              For Intended Parents and Clinical Partners
            </h4>

            <div className="space-y-2 text-[18px]">
              <p>Tel. +1 858-345-3274</p>
              <p>Fax. 858-345-3278</p>
              <p>info@lucinaeggbank.com</p>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-white text-[30px] mb-4">
              For Egg Donors
            </h4>

            <div className="space-y-2 text-[18px]">
              <p>858-345-3274</p>
              <p>donation@lucinaeggbank.com</p>
            </div>
          </div>

        </div>

      </div>

    </div>

  </div>
</section>
<section className="pb-16 bg-[#F8F6F7]">
  <div className="w-full overflow-hidden rounded-tr-[220px] rounded-bl-[220px]">

    <iframe
      src="https://maps.google.com/maps?q=3661%20Valley%20Centre%20Dr%20Suite%20160%20San%20Diego%20CA%2092130&t=&z=11&ie=UTF8&iwloc=&output=embed"
      width="100%"
      height="800"
      style={{ border: 0 }}
      loading="lazy"
      allowFullScreen
      referrerPolicy="no-referrer-when-downgrade"
      title="Lucina Egg Bank Location"
    />

  </div>
</section>

      

      <style>{`
        @media(max-width:900px){.contact-grid{grid-template-columns:1fr!important}}

        .contact-phone.react-tel-input {
          width: 100% !important;
          height: 56px !important;
          border: 1px solid #D8D0DD !important;
          border-radius: 6px !important;
          background: #F4EFF5 !important;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .contact-phone .form-control {
          width: 100% !important;
          height: 56px !important;
          border: 0 !important;
          border-radius: 6px !important;
          background: #F4EFF5 !important;
          color: #221B35 !important;
          font-size: 16px !important;
          outline: none !important;
          box-shadow: none !important;
          padding-left: 60px !important;
        }

        .contact-phone.react-tel-input:focus-within {
          border-color: #8C67AF !important;
          box-shadow: 0 0 0 2px rgba(140, 103, 175, 0.12) !important;
        }

        .contact-phone .form-control:focus {
          border: 0 !important;
          box-shadow: none !important;
          background: #F4EFF5 !important;
        }

        .contact-phone .flag-dropdown {
          border: 0 !important;
          border-radius: 6px 0 0 6px !important;
          background: #F4EFF5 !important;
        }

        .contact-phone .selected-flag,
        .contact-phone .selected-flag:hover,
        .contact-phone .selected-flag:focus,
        .contact-phone .flag-dropdown.open .selected-flag {
          background: #F4EFF5 !important;
          border-radius: 6px 0 0 6px !important;
        }

        .contact-phone .country-list {
          border: 1px solid #D8D0DD;
          border-radius: 8px;
          box-shadow: 0 12px 30px rgba(34, 27, 53, 0.16);
        }

        .contact-phone .search-box {
          width: calc(100% - 20px);
          height: 36px;
          margin: 8px 10px;
          border: 1px solid #D8D0DD;
          border-radius: 6px;
        }
      `}</style>
    </>
  );
};

export default ContactUs;
