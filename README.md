# Notes Web

A real-world **fullstack notes application** built with **Next.js**, **TypeScript**, and a Go backend.

This project was created as a learning experience to combine a production-ready Go API with a modern frontend using best practices in authentication, state management, validation, and UI architecture.

🔗 Live demo: https://notes-web-gustavoms.vercel.app  
🔙 Backend (Go Fiber + MongoDB): https://github.com/GustavoMS97/go-notes-api

---

## 🧠 Tech Stack

### Frontend

- Framework: Next.js (App Router)
- Language: TypeScript
- Styling: Tailwind CSS (custom theme inspired by iOS dark UI)
- State Management: Zustand
- Form & Validation:
  - react-hook-form
  - zod
- Authentication: JWT-based auth via custom AuthContext and API layer
- API Communication: Axios with interceptors for access & refresh token handling
- Animation: Framer Motion (for mobile drawer experience)
- PWA-like behavior: custom manifest.json with app icon support and standalone mode on mobile

---

## ✨ Features

### Authentication

- POST /users – Create account
- POST /users/login – Login with email and password
- POST /users/refresh – Refresh access token
- GET /users/me – Retrieve user info from JWT

### Notes

- POST /notes – Create a new note
- GET /notes – List notes (with search by title)
- PUT /notes/:id – Update a note
- DELETE /notes/:id – Delete a note

### UI Behavior

- Responsive layout (Mobile First)
- iOS-like UI theme
- Floating buttons on mobile
- Sidebar with searchable note list
- Editable note viewer with autosave
- Authenticated routing with automatic redirect
- Axios token refresh + protected routes
- Custom TextInput component with consistent styling and validation
- Scroll locking and drawer animation for smooth mobile UX

---

## 📱 Mobile Usage

This app supports installing to your home screen just like a native app.

When saved to the home screen on mobile:

- It opens in full-screen (no browser chrome)
- Uses the configured app icon and name
- Provides a clean standalone experience

⚠️ Note: Currently optimized for **dark mode only on mobile**.  
Some text may not be visible properly in light mode. This will be improved soon — frontend is not my main expertise 😅.

---

## 🛠️ Future Plans

- [ ] Light/Dark mode toggle
- [ ] Improved mobile UI & animations
- [ ] Pinned notes
- [ ] Tagging notes
- [ ] Shareable notes via links
- [ ] Offline support (PWA)

---

## 🧩 Project Structure

/app  
 /login → Login screen  
 /notes → Authenticated notes layout (editor + list)

@/components → UI & layout components (TextInput, Header, NoteEditor...)  
@/features → Domain logic (notes, auth)  
@/context → AuthContext  
@/hooks → Custom hooks like useNotes, useAuthGuard  
/public → Manifest, favicons, icons  
/styles → Tailwind + global styles

---

## 🧪 Backend API

All data is served by the Go backend project:  
🧬 GitHub: https://github.com/GustavoMS97/go-notes-api

Tech used:

- Go (Fiber)
- MongoDB
- JWT
- Swagger docs
- Docker-ready

---

## 🚀 Getting Started

### 1. Clone the project

git clone https://github.com/GustavoMS97/notes-web.git  
cd notes-web

### 2. Install dependencies

yarn

### 3. Set environment variables

.env

NEXT_PUBLIC_API_URL=https://your-api-url.com

### 4. Run the app locally

yarn dev

---

Made with 💻 by @GustavoMS97  
If you're into backend like me, feel free to contribute on the frontend 😉
