"use client";

import { clearAuth, setToken, setUser } from "@/redux/auth/auth.slice";
import { useAppDispatch } from "@/redux/store";
import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuthSession from "../hooks/useAuthSession";

const HomePage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const user = useAuthSession();

  const validatePassword = (password: string): boolean => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleLogin = async () => {
    if (!username || !password) {
      toast.error("Please enter both username and password");
      return;
    }

    if (!validatePassword(password)) {
      toast.error(
        "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
      );
      return;
    }

    try {
      const response = await axios.post("/api/login", { username, password });

      if (response.status === 200) {
        const { username, token } = response.data;
        dispatch(setUser({ username }));
        dispatch(setToken(token));
        localStorage.setItem("token", token);
        toast.success("Login successful");
        setUsername("");
        setPassword("");
      } else {
        toast.error("Login failed");
      }
    } catch (error) {
      toast.error("Error during login");
    }
  };

  const handleLogout = () => {
    dispatch(clearAuth());
    localStorage.removeItem("token");
    toast.success("Logout successful.");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div>
        <h2 className="text-3xl text-black font-bold my-5">
          Welcome {user?.username}
        </h2>
      </div>
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-md">
        <ToastContainer />
        {user ? (
          <div>
            <h2 className="text-xl font-bold">Welcome, {user.username}</h2>
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 mt-6 font-bold text-white bg-red-500 rounded-md"
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <div>
              <h2 className="text-2xl text-black font-bold text-center">
                Login
              </h2>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="w-full px-4 py-2 mt-4 border rounded-md text-black"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-2 mt-4 border rounded-md text-black"
              />
              <button
                onClick={handleLogin}
                className="w-full px-4 py-2 mt-6 font-bold text-white bg-blue-500 rounded-md"
              >
                Login
              </button>
            </div>
            <div className="mt-6 p-4 border rounded-md text-black bg-gray-50">
              <h3 className="text-lg font-semibold">
                The hook should be usable like this:{" "}
              </h3>
              <pre className="mt-2 p-2 text-gray-500 bg-gray-100 rounded-md">
                <code>
                  {`const { user } = useAuthSession();
if (user) {
  console.log('User:', user.username);
}`}
                </code>
              </pre>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
