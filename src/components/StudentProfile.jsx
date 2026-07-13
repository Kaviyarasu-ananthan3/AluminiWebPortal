import { API_BASE_URL } from "../api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function StudentProfile() {

  const navigate = useNavigate();
  const id = localStorage.getItem("id");

  const [user, setUser] = useState({});
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE_URL}/auth/profile/${id}`)
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.log(err));
  }, [id]);

  const saveProfile = () => {

  fetch(`${API_BASE_URL}/auth/profile/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.text())
    .then((msg) => {
      alert(msg);
      setEditMode(false);
    })
    .catch((err) => console.log(err));

};
const deleteAccount = () => {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete your account?"
  );

  if (!confirmDelete) {
    return;
  }

  fetch(`${API_BASE_URL}/auth/delete/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.text())
    .then((msg) => {
      alert(msg);
      localStorage.clear();
      navigate("/");
    })
    .catch((err) => console.log(err));

};

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "#f5f7fa",
      }}
    >
      <div
        style={{
          width: "500px",
          background: "white",
          padding: "30px",
          borderRadius: "15px",
          boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
        }}
      >

        <h2
          style={{
            textAlign: "center",
            color: "#003366",
          }}
        >
          Student Profile
        </h2>
        <h1
  style={{
    textAlign: "center",
    color: "#003366",
    marginBottom: "5px",
  }}
>
  {user.name}
</h1>

<p
  style={{
    textAlign: "center",
    color: "#666",
    fontWeight: "bold",
  }}
>
  Pre-Final Year Student
</p>

<p
  style={{
    textAlign: "center",
    color: "#555",
    marginBottom: "25px",
  }}
>
  VSB Engineering College
</p>

<hr />

{!editMode ? (

<>
  <h3>Basic Information</h3>

  <p><b>Name :</b> {user.name}</p>
  <p><b>Email :</b> {user.email}</p>
  <p><b>Phone :</b> {user.phone}</p>

  <hr />

  <h3>Academic Information</h3>

  <p><b>Department :</b> {user.department}</p>
  <p><b>Batch :</b> {user.batch}</p>

  <hr />

  <h3>Career Information</h3>

  <p><b>Skills :</b> {user.skills}</p>
  <p><b>Interested Domain :</b> {user.interest}</p>
  <p><b>LinkedIn :</b> {user.linkedin}</p>

  <br />

  <button
    onClick={() => setEditMode(true)}
    style={buttonStyle}
  >
    ✏ Edit Profile
  </button>

  <button
  onClick={deleteAccount}
  style={{
    ...buttonStyle,
    backgroundColor: "#dc3545",
    marginTop: "10px",
  }}
>
  🗑 Delete Account
</button>

</>

) : (

<>
  <h3>Edit Profile</h3>

  <input
    type="text"
    placeholder="Phone"
    value={user.phone || ""}
    onChange={(e) =>
      setUser({ ...user, phone: e.target.value })
    }
    style={inputStyle}
  />

  <input
    type="text"
    placeholder="Department"
    value={user.department || ""}
    onChange={(e) =>
      setUser({ ...user, department: e.target.value })
    }
    style={inputStyle}
  />

  <input
    type="text"
    placeholder="Batch"
    value={user.batch || ""}
    onChange={(e) =>
      setUser({ ...user, batch: e.target.value })
    }
    style={inputStyle}
  />

  <input
    type="text"
    placeholder="Skills"
    value={user.skills || ""}
    onChange={(e) =>
      setUser({ ...user, skills: e.target.value })
    }
    style={inputStyle}
  />

  <input
    type="text"
    placeholder="Interested Domain"
    value={user.interest || ""}
    onChange={(e) =>
      setUser({ ...user, interest: e.target.value })
    }
    style={inputStyle}
  />

  <input
    type="text"
    placeholder="LinkedIn"
    value={user.linkedin || ""}
    onChange={(e) =>
      setUser({ ...user, linkedin: e.target.value })
    }
    style={inputStyle}
  />

  <button
    onClick={saveProfile}
    style={buttonStyle}
  >
    💾 Save Profile
  </button>

  <br /><br />

  <button
    onClick={() => setEditMode(false)}
    style={{
      ...buttonStyle,
      backgroundColor: "#6c757d",
    }}
  >
    Cancel
  </button>

</>

)}

      </div>
    </div>
  );
}
const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "8px",
  marginBottom: "18px",
  borderRadius: "8px",
  border: "1px solid #d1d5db",
  fontSize: "15px",
  outline: "none",
  boxSizing: "border-box",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  backgroundColor: "#003366",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: "bold",
};

export default StudentProfile;