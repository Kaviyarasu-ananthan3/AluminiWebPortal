import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleAdminLogin = () => {

    if (
      email === "admin@alumniconnect.com" &&
      password === "admin123"
    ) {

      localStorage.setItem("role", "admin");

      alert("Admin Login Successful");

      navigate("/admin");

    } 
    else {

      alert("Invalid Admin Credentials");

    }

  };


  return (

    <div style={styles.container}>

      <div style={styles.card}>

        <h2>🔐 Admin Login</h2>


        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          style={styles.input}
        />


        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          style={styles.input}
        />


        <button
          onClick={handleAdminLogin}
          style={styles.button}
        >
          Login
        </button>


      </div>

    </div>

  );

}


const styles = {

  container:{
    minHeight:"100vh",
    backgroundColor:"#f5f7fb",
    display:"flex",
    justifyContent:"center",
    alignItems:"center"
  },


  card:{
    backgroundColor:"#003366",
    padding:"40px",
    width:"350px",
    borderRadius:"15px",
    textAlign:"center",
    color:"white",
    boxShadow:"0 8px 20px rgba(0,0,0,0.2)"
  },


  input:{
    display:"block",
    margin:"15px auto",
    padding:"12px",
    width:"90%",
    borderRadius:"8px",
    border:"none"
  },


  button:{
    padding:"12px 35px",
    backgroundColor:"white",
    color:"#003366",
    border:"none",
    borderRadius:"8px",
    cursor:"pointer",
    fontWeight:"bold"
  }

};


export default AdminLogin;