import axios from "axios";
import React, { act } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      ///
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        .nav-root {
          font-family: 'DM Sans', sans-serif;
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(8, 8, 12, 0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          padding: 0 2rem;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .nav-logo {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 1.35rem;
          color: #fff;
          text-decoration: none;
          letter-spacing: -0.5px;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .nav-logo span.accent {
          background: linear-gradient(135deg, #f97316, #ec4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .nav-right {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .nav-welcome {
          font-size: 0.85rem;
          color: rgba(255,255,255,0.45);
          font-weight: 400;
        }

        .nav-welcome strong {
          color: rgba(255,255,255,0.85);
          font-weight: 500;
        }

        .nav-avatar-wrap {
          position: relative;
        }

        .nav-avatar-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          overflow: hidden;
          border: 2px solid rgba(249,115,22,0.5);
          cursor: pointer;
          background: none;
          padding: 0;
          transition: border-color 0.2s;
        }

        .nav-avatar-btn:hover {
          border-color: #f97316;
        }

        .nav-avatar-btn img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .nav-dropdown {
          position: absolute;
          right: 0;
          top: calc(100% + 12px);
          width: 200px;
          background: #111118;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px;
          padding: 6px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.6);
          opacity: 0;
          pointer-events: none;
          transform: translateY(-8px);
          transition: opacity 0.2s, transform 0.2s;
        }

        .nav-avatar-wrap:focus-within .nav-dropdown,
        .nav-avatar-wrap:hover .nav-dropdown {
          opacity: 1;
          pointer-events: all;
          transform: translateY(0);
        }

        .nav-dropdown a, .nav-dropdown-item {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.55rem 0.85rem;
          border-radius: 8px;
          color: rgba(255,255,255,0.7);
          font-size: 0.875rem;
          text-decoration: none;
          cursor: pointer;
          transition: background 0.15s, color 0.15s;
          width: 100%;
          border: none;
          background: none;
          text-align: left;
          font-family: 'DM Sans', sans-serif;
        }

        .nav-dropdown a:hover, .nav-dropdown-item:hover {
          background: rgba(255,255,255,0.06);
          color: #fff;
        }

        .nav-dropdown-divider {
          height: 1px;
          background: rgba(255,255,255,0.06);
          margin: 4px 6px;
        }

        .nav-dropdown-item.logout {
          color: rgba(239,68,68,0.8);
        }
        .nav-dropdown-item.logout:hover {
          background: rgba(239,68,68,0.08);
          color: #ef4444;
        }

        .badge-new {
          font-size: 0.65rem;
          background: linear-gradient(135deg, #f97316, #ec4899);
          color: #fff;
          padding: 1px 6px;
          border-radius: 20px;
          margin-left: auto;
          font-weight: 600;
        }
      `}</style>

      <nav className="nav-root">
        <Link to="/" className="nav-logo">
          <span>👨‍💻</span>
          Dev<span className="accent">Tinder</span>
        </Link>

        {user && (
          <div className="nav-right">
            <span className="nav-welcome">
              Hey, <strong>{user.firstName}</strong>
            </span>

            <div className="nav-avatar-wrap" tabIndex={0}>
              <button className="nav-avatar-btn">
                <img alt="user photo" src={user.photoUrl} />
              </button>

              <div className="nav-dropdown">
                <Link to="/profile">
                  Profile <span className="badge-new">New</span>
                </Link>
                <Link to="/connections">Connections</Link>
                <Link to="/requests">Requests</Link>
                <div className="nav-dropdown-divider" />
                <button
                  className="nav-dropdown-item logout"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default NavBar;
