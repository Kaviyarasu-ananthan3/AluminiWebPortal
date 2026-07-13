import { useNavigate } from "react-router-dom";

function AdminSidebar() {
const navigate = useNavigate();
return (
<div style={styles.sidebar}>
<h2 style={styles.title}>Admin Panel</h2>

<button style={styles.button}  
  onClick={() => navigate("/admin/dashboard")}  
  >  
    📊 Dashboard  
  </button>  

  <button style={styles.button}  
  onClick={() => navigate("/admin/alumni-management")}   
   >  
    👨‍🎓 Alumni Management  
  </button>  

  <button style={styles.button}  
  onClick={() => navigate("/admin/student-list")}   
  >  
    👨‍🎓 Student List  
  </button>

  <button
  style={styles.button} 
  onClick={() => {
    localStorage.removeItem("role");
    navigate("/admin-login");
  }}
>
  🚪 Logout
</button>  

    

    
</div>

);
}

const styles = {
sidebar: {
width: "250px",
height: "100vh",
backgroundColor: "#003366",
color: "white",
display: "flex",
flexDirection: "column",
padding: "20px",
boxSizing: "border-box"
},

title: {
textAlign: "center",
marginBottom: "30px"
},

button: {
padding: "12px",
marginBottom: "15px",
border: "none",
borderRadius: "5px",
cursor: "pointer",
fontSize: "16px"
}
};

export default AdminSidebar;