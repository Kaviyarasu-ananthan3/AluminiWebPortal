import { API_BASE_URL } from "../api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function AdminAlumniProfile() {

  const { id } = useParams();

  const [user, setUser] = useState(null);

  useEffect(() => {

    fetch(`${API_BASE_URL}/auth/profile/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        console.log(error);
      });

  }, [id]);

  if (!user) {
    return <h2 style={{ padding: "30px" }}>Loading...</h2>;
  }

  return (
    <div style={styles.container}>

      <div style={styles.card}>

        <div style={styles.header}>

          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Profile"
            style={styles.image}
          />

          <div>
            <h2>{user.name}</h2>
            <p>{user.designation}</p>
            <p>{user.company}</p>
          </div>

        </div>

        <hr />

        <p><b>Email :</b> {user.email}</p>

        <p><b>Phone :</b> {user.phone}</p>

        <p><b>Department :</b> {user.department}</p>

        <p><b>Batch :</b> {user.batch}</p>

        <p><b>Location :</b> {user.location}</p>

        <p><b>Experience :</b> {user.experience}</p>

        <p><b>Salary :</b> {user.salary}</p>

        <p><b>Skills :</b> {user.skills}</p>

        <p>
          <b>LinkedIn :</b>{" "}
          <a
            href={user.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            Open Profile
          </a>
        </p>

      </div>

    </div>
  );
}

const styles = {

  container: {
    backgroundColor: "#f5f7fa",
    minHeight: "100vh",
    padding: "30px"
  },

  card: {
    maxWidth: "700px",
    margin: "auto",
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0px 3px 12px rgba(0,0,0,0.2)"
  },

  header: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    marginBottom: "20px"
  },

  image: {
    width: "120px",
    height: "120px",
    borderRadius: "50%"
  }

};

export default AdminAlumniProfile;