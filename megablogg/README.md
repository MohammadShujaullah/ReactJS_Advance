# 🚀 MegaBlog - Advanced React Blog Application

[![React](https://img.shields.io/badge/React-19.1.0-blue.svg)](https://reactjs.org/)
[![Appwrite](https://img.shields.io/badge/Appwrite-18.1.1-orange.svg)](https://appwrite.io/)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.8.2-purple.svg)](https://redux-toolkit.js.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-teal.svg)](https://tailwindcss.com/)

> **⚠️ Status: Work in Progress** - This application is currently under active development with new features being added regularly.

## 📖 About

MegaBlog is a modern, full-featured blog application built with React and powered by Appwrite as the backend service. It features a beautiful, responsive design with advanced animations and a rich text editor for creating and managing blog posts.

## ✨ Features

### 🎨 **User Interface & Experience**
- **Modern Design**: Beautiful gradient-based UI with glass morphism effects
- **Responsive Layout**: Fully responsive design that works on all devices
- **Advanced Animations**: Smooth hover effects, scale animations, and transitions
- **Interactive Navigation**: Enhanced navigation buttons with gradient hover effects
- **Professional Logo**: Custom SVG logo with gradient styling
- **Loading States**: Beautiful loading animations and error handling

### 📝 **Content Management**
- **Rich Text Editor**: TinyMCE integration for advanced content creation
- **Image Upload**: Featured image upload with preview functionality
- **Post Management**: Create, read, update, and delete blog posts
- **Slug Generation**: Automatic URL-friendly slug generation from titles
- **Content Preview**: Enhanced post preview with stunning visual effects

### 🔐 **Authentication & Security**
- **User Authentication**: Complete login/signup system with Appwrite
- **Protected Routes**: Role-based access control for authenticated users
- **Session Management**: Persistent login sessions with Redux state management
- **Form Validation**: Comprehensive form validation with react-hook-form

### 🎯 **Post Features**
- **Post Cards**: Beautiful post cards with hover effects and image previews
- **Post Details**: Enhanced post detail pages with gradient backgrounds
- **Status Management**: Active/inactive post status system
- **Author Control**: Edit and delete permissions for post authors
- **Image Handling**: Multiple image URL generation methods with fallbacks

### 🚀 **Performance & Architecture**
- **State Management**: Redux Toolkit for efficient state management
- **Component Architecture**: Modular, reusable component structure
- **Code Splitting**: Optimized bundle with React Router DOM
- **Error Boundaries**: Graceful error handling throughout the application
- **SEO Friendly**: Semantic HTML structure and meta tag support

## 🛠️ Tech Stack

### **Frontend Technologies**
| Technology | Version | Purpose |
|------------|---------|----------|
| **React** | 19.1.0 | Core frontend framework |
| **React DOM** | 19.1.0 | DOM rendering |
| **React Router DOM** | 7.6.3 | Client-side routing |
| **Redux Toolkit** | 2.8.2 | State management |
| **React Redux** | 9.2.0 | React-Redux bindings |
| **TailwindCSS** | 3.4.17 | Utility-first CSS framework |
| **PostCSS** | 8.5.6 | CSS post-processing |
| **Autoprefixer** | 10.4.21 | CSS vendor prefixing |

### **Backend & Services**
| Service | Version | Purpose |
|---------|---------|----------|
| **Appwrite** | 18.1.1 | Backend-as-a-Service (BaaS) |
| - Authentication | ✅ | User management & auth |
| - Database | ✅ | Document storage |
| - Storage | ✅ | File & image storage |
| - Security | ✅ | Role-based permissions |

### **Form & Content Management**
| Package | Version | Purpose |
|---------|---------|----------|
| **React Hook Form** | 7.59.0 | Form handling & validation |
| **TinyMCE React** | 6.2.1 | Rich text editor |
| **HTML React Parser** | 5.2.5 | HTML string parsing |

### **Testing & Development**
| Package | Version | Purpose |
|---------|---------|----------|
| **React Scripts** | 5.0.1 | Build tools & dev server |
| **Testing Library (React)** | 16.3.0 | Component testing |
| **Testing Library (Jest DOM)** | 6.6.3 | DOM testing utilities |
| **Testing Library (User Event)** | 13.5.0 | User interaction testing |
| **Web Vitals** | 2.1.4 | Performance monitoring |

## 📦 Complete Dependencies

 
### **Development Dependencies**
```json
{
  "autoprefixer": "^10.4.21",
  "postcss": "^8.5.6",
  "tailwindcss": "^3.4.17"
}
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Appwrite account and project setup

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd megablogg
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory and add your Appwrite configuration:
   ```env
   REACT_APP_APPWRITE_URL=your-appwrite-endpoint
   REACT_APP_APPWRITE_PROJECT_ID=your-project-id
   REACT_APP_APPWRITE_DATABASE_ID=your-database-id
   REACT_APP_APPWRITE_COLLECTION_ID=your-collection-id
   REACT_APP_APPWRITE_BUCKET_ID=your-bucket-id
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 📁 Project Structure

```
megablogg/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── Header/
│   │   ├── Footer/
│   │   ├── Post-form/
│   │   ├── container/
│   │   ├── PostCard.jsx
│   │   ├── Logo.jsx
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── Login.jsx
│   │   ├── SignUp.jsx
│   │   ├── RTE.jsx
│   │   └── indexx.js
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── AllPosts.jsx
│   │   ├── AddPost.jsx
│   │   ├── EditPost.jsx
│   │   ├── Post.jsx
│   │   ├── Login.jsx
│   │   └── SignUp.jsx
│   ├── appwrite/
│   │   ├── auth.js
│   │   └── config.js
│   ├── store/
│   │   ├── Store.js
│   │   └── authSlice.js
│   ├── App.js
│   └── index.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── README.md
```

## 🎯 Available Scripts

In the project directory, you can run:

### `npm start`
Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`
Launches the test runner in interactive watch mode.

### `npm run build`
Builds the app for production to the `build` folder with optimized performance.

### `npm run eject`
**Note: This is a one-way operation!** Ejects from Create React App for full configuration control.

## 🎯 Current Features in Development

- [ ] **User Profiles**: User profile management and customization
- [ ] **Comments System**: Comment functionality for blog posts
- [ ] **Search & Filter**: Advanced search and filtering capabilities
- [ ] **Categories & Tags**: Post categorization and tagging system
- [ ] **Social Sharing**: Social media integration for post sharing
- [ ] **Dark Mode**: Theme switching functionality
- [ ] **Email Notifications**: Email alerts for new posts and comments
- [ ] **Analytics Dashboard**: Admin dashboard with post analytics

## 🤝 Contributing

This project is currently in development. Contributions, issues, and feature requests are welcome!

## 📝 License

This project is licensed under the MIT License.

## 🔗 Links

- **Appwrite Documentation**: [https://appwrite.io/docs](https://appwrite.io/docs)
- **React Documentation**: [https://reactjs.org/docs](https://reactjs.org/docs)
- **TailwindCSS Documentation**: [https://tailwindcss.com/docs](https://tailwindcss.com/docs)
- **Redux Toolkit Documentation**: [https://redux-toolkit.js.org/](https://redux-toolkit.js.org/)

---

**Made with ❤️ using React and Appwrite**

*This project is actively maintained and continuously improved. Star ⭐ this repository if you find it helpful!*
