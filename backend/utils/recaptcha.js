const VERIFY_URL = 'https://www.google.com/recaptcha/api/siteverify';

const getVerificationMessage = (errorCodes = []) => {
  if (errorCodes.includes('invalid-input-secret')) {
    return 'reCAPTCHA server secret is invalid. Please check the backend RECAPTCHA_SECRET_KEY.';
  }

  if (errorCodes.includes('missing-input-secret')) {
    return 'reCAPTCHA server secret is missing. Please check the backend RECAPTCHA_SECRET_KEY.';
  }

  if (errorCodes.includes('timeout-or-duplicate')) {
    return 'reCAPTCHA expired or was already used. Please verify again.';
  }

  if (errorCodes.includes('missing-input-response')) {
    return 'Please complete the reCAPTCHA verification.';
  }

  if (errorCodes.includes('invalid-input-response')) {
    return 'reCAPTCHA verification failed. Please refresh the page and verify again.';
  }

  return 'reCAPTCHA verification failed. Please try again.';
};

const verifyRecaptchaToken = async (token, remoteIp) => {
  const secret = process.env.RECAPTCHA_SECRET_KEY;

  if (!secret) {
    if (process.env.NODE_ENV === 'production') {
      return {
        success: false,
        status: 500,
        message: 'reCAPTCHA is not configured. Please contact support.'
      };
    }

    console.warn('RECAPTCHA_SECRET_KEY is not set; skipping reCAPTCHA verification in development.');
    return { success: true, skipped: true };
  }

  if (!token) {
    return {
      success: false,
      status: 400,
      message: 'Please complete the reCAPTCHA verification.'
    };
  }

  try {
    const params = new URLSearchParams({
      secret,
      response: token
    });

    if (remoteIp) {
      params.append('remoteip', remoteIp);
    }

    const response = await fetch(VERIFY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params
    });

    if (!response.ok) {
      return {
        success: false,
        status: 502,
        message: 'We could not verify reCAPTCHA. Please try again.'
      };
    }

    const result = await response.json();

    if (!result.success) {
      const errorCodes = result['error-codes'] || [];
      console.warn('reCAPTCHA rejected submission:', errorCodes);

      return {
        success: false,
        status: 400,
        message: getVerificationMessage(errorCodes),
        errors: errorCodes
      };
    }

    const expectedHostname = process.env.RECAPTCHA_EXPECTED_HOSTNAME;
    if (expectedHostname && result.hostname && result.hostname !== expectedHostname) {
      return {
        success: false,
        status: 400,
        message: 'reCAPTCHA verification failed for this domain.'
      };
    }

    return { success: true, data: result };
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return {
      success: false,
      status: 502,
      message: 'We could not verify reCAPTCHA. Please try again.'
    };
  }
};

module.exports = { verifyRecaptchaToken };
