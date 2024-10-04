import React, { useState } from "react";
import { auth, db } from "../firebaseConfig"; // Adjust the path as necessary
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const history = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in:", email);
      history("/"); // Redirect to dashboard after login
    } catch (error) {
      console.error("Login error:", error.message);
      // You could add a state to show error messages to the user
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black p-8">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl shadow-2xl max-w-md w-full transform hover:scale-105 transition-all duration-300">
        <h2 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-8">Welcome Back</h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative">
            <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 pl-10 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
              placeholder="Enter your email"
            />
          </div>
          <div className="relative">
            <FaLock className="absolute top-3 left-3 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 pl-10 pr-10 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute top-3 right-3 text-black focus:outline-none"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full p-3 rounded-lg text-white font-semibold transition duration-300 ${
              isLoading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            }`}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="mt-6 text-center text-gray-400">
          Don't have an account?{" "}
          <a href="/signup" className="text-purple-400 hover:text-purple-300 transition duration-300">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
