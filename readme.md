
# 📘 Purifier Management Backend
![version](https://img.shields.io/badge/version-1.0.0-blue)

## 🚀 Overview

This backend is part of an **IoT-enabled Water Purifier Rental Management System**.
It provides REST APIs for **managing purifiers**, including adding new devices and retrieving deployed units.

The system is structured to support:

* **Admin dashboard APIs** (application-facing)
* **Developer APIs** (for IoT device communication, testing & hardware teams)
* Modularized architecture (controllers, routes, middleware, config, utils)
* Ready for **real-time updates** with **Socket.IO** (Phase 2)

---

## 📂 Project Structure

```
purifier-management-backend/
 ┣ 📂src
 ┃ ┣ 📂config
 ┃ ┃ ┗ db.js                # MongoDB connection
 ┃ ┣ 📂controllers
 ┃ ┃ ┣ authController.js                # Auth logic
 ┃ ┃ ┣ purifierController.js            # Admin-facing logic
 ┃ ┃ ┗ developerPurifierController.js   # IoT/Developer APIs
 ┃ ┣ 📂middleware
 ┃ ┃ ┣ auth.js                     # Authenticate & Authorize logic
 ┃ ┃ ┣ header_ErrorHandler.js      # Central error handler & Remove unwanted headers
 ┃ ┣ 📂models
 ┃ ┃ ┗ User.js          # User schema/model
 ┃ ┃ ┗ Purifier.js          # Purifier schema/model
 ┃ ┣ 📂routes
 ┃ ┃ ┣ authRoutes.js                # Auth routes
 ┃ ┃ ┣ purifierRoutes.js            # Admin-facing routes
 ┃ ┃ ┗ developerPurifierRoutes.js   # IoT/Developer routes
 ┃ ┗ app.js                 # Express app setup
 ┣ server.js                # Server entry (ready for Socket.IO)
 ┣ .env                     # Environment variables
 ┣ package.json
 ┗ README.md
```

---

## ⚙️ Tech Stack

* **Backend Runtime:** Node.js (ES6 modules)
* **Framework:** Express.js
* **Database:** MongoDB (Mongoose ODM)
* **Logging:** Morgan
* **CORS Support:** cors
* **Environment Config:** dotenv

---

## 📑 API Endpoints (Phase 1)

### 🔹 Admin / Application APIs (`/api/purifiers`)

* `GET /api/purifiers` → Get all purifiers
* `POST /api/purifiers` → Add a new purifier
* `PUT /api/purifiers/:id` → Update purifier details
* `DELETE /api/purifiers/:id` → Delete purifier
* `PATCH api/purifiers/:id/toggle-status` → Toggle Switch status by id

### 🔹 Developer / IoT APIs (`/api/dev/purifiers`)

* `GET /api/dev/purifiers/:id/status` → Get purifier current Switch status
* `GET /api/dev/purifiers/456/status?onlineStatus=0` → Switch status returned and purifier activated[1]/deactivated[0]
* `PUT /api/dev/purifiers?id=456&status=1` → Update switch status

---

## 📦 Installation & Setup

### 1. Clone repo

```sh
git clone <repo-url>
cd purifier-management-backend
```

### 2. Install dependencies

```sh
npm install
```

### 3. Configure `.env`

Create a `.env` file in root:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/purifierDB
```

### 4. Run server

```sh
npm run dev   # with nodemon
# or
npm start
```

Server runs at:
👉 `http://localhost:5000`

---

## 🧪 Test Routes

* `GET /` → Health check (`Ping successful. DOR-Server responded`)
* `GET /api/purifiers` → List all purifiers
* `POST /api/purifiers` → Add purifier (expects JSON body)
* `GET /api/dev/purifiers/:id/status` → Get purifier status

---

## 🔮 Next Steps (Phase 2)

* Add **Socket.IO** for real-time updates on Admin Dashboard
* Add **Authentication & Authorization** (JWT-based)
* Integrate **Payment Gateway** (Razorpay/Stripe)
* Implement **Timer/Recharge logic**
* Improve testing (Jest/Supertest)

---

## 📓 Changelog
See detailed version history in [CHANGELOG.md](./CHANGELOG.md)