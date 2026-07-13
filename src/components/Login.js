import { API_BASE_URL } from "../api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      });

      // Safe check
      if (!response.ok) {
        alert("Server Error");
        return;
      }

      const data = await response.json();

      // Backend null check
      if (!data || !data.email) {
        alert("Invalid credentials");
        return;
      }

      // Store user info
      localStorage.setItem("id", data.id);
      localStorage.setItem("name", data.name);
      localStorage.setItem("email", data.email);
      localStorage.setItem("role", data.role);
      localStorage.setItem("userType", data.role);

      alert("Login Successful");

      if (data.role === "student") {
    navigate("/dashboard");
}
else if (data.role === "alumni") {
    navigate("/dashboard");
}
else if (data.role === "admin") {
    navigate("/admin/dashboard");
}

    } catch (error) {
      console.log("Error:", error);
      alert("Server error. Please try again");
    }
  };

  return (
  <div style={styles.container}>

    <div style={styles.card}>

      <h2>Alumni Connect Portal</h2>
 
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={styles.input}
      />


      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
      />


      <button onClick={handleLogin} style={styles.button}>
        Login
      </button>


      <p>
        Don't have an account?{" "}
        <span onClick={() => navigate("/register")} style={styles.link}>
          Register
        </span>
      </p>
      <hr />

<button
  style={styles.adminButton}
  onClick={() => navigate("/admin-login")}
>
  🔐 Admin Login
</button>


    </div>

  </div>
);
}

const styles = {

  container: {
    minHeight: "100vh",
    backgroundColor: "#f5f7fb",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },


  card: {
    backgroundColor: "#003366",
    width: "360px",
    padding: "40px",
    borderRadius: "20px",
    textAlign: "center",
    color: "white",
    boxShadow: "0 8px 20px rgba(0,0,0,0.2)"
  },


  roleContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    marginBottom: "20px"
  },


  roleButton: {
    padding: "10px 18px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer"
  },


  input: {
    display: "block",
    margin: "15px auto",
    padding: "12px",
    width: "90%",
    borderRadius: "8px",
    border: "none"
  },


  button: {
    padding: "12px 35px",
    backgroundColor: "white",
    color: "#003366",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold"
  },


  link: {
    color: "white",
    cursor: "pointer",
    fontWeight: "bold"
  },
  adminButton: {
    marginTop: "20px",
    padding: "10px 25px",
    backgroundColor: "#ffffff",
    color: "#003366",
    border: "1px solid #ffffff",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold"
  },


};



export default Login;