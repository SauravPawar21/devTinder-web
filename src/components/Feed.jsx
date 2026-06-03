import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constant";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
    } catch (err) {
      console.err(err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) return null;

  if (feed.length <= 0)
    return (
      <>
        <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400&display=swap');
        .feed-empty {
          font-family: 'DM Sans', sans-serif;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 70vh;
          gap: 1rem;
          background: #08080c;
        }
        .feed-empty-icon { font-size: 3rem; }
        .feed-empty-title {
          font-family: 'Syne', sans-serif;
          font-size: 1.4rem;
          font-weight: 700;
          color: #fff;
        }
        .feed-empty-sub { color: rgba(255,255,255,0.35); font-size: 0.9rem; }
      `}</style>
        <div className="feed-empty">
          <div className="feed-empty-icon">🎉</div>
          <div className="feed-empty-title">You've seen everyone!</div>
          <div className="feed-empty-sub">
            Check back later for new developers
          </div>
        </div>
      </>
    );

  return (
    feed && (
      <>
        <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400&display=swap');
        .feed-page {
          background: #08080c;
          min-height: 80vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 3rem 1rem 6rem;
          position: relative;
        }
        .feed-page::before {
          content: '';
          position: absolute;
          top: 10%; left: 50%; transform: translateX(-50%);
          width: 500px; height: 500px;
          background: radial-gradient(ellipse, rgba(236,72,153,0.07) 0%, transparent 70%);
          pointer-events: none;
        }
        .feed-hint {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.8rem;
          color: rgba(255,255,255,0.25);
          margin-top: 1.25rem;
          text-align: center;
          letter-spacing: 0.03em;
        }
      `}</style>
        <div className="feed-page">
          <UserCard user={feed[0]} />
          <p className="feed-hint">
            ← Pass or show interest to meet more developers →
          </p>
        </div>
      </>
    )
  );
};

export default Feed;
