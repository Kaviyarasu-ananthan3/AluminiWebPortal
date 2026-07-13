import { API_BASE_URL } from "../api";
import { useEffect, useState } from "react";

function AdminStats() {

  const [stats, setStats] = useState({
    totalAlumni: 0,
    totalStudents: 0,
    totalCompanies: 0,
    totalLocations: 0
  });

  useEffect(() => {

    fetch(`${API_BASE_URL}/auth/admin/dashboard-count`)
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);

  return (
    <div style={styles.container}>

      <div style={styles.card}>
        <h2>👨‍🎓</h2>
        <h3>{stats.totalAlumni}</h3>
        <p>Total Alumni</p>
      </div>

      <div style={styles.card}>
        <h2>🎓</h2>
        <h3>{stats.totalStudents}</h3>
        <p>Total Students</p>
      </div>

      <div style={styles.card}>
        <h2>🏢</h2>
        <h3>{stats.totalCompanies}</h3>
        <p>Total Companies</p>
      </div>

      <div style={styles.card}>
        <h2>📍</h2>
        <h3>{stats.totalLocations}</h3>
        <p>Total Locations</p>
      </div>

    </div>
  );
}

const styles = {

  container: {
    display: "flex",
    gap: "20px",
    marginTop: "30px",
    flexWrap: "wrap"
  },

  card: {
    width: "220px",
    backgroundColor: "white",
    borderRadius: "10px",
    padding: "20px",
    textAlign: "center",
    boxShadow: "0px 2px 10px rgba(0,0,0,0.2)"
  }

};

export default AdminStats;