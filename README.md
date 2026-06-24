# 🎤 Mic Masters India — Full Stack Web Application

India's premier singing & talent competition registration platform.

## What's Included

- **Frontend**: React app (Create React App) with Material UI
- **Backend**: Node.js + Express REST API
- **Database**: MongoDB Atlas
- **File Storage**: Cloudinary (payment screenshots)
- **Email**: Gmail SMTP (nodemailer)
- **Payment**: Direct UPI (no third-party gateway)

---

## Payment Flow

1. User fills the registration form
2. A modal shows the PhonePe QR code and UPI ID `9826667279@ybl`
3. User pays **exactly ₹99** using any UPI app
4. User uploads a screenshot of the successful payment
5. Admin logs in at `/admin` and can see all registrations + payment screenshots
6. Admin clicks **Verify** → user receives a confirmation email automatically
7. Admin clicks **Reject** → registration stays rejected

---

## Environment Setup

### Backend (`server/.env`)

```
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:Eminence1232Secure@cluster0.xxx.mongodb.net/...
ALLOWED_ORIGINS=https://www.micmastersindia.com,https://micmastersindia.com
JWT_SECRET=<generate with: node -e "console.log(require('crypto').randomBytes(48).toString('hex'))">
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=your_strong_password
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
EMAIL_USER=your_gmail@gmail.com
EMAIL_APP_PASSWORD=your_16_char_app_password
```

### Frontend (`mic-masters-india/src/config.js`)

```js
const API_BASE_URL = process.env.REACT_APP_API_URL || "https://micmastersindia.com";
export default API_BASE_URL;
```

---

## First-Time Admin Setup

After deploying the backend, run once:

```bash
cd server
node seedAdmin.js
```

This creates the admin account using `ADMIN_USERNAME` and `ADMIN_PASSWORD` from `.env`.

---

## Deployment

- **Frontend**: Vercel (auto-detects CRA)
- **Backend**: Render (Node.js service)
- Set environment variables in each platform's dashboard

---

## Security Features

- Helmet.js with CSP, HSTS, X-Frame-Options: DENY
- Rate limiting on all API endpoints
- JWT auth for admin (httpOnly cookies)
- Input validation with express-validator
- File type + size validation for uploads
- CORS restricted to known origins
- MongoDB Atlas IP whitelisting recommended

---

## Sponsor

Sponsored by **The Counseling Cafe**  
26-27, Hotel Amrit, Near Sardar Patel Bridge, Chhoti Gwaltoli, Indore – 452001
