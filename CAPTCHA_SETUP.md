# reCAPTCHA Setup Guide

## Overview
Added Google reCAPTCHA v2 to prevent OTP spam on the login page.

## Setup Steps

### 1. Get reCAPTCHA Keys
1. Go to [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
2. Create a new site with reCAPTCHA v2 "I'm not a robot" checkbox
3. Add your domain(s) to the site list
4. Copy the Site Key and Secret Key

### 2. Update Environment Variables
Replace the test key in `.env`:
```
VITE_RECAPTCHA_SITE_KEY=your_actual_site_key_here
```

### 3. Backend Integration
Your backend should verify the captcha token sent in the `initiateLogin` request:

```javascript
// Example backend verification
const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: `secret=YOUR_SECRET_KEY&response=${captchaToken}`
});

const result = await response.json();
if (!result.success) {
  return res.status(400).json({ error: 'Captcha verification failed' });
}
```

## Features
- Prevents automated OTP requests
- Resets captcha on failed attempts
- User-friendly error messages
- Environment-based configuration

## Current Status
- ✅ Frontend integration complete
- ⚠️ Backend verification needed