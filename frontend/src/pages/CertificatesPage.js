import React, { useEffect, useState } from "react";
import axiosClient from "../api/axiosclient";
import "./CertificatesPage.css";

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchCertificates() {
      try {
        const data = await axiosClient.get("/my-certificates");
        setCertificates(data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load certificates");
      } finally {
        setLoading(false);
      }
    }

    fetchCertificates();
  }, []);

  if (loading) {
    return <div className="cert-container">Loading...</div>;
  }

  if (error) {
    return <div className="cert-container">{error}</div>;
  }

  return (
    <div className="cert-container">
      <h1 className="cert-title">Certificates</h1>
      <p className="cert-subtitle">
        Courses you have successfully completed.
      </p>

      {certificates.length === 0 && (
        <p className="no-results">You don’t have any certificates yet.</p>
      )}

      <div className="cert-grid">
        {certificates.map((cert) => (
          <div key={cert.id} className="cert-card">
            <h3>{cert.course_title}</h3>
            <p className="cert-date">
              Completed on {cert.completed_at}
            </p>

            {cert.pdf_url ? (
              <a
                href={cert.pdf_url}
                target="_blank"
                rel="noopener noreferrer"
                className="cert-btn"
              >
                Download PDF
              </a>
            ) : (
              <button className="cert-btn disabled" disabled>
                PDF Not Available
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
