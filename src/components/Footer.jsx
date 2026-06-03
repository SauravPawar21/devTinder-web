import React from "react";

const Footer = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400&display=swap');

        .footer-root {
          font-family: 'DM Sans', sans-serif;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 50;
          background: rgba(8, 8, 12, 0.9);
          backdrop-filter: blur(16px);
          border-top: 1px solid rgba(255,255,255,0.05);
          padding: 0.75rem 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .footer-brand {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .footer-icon {
          width: 28px;
          height: 28px;
          background: linear-gradient(135deg, #f97316, #ec4899);
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
        }

        .footer-copy {
          font-size: 0.78rem;
          color: rgba(255,255,255,0.3);
        }

        .footer-socials {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .footer-social-link {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255,255,255,0.4);
          transition: all 0.2s;
          cursor: pointer;
        }

        .footer-social-link:hover {
          background: rgba(249,115,22,0.1);
          border-color: rgba(249,115,22,0.3);
          color: #f97316;
        }
      `}</style>

      <footer className="footer-root">
        <div className="footer-brand">
          <div className="footer-icon">👨‍💻</div>
          <span className="footer-copy">
            © {new Date().getFullYear()} DevTinder — All rights reserved
          </span>
        </div>

        <nav className="footer-socials">
          <a className="footer-social-link">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
            </svg>
          </a>
          <a className="footer-social-link">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
            </svg>
          </a>
          <a className="footer-social-link">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
            </svg>
          </a>
        </nav>
      </footer>
    </>
  );
};

export default Footer;
