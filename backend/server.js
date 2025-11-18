import express from "express";
import fs from "fs";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

const DATA_FILE = path.join(__dirname, "data", "form-submissions.json");

let candidates = [];

function loadData() {
  try {
    const raw = fs.readFileSync(DATA_FILE, "utf8");
    const json = JSON.parse(raw);
    candidates = Array.isArray(json) ? json : json.data || [];
    console.log(`Loaded ${candidates.length} candidates`);
  } catch {
    console.error("Place form-submissions.json in backend/data/");
    candidates = [];
  }
}
loadData();

function normalize(c, id) {
  const get = (...keys) => {
    for (const k of keys) {
      if (c[k] !== undefined && c[k] !== null) return c[k];
      const found = Object.keys(c).find(
        (key) => key.toLowerCase() === k.toLowerCase()
      );
      if (found) return c[found];
    }
    return "";
  };

  const name = get("name", "fullName", "candidate", "applicant", "Name") || `Candidate #${id}`;
  const skillsRaw = get("skills", "techSkills", "stack", "skillset");
  const skills = Array.isArray(skillsRaw)
    ? skillsRaw
    : String(skillsRaw || "")
        .split(/[ ,/|;]+/)
        .map((s) => s.trim())
        .filter(Boolean);

  return {
    id,
    name,
    email: get("email", "mail"),
    role: get("role", "position", "appliedRole"),
    location: get("location", "city"),
    experience: Number(get("experience", "yearsExperience")) || 0,
    education: get("education", "degree"),
    gender: get("gender"),
    skills,
  };
}

function score(c) {
  // Safely convert education to a string
  const eduValue = Array.isArray(c.education)
    ? c.education.join(" ")
    : typeof c.education === "object" && c.education !== null
    ? JSON.stringify(c.education)
    : String(c.education || "");

  const edu = eduValue.toLowerCase();

  let eduScore = 1;
  if (edu.includes("phd")) eduScore = 4;
  else if (edu.includes("master")) eduScore = 3;
  else if (edu.includes("bachelor") || edu.includes("b.tech") || edu.includes("btech")) eduScore = 2;

  const skillScore = Array.isArray(c.skills) ? c.skills.length : 0;
  const expScore = Number(c.experience) || 0;

  const diversity = ["female", "woman", "non-binary"].includes(
    (c.gender || "").toLowerCase()
  )
    ? 1
    : 0.5;

  return (skillScore * 3 + expScore * 2 + eduScore * 1.5 + diversity).toFixed(2);
}

app.get("/api/candidates", (req, res) => {
  const list = candidates.map((c, i) => {
    const n = normalize(c, i);
    return { ...n, score: score(n) };
  });
  res.json(list.sort((a, b) => b.score - a.score));
});

app.get("/api/top", (req, res) => {
  const list = candidates.map((c, i) => {
    const n = normalize(c, i);
    return { ...n, score: score(n) };
  });
  list.sort((a, b) => b.score - a.score);
  res.json(list.slice(0, 5));
});

app.listen(PORT, () =>
  console.log( `Backend running on http://localhost:${PORT}`)
);