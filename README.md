# 🧠 SkillSwap – Skill Exchange Platform

SkillSwap is a full-stack web application that allows users to share, discover, and manage skills. Users can create skill listings, browse others’ skills, and manage their own content through a secure and user-friendly interface.

---

## 🚀 Tech Stack

**Frontend:** Angular (Standalone Components, Signals, Reactive Forms, RxJS)
**Backend:** Node.js, Express.js
**Database:** MongoDB (Mongoose)
**Authentication:** JWT (JSON Web Token)

---

## ⚙️ Setup & Run

### Backend

```bash
cd server
npm install
npm run dev
```

Runs on: **http://127.0.0.1:5050**

### Frontend

```bash
cd client
npm install
ng serve
```

Runs on: **http://localhost:4200**

---

## 👥 User Roles

**Guest:**

* View home page
* Browse skills catalog
* View skill details
* Register / Login

**Authenticated User:**

* Create skills
* Edit/Delete own skills
* View Dashboard
* View “My Skills”

---

## 🔐 Authentication & Security

* JWT-based authentication
* Token stored in `localStorage`
* HTTP Interceptor attaches token to requests
* Route Guards:

  * `authGuard` → protects private routes
  * `guestGuard` → blocks login/register for logged users
* Only skill owner can edit/delete

---

## 📦 Core Features

* 🏠 Home page
* 📚 Skills Catalog (with truncated descriptions)
* 🔍 Skill Details page
* ➕ Create Skill (validated form)
* ✏️ Edit Skill (owner-only)
* ❌ Delete Skill (owner-only)
* 📊 Dashboard (latest skills)
* 👤 My Skills (user-specific)

---

## 🧪 Validation & UX

* Reactive Forms with validation:

  * required fields
  * email validation
  * minimum length
* Disabled submit button for invalid forms
* Error handling with user-friendly messages
* Loading and empty states

---

## 🔄 RxJS Usage

* `map` → transform/sort data
* `catchError` → handle HTTP errors
* `tap` → authentication side effects

---

## 🔧 Custom Pipe

**truncate pipe**
Used to shorten long descriptions in catalog, dashboard, and my-skills pages.

---

## 🗃️ Database Structure

**Users**

* email
* password (hashed)

**Skills**

* title
* description
* category
* level
* owner (User ID)
* timestamps

---

## 🔁 Application Flow

1. User registers or logs in
2. JWT token is stored and used for authenticated requests
3. User creates skills
4. Skills appear in catalog and dashboard
5. Owner can edit or delete their skills

---

## 🎯 Highlights

* Full CRUD functionality
* Authentication & authorization
* Route guards (auth + guest)
* Clean architecture (services, components, guards)
* Modern Angular (standalone + signals)
* Good UX and validation

---

## 📌 Future Improvements

* Skill exchange requests system
* Search and filtering
* User profiles
* Chat functionality

---

## 👨‍💻 Author

**[Svetlin Garabedyan]**

