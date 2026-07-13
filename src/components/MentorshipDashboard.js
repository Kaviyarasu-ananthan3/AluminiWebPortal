import { API_BASE_URL } from "../api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MentorshipDashboard() {

  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const mentorName = localStorage.getItem("name");

  const [requests, setRequests] = useState([]);

  const [selectedId, setSelectedId] = useState(null);
  const [meetingDate, setMeetingDate] = useState("");
  const [meetingTime, setMeetingTime] = useState("");
  const [meetingLink, setMeetingLink] = useState("");

  useEffect(() => {

    fetch(`${API_BASE_URL}/mentorship/mentor/${mentorName}`)
      .then((res) => res.json())
      .then((data) => setRequests(data))
      .catch((err) => console.log(err));

  }, [mentorName]);

  const loadRequests = () => {

    fetch(`${API_BASE_URL}/mentorship/mentor/${mentorName}`)
      .then((res) => res.json())
      .then((data) => setRequests(data));

  };

  const updateStatus = (id, status) => {

    fetch(`${API_BASE_URL}/mentorship/update/${id}/${status}`, {
      method: "PUT",
    })
      .then((res) => res.text())
      .then((data) => {
        alert(data);
        loadRequests();
      });

  };

  const saveMeeting = () => {

    fetch(`${API_BASE_URL}/mentorship/meeting/${selectedId}`, {

      method: "PUT",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        meetingDate,
        meetingTime,
        meetingLink,
      }),

    })
      .then((res) => res.text())
      .then((data) => {

        alert(data);

        setSelectedId(null);
        setMeetingDate("");
        setMeetingTime("");
        setMeetingLink("");

        loadRequests();

      });

  };

  if (role !== "alumni") {
    return (
      <h2 style={{ textAlign: "center" }}>
        Access Denied
      </h2>
    );
  }

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>

      <h1>My Mentorship Requests</h1>

      <table
        border="1"
        style={{
          width: "95%",
          margin: "auto",
          borderCollapse: "collapse"
        }}
      >

        <thead>
          <tr>
            <th>ID</th>
            <th>Student</th>
            <th>Mentor</th>
            <th>Message</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {requests.map((req) => (

            <tr key={req.id}>

              <td>{req.id}</td>
              <td>{req.studentName}</td>
              <td>{req.mentorName}</td>
              <td>{req.message}</td>
              <td>{req.status}</td>

              <td>

                {req.status === "Pending" && (
                  <>
                    <button
                      style={{
                        background: "green",
                        color: "white",
                        marginRight: "10px"
                      }}
                      onClick={() => {

                        updateStatus(req.id, "Accepted");
                        setSelectedId(req.id);

                      }}
                    >
                      Accept
                    </button>

                    <button
                      style={{
                        background: "red",
                        color: "white"
                      }}
                      onClick={() =>
                        updateStatus(req.id, "Rejected")
                      }
                    >
                      Reject
                    </button>
                  </>
                )}

                {req.status === "Accepted" && (
                  <button
                    style={{
                      background: "#003366",
                      color: "white",
                      padding: "8px 15px",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer"
                    }}
                    onClick={() => {

                      localStorage.setItem(
                        "chatStudent",
                        req.studentName
                      );

                      localStorage.setItem(
                        "chatMentor",
                        req.mentorName
                      );

                      navigate("/chat");

                    }}
                  >
                    💬 Open Chat
                  </button>
                )}

              </td>

            </tr>

          ))}

        </tbody>

      </table>

      {selectedId && (

        <div
          style={{
            marginTop: "30px",
            border: "1px solid gray",
            padding: "20px",
            borderRadius: "10px",
            width: "400px",
            marginLeft: "auto",
            marginRight: "auto"
          }}
        >

          <h2>Schedule Google Meet</h2>

          <input
            type="date"
            value={meetingDate}
            onChange={(e) => setMeetingDate(e.target.value)}
            style={{ width: "100%", padding: "10px" }}
          />

          <br /><br />

          <input
            type="time"
            value={meetingTime}
            onChange={(e) => setMeetingTime(e.target.value)}
            style={{ width: "100%", padding: "10px" }}
          />

          <br /><br />

          <input
            type="text"
            placeholder="Google Meet Link"
            value={meetingLink}
            onChange={(e) => setMeetingLink(e.target.value)}
            style={{ width: "100%", padding: "10px" }}
          />

          <br /><br />

          <button
            onClick={saveMeeting}
            style={{
              background: "green",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Save Meeting
          </button>

        </div>

      )}

      <br />

      <button
        onClick={() => navigate("/dashboard")}
        style={{
          padding: "10px 20px",
          backgroundColor: "#003366",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        Back To Dashboard
      </button>

    </div>
  );
}

export default MentorshipDashboard;