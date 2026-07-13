import { API_BASE_URL } from "../api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Mentorship() {

  const navigate = useNavigate();

  const [mentors, setMentors] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {

    fetch(`${API_BASE_URL}/users/alumni`)
      .then((res) => res.json())
      .then((data) => setMentors(data))
      .catch((err) => console.log(err));

  }, []);

  const handleRequestMentor = (mentor) => {

    const requestData = {

      studentName: localStorage.getItem("name"),
      mentorName: mentor,
      message: "I need mentorship"

    };

    fetch(`${API_BASE_URL}/mentorship/request`, {

      method: "POST",

      headers: {

        "Content-Type": "application/json"

      },

      body: JSON.stringify(requestData)

    })

      .then((res) => res.text())

      .then((data) => {

        alert(data);

      })

      .catch((err) => {

        console.log(err);

        alert("Server Error");

      });

  };

  return (

    <div style={{ textAlign: "center", padding: "30px" }}>

      <h1>Mentorship Program</h1>

      <input
        type="text"
        placeholder="Search Mentor"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "10px",
          width: "300px",
          marginBottom: "20px"
        }}
      />

      <table
        border="1"
        style={{
          margin: "auto",
          width: "90%",
          borderCollapse: "collapse"
        }}
      >

        <thead>

          <tr>

            <th>ID</th>
            <th>Mentor Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>

          </tr>

        </thead>

        <tbody>

          {mentors
            .filter((mentor) =>
              mentor.name.toLowerCase().includes(search.toLowerCase())
            )

            .map((mentor) => (

              <tr key={mentor.id}>

                <td>{mentor.id}</td>
                <td>{mentor.name}</td>
                <td>{mentor.email}</td>
                <td>{mentor.role}</td>

                <td>

                  <button

                    onClick={() => handleRequestMentor(mentor.name)}

                    style={{

                      backgroundColor: "green",
                      color: "white",
                      border: "none",
                      padding: "8px 15px",
                      borderRadius: "5px",
                      cursor: "pointer"

                    }}

                  >

                    Request

                  </button>

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

        Back to Dashboard

      </button>

    </div>

  );

}

export default Mentorship;