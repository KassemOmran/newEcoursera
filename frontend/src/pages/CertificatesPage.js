import React from "react";
import "./CertificatesPage.css";

export default function CertificatesPage() {
  const certificates = [
    {
      id: 1,
      title: "React for Beginners",
      date: "2025-03-01",
    },
    {
      id: 2,
      title: "Laravel Bootcamp",
      date: "2025-04-15",
    },
  ];

  return (
    <div className="cert-container">
      <h1 className="cert-title">Certificates</h1>
      <p className="cert-subtitle">
        Courses you have successfully completed.
      </p>

      <div className="cert-grid">
        {certificates.map((cert) => (
          <div key={cert.id} className="cert-card">
            <h3>{cert.title}</h3>
            <p className="cert-date">Completed on {cert.date}</p>
            <button className="cert-btn">Download PDF</button>
          </div>
        ))}
      </div>
    </div>
  );
}
