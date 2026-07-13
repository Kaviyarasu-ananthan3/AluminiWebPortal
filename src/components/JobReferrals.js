import { API_BASE_URL } from "../api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function JobReferrals() {

  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);


  useEffect(() => {

    fetch(`${API_BASE_URL}/jobs/all`)
      .then((res) => res.json())
      .then((data) => {

        setJobs(data);

      })
      .catch((err) => {

        console.log(err);
        alert("Unable to Load Jobs");

      });

  }, []);

 

  return (

    <div
      style={{
        textAlign: "center",
        padding: "20px"
      }}
    >

      <h1>Job Opportunities</h1>

      <table
        border="1"
        style={{
          width: "100%",
          borderCollapse: "collapse",
          margin: "auto"
        }}
      >

        <thead>

          <tr>

            <th>ID</th>
            <th>Company</th>
            <th>Role</th>
            <th>Location</th>
            <th>Experience</th>
            <th>Salary</th>
            <th>Skills</th>
            <th>Last Date</th>
            <th>Posted By</th>
            <th>Action</th>

          </tr>

        </thead>

        <tbody>

          {jobs.length === 0 ? (

            <tr>

              <td colSpan="10">

                No Jobs Available

              </td>

            </tr>

          ) : (

            jobs.map((job) => (

              <tr key={job.id}>

                <td>{job.id}</td>
                <td>{job.company}</td>
                <td>{job.role}</td>
                <td>{job.location}</td>
                <td>{job.experience}</td>
                <td>{job.salary}</td>
                <td>{job.skills}</td>
                <td>{job.lastDate}</td>
                <td>{job.postedBy}</td>

                <td>
  <div
    style={{
      display: "flex",
      gap: "10px",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <button
      onClick={() => {
  localStorage.setItem("chatStudent", localStorage.getItem("name"));
  localStorage.setItem("chatMentor", job.postedBy);
  navigate("/chat");
}}
      style={{
        backgroundColor: "#198754",
        color: "white",
        border: "none",
        padding: "8px 14px",
        borderRadius: "6px",
        cursor: "pointer",
      }}
    >
      💬 Contact Alumni
    </button>

    <button
      onClick={async () => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/auth/email/${job.postedBy}`
    );

    const email = await response.text();

    if (!email) {
      alert("Email not found");
      return;
    }

    window.location.href = `mailto:${email}?subject=Job Opportunity&body=Hello ${job.postedBy}, I am interested in this opportunity.`;
  } catch (error) {
    console.log(error);
    alert("Unable to fetch email");
  }
}}
      style={{
        backgroundColor: "#0d6efd",
        color: "white",
        border: "none",
        padding: "8px 14px",
        borderRadius: "6px",
        cursor: "pointer",
      }}
    >
      📧 Email
    </button>
  </div>
</td>

              </tr>

            ))

          )}

        </tbody>

      </table>

      <br />

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



export default JobReferrals;