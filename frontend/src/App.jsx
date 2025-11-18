import React, { useEffect, useState } from "react";

export default function App() {
  const [candidates, setCandidates] = useState([]);
  const [top, setTop] = useState([]);

  async function loadCandidates() {
    const res = await fetch("http://localhost:4000/api/candidates");
    const data = await res.json();
    setCandidates(data);
  }

  async function loadTop() {
    const res = await fetch("http://localhost:4000/api/top");
    const data = await res.json();
    setTop(data);
  }

  useEffect(() => {
    loadCandidates();
  }, []);

  return (
    <div style={{ fontFamily: "Arial", background: "#0b1020", color: "#e5e7eb", minHeight: "100vh" }}>
      <header style={{ padding: "16px 20px", background: "#11172b", borderBottom: "1px solid #222" }}>
        <h2>HireSmart — Intelligent Hiring Dashboard</h2>
      </header>

      <div style={{ padding: "20px", maxWidth: "1100px", margin: "auto" }}>
        <button
          style={{
            background: "#2563eb",
            border: "none",
            color: "white",
            padding: "10px 15px",
            borderRadius: "8px",
            cursor: "pointer",
            marginBottom: "20px",
          }}
          onClick={loadTop}
        >
          Auto-Select Top 5
        </button>

        <h3>Top 5 Recommended Candidates</h3>
        {top.length > 0 ? (
          <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "30px" }}>
            <thead>
              <tr style={{ background: "#1a2238" }}>
                <th style={{ padding: "10px" }}>Name</th>
                <th style={{ padding: "10px" }}>Role</th>
                <th style={{ padding: "10px" }}>Experience</th>
                <th style={{ padding: "10px" }}>Score</th>
              </tr>
            </thead>
            <tbody>
              {top.map((c) => (
                <tr key={c.id} style={{ borderBottom: "1px solid #223" }}>
                  <td style={{ padding: "8px" }}>{c.name}</td>
                  <td style={{ padding: "8px" }}>{c.role}</td>
                  <td style={{ padding: "8px" }}>{c.experience}</td>
                  <td style={{ padding: "8px" }}>{c.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Click above to generate recommendations.</p>
        )}

        <h3>All Candidates ({candidates.length})</h3>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#1a2238" }}>
              <th style={{ padding: "10px" }}>Name</th>
              <th style={{ padding: "10px" }}>Role</th>
              <th style={{ padding: "10px" }}>Experience</th>
              <th style={{ padding: "10px" }}>Score</th>
              <th style={{ padding: "10px" }}>Skills</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((c) => (
              <tr key={c.id} style={{ borderBottom: "1px solid #223" }}>
                <td style={{ padding: "8px" }}>{c.name}</td>
                <td style={{ padding: "8px" }}>{c.role}</td>
                <td style={{ padding: "8px" }}>{c.experience}</td>
                <td style={{ padding: "8px" }}>{c.score}</td>
                <td style={{ padding: "8px" }}>
                  {(c.skills || []).slice(0, 5).map((s, i) => (
                    <span
                      key={i}
                      style={{
                        background: "#1e293b",
                        padding: "2px 6px",
                        borderRadius: "5px",
                        marginRight: "4px",
                        fontSize: "12px",
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}