import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connection);
  const dispatch = useDispatch();

  const fetchConnection = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      console.log("FULL RESPONSE:", res.data);
      dispatch(addConnection(res?.data?.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchConnection();
  }, []);

  if (!connections)
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
          Loading connections...
        </div>
      </div>
    );

  if (connections.length === 0)
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
          <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🔗</div>
          <p>No connections yet</p>
        </div>
      </div>
    );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        .conn-page {
          font-family: 'DM Sans', sans-serif;
          background: #08080c;
          min-height: 100vh;
          padding: 3rem 1.5rem 6rem;
          position: relative;
        }

        .conn-page::before {
          content: '';
          position: absolute;
          top: 0; left: 50%; transform: translateX(-50%);
          width: 600px; height: 250px;
          background: radial-gradient(ellipse, rgba(236,72,153,0.07) 0%, transparent 70%);
          pointer-events: none;
        }

        .conn-header {
          text-align: center;
          margin-bottom: 2.5rem;
        }

        .conn-title {
          font-family: 'Syne', sans-serif;
          font-size: 2rem;
          font-weight: 800;
          color: #fff;
          letter-spacing: -0.5px;
          margin-bottom: 0.4rem;
        }

        .conn-count {
          font-size: 0.85rem;
          color: rgba(255,255,255,0.35);
        }

        .conn-count span {
          background: linear-gradient(135deg, #f97316, #ec4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: 600;
        }

        .conn-list {
          max-width: 620px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .conn-item {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          padding: 1rem 1.25rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          transition: border-color 0.2s, background 0.2s, transform 0.2s;
        }

        .conn-item:hover {
          background: rgba(255,255,255,0.05);
          border-color: rgba(255,255,255,0.12);
          transform: translateX(4px);
        }

        .conn-avatar {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid rgba(249,115,22,0.3);
          flex-shrink: 0;
        }

        .conn-info {
          flex: 1;
          min-width: 0;
        }

        .conn-name {
          font-family: 'Syne', sans-serif;
          font-weight: 600;
          font-size: 1rem;
          color: #fff;
          margin-bottom: 0.2rem;
        }

        .conn-meta {
          font-size: 0.78rem;
          color: rgba(255,255,255,0.35);
          margin-bottom: 0.3rem;
        }

        .conn-about {
          font-size: 0.82rem;
          color: rgba(255,255,255,0.45);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .conn-view-btn {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 8px;
          color: rgba(255,255,255,0.6);
          font-family: 'DM Sans', sans-serif;
          font-size: 0.8rem;
          font-weight: 500;
          padding: 0.4rem 0.9rem;
          cursor: pointer;
          transition: all 0.2s;
          flex-shrink: 0;
        }

        .conn-view-btn:hover {
          background: rgba(249,115,22,0.1);
          border-color: rgba(249,115,22,0.3);
          color: #f97316;
        }
      `}</style>

      <div className="conn-page">
        <div className="conn-header">
          <h1 className="conn-title">Connections</h1>
          <p className="conn-count">
            <span>{connections.length}</span> developer
            {connections.length !== 1 ? "s" : ""} connected
          </p>
        </div>

        <div className="conn-list">
          {connections.map((conn, index) => {
            const { firstName, lastName, photoUrl, age, gender, about } = conn;
            return (
              <div key={index} className="conn-item">
                <img src={photoUrl} alt="photo" className="conn-avatar" />
                <div className="conn-info">
                  <div className="conn-name">{firstName + " " + lastName}</div>
                  {age && gender && (
                    <div className="conn-meta">
                      {age} · {gender}
                    </div>
                  )}
                  <div className="conn-about">{about}</div>
                </div>
                <button className="conn-view-btn">View</button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Connections;
