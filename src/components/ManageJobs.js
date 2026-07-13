import { API_BASE_URL } from "../api";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ManageJobs() {

  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);

  const alumniName = localStorage.getItem("name");

  const loadJobs = useCallback(() => {
    fetch(`${API_BASE_URL}/jobs/myjobs/${alumniName}`)
      .then((res) => res.json())
      .then((data) => setJobs(data))
      .catch((err) => console.log(err));
  }, [alumniName]);

  useEffect(() => {
    loadJobs();
  }, [loadJobs]);

  const deleteJob = (id) => {

    if (!window.confirm("Delete this job?")) return;

    fetch(`${API_BASE_URL}/jobs/delete/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.text())
      .then((msg) => {
        alert(msg);
        loadJobs();
      });
  };

  return (

    <div style={{ textAlign: "center", padding: "30px" }}>

      <h1>Manage Jobs</h1>

      <table
        border="1"
        style={{
          width: "95%",
          margin: "auto",
          borderCollapse: "collapse",
        }}
      >

        <thead>

          <tr>

            <th>Company</th>
            <th>Role</th>
            <th>Location</th>
            <th>Experience</th>
            <th>Salary</th>
            <th>Skills</th>
            <th>Last Date</th>
            <th>Action</th>

          </tr>

        </thead>

        <tbody>

          {jobs.map((job) => (

            <tr key={job.id}>

              <td>{job.company}</td>
              <td>{job.role}</td>
              <td>{job.location}</td>
              <td>{job.experience}</td>
              <td>{job.salary}</td>
              <td>{job.skills}</td>
              <td>{job.lastDate}</td>

              <td>

                <button
                  style={{
                    background: "red",
                    color: "white",
                    border: "none",
                    padding: "8px 12px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                  onClick={() => deleteJob(job.id)}
                >
                  Delete
                </button>

                
              </td>

            </tr>

          ))}

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
        }}
      >
        Back To Dashboard
      </button>

    </div>

  );
}

export default ManageJobs;
