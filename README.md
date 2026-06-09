# Lucina Egg Bank — Full-Stack MERN Application

A complete full-stack replica of [lucinaeggbank.com](https://lucinaeggbank.com/) built with the MERN stack (MongoDB, Express.js, React.js + Vite, Node.js).

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite |
| Admin Dashboard | React 18 + Vite (separate app) |
| Backend | Node.js + Express.js |
| Database | MongoDB + Mongoose |
| Auth | JWT (JSON Web Tokens) |
| File Uploads | Multer |
| Email | Nodemailer (Gmail SMTP) |
| Styling | Custom CSS (design-system approach) |

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
├── frontend/                 # Landing website (port 5173)
│   ├── src/
│   │   ├── components/       # Navbar, Footer, shared forms
│   │   ├── pages/            # All 8 pages
│   │   └── utils/api.js      # Axios API service
│   └── vite.config.js
├── admin/                    # Admin dashboard (port 5174)
│   ├── src/
│   │   ├── components/       # AdminLayout, sidebar
│   │   ├── context/          # Auth context
│   │   ├── pages/            # Dashboard, CRUD pages
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

# Email (Gmail SMTP — use App Password, not your real password)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_16_char_app_password
EMAIL_FROM=Lucina Egg Bank <noreply@lucinaeggbank.com>
ADMIN_EMAIL=admin@lucinaeggbank.com

# Google reCAPTCHA (optional)
RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key

# URLs (frontend and admin URLs for CORS)
CLIENT_URL=http://localhost:5173
ADMIN_URL=http://localhost:5174

NODE_ENV=development
```

> **Gmail App Password Setup:**
> 1. Enable 2FA on your Google account
> 2. Go to Google Account → Security → App passwords
> 3. Create a new App password for "Mail"
> 4. Use that 16-char password as `EMAIL_PASS`

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

### 3. Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

Frontend runs at: `http://localhost:5173`

---

### 4. Admin Dashboard Setup

```bash
cd ../admin
npm install
npm run dev
```

Admin dashboard runs at: `http://localhost:5174`

---

## 🔑 Default Admin Credentials

```
URL:      http://localhost:5174
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

### Admin Dashboard (`http://localhost:5174`)

| Page | URL | Features |
|------|-----|----------|
| Dashboard | `/` | Stats overview, recent submissions |
| Donor Applications | `/donor-applications` | View/filter/update status, download files |
| Find Donor Leads | `/find-donor-leads` | View/filter/update status |
| Contact Leads | `/contact-leads` | View/filter/reply via email |
| Donor Management | `/donors` | Full CRUD with image upload |
| Testimonials | `/testimonials` | Full CRUD, display location control |
| Blog Posts | `/blogs` | Full CRUD, HTML content editor |

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

> Email requires valid Gmail SMTP credentials in `.env`. Without them, the system still works — it just skips sending.

---

## 🔒 Security Features

- JWT authentication for all admin routes
- bcrypt password hashing
- Rate limiting (100 req / 15 min per IP)
- CORS whitelist (only frontend and admin URLs)
- File type validation on uploads
- Input sanitization via express-validator
- No sensitive data exposed in public API responses

---

## 🌐 Environment Variables Summary

| Variable | Required | Description |
|----------|----------|-------------|
| `MONGO_URI` | ✅ | MongoDB connection string |
| `JWT_SECRET` | ✅ | Secret key for JWT signing |
| `EMAIL_USER` | ⚠️ | Gmail address for sending emails |
| `EMAIL_PASS` | ⚠️ | Gmail App Password |
| `ADMIN_EMAIL` | ⚠️ | Where admin notifications are sent |
| `CLIENT_URL` | ✅ | Frontend URL for CORS |
| `ADMIN_URL` | ✅ | Admin dashboard URL for CORS |
| `RECAPTCHA_SECRET_KEY` | ❌ | Optional Google reCAPTCHA secret |

---

## 📸 Screenshots

Screenshots are located in the `/screenshots` folder (add yours here after running).

**Landing Website:**
1. Homepage — Hero section
2. Find an Egg Donor — Donor gallery with filters
3. Become an Egg Donor — Application form
4. Why Lucina — Services & guarantees
5. Contact Us — Contact form

**Admin Dashboard:**
1. Login page
2. Dashboard — Stats overview
3. Donor Applications — Table with status management
4. Donor Management — CRUD with image upload
5. Testimonials — Card-based CRUD management

---

## 🤝 Support

For questions about this implementation, contact the development team.

---

*Built with ❤️ as a MERN stack assignment replicating [lucinaeggbank.com](https://lucinaeggbank.com/)*
