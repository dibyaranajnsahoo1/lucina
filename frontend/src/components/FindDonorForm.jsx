import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { submitFindDonorForm } from '../utils/api';
import { CheckCircle } from 'lucide-react';

const FindDonorForm = ({ title = "Find Your Perfect Egg Donor", subtitle = "" }) => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm();
  const howHeard = watch('howDidYouHear');

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await submitFindDonorForm(data);
      setSubmitted(true);
      reset();
      toast.success('Thank you! We will contact you shortly.');
    } catch (err) {
      toast.error(err.message || 'Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center p-12 bg-white rounded-[20px] shadow-[0_8px_40px_rgba(107,45,139,0.12)] border border-[#EDD8F5]">
        <CheckCircle size={52} color="#7B3FA0" className="mx-auto mb-4" />
        <h3 className="font-serif text-[28px] mb-3">Thank You!</h3>
        <p className="text-[#6B7280] mb-6 leading-relaxed">
          We've received your information. A team member will reach out shortly to provide your donor gallery access.
        </p>
        <button className="btn btn-pink" onClick={() => setSubmitted(false)}>Submit Another Request</button>
      </div>
    );
  }

  return (
    <div className="fdf-wrapper bg-white rounded-[20px] p-9 shadow-[0_8px_40px_rgba(107,45,139,0.10)] border border-[#EDD8F5]">
      <div className="text-center mb-7">
        <h2 className="font-serif text-[clamp(20px,3vw,28px)] text-[#1A1A2E]">{title}</h2>
        {subtitle && <p className="text-[#6B7280] text-[14px] mt-1">{subtitle}</p>}
        <p className="text-[13px] text-[#9B5EC0] mt-1.5">Create a Free Account and Browse Our Donor Egg Database Instantly</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Full Name <span className="required">*</span></label>
            <input {...register('name', { required: 'Name is required' })} className="form-input" placeholder="Your full name" />
            {errors.name && <p className="form-error">{errors.name.message}</p>}
          </div>
          <div className="form-group">
            <label className="form-label">Email Address <span className="required">*</span></label>
            <input {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email' } })} type="email" className="form-input" placeholder="your@email.com" />
            {errors.email && <p className="form-error">{errors.email.message}</p>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Phone Number <span className="required">*</span></label>
            <input {...register('phoneNumber', { required: 'Phone is required' })} type="tel" className="form-input" placeholder="+1 (555) 000-0000" />
            {errors.phoneNumber && <p className="form-error">{errors.phoneNumber.message}</p>}
          </div>
          <div className="form-group">
            <label className="form-label">How did you hear about us? <span className="required">*</span></label>
            <select {...register('howDidYouHear', { required: 'Please select an option' })} className="form-select">
              <option value="">Select an option</option>
              <option value="Google">Google</option>
              <option value="Social Media">Social Media</option>
              <option value="Friend/Relatives">Friend / Relatives</option>
              <option value="Yelp">Yelp</option>
              <option value="Other">Other</option>
            </select>
            {errors.howDidYouHear && <p className="form-error">{errors.howDidYouHear.message}</p>}
          </div>
        </div>

        {howHeard === 'Other' && (
          <div className="form-group">
            <label className="form-label">Please specify <span className="required">*</span></label>
            <input {...register('howDidYouHearSpecify', { required: 'Please specify' })} className="form-input" placeholder="Tell us more..." />
            {errors.howDidYouHearSpecify && <p className="form-error">{errors.howDidYouHearSpecify.message}</p>}
          </div>
        )}

        <div className="form-group">
          <label className="form-label">Do you need a surrogate?</label>
          <select {...register('needsSurrogate')} className="form-select">
            <option value="">Select an option</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Message (Optional)</label>
          <textarea {...register('message')} className="form-textarea" placeholder="Tell us about your journey or any questions..." rows={3} />
        </div>

        <div className="form-group">
          <label className="checkbox-wrapper">
            <input type="checkbox" {...register('agreedToTerms', { required: 'You must agree to the terms' })} />
            <span className="text-[12px] text-[#6B7280] leading-relaxed">
              By submitting, you agree to our{' '}
              <a href="#" className="text-[#7B3FA0]">Privacy Policy</a> and{' '}
              <a href="#" className="text-[#7B3FA0]">Terms of Use</a>.
            </span>
          </label>
          {errors.agreedToTerms && <p className="form-error">{errors.agreedToTerms.message}</p>}
        </div>

        <button type="submit" className="btn btn-pink btn-lg w-full" disabled={loading}>
          {loading ? <><span className="spinner w-[18px] h-[18px] border-2"></span> Submitting...</> : 'Get Donor Gallery Access →'}
        </button>
        <p className="text-[11px] text-[#9CA3AF] text-center mt-2.5">🔒 Your information is 100% secure.</p>
      </form>
    </div>
  );
};

export default FindDonorForm;
