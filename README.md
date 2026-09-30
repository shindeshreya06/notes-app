# 📝 MyNotes App

A full-featured, responsive notes application built with React and a Node.js/Express backend. Users can create, edit, delete, archive, pin and search notes — all with per-user authentication, JWT-based sessions, and MongoDB persistence.

---

## 🚀 Live Demo

> https://notes-app-taupe-two.vercel.app

---

## ✨ Features

- 🔐 **Authentication** — Login and Signup with JWT-based sessions and per-user data isolation
- 📝 **Add Notes** — Create notes with title and content
- ✏️ **Edit Notes** — Update existing notes inline
- 🗑️ **Soft Delete** — Deleted notes move to Archive
- 🗂️ **Archive** — Restore or permanently delete archived notes
- 📌 **Pin Notes** — Pinned notes appear at the top
- 🔍 **Search** — Real-time search by note title
- 💾 **Persistence** — Notes stored in MongoDB, tied to each user's account
- 📱 **Responsive** — Works on all screen sizes

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | Frontend UI framework |
| Vite | Build tool and dev server |
| CSS3 | Styling and animations |
| Node.js + Express | Backend REST API |
| MongoDB + Mongoose | Database and data modeling |
| JWT | Authentication tokens |
| bcryptjs | Password hashing |

---

## 📁 Project Structure
```text
notes-app/
├── public/
├── src/
│ ├── components/
│ │ ├── Auth.jsx # Login and Signup
│ │ ├── Auth.css
│ │ ├── NoteForm.jsx # Add and Edit note form
│ │ ├── NoteForm.css
│ │ ├── NoteList.jsx # List of all notes
│ │ ├── NoteList.css
│ │ ├── NoteCard.jsx # Individual note card
│ │ └── NoteCard.css
│ ├── api.js # API request helper
│ ├── App.jsx # Main app component
│ ├── App.css
│ ├── main.jsx
│ └── index.css
├── server/
│ ├── models/
│ │ ├── User.js
│ │ └── Note.js
│ ├── routes/
│ │ ├── auth.js
│ │ └── notes.js
│ ├── middleware/
│ │ └── auth.js
│ └── server.js
├── index.html
├── package.json
└── vite.config.js
```


---

## ⚙️ Getting Started

### Prerequisites
- Node.js 18+
- npm
- A MongoDB Atlas account (or local MongoDB)

### Frontend

```bash
git clone https://github.com/shindeshreya06/notes-app.git
cd notes-app
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Backend

```bash
cd server
npm install
```

Create a `.env` file in `server/`:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret
PORT=5000


```bash
npm run dev
```

The API runs at `http://localhost:5000/api`.

---

## 🔐 Authentication

- Passwords are hashed with **bcrypt** before being stored — never saved in plain text
- Login issues a **JWT** valid for 7 days, sent with every request via the `Authorization: Bearer <token>` header
- Each note is tied to its owner's user ID in MongoDB, so users can only access their own notes

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

- [ ] Note color themes
- [ ] Rich text editor
- [ ] httpOnly cookie-based auth instead of localStorage token
- [ ] Tags/categories for notes