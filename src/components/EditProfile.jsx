import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, photoUrl, age, gender, about },
        { withCredentials: true },
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      setError(err?.response?.data);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        .ep-page {
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
          background: #08080c;
          padding: 3rem 2rem 6rem;
          display: flex;
          gap: 3rem;
          justify-content: center;
          align-items: flex-start;
          flex-wrap: wrap;
          position: relative;
        }

        .ep-page::before {
          content: '';
          position: absolute;
          top: 0; left: 50%; transform: translateX(-50%);
          width: 700px; height: 300px;
          background: radial-gradient(ellipse, rgba(249,115,22,0.07) 0%, transparent 70%);
          pointer-events: none;
        }

        .ep-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 24px;
          width: 400px;
          padding: 2rem;
          box-shadow: 0 30px 60px rgba(0,0,0,0.4);
        }

        .ep-title {
          font-family: 'Syne', sans-serif;
          font-size: 1.4rem;
          font-weight: 800;
          color: #fff;
          margin-bottom: 1.75rem;
          letter-spacing: -0.4px;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .ep-title::after {
          content: '';
          flex: 1;
          height: 1px;
          background: rgba(255,255,255,0.07);
          margin-left: 0.5rem;
        }

        .ep-field {
          margin-bottom: 1.1rem;
        }

        .ep-label {
          display: block;
          font-size: 0.78rem;
          font-weight: 500;
          color: rgba(255,255,255,0.4);
          margin-bottom: 0.4rem;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .ep-input {
          width: 100%;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px;
          padding: 0.65rem 1rem;
          color: #fff;
          font-size: 0.9rem;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          transition: border-color 0.2s, background 0.2s;
          box-sizing: border-box;
        }

        .ep-input:focus {
          border-color: rgba(249,115,22,0.45);
          background: rgba(249,115,22,0.03);
        }

        .ep-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
        }

        .ep-error {
          font-size: 0.82rem;
          color: #f87171;
          background: rgba(248,113,113,0.08);
          border: 1px solid rgba(248,113,113,0.15);
          border-radius: 8px;
          padding: 0.5rem 0.8rem;
          margin-bottom: 1rem;
        }

        .ep-save-btn {
          width: 100%;
          padding: 0.8rem;
          background: linear-gradient(135deg, #f97316, #ec4899);
          border: none;
          border-radius: 12px;
          color: #fff;
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 0.95rem;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.15s;
          margin-top: 0.5rem;
          letter-spacing: 0.02em;
        }

        .ep-save-btn:hover {
          opacity: 0.9;
          transform: translateY(-1px);
        }

        .ep-toast {
          position: fixed;
          top: 80px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(34,197,94,0.15);
          border: 1px solid rgba(34,197,94,0.3);
          color: #4ade80;
          border-radius: 12px;
          padding: 0.75rem 1.5rem;
          font-size: 0.875rem;
          font-weight: 500;
          z-index: 999;
          backdrop-filter: blur(12px);
          animation: slideDown 0.3s ease;
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translate(-50%, -12px); }
          to   { opacity: 1; transform: translate(-50%, 0); }
        }
      `}</style>

      <div className="ep-page">
        <div className="ep-card">
          <h2 className="ep-title">Edit Profile</h2>

          <div className="ep-row">
            <div className="ep-field">
              <label className="ep-label">First Name</label>
              <input
                type="text"
                className="ep-input"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="ep-field">
              <label className="ep-label">Last Name</label>
              <input
                type="text"
                className="ep-input"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>

          <div className="ep-field">
            <label className="ep-label">Photo URL</label>
            <input
              type="text"
              className="ep-input"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
            />
          </div>

          <div className="ep-row">
            <div className="ep-field">
              <label className="ep-label">Age</label>
              <input
                type="text"
                className="ep-input"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div className="ep-field">
              <label className="ep-label">Gender</label>
              <input
                type="text"
                className="ep-input"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              />
            </div>
          </div>

          <div className="ep-field">
            <label className="ep-label">About</label>
            <input
              type="text"
              className="ep-input"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
          </div>

          {error && <div className="ep-error">{error}</div>}

          <button className="ep-save-btn" onClick={saveProfile}>
            Save Profile
          </button>
        </div>

        <UserCard
          user={{ firstName, lastName, photoUrl, age, gender, about }}
        />
      </div>

      {showToast && (
        <div className="ep-toast">✓ Profile saved successfully</div>
      )}
    </>
  );
};

export default EditProfile;
