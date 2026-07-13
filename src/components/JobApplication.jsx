import { API_BASE_URL } from "../api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function JobApplication() {

  const navigate = useNavigate();

  const [studentName] = useState(localStorage.getItem("name") || "");
  const [email] = useState(localStorage.getItem("email") || "");

  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("");
  const [cgpa, setCgpa] = useState("");
  const [skills, setSkills] = useState("");

  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState(null);

  const [loading, setLoading] = useState(false);

  const applyJob = () => {

    if (loading) return;

    if (!phone || !department || !cgpa || !skills) {
      alert("Please Fill All Fields");
      return;
    }

    if (!resume) {
      alert("Please Select Resume");
      return;
    }

    if (!coverLetter) {
      alert("Please Select Cover Letter");
      return;
    }

    const jobId = localStorage.getItem("jobId");

    if (!jobId) {
      alert("Job Id Missing");
      return;
    }

    const formData = new FormData();

    formData.append("jobId", jobId);
    formData.append("studentName", studentName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("department", department);
    formData.append("cgpa", cgpa);
    formData.append("skills", skills);

    formData.append("resume", resume);
    formData.append("coverLetter", coverLetter);

    setLoading(true);

    fetch(`${API_BASE_URL}/jobApplication/apply`, {
      method: "POST",
      body: formData
    })
      .then(async (res) => {

        const data = await res.text();

        setLoading(false);

        if (res.ok) {

          setPhone("");
          setDepartment("");
          setCgpa("");
          setSkills("");
          setResume(null);
          setCoverLetter(null);
          setTimeout(() => {
            alert("Job Application Submitted Successfully");
            navigate("/jobs"); 
          },1000);

        } else {

          alert(data);

        }

      })
      .catch((err) => {

        console.log(err);

        setLoading(false);

        alert("Application Failed");

      });

  };

  return (

    <div
      style={{
        width: "550px",
        margin: "30px auto",
        padding: "20px",
        border: "1px solid lightgray",
        borderRadius: "10px",
        backgroundColor: "white"
      }}
    >

      <h2 style={{ textAlign: "center" }}>
        Job Application Form
      </h2>

      <input
        value={studentName}
        readOnly
        style={inputStyle}
      />

      <input
        value={email}
        readOnly
        style={inputStyle}
      />

      <input
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        style={inputStyle}
      />

      <input
        placeholder="Department"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
        style={inputStyle}
      />

      <input
        placeholder="CGPA"
        value={cgpa}
        onChange={(e) => setCgpa(e.target.value)}
        style={inputStyle}
      />

      <textarea
        rows="4"
        placeholder="Skills"
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
        style={inputStyle}
      />

      <br />

      <label><b>Resume (PDF / DOC / DOCX)</b></label>

      <br />

      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={(e) => setResume(e.target.files[0])}
      />

      <br /><br />

      <label><b>Cover Letter (PDF / DOC / DOCX)</b></label>

      <br />

      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={(e) => setCoverLetter(e.target.files[0])}
      />

      <br /><br />

      <button
        onClick={applyJob}
        disabled={loading}
        style={buttonStyle}
      >
        {loading ? "Submitting..." : "Apply Job"}
      </button>

      <button
        onClick={() => navigate(-1)}
        style={{
          ...buttonStyle,
          backgroundColor: "gray",
          marginLeft: "10px"
        }}
      >
        Back
      </button>

    </div>

  );

}

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "12px",
  border: "1px solid #ccc",
  borderRadius: "5px"
};

const buttonStyle = {
  padding: "12px 20px",
  backgroundColor: "#003366",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer"
};

export default JobApplication;