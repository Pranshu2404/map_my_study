import React, { useState } from "react";
import { auth, db } from "../firebaseConfig"; // Adjust the path as necessary
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, setDoc, doc, addDoc } from "firebase/firestore"; // Import Firestore functions
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const history = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Create the user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user; // Get the user object

      // Save user details in Firestore
      await setDoc(doc(db, "users", user.uid), { // Use setDoc to set user details
        uid: user.uid,
        username,
        email,
        createdAt: new Date(),
      });

      console.log("User signed up:", username);
      history("/login"); // Redirect to login after signup
    } catch (error) {
      console.error("Signup error:", error.message);
      // You could add a state to show error messages to the user
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black p-8">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl shadow-2xl max-w-md w-full transform hover:scale-105 transition-all duration-300">
        <h2 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-8">Join Us Today</h2>
        <form onSubmit={handleSignup} className="space-y-6">
          <div className="relative">
            <FaUser className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full p-3 pl-10 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
              placeholder="Enter your username"
            />
          </div>
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
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 pl-10 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
              placeholder="Create a password"
            />
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
            {isLoading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
        <p className="mt-6 text-center text-gray-400">
          Already have an account?{" "}
          <a href="/login" className="text-purple-400 hover:text-purple-300 transition duration-300">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
