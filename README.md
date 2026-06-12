# Lucina Egg Bank — Full-Stack MERN Application

A complete full-stack replica of [lucinaeggbank.com](https://lucinaeggbank.com/) built with the MERN stack (MongoDB, Express.js, React.js + Vite, Node.js). 

**Recent Update:** The Admin Dashboard has been seamlessly integrated directly into the main frontend application to allow for a **single, unified deployment**. The Admin panel is fully mobile-responsive, transforming standard data tables into elegant, application-style cards on smaller screens.

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite (Includes Admin Dashboard) |
| Backend | Node.js + Express.js |
| Database | MongoDB + Mongoose |
| Auth | JWT (JSON Web Tokens) & React Context |
| File Uploads | Multer + Cloudinary (Cloud Storage) |
| Email | Brevo HTTP API (Production) / Nodemailer |
| Styling | Custom CSS (Design-system approach with PostCSS nesting) |

---

## 📁 Project Structure

```
lucina-egg-bank/
├── backend/                  # Node.js + Express REST API
│   ├── config/db.js
│   ├── controllers/          # Route handlers
│   ├── middleware/           # Auth + file upload middleware
│   ├── models/               # Mongoose models
│   ├── routes/               # Express routes
│   ├── uploads/              # Uploaded files (auto-created)
│   ├── utils/                # Email + seed utilities
│   ├── .env.example          # Environment variable template
│   └── server.js             # Entry point
├── frontend/                 # Unified React Application (port 5173)
│   ├── src/
│   │   ├── admin/            # Admin Dashboard module (accessed via /admin)
│   │   ├── components/       # Public website components
│   │   ├── pages/            # Public website pages
│   │   ├── App.jsx           # Main router connecting public & admin routes
│   │   └── utils/api.js      # Axios API service
│   └── vite.config.js
└── README.md
```

---

## ⚙️ Prerequisites

- **Node.js** v18+ ([download](https://nodejs.org))
- **MongoDB** running locally OR a MongoDB Atlas connection string
- **npm** or **yarn**

---

## 🛠️ Setup & Installation

### 1. Clone / Extract the Project

```bash
cd lucina-egg-bank
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create your environment file:

```bash
cp .env.example .env
```

Edit `.env` with your values:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/lucina_egg_bank
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d

# Email (Brevo HTTP API for Production, bypasses SMTP blocks)
BREVO_API_KEY=your_brevo_api_key
BREVO_API_URL=https://api.brevo.com/v3
FROM_EMAIL=hello.nexkarya@gmail.com
FROM_NAME=NexKarya
ADMIN_EMAIL=admin@lucinaeggbank.com

# Fallback Email Config (Local testing only)
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_app_password

# Google reCAPTCHA
RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key
RECAPTCHA_EXPECTED_HOSTNAME=localhost

# Cloudinary (File Uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# URLs (Frontend URL for CORS)
CLIENT_URL=http://localhost:5173

NODE_ENV=development
```

> **Email Setup for Production (Render):**
> We strongly recommend using the Brevo HTTP API instead of Gmail SMTP because Render blocks outbound SMTP ports. Use the `BREVO_API_KEY` for flawless delivery.

Seed the database with sample data:

```bash
npm run seed
```

This creates:
- **Admin account:** `admin@lucinaeggbank.com` / `Admin@123`
- 8 sample egg donors
- 6 testimonials
- 2 blog posts

Start the backend server:

```bash
npm run dev      # Development (nodemon)
# OR
npm start        # Production
```

Backend runs at: `http://localhost:5000`

---

### 3. Frontend & Admin Setup (Unified)

```bash
cd ../frontend
npm install
cp .env.example .env
npm run dev
```

Edit `frontend/.env` with your values:

```env
VITE_API_URL=http://localhost:5000/api
VITE_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
```

Frontend runs at: `http://localhost:5173`
Admin Dashboard runs at: `http://localhost:5173/admin`

---

## 🔑 Default Admin Credentials

```
URL:      http://localhost:5173/admin
Email:    admin@lucinaeggbank.com
Password: Admin@123
```

> Change these immediately after first login in a production environment!

---

## 📄 Pages & Features

### Landing Website (`http://localhost:5173`)

| Page | URL | Features |
|------|-----|----------|
| Home | `/` | Hero, stats, advantages, testimonials, CTA |
| Find an Egg Donor | `/find-an-egg-donor` | Donor gallery, filters, find-donor form |
| Become an Egg Donor | `/become-an-egg-donor` | Full application form with file upload |
| Why Lucina | `/why-choose-lucina` | Services, guarantees, success stories |
| Financial Resources | `/financial-resources` | Pricing, guarantees, financing, FAQ |
| Blog | `/blog` | Blog listing with categories |
| Blog Post | `/blog/:slug` | Full article with sidebar |
| Contact Us | `/contact-us` | Contact form, map, info |

### Admin Dashboard (`http://localhost:5173/admin`)

*Note: The Admin Dashboard is fully responsive. On mobile devices, data tables automatically transform into touch-friendly, application-style cards.*

| Page | URL | Features |
|------|-----|----------|
| Dashboard | `/admin` | Stats overview, recent submissions |
| Donor Applications | `/admin/donor-applications` | View/filter/update status, download files |
| Find Donor Leads | `/admin/find-donor-leads` | View/filter/update status |
| Contact Leads | `/admin/contact-leads` | View/filter/reply via email |
| Donor Management | `/admin/donors` | Full CRUD with image upload |
| Testimonials | `/admin/testimonials` | Full CRUD, display location control |
| Blog Posts | `/admin/blogs` | Full CRUD, HTML content editor |

---

## 🔌 API Endpoints

### Auth
```
POST   /api/auth/setup          Create initial admin
POST   /api/auth/login          Admin login → JWT token
GET    /api/auth/me             Get current admin (protected)
PUT    /api/auth/change-password Change password (protected)
```

### Forms (Public + Protected)
```
POST   /api/forms/donor-application     Submit donor application
GET    /api/forms/donor-applications    List all applications (protected)
GET    /api/forms/donor-applications/:id Get one (protected)
PUT    /api/forms/donor-applications/:id Update status (protected)
DELETE /api/forms/donor-applications/:id Delete (protected)

POST   /api/forms/find-donor     Submit find-donor form
GET    /api/forms/find-donor     List all (protected)
PUT    /api/forms/find-donor/:id Update (protected)
DELETE /api/forms/find-donor/:id Delete (protected)

POST   /api/forms/contact        Submit contact form
GET    /api/forms/contact        List all (protected)
PUT    /api/forms/contact/:id    Update (protected)
DELETE /api/forms/contact/:id    Delete (protected)

GET    /api/forms/stats          Dashboard statistics (protected)
```

### Donors
```
GET    /api/donors              List active donors (public)
GET    /api/donors/:id          Get single donor (public)
GET    /api/donors/admin/all    List all donors (protected)
POST   /api/donors              Create donor (protected)
PUT    /api/donors/:id          Update donor (protected)
DELETE /api/donors/:id          Delete donor (protected)
```

### Testimonials
```
GET    /api/testimonials            List active testimonials (public)
GET    /api/testimonials/admin/all  List all (protected)
POST   /api/testimonials            Create (protected)
PUT    /api/testimonials/:id        Update (protected)
DELETE /api/testimonials/:id        Delete (protected)
```

### Blogs
```
GET    /api/blogs               List published blogs (public)
GET    /api/blogs/:slug         Get single blog (public)
GET    /api/blogs/admin/all     List all (protected)
POST   /api/blogs               Create (protected)
PUT    /api/blogs/:id           Update (protected)
DELETE /api/blogs/:id           Delete (protected)
```

---

## 🗄️ Database Models

| Model | Description |
|-------|-------------|
| `Admin` | Admin users with bcrypt-hashed passwords |
| `Donor` | Egg donor profiles (shown on website) |
| `DonorApplication` | "Become an Egg Donor" form submissions |
| `FindDonorForm` | "Find Your Perfect Egg Donor" form submissions |
| `ContactForm` | Contact Us page form submissions |
| `Testimonial` | Testimonials (homepage & donor page) |
| `Blog` | Blog posts with HTML content |

---

## 📧 Email Notifications

When a donor application is submitted:
1. ✅ Confirmation email sent to applicant (with case ID, next steps)
2. 📬 Admin notification email sent

When a contact form is submitted:
1. ✅ Confirmation email sent to the sender
2. 📬 Admin notification email sent

> Email requires either a valid `BREVO_API_KEY` (recommended for production) or Gmail SMTP credentials in `.env`. Without them, the system still works — it just skips sending.

---

## 🔒 Security Features

- JWT authentication for all admin routes
- bcrypt password hashing
- Rate limiting (100 req / 15 min per IP)
- CORS whitelist (restricted to frontend URL)
- File type validation on uploads
- Input sanitization via express-validator
- No sensitive data exposed in public API responses
- Scoped Admin CSS to avoid leaking styles to the public frontend

---

## 🌐 Environment Variables Summary

| Variable | Required | Description |
|----------|----------|-------------|
| `MONGO_URI` | ✅ | MongoDB connection string |
| `JWT_SECRET` | ✅ | Secret key for JWT signing |
| `CLOUDINARY_CLOUD_NAME`| ✅ | Cloudinary Cloud Name for file uploads |
| `CLOUDINARY_API_KEY`| ✅ | Cloudinary API Key |
| `CLOUDINARY_API_SECRET`| ✅ | Cloudinary API Secret |
| `BREVO_API_KEY` | ⚠️ | Brevo API key for production email delivery |
| `EMAIL_USER` | ⚠️ | Fallback: Gmail address for local sending |
| `EMAIL_PASS` | ⚠️ | Fallback: Gmail App Password |
| `ADMIN_EMAIL` | ⚠️ | Where admin notifications are sent |
| `CLIENT_URL` | ✅ | Frontend URL for CORS |
| `RECAPTCHA_SECRET_KEY` | ✅ | Google reCAPTCHA secret used by backend |
| `VITE_RECAPTCHA_SITE_KEY` | ✅ | Public Google reCAPTCHA site key used by frontend |

---

## 🤝 Support

For questions about this implementation, contact the development team.

---

*Built with ❤️ as a MERN stack assignment replicating [lucinaeggbank.com](https://lucinaeggbank.com/)*
