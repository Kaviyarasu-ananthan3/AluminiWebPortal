import { API_BASE_URL } from "../api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password || !role) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          role,
         
        }),
      });

      if (!response.ok) {
        const msg = await response.text();
        alert(msg);
        setLoading(false);
        return;
      }

      alert("Registration Successful!");
      navigate("/");

    } catch (error) {
      console.log(error);
      alert("Server error. Please try again");
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f4f4f4",
      }}
    >
      <div
        style={{
          background: "linear-gradient(135deg,#0b2a6b, #1e5aa8)",
          color: "white",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0px 0px 10px gray",
          width: "350px",
          textAlign: "center",
        }}
      >
        <h1>Alumni Connect Portal</h1>
        <h3>Choose Your Role</h3>
        <div
  style={{
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    margin: "20px 0",
  }}
>
  <button
    type="button"
    onClick={() => setRole("student")}
    style={{
      padding: "10px 20px",
      borderRadius: "8px",
      border: "1px solid #003366",
      backgroundColor: role === "student" ? "#003366" : "white",
      color: role === "student" ? "white" : "#003366",
      cursor: "pointer",
    }}
  >
    🎓 Student
  </button>

  <button
    type="button"
    onClick={() => setRole("alumni")}
    style={{
      padding: "10px 20px",
      borderRadius: "8px",
      border: "1px solid #003366",
      backgroundColor: role === "alumni" ? "#003366" : "white",
      color: role === "alumni" ? "white" : "#003366",
      cursor: "pointer",
    }}
  >
    👨‍💼 Alumni
  </button>
</div>
        <h2>
          {role === "student"
          ? "🎓 Student Registration"
          : "👨‍💼 Alumni Registration"}
        </h2>

        

        {/* NAME */}
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
  width: "90%",
  padding: "12px",
  margin: "10px 0",
  borderRadius: "8px",
  border: "none",
  outline: "none",
}}
        />

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
  width: "90%",
  padding: "12px",
  margin: "10px 0",
  borderRadius: "8px",
  border: "none",
  outline: "none",
}}
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
  width: "90%",
  padding: "12px",
  margin: "10px 0",
  borderRadius: "8px",
  border: "none",
  outline: "none",
}}
        />

        

        {/* BUTTON */}
        <button
          onClick={handleRegister}
          disabled={loading}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: loading ? "#888" : "white",
            color: "#003366",
            fontWeight: "bold",
            fontSize: "16px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </div>
    </div>
  );
}

export default Register;