import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        { withCredentials: true },
      );
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signUp",
        { firstName, lastName, emailId, password },
        { withCredentials: true },
      );
      dispatch(addUser(res.data.data));
      return navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');

        .login-page {
          min-height: 80vh;
          background: #08080c;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'DM Sans', sans-serif;
          padding: 2rem;
          position: relative;
          overflow: hidden;
        }

        .login-page::before {
          content: '';
          position: absolute;
          top: -30%;
          left: 50%;
          transform: translateX(-50%);
          width: 600px;
          height: 600px;
          background: radial-gradient(ellipse, rgba(249,115,22,0.12) 0%, transparent 70%);
          pointer-events: none;
        }

        .login-page::after {
          content: '';
          position: absolute;
          bottom: -20%;
          right: -10%;
          width: 400px;
          height: 400px;
          background: radial-gradient(ellipse, rgba(236,72,153,0.08) 0%, transparent 70%);
          pointer-events: none;
        }

        .login-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 24px;
          padding: 2.5rem;
          width: 100%;
          max-width: 420px;
          position: relative;
          z-index: 1;
          box-shadow: 0 40px 80px rgba(0,0,0,0.5);
        }

        .login-header {
          margin-bottom: 2rem;
          text-align: center;
        }

        .login-logo {
          font-family: 'Syne', sans-serif;
          font-size: 1.5rem;
          font-weight: 800;
          color: #fff;
          margin-bottom: 0.5rem;
        }

        .login-logo span {
          background: linear-gradient(135deg, #f97316, #ec4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .login-subtitle {
          font-size: 0.85rem;
          color: rgba(255,255,255,0.35);
        }

        .login-divider {
          height: 1px;
          background: rgba(255,255,255,0.06);
          margin: 1.5rem 0;
        }

        .login-field {
          margin-bottom: 1.1rem;
        }

        .login-label {
          display: block;
          font-size: 0.8rem;
          font-weight: 500;
          color: rgba(255,255,255,0.5);
          margin-bottom: 0.4rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .login-input {
          width: 100%;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px;
          padding: 0.7rem 1rem;
          color: #fff;
          font-size: 0.925rem;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          transition: border-color 0.2s, background 0.2s;
          box-sizing: border-box;
        }

        .login-input:focus {
          border-color: rgba(249,115,22,0.5);
          background: rgba(249,115,22,0.04);
        }

        .login-input::placeholder {
          color: rgba(255,255,255,0.2);
        }

        .login-error {
          font-size: 0.82rem;
          color: #f87171;
          background: rgba(248,113,113,0.08);
          border: 1px solid rgba(248,113,113,0.15);
          border-radius: 8px;
          padding: 0.5rem 0.8rem;
          margin-bottom: 1rem;
        }

        .login-btn {
          width: 100%;
          padding: 0.75rem;
          background: linear-gradient(135deg, #f97316, #ec4899);
          border: none;
          border-radius: 12px;
          color: #fff;
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 0.95rem;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.15s;
          letter-spacing: 0.02em;
        }

        .login-btn:hover {
          opacity: 0.9;
          transform: translateY(-1px);
        }

        .login-btn:active {
          transform: translateY(0);
        }

        .login-toggle {
          text-align: center;
          margin-top: 1.25rem;
          font-size: 0.85rem;
          color: rgba(255,255,255,0.4);
          cursor: pointer;
        }

        .login-toggle span {
          color: #f97316;
          font-weight: 500;
          cursor: pointer;
        }

        .login-toggle span:hover {
          text-decoration: underline;
        }
      `}</style>

      <div className="login-page">
        <div className="login-card">
          <div className="login-header">
            <div className="login-logo">
              👨‍💻 Dev<span>Tinder</span>
            </div>
            <p className="login-subtitle">
              {isLoginForm
                ? "Welcome back, developer"
                : "Join the developer community"}
            </p>
          </div>

          <div className="login-divider" />

          {!isLoginForm && (
            <>
              <div className="login-field">
                <label className="login-label">First Name</label>
                <input
                  type="text"
                  className="login-input"
                  placeholder="John"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="login-field">
                <label className="login-label">Last Name</label>
                <input
                  type="text"
                  className="login-input"
                  placeholder="Doe"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </>
          )}

          <div className="login-field">
            <label className="login-label">Email</label>
            <input
              type="text"
              className="login-input"
              placeholder="you@example.com"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
            />
          </div>

          <div className="login-field">
            <label className="login-label">Password</label>
            <input
              type="password"
              className="login-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <div className="login-error">{error}</div>}

          <button
            className="login-btn"
            onClick={isLoginForm ? handleLogin : handleSignUp}
          >
            {isLoginForm ? "Sign In" : "Create Account"}
          </button>

          <p className="login-toggle" onClick={() => setIsLoginForm((v) => !v)}>
            {isLoginForm ? (
              <>
                New here? <span>Create an account →</span>
              </>
            ) : (
              <>
                Already have an account? <span>Sign in →</span>
              </>
            )}
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
