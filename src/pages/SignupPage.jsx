import React, { useState } from "react";
import { auth } from "../firebaseConfig"; // Adjust the path as necessary
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("User signed up:", username);
      history("/login"); // Redirect to login after signup
    } catch (error) {
      console.error("Signup error:", error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl text-center text-white mb-6">Sign Up</h2>
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label className="block text-sm text-slate-300 mb-1" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full p-2 rounded bg-gray-700 text-white"
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm text-slate-300 mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 rounded bg-gray-700 text-white"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm text-slate-300 mb-1" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 rounded bg-gray-700 text-white"
              placeholder="Create a password"
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded transition duration-200"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center text-slate-400">
          Already have an account? <a href="/login" className="text-indigo-500">Login</a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
