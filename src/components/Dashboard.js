import { API_BASE_URL } from "../api";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom"

function Dashboard() {

  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const name = localStorage.getItem("name");

  const [stats, setStats] = useState({
    students: 0,
    alumni: 0,
    jobs: 0,
    mentors: 0,
  });

  const location =useLocation();
  useEffect(() => {

  const count = localStorage.getItem("notificationCount") || "0";

  setNotificationCount(parseInt(count));

}, [location]);

  const [notificationCount,setNotificationCount] = useState(0);

  useEffect(() => {
    fetch(`${API_BASE_URL}/dashboard/stats`)
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.log(err));
  }, []);

  

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div>

      {/* Header */}

      <div style={headerStyle}>
        <h2>Alumni Connect Portal</h2>

        <button onClick={handleLogout} style={logoutBtn}>
          Logout
        </button>
      </div>

      {/* Welcome */}

      <div
        style={{
          position: "relative",
          textAlign: "center",
          padding: "30px",
        }}
      >
      <div
        style={{
          position: "absolute",
          right: "30px",
          top: "30px",
        }}
      >
        <FaUserCircle
          size={45}
          color="#003366"
          style={{ cursor: "pointer" }}
          onClick={() => navigate(role === "student" ? "/student-profile" : "/alumni-profile")}/>
      </div>

      <h1>Dashboard</h1>

      <h3>Welcome, {name}</h3>
    </div>
  
{/* Student Panel */}


   {role === "student" && (
    
        <div style={{ textAlign: "center" }}>
          

          <h2>🎓 Student Panel</h2>

          <button
            onClick={() => navigate("/alumni")}
            style={btn}
          >
            View Alumni
          </button>

          <button
            onClick={() => navigate("/jobs")}
            style={btn}
          >
            View Job Opportunities
          </button>

          <button
            onClick={() => navigate("/mentorship")}
            style={btn}
          >
            Request Mentorship
          </button>

          <button
  onClick={() => navigate("/student-response")}
  style={{
    ...btn,
    position: "relative"
  }}
>
  🔔 My Mentorship Responses

  {notificationCount > 0 && (
    <span
      style={{
        background: "red",
        color: "white",
        borderRadius: "50%",
        padding: "2px 8px",
        marginLeft: "10px",
        fontSize: "12px"
      }}
    >
      {notificationCount}
    </span>
  )}

</button>




        </div>
      )}

      {/* Alumni Panel */}

      {role === "alumni" && (

        <div style={{ textAlign: "center" }}>

          <h2>💼 Alumni Panel</h2>

          <button
            onClick={() => navigate("/post-job")}
            style={btn}
          >
            Post Jobs
          </button>

          <button
            onClick={() => navigate("/manage-jobs")}
            style={btn}
          >
            Manage Jobs
          </button>

          <button
            onClick={() => navigate("/mentorship-dashboard")}
            style={btn}
          >
            View Mentorship Requests
          </button>

          

        </div>

      )}

      {/* Dashboard Cards */}

      <div style={cardContainer}>

        <div style={card}>
          <h2>{stats.students}</h2>
          <p>Students</p>
        </div>

        <div style={card}>
          <h2>{stats.alumni}</h2>
          <p>Alumni</p>
        </div>

        <div style={card}>
          <h2>{stats.jobs}</h2>
          <p>Jobs</p>
        </div>

        <div style={card}>
          <h2>{stats.mentors}</h2>
          <p>Mentors</p>
        </div>

      </div>
    </div>
      );
}

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "20px",
  backgroundColor: "#003366",
  color: "white",
};

const logoutBtn = {
  backgroundColor: "red",
  color: "white",
  border: "none",
  padding: "8px 15px",
  borderRadius: "5px",
  cursor: "pointer",
};

const btn = {
  margin: "10px",
  padding: "12px 20px",
  backgroundColor: "#003366",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const cardContainer = {
  display: "flex",
  justifyContent: "center",
  gap: "20px",
  marginTop: "40px",
  flexWrap: "wrap",
};

const card = {
  width: "150px",
  padding: "20px",
  backgroundColor: "#f1f1f1",
  borderRadius: "10px",
  textAlign: "center",
  boxShadow: "0px 2px 8px rgba(0,0,0,0.2)",
};

export default Dashboard;