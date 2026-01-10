import React from "react";
import "./foot.css";

export default function Foot() {
  return (
    <footer className="footer-wrapper">
      <div className="footer-inner">
        <div className="footer-left">
          <span className="footer-logo">eCourse</span>
          <span className="footer-copy">
            © {new Date().getFullYear()} eCourse. All rights reserved.
          </span>
        </div>

        <div className="footer-links">
          <a href="#!" className="footer-link">
            Terms
          </a>
          <a href="#!" className="footer-link">
            Privacy
          </a>
          <a href="#!" className="footer-link">
            Support
          </a>
        </div>
      </div>
    </footer>
  );
}
