import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constant";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true },
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.error(err.message);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (err) {}
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "60vh",
        }}
      >
        <div
          style={{
            color: "rgba(255,255,255,0.4)",
            fontFamily: "DM Sans, sans-serif",
          }}
        >
          Loading requests...
        </div>
      </div>
    );

  if (requests.length === 0)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "60vh",
        }}
      >
        <div
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "16px",
            padding: "2rem 3rem",
            textAlign: "center",
            fontFamily: "DM Sans, sans-serif",
            color: "rgba(255,255,255,0.4)",
          }}
        >
          <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>📭</div>
          <p>No pending requests</p>
        </div>
      </div>
    );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        .req-page {
          font-family: 'DM Sans', sans-serif;
          background: #08080c;
          min-height: 100vh;
          padding: 3rem 1.5rem 6rem;
          position: relative;
        }

        .req-page::before {
          content: '';
          position: absolute;
          top: 0; left: 50%; transform: translateX(-50%);
          width: 600px; height: 250px;
          background: radial-gradient(ellipse, rgba(249,115,22,0.07) 0%, transparent 70%);
          pointer-events: none;
        }

        .req-header {
          text-align: center;
          margin-bottom: 2.5rem;
        }

        .req-title {
          font-family: 'Syne', sans-serif;
          font-size: 2rem;
          font-weight: 800;
          color: #fff;
          letter-spacing: -0.5px;
          margin-bottom: 0.4rem;
        }

        .req-count {
          font-size: 0.85rem;
          color: rgba(255,255,255,0.35);
        }

        .req-count span {
          background: linear-gradient(135deg, #f97316, #ec4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: 600;
        }

        .req-list {
          max-width: 640px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .req-item {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          padding: 1rem 1.25rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          transition: border-color 0.2s, background 0.2s;
        }

        .req-item:hover {
          background: rgba(255,255,255,0.05);
          border-color: rgba(255,255,255,0.12);
        }

        .req-avatar {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid rgba(236,72,153,0.3);
          flex-shrink: 0;
        }

        .req-info {
          flex: 1;
          min-width: 0;
        }

        .req-name {
          font-family: 'Syne', sans-serif;
          font-weight: 600;
          font-size: 1rem;
          color: #fff;
          margin-bottom: 0.2rem;
        }

        .req-meta {
          font-size: 0.78rem;
          color: rgba(255,255,255,0.35);
          margin-bottom: 0.3rem;
        }

        .req-about {
          font-size: 0.82rem;
          color: rgba(255,255,255,0.45);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .req-actions {
          display: flex;
          gap: 0.5rem;
          flex-shrink: 0;
        }

        .req-btn {
          padding: 0.45rem 1rem;
          border: none;
          border-radius: 8px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          font-size: 0.82rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .req-btn-reject {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.09);
          color: rgba(255,255,255,0.55);
        }

        .req-btn-reject:hover {
          background: rgba(239,68,68,0.08);
          border-color: rgba(239,68,68,0.2);
          color: #ef4444;
        }

        .req-btn-accept {
          background: linear-gradient(135deg, #f97316, #ec4899);
          color: #fff;
        }

        .req-btn-accept:hover {
          opacity: 0.88;
          transform: translateY(-1px);
        }
      `}</style>

      <div className="req-page">
        <div className="req-header">
          <h1 className="req-title">Connection Requests</h1>
          <p className="req-count">
            <span>{requests.length}</span> pending request
            {requests.length !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="req-list">
          {requests.map((conn, index) => {
            const { firstName, lastName, photoUrl, age, gender, about } =
              conn.fromUserId;
            return (
              <div key={index} className="req-item">
                <img src={photoUrl} alt="photo" className="req-avatar" />
                <div className="req-info">
                  <div className="req-name">{firstName + " " + lastName}</div>
                  {age && gender && (
                    <div className="req-meta">
                      {age} · {gender}
                    </div>
                  )}
                  <div className="req-about">{about}</div>
                </div>
                <div className="req-actions">
                  <button
                    className="req-btn req-btn-reject"
                    onClick={() => reviewRequest("rejected", conn._id)}
                  >
                    Reject
                  </button>
                  <button
                    className="req-btn req-btn-accept"
                    onClick={() => reviewRequest("accepted", conn._id)}
                  >
                    Accept
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Requests;
