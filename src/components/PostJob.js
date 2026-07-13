import { API_BASE_URL } from "../api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function PostJob() {

  const navigate = useNavigate();

  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("");
  const [salary, setSalary] = useState("");
  const [skills, setSkills] = useState("");
  const [lastDate, setLastDate] = useState("");

  const handlePostJob = async () => {

    try {

      const response = await fetch(
        `${API_BASE_URL}/jobs/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            company,
            role,
            location,
            experience,
            salary,
            skills,
            lastDate,
            postedBy: localStorage.getItem("name")
          })
        }
      );

      if (response.ok) {
        alert("Job Posted Successfully");
        navigate("/dashboard");
      } else {
        alert("Failed To Post Job");
      }

    } catch (error) {

      console.log(error);
      alert("Server Error");

    }
  };

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "30px"
      }}
    >

      <h1>Post New Job</h1>

      <input
        type="text"
        placeholder="Company Name"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
      <br /><br />

      <input
        type="text"
        placeholder="Job Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />
      <br /><br />

      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <br /><br />

      <input
        type="text"
        placeholder="Experience Required"
        value={experience}
        onChange={(e) => setExperience(e.target.value)}
      />
      <br /><br />

      <input
        type="text"
        placeholder="Salary Package"
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
      />
      <br /><br />

      <label>
        <b>Required Skills</b>
      </label>
      <br />

      <input
        type="text"
        placeholder="Java, Spring Boot, React, MySQL"
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
      />
      <br /><br />

      <label>
        <b>Application Last Date</b>
      </label>
      <br />

      <input
        type="date"
        value={lastDate}
        onChange={(e) => setLastDate(e.target.value)}
      />
      <br /><br />

      <button
        onClick={handlePostJob}
        style={{
          padding: "10px 20px",
          backgroundColor: "green",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        Post Job
      </button>

      <br /><br />

      <button
        onClick={() => navigate("/dashboard")}
        style={{
          padding: "10px 20px",
          backgroundColor: "#003366",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        Back To Dashboard
      </button>

    </div>
  );
}

export default PostJob;