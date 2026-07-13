import { API_BASE_URL } from "../api";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function AlumniList() {

  const navigate = useNavigate();

  const [alumni, setAlumni] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {

    fetch(`${API_BASE_URL}/users/alumni`)
      .then((res) => res.json())
      .then((data) => setAlumni(data))
      .catch((err) => console.log(err));

  }, []);

  return (
    <div style={{ textAlign: "center", padding: "30px" }}>

      <h1>Alumni Directory</h1>

      <input
        type="text"
        placeholder="Search Alumni"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "10px",
          width: "300px",
          marginBottom: "20px",
        }}
      />

      <table
        border="1"
        style={{
          margin: "auto",
          width: "90%",
          borderCollapse: "collapse",
        }}
      >

        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>

        <tbody>

          {alumni
            .filter((user) =>
              user.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((user) => (

              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
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
          cursor: "pointer",
        }}
      >
        Back to Dashboard
      </button>

    </div>
  );
}

export default AlumniList;