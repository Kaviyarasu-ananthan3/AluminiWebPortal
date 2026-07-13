import { API_BASE_URL } from "../api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MentorshipRequests() {

  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

    fetch(`${API_BASE_URL}/mentorship/all`)
      .then((res) => res.json())
      .then((data) => setRequests(data))
      .catch((err) => console.log(err));

  }, []);

  return (
    <div style={{ textAlign: "center", padding: "30px" }}>

      <h1>Mentorship Requests</h1>

      <table
        border="1"
        style={{
          margin: "auto",
          width: "80%",
          borderCollapse: "collapse"
        }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Student Name</th>
            <th>Mentor Name</th>
            <th>Message</th>
          </tr>
        </thead>

        <tbody>

          {requests.map((req) => (
            <tr key={req.id}>
              <td>{req.id}</td>
              <td>{req.studentName}</td>
              <td>{req.mentorName}</td>
              <td>{req.message}</td>
            </tr>
          ))}

        </tbody>
      </table>

      <br />

      <button
        onClick={() => navigate("/dashboard")}
        style={{
          padding: "10px 20px",
          backgroundColor: "#003366",
          color: "white",
          border: "none",
          borderRadius: "5px"
        }}
      >
        Back
      </button>

    </div>
  );
}

export default MentorshipRequests;