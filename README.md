# 📝 MyNotes App

A full-featured, responsive notes application built with React and JavaScript. Users can create, edit, delete, archive, pin and search notes — all with per-user authentication and localStorage persistence.

---

## 🚀 Live Demo

> https://notes-app-kappa-three-59.vercel.app

---

## ✨ Features

- 🔐 **Authentication** — Login and Signup with per-user data isolation
- 📝 **Add Notes** — Create notes with title and content
- ✏️ **Edit Notes** — Update existing notes inline
- 🗑️ **Soft Delete** — Deleted notes move to Archive
- 🗂️ **Archive** — Restore or permanently delete archived notes
- 📌 **Pin Notes** — Pinned notes appear at the top
- 🔍 **Search** — Real-time search by note title
- 💾 **Persistence** — Notes saved to localStorage per user
- 📱 **Responsive** — Works on all screen sizes

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | Frontend UI framework |
| JavaScript (ES6+) | Core logic |
| Vite | Build tool and dev server |
| CSS3 | Styling and animations |
| localStorage | Data persistence |

---

## 📁 Project Structure

```
notes-app/
├── public/
├── src/
│   ├── components/
│   │   ├── Auth.jsx        # Login and Signup
│   │   ├── Auth.css
│   │   ├── NoteForm.jsx    # Add and Edit note form
│   │   ├── NoteForm.css
│   │   ├── NoteList.jsx    # List of all notes
│   │   ├── NoteList.css
│   │   ├── NoteCard.jsx    # Individual note card
│   │   └── NoteCard.css
│   ├── App.jsx             # Main app component
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
└── vite.config.js
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/shindeshreya06/notes-app.git

# Navigate to project folder
cd notes-app

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🔐 Authentication

This app uses **localStorage-based authentication** for frontend-only deployment.

- Each user's notes are stored separately under their username key
- Passwords are stored in plain text locally (acceptable for frontend-only projects)
- In a production app, passwords would be hashed using bcrypt on a Node.js backend

---

## 📸 Screenshots
 
### Login Page
![Login Page](src\assets\loginpage.png)
 
### Sign Up Page
![Sign Up Page](src\assets\signuppage.png)
 
### Dashboard — All Notes
![Dashboard](src\assets\dashboard.png)
 
### Archive Page
![Archive](src\assets\archive.png)

---

## 🔮 Future Improvements

- [ ] Node.js + Express backend
- [ ] MongoDB database integration
- [ ] JWT-based secure authentication
- [ ] Password hashing with bcrypt
- [ ] Note color themes
- [ ] Rich text editor

