import { API_BASE_URL } from "../api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Notification() {

  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {

    const studentName = localStorage.getItem("name");

    fetch(`${API_BASE_URL}/mentorship/notifications/${studentName}`)
      .then((res) => res.json())
      .then((data) => setNotifications(data))
      .catch((err) => console.log(err));

  }, []);

  return (
    <div style={{ padding: "30px", textAlign: "center" }}>

      <h1>Notifications</h1>

      {notifications.length === 0 ? (
        <h3>No Notifications</h3>
      ) : (

        <table
          border="1"
          style={{
            width: "90%",
            margin: "auto",
            borderCollapse: "collapse"
          }}
        >
          <thead>
            <tr>
              <th>Mentor</th>
              <th>Message</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            {notifications.map((item) => (

              <tr key={item.id}>

                <td>{item.mentorName}</td>

                <td>{item.message}</td>

                <td
                  style={{
                    color:
                      item.status === "Accepted"
                        ? "green"
                        : "red",
                    fontWeight: "bold"
                  }}
                >
                  {item.status}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

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
        Back to Dashboard
      </button>

    </div>
  );
}

export default Notification;