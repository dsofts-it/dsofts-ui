# DSofts Official Website (Frontend)

Modern, animated official website for DSofts IT Services built with React, Vite, and Tailwind CSS.

## 🚀 Tech Stack

- **Framework:** React + Vite
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **Routing:** React Router DOM
- **Icons:** Lucide React
- **API:** Axios

## 🛠️ Setup & Run

1.  **Install Dependencies**

    ```bash
    cd frontend
    npm install
    ```

2.  **Run Development Server**
    ```bash
    npm run dev
    ```
    The app will be available at `http://localhost:5173`.

## 📁 Project Structure

- `src/api`: API client configuration
- `src/components`: Reusable UI components (Navbar, Footer, Hero, etc.)
- `src/context`: Global state (AuthContext)
- `src/pages`: Page components (Home, Services, Portfolio, etc.)
- `src/index.css`: Global styles and Tailwind configuration

## 🎨 Features

- **Modern UI/UX:** Glassmorphism, gradients, and smooth transitions.
- **Responsive Design:** Fully optimized for mobile, tablet, and desktop.
- **Authentication:** Integrated with backend for Login/Signup.
- **Dynamic Content:** Fetches featured projects from the live API.
- **Animations:** Scroll reveals, hover effects, and page transitions.

## 🔗 Backend Integration

The frontend is configured to connect to the live backend at:
`https://dsofts-server-bj3s.onrender.com/api`

To change this, update `src/api/axios.js`.
