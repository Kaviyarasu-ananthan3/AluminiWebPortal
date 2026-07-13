import { API_BASE_URL } from "../api";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function StudentResponses() {

  const navigate = useNavigate();

  const [responses, setResponses] = useState([]);

  useEffect(() => {

    const studentName = localStorage.getItem("name");

    fetch(`${API_BASE_URL}/mentorship/student/${studentName}`)
      .then((res) => res.json())
      .then((data) => {

        setResponses(data);

        localStorage.setItem("notificationCount", "0");

      })
      .catch((err) => console.log(err));

  }, []);

  return (

    <div style={{ textAlign: "center", marginTop: "30px" }}>

      <h2>My Mentorship Responses</h2>

      <table
        border="1"
        style={{
          margin: "auto",
          width: "98%",
          borderCollapse: "collapse"
        }}
      >

        <thead>

          <tr>
            <th>ID</th>
            <th>Mentor</th>
            <th>Message</th>
            <th>Status</th>
            <th>Meeting Date</th>
            <th>Meeting Time</th>
            <th>Google Meet</th>
            <th>Chat</th>
          </tr>

        </thead>

        <tbody>

          {responses.map((item) => (

            <tr key={item.id}>

              <td>{item.id}</td>

              <td>{item.mentorName}</td>

              <td>{item.message}</td>

              <td
                style={{
                  color:
                    item.status === "Accepted"
                      ? "green"
                      : item.status === "Rejected"
                      ? "red"
                      : "orange",
                  fontWeight: "bold"
                }}
              >
                {item.status}
              </td>

              <td>
                {item.meetingDate ? item.meetingDate : "-"}
              </td>

              <td>
                {item.meetingTime ? item.meetingTime : "-"}
              </td>

              <td>

                {item.meetingLink ? (

                  <a
                    href={item.meetingLink}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      color: "blue",
                      fontWeight: "bold"
                    }}
                  >
                    🔗 Join Meet
                  </a>

                ) : (

                  "-"

                )}

              </td>

              <td>

                {item.status === "Accepted" && (

                  <button
                    onClick={() => {

                      localStorage.setItem(
                        "chatStudent",
                        localStorage.getItem("name")
                      );

                      localStorage.setItem(
                        "chatMentor",
                        item.mentorName
                      );

                      navigate("/chat");

                    }}
                    style={{
                      backgroundColor: "green",
                      color: "white",
                      border: "none",
                      padding: "8px 15px",
                      borderRadius: "5px",
                      cursor: "pointer"
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

export default StudentResponses;