import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { submitFindDonorForm } from '../utils/api';
import { CheckCircle } from 'lucide-react';
import PhoneInput from "react-phone-input-2";
import ReCAPTCHA from 'react-google-recaptcha';
import "react-phone-input-2/lib/style.css";

const FindDonorForm = ({ title = "Find Your Perfect Egg Donor", subtitle = "" }) => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [captchaError, setCaptchaError] = useState("");
  const recaptchaRef = useRef(null);
  const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
  const { register, handleSubmit, formState: { errors }, reset, watch, setValue } = useForm();
  const howHeard = watch('howDidYouHear');

  const onSubmit = async (data) => {
    const currentRecaptchaToken = recaptchaRef.current?.getValue() || recaptchaToken;

    if (recaptchaSiteKey && !currentRecaptchaToken) {
      setCaptchaError("Please complete the reCAPTCHA verification.");
      return;
    }

    setLoading(true);
    setCaptchaError("");

    try {
      const payload = {
        ...data,
        recaptchaToken: currentRecaptchaToken,
        "g-recaptcha-response": currentRecaptchaToken
      };

      if (payload.howDidYouHear !== "Other") {
        delete payload.howDidYouHearSpecify;
      }

      await submitFindDonorForm(payload);
      setSubmitted(true);
      reset();
      setPhone("");
      setRecaptchaToken("");
      recaptchaRef.current?.reset();
      toast.success('Thank you! We will contact you shortly.');
    } catch (err) {
      toast.error(err.message || 'Submission failed. Please try again.');
      recaptchaRef.current?.reset();
      setRecaptchaToken("");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center p-12 bg-transparent">
        <CheckCircle size={52} color="#EA7FB5" className="mx-auto mb-4" />
        <h3 className="font-serif text-[28px] mb-3 text-white">Thank You!</h3>
        <p className="text-white/90 mb-6 leading-relaxed">
          We've received your information. A team member will reach out shortly to provide your donor gallery access.
        </p>
        <button className="btn btn-pink" onClick={() => setSubmitted(false)}>Submit Another Request</button>
      </div>
    );
  }

  return (
  <div className="max-w-[1200px] mx-auto">
    <h2 className="font-serif text-white text-[clamp(42px,5vw,64px)] leading-none mb-4">
      Find Your Perfect Egg Donor
    </h2>

    <div className="flex items-center gap-4 mb-6">
      <span className="text-white text-[20px]">
        Already have an account?
      </span>

      <button className="group bg-[#EA7FB5] text-white rounded-full px-5 py-2 font-semibold flex items-center gap-2 hover:bg-[#7B3FA0] transition-all">
        Log In here
        <span className="group-hover:translate-x-1 transition-transform">
          →
        </span>
      </button>
    </div>

    <p className="text-white text-[22px] mb-10">
      Create a Free Account and Browse Our Donor Egg Database Instantly
    </p>

    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Row 1 */}
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div>
          <input
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 2,
                message: "Please enter your full name",
              },
            })}
            placeholder="Name"
            autoComplete="name"
            className="h-[60px] w-full rounded-md bg-[#7B688A] border border-white/60 px-6 text-white placeholder:text-white"
          />
          {errors.name && (
            <p className="text-[#EA7FB5] text-sm mt-2">{errors.name.message}</p>
          )}
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
            placeholder="Email"
            type="email"
            autoComplete="email"
            className="h-[60px] w-full rounded-md bg-[#7B688A] border border-white/60 px-6 text-white placeholder:text-white"
          />

          <p className="text-[#EA7FB5] text-sm mt-2">
            {errors.email?.message || "* This email will be used for account verification"}
          </p>
        </div>
      </div>

      {/* Row 2 */}
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div>
          <PhoneInput
            containerClass="find-donor-phone"
            inputClass="find-donor-phone-control"
            buttonClass="find-donor-phone-button"
            dropdownClass="find-donor-phone-dropdown"
            country={"in"}
            enableSearch
            preferredCountries={["in", "us", "ca", "gb"]}
            countryCodeEditable={false}
            disableCountryCode={false}
            value={phone}
            onChange={(value) => {
              setPhone(value);
              setValue("phoneNumber", value, { shouldValidate: true });
            }}
          />

          <input
            type="hidden"
            {...register("phoneNumber", {
              required: "Phone is required",
            })}
          />
          {errors.phoneNumber && (
            <p className="text-[#EA7FB5] text-sm mt-2">{errors.phoneNumber.message}</p>
          )}
        </div>

        <div>
          <select
            {...register("howDidYouHear", {
              required: "Please select how you heard about us",
            })}
            className="h-[60px] w-full rounded-md bg-[#7B688A] border border-white/60 px-6 text-white"
          >
            <option value="">How did you hear about us?</option>
            <option value="Google">Google</option>
            <option value="Social Media">Social Media</option>
            <option value="Friend / Relative">Friend / Relative</option>
            <option value="Yelp">Yelp</option>
            <option value="Other">Other</option>
          </select>
          {errors.howDidYouHear && (
            <p className="text-[#EA7FB5] text-sm mt-2">{errors.howDidYouHear.message}</p>
          )}
        </div>
      </div>

      {howHeard === "Other" && (
        <div className="mb-4">
          <input
            {...register("howDidYouHearSpecify", {
              required: "Please tell us how you heard about us",
            })}
            placeholder="Please specify"
            className="h-[60px] w-full rounded-md bg-[#7B688A] border border-white/60 px-6 text-white placeholder:text-white"
          />
          {errors.howDidYouHearSpecify && (
            <p className="text-[#EA7FB5] text-sm mt-2">{errors.howDidYouHearSpecify.message}</p>
          )}
        </div>
      )}

      {/* Surrogate */}
      <div className="mb-4">
        <select
          {...register("needsSurrogate", {
            required: "Please select whether you need a surrogate",
          })}
          className="h-[60px] w-full rounded-md bg-[#7B688A] border border-white/60 px-6 text-white"
        >
          <option value="">Do you need a surrogate?</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        {errors.needsSurrogate && (
          <p className="text-[#EA7FB5] text-sm mt-2">{errors.needsSurrogate.message}</p>
        )}
      </div>

      {/* Message */}
      <textarea
        {...register("message")}
        placeholder="Write your message"
        rows={4}
        className="w-full rounded-md bg-[#7B688A] border border-white/60 px-6 py-4 text-white placeholder:text-white mb-5"
      />

      <p className="text-white text-sm mb-6">
        By submitting this form, you agree to our{" "}
        <a href="#" className="underline">
          Privacy Policy
        </a>{" "}
        and{" "}
        <a href="#" className="underline">
          Terms of Use
        </a>
        {" "}and consent to receive occasional messages from Lucina Egg Bank.
      </p>

      <div className="mb-6">
        {recaptchaSiteKey ? (
          <div className="inline-block max-w-full overflow-x-auto rounded bg-white">
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
          </div>
        ) : (
          <p className="rounded-md border border-[#EA7FB5]/60 bg-white/10 px-4 py-3 text-sm text-white">
            reCAPTCHA is not configured. Add VITE_RECAPTCHA_SITE_KEY to the frontend environment.
          </p>
        )}
        {captchaError && (
          <p className="text-[#EA7FB5] text-sm mt-2">{captchaError}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-white text-[#7B3FA0] font-semibold rounded-full px-12 h-[58px] hover:bg-[#EA7FB5] hover:text-white transition-all"
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>

    <style>{`
      .find-donor-phone.react-tel-input {
        width: 100%;
      }

      .find-donor-phone .form-control {
        width: 100% !important;
        height: 60px !important;
        background: #7B688A !important;
        border: 1px solid rgba(255, 255, 255, 0.6) !important;
        border-radius: 6px !important;
        box-shadow: none !important;
        color: #ffffff !important;
        font-size: 16px !important;
        padding-left: 58px !important;
      }

      .find-donor-phone .form-control:focus {
        border-color: #ffffff !important;
        box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.18) !important;
        outline: none !important;
      }

      .find-donor-phone .flag-dropdown {
        height: 60px !important;
        background: #7B688A !important;
        border: 1px solid rgba(255, 255, 255, 0.6) !important;
        border-right: 0 !important;
        border-radius: 6px 0 0 6px !important;
      }

      .find-donor-phone .selected-flag,
      .find-donor-phone .selected-flag:hover,
      .find-donor-phone .selected-flag:focus,
      .find-donor-phone .flag-dropdown.open .selected-flag {
        background: #7B688A !important;
        border-radius: 6px 0 0 6px !important;
      }

      .find-donor-phone .country-list {
        border: 1px solid #D9C8E8 !important;
        border-radius: 8px !important;
        margin-top: 6px !important;
      }

      .find-donor-phone .search-box {
        border: 1px solid #D9C8E8 !important;
        color: #1A1A2E !important;
      }
    `}</style>
  </div>
);
};

export default FindDonorForm;
