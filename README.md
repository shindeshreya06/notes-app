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
<img width="1919" height="897" alt="loginpage" src="https://github.com/user-attachments/assets/798b022c-1181-4202-b9f9-9012d1f27e5c" />

### Sign Up Page
<img width="1919" height="908" alt="signuppage" src="https://github.com/user-attachments/assets/2be97b16-fd1e-4fe8-9425-c0781ff343b1" />

### Dashboard — All Notes
<img width="1899" height="910" alt="dashboard" src="https://github.com/user-attachments/assets/d7c9452b-24d2-420b-9b6c-4d42ba7bd3eb" />
 
### Archive Page
<img width="1918" height="904" alt="archive" src="https://github.com/user-attachments/assets/3c258106-e2e0-46fe-8479-16b3abdba316" />

---

## 🔮 Future Improvements

- [ ] Node.js + Express backend
- [ ] MongoDB database integration
- [ ] JWT-based secure authentication
- [ ] Password hashing with bcrypt
- [ ] Note color themes
- [ ] Rich text editor


