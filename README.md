# 🎨 DevTinder — Frontend

> React.js frontend for DevTinder, a developer networking platform where developers can discover, connect, and match with each other — like Tinder, but for developers.

---

## 🚀 Live Demo

> Backend API: [devTinder (Backend)](https://github.com/SauravPawar21/devTinder)

---

## 📌 Features

- 🔐 **Login / Signup** — Secure authentication with JWT stored in HTTP-only cookies
- 🃏 **Developer Feed** — Swipe-style card UI to discover other developers with Interested / Ignore actions
- 👤 **Profile Page** — View and edit your own developer profile (name, bio, skills, photo, age)
- 🤝 **Connections** — View all your accepted developer connections
- 📬 **Requests** — View and respond to pending connection requests
- 🌐 **Protected Routes** — Unauthenticated users redirected to login automatically
- 🗂️ **Global State Management** — Redux Toolkit with 4 dedicated slices (user, feed, connections, requests)
- 📱 **Responsive UI** — Built with Tailwind CSS + DaisyUI for a clean, modern look

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React.js (v18) |
| Build Tool | Vite |
| State Management | Redux Toolkit |
| Routing | React Router DOM v6 |
| Styling | Tailwind CSS + DaisyUI |
| HTTP Client | Axios |
| Backend API | Express.js REST API |

---

## 📁 Project Structure

```
devTinder-web/
├── src/
│   ├── components/
│   │   ├── NavBar.jsx        # Top navigation bar
│   │   ├── Body.jsx          # Layout wrapper + auth check
│   │   ├── Feed.jsx          # Developer discovery feed
│   │   ├── UserCard.jsx      # Individual developer card
│   │   ├── Login.jsx         # Login / Signup form
│   │   ├── Profile.jsx       # View own profile
│   │   ├── EditProfile.jsx   # Edit profile form
│   │   ├── Connections.jsx   # Accepted connections list
│   │   ├── Requests.jsx      # Pending requests list
│   │   └── Footer.jsx        # Footer component
│   ├── utils/
│   │   ├── appStore.js       # Redux store configuration
│   │   ├── userSlice.js      # Auth user state slice
│   │   ├── feedSlice.js      # Feed state slice
│   │   ├── connectionSlice.js # Connections state slice
│   │   ├── requestSlice.js   # Requests state slice
│   │   └── constant.js       # BASE_URL and constants
│   ├── App.jsx               # Root component + routes
│   ├── main.jsx              # React entry point
│   └── index.css             # Global styles
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## 🗺️ Pages & Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `Feed` | Developer discovery feed (protected) |
| `/login` | `Login` | Login / Signup page |
| `/profile` | `Profile` | View & edit your profile (protected) |
| `/connections` | `Connections` | Your accepted connections (protected) |
| `/requests` | `Requests` | Pending connection requests (protected) |

---

## 🗃️ Redux Store Structure

```
appStore
├── user        → logged-in user data
├── feed        → list of developers to swipe on
├── connection  → accepted connections list
└── requests    → pending received requests
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js v18+
- devTinder backend running on `http://localhost:3000`

### Installation

```bash
# Clone the repo
git clone https://github.com/SauravPawar21/devTinder-web.git
cd devTinder-web

# Install dependencies
npm install

# Start the dev server
npm run dev
```

> App runs on **http://localhost:5173**

### Connect to Backend

Make sure the backend server is running first:

```bash
# In the devTinder (backend) folder
node src/app.js
```

The frontend is pre-configured to call `http://localhost:3000` — defined in `src/utils/constant.js`.

---

## 🔄 How It Works

1. User signs up or logs in → JWT token stored in HTTP-only cookie
2. `Body.jsx` checks auth on every route load → redirects to `/login` if not authenticated
3. Feed page fetches paginated developers from `/feed` API, excluding already-swiped users
4. Swiping Interested / Ignore sends a POST to `/request/send/:status/:userId`
5. Redux slices update instantly so the UI stays in sync without extra API calls
6. Connections and Requests pages pull fresh data from their respective endpoints

---

## 📸 Screenshots

| Feed | Profile | Connections |
|------|---------|-------------|
| Developer cards with swipe actions | Edit your dev profile | View all your matches |

> *(Add your own screenshots here)*

---

## 🙋‍♂️ Author

**Saurav Pawar**
- LinkedIn: [linkedin.com/in/sauravp21](https://linkedin.com/in/sauravp21)
- GitHub: [github.com/SauravPawar21](https://github.com/SauravPawar21)
- Email: pawarsaurav11@gmail.com