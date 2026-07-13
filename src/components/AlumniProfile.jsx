import { API_BASE_URL } from "../api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AlumniProfile() {
  const navigate = useNavigate();
  const id = localStorage.getItem("id");
  console.log("LocalStorage ID:", id);

  const [user, setUser] = useState({
    
    phone: "",
    department: "",
    batch: "",
    company: "",
    designation: "",
    experience: "",
    salary: "",
    skills: "",
    location: "",
    linkedin: ""
  });
  const [editMode,setEditMode] = useState(false);

  useEffect(() => {

    fetch(`${API_BASE_URL}/auth/profile/${id}`)
      .then((res) => res.json())
      .then((data) => setUser(data));

  }, [id]);

  const saveProfile = () => {

  // 🔥 1. VALIDATION (ADD HERE - TOP)
  if (
    !user.phone?.trim() ||
    !user.department?.trim() ||
    !user.batch?.trim() ||
    !user.company?.trim() ||
    !user.designation?.trim()
  ) {
    alert("Please fill all required fields");
    return;
  }

  // 🔥 2. API CALL (YOUR EXISTING CODE)
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
      navigate("/dashboard");
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
    backgroundColor: "#f5f7fa",
  }}
>
      <div
  style={{
    width: "500px",
    background: "white",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
  }}
>

 <div
  style={{
    textAlign: "center",
    marginBottom: "30px",
    paddingBottom: "20px",
    borderBottom: "1px solid #e5e7eb",
  }}
>
  <h2
    style={{
      color: "#003366",
      marginBottom: "20px",
      fontSize: "28px",
      fontWeight: "bold",
    }}
  >
    Alumni Profile
  </h2>

  <h1
    style={{
      color: "#0f4c81",
      margin: "0",
      fontSize: "36px",
      fontWeight: "700",
    }}
  >
    {user.name}
  </h1>

  <p
    style={{
      marginTop: "10px",
      color: "#555",
      fontSize: "18px",
      fontWeight: "500",
    }}
  >
    {user.designation || "Alumni"}
    {user.company ? ` @ ${user.company}` : ""}
  </p>

  <p
    style={{
      color: "#777",
      fontSize: "17px",
      marginTop: "10px",
    }}
  >
    VSB Engineering College
  </p>

  <p
    style={{
      color: "#999",
      fontSize: "15px",
      marginTop: "5px",
    }}
  >
    Batch {user.batch}
  </p>
</div>
  {!editMode && (

<div>

<h3>Basic Information</h3>

<p><b>Name :</b> {user.name}</p>

<p><b>Email :</b> {user.email}</p>

<p><b>Phone :</b> {user.phone}</p>

<hr/>

<h3>Academic Information</h3>

<p><b>Department :</b> {user.department}</p>

<p><b>Batch :</b> {user.batch}</p>

<hr/>

<h3>Professional Information</h3>

<p><b>Company :</b> {user.company}</p>

<p><b>Designation :</b> {user.designation}</p>

<p><b>Experience :</b> {user.experience}</p>

<p><b>Salary :</b> {user.salary}</p>

<hr/>

<h3>Skills & Contact</h3>

<p><b>Skills :</b> {user.skills}</p>

<p><b>Location :</b> {user.location}</p>

<p><b>LinkedIn :</b> {user.linkedin}</p>

<br/>

<button
  onClick={() => setEditMode(true)}
  style={{
    width: "100%",
    padding: "12px",
    backgroundColor: "#003366",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "20px",
    fontWeight: "bold",
  }}
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

</div>

)}
{editMode && (

<div>

<h3>Personal Information</h3>

<input
  type="text"
  placeholder="Phone"
  value={user.phone || ""}
  onChange={(e) => setUser({ ...user, phone: e.target.value })}
  style={inputStyle}
/>

<h3>Academic Information</h3>

<input
  type="text"
  placeholder="Department"
  value={user.department || ""}
  onChange={(e) => setUser({ ...user, department: e.target.value })}
  style={inputStyle}
/>

<input
  type="text"
  placeholder="Batch"
  value={user.batch || ""}
  onChange={(e) => setUser({ ...user, batch: e.target.value })}
  style={inputStyle}
/>

<h3>Professional Information</h3>

<input
  type="text"
  placeholder="Company"
  value={user.company || ""}
  onChange={(e) => setUser({ ...user, company: e.target.value })}
  style={inputStyle}
/>

<input
  type="text"
  placeholder="Designation"
  value={user.designation || ""}
  onChange={(e) => setUser({ ...user, designation: e.target.value })}
  style={inputStyle}
/>

<input
  type="text"
  placeholder="Experience"
  value={user.experience || ""}
  onChange={(e) => setUser({ ...user, experience: e.target.value })}
  style={inputStyle}
/>

<input
  type="text"
  placeholder="Salary"
  value={user.salary || ""}
  onChange={(e) => setUser({ ...user, salary: e.target.value })}
  style={inputStyle}
/>

<h3>Skills & Contact</h3>

<input
  type="text"
  placeholder="Skills"
  value={user.skills || ""}
  onChange={(e) => setUser({ ...user, skills: e.target.value })}
  style={inputStyle}
/>

<input
  type="text"
  placeholder="Location"
  value={user.location || ""}
  onChange={(e) => setUser({ ...user, location: e.target.value })}
  style={inputStyle}
/>

<input
  type="text"
  placeholder="LinkedIn"
  value={user.linkedin || ""}
  onChange={(e) => setUser({ ...user, linkedin: e.target.value })}
  style={inputStyle}
/>

<button
  onClick={saveProfile}
  style={buttonStyle}
>
  Save Changes
</button>

<button
  onClick={() => setEditMode(false)}
  style={{
    ...buttonStyle,
    marginTop: "10px",
    backgroundColor: "gray"
  }}
>
  Cancel
</button>

</div>

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
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "16px",
};

export default AlumniProfile;