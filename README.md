# Next.js Authentication System

## Overview

This project implements a simple authentication system using Next.js for both the front-end and back-end, and Redux for state management. It includes a custom `useAuthSession` hook for managing the user's session.

## Features

- **User Authentication**: Allows users to log in with a username and password.
- **State Management**: Uses Redux to manage authentication state.
- **API Endpoints**: Provides a `/api/login` endpoint for user authentication.
- **Session Management**: Custom `useAuthSession` hook to manage user sessions.
- **Form Validation**: Ensures the password meets specific criteria.
- **Toast Notifications**: Displays notifications for successful login, errors, and validation issues.


## Setup Instructions

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo

2. **Install dependencies**:
   ```bash
   npm install

3. **Create a .env.local file in the root directory and make the following env variables**:
   ```bash
   JWT_SECRET_KEY=your_secret_key

4. **Start the development server**:
   ```bash
   npm run dev

## Implementation Details
1. **User Authentication**
   - API Endpoint: Implemented in pages/api/login.ts.
   - Frontend Login Form: Located in app/page.tsx.
2. **State Management**
   - Auth Slice: Defined in redux/auth/authSlice.ts to manage authentication state.
   - Store Configuration: Configured in redux/store.ts.
3. **Session Management**
   - **useAuthSession Hook**: Custom hook implemented in hooks/useAuthSession.tsx to check and manage user sessions.
4. **Form Validation**
   - **Password Validation**: Ensures the password has at least one uppercase letter, one lowercase letter, one digit, one special character, and a minimum length of 8 characters.
5. **Toast Notifications**
   - **React Toastify**: Used for displaying notifications. Configured in app/page.tsx and app/layout.tsx.

