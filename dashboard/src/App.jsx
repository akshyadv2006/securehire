import { useState } from "react";
import axios from "axios";

function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const response = await axios.post("http://localhost:8000/predict", {
        title,
        description,
      });

      setResult(response.data);
    } catch (error) {
      console.error(error);
      alert("Error connecting to API");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "700px", margin: "auto" }}>
      <h1>🔍 SecureHire Detector</h1>

      <input
        placeholder="Job Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
        }}
      />

      <textarea
        placeholder="Job Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{
          width: "100%",
          height: "120px",
          padding: "10px",
          marginBottom: "10px",
        }}
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          padding: "10px 20px",
          cursor: "pointer",
        }}
      >
        {loading ? "Checking..." : "Check Job"}
      </button>

      {result && (
        <div style={{ marginTop: "20px" }}>
          <h2>Result</h2>

          <p>
            <b>Verdict:</b>{" "}
            <span
              style={{
                color: result.verdict === "FAKE" ? "red" : "green",
                fontWeight: "bold",
              }}
            >
              {result.verdict}
            </span>
          </p>

          <p>
            <b>Confidence:</b>{" "}
            {(result.confidence * 100).toFixed(2)}%
          </p>

          <h3>Reasons:</h3>
          {result.reasons.length > 0 ? (
            <ul>
              {result.reasons.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          ) : (
            <p>No suspicious indicators detected</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;