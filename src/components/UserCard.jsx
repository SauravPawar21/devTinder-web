import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true },
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        .usercard {
          font-family: 'DM Sans', sans-serif;
          width: 360px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 30px 60px rgba(0,0,0,0.4);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .usercard:hover {
          transform: translateY(-4px);
          box-shadow: 0 40px 80px rgba(0,0,0,0.5);
        }

        .usercard-img-wrap {
          position: relative;
          height: 300px;
          overflow: hidden;
        }

        .usercard-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.4s ease;
        }

        .usercard:hover .usercard-img-wrap img {
          transform: scale(1.03);
        }

        .usercard-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(8,8,12,0.9) 0%, rgba(8,8,12,0.1) 55%, transparent 100%);
        }

        .usercard-img-badge {
          position: absolute;
          top: 14px;
          right: 14px;
          background: rgba(8,8,12,0.7);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 20px;
          padding: 4px 12px;
          font-size: 0.75rem;
          color: rgba(255,255,255,0.7);
          font-weight: 500;
        }

        .usercard-body {
          padding: 1.4rem 1.5rem 1.6rem;
        }

        .usercard-name {
          font-family: 'Syne', sans-serif;
          font-size: 1.4rem;
          font-weight: 700;
          color: #fff;
          margin: 0 0 0.3rem;
          letter-spacing: -0.3px;
        }

        .usercard-meta {
          font-size: 0.82rem;
          color: rgba(255,255,255,0.4);
          margin-bottom: 0.75rem;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .usercard-meta .dot {
          width: 3px;
          height: 3px;
          background: rgba(255,255,255,0.25);
          border-radius: 50%;
        }

        .usercard-about {
          font-size: 0.875rem;
          color: rgba(255,255,255,0.55);
          line-height: 1.6;
          margin-bottom: 1.4rem;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .usercard-actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
        }

        .usercard-btn {
          padding: 0.7rem;
          border: none;
          border-radius: 12px;
          font-family: 'Syne', sans-serif;
          font-weight: 600;
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
        }

        .usercard-btn-ignore {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.6);
        }

        .usercard-btn-ignore:hover {
          background: rgba(255,255,255,0.1);
          color: #fff;
        }

        .usercard-btn-interested {
          background: linear-gradient(135deg, #f97316, #ec4899);
          color: #fff;
        }

        .usercard-btn-interested:hover {
          opacity: 0.88;
          transform: translateY(-1px);
        }
      `}</style>

      <div className="usercard">
        <div className="usercard-img-wrap">
          <img src={photoUrl} alt="photo" />
          <div className="usercard-img-overlay" />
          {age && gender && (
            <div className="usercard-img-badge">
              {age} · {gender}
            </div>
          )}
        </div>

        <div className="usercard-body">
          <h2 className="usercard-name">{firstName + " " + lastName}</h2>

          {age && gender && (
            <div className="usercard-meta">
              <span>{age} yrs</span>
              <span className="dot" />
              <span>{gender}</span>
            </div>
          )}

          {about && <p className="usercard-about">{about}</p>}

          <div className="usercard-actions">
            <button
              className="usercard-btn usercard-btn-ignore"
              onClick={() => handleSendRequest("ignored", _id)}
            >
              ✕ Pass
            </button>
            <button
              className="usercard-btn usercard-btn-interested"
              onClick={() => handleSendRequest("interested", _id)}
            >
              ♥ Interested
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCard;
