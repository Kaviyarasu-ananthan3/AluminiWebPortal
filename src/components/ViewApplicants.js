import { API_BASE_URL } from "../api";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ViewApplicants() {

  const { jobId } = useParams();

  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);

  useEffect(() => {

    fetch(`${API_BASE_URL}/jobApplication/job/${jobId}`)
      .then((res) => res.json())
      .then((data) => setApplications(data))
      .catch((err) => console.log(err));

  }, [jobId]);
  const acceptApplicant = (id) => {

  fetch(`${API_BASE_URL}/jobApplication/accept/${id}`, {
    method: "PUT",
  })
    .then((res) => res.text())
    .then((msg) => {
      alert(msg);

      fetch(`${API_BASE_URL}/jobApplication/job/${jobId}`)
        .then((res) => res.json())
        .then((data) => setApplications(data));
    });

};

const rejectApplicant = (id) => {

  fetch(`${API_BASE_URL}/jobApplication/reject/${id}`, {
    method: "PUT",
  })
    .then((res) => res.text())
    .then((msg) => {
      alert(msg);

      fetch(`${API_BASE_URL}/jobApplication/job/${jobId}`)
        .then((res) => res.json())
        .then((data) => setApplications(data));
    });

};
return (

<div style={{ padding: "20px", textAlign: "center" }}>

<h1>Job Applicants</h1>

<table
border="1"
style={{
width: "100%",
borderCollapse: "collapse"
}}
>

<thead>

<tr>

<th>Name</th>
<th>Email</th>
<th>Phone</th>
<th>Department</th>
<th>CGPA</th>
<th>Skills</th>
<th>Resume</th>
<th>Cover Letter</th>
<th>Status</th>
<th>Action</th>

</tr>

</thead>

<tbody>

{applications.map((app) => (

<tr key={app.id}>

<td>{app.studentName}</td>
<td>{app.email}</td>
<td>{app.phone}</td>
<td>{app.department}</td>
<td>{app.cgpa}</td>
<td>{app.skills}</td>
<td>
  <a
    href={`${API_BASE_URL}/jobApplication/resume/${app.resume}`}
    target="_blank"
    rel="noreferrer"
  >
    Download Resume
  </a>
</td>

<td>
  <a
    href={`${API_BASE_URL}/jobApplication/cover/${app.coverLetter}`}
    target="_blank"
    rel="noreferrer"
  >
    Download Cover Letter
  </a>
</td>
<td>{app.status}</td>

<td>

<button
onClick={() => acceptApplicant(app.id)}
style={{
background: "green",
color: "white",
border: "none",
padding: "8px 10px",
marginRight: "5px"
}}
>
Recommend
</button>

<button
onClick={() => rejectApplicant(app.id)}
style={{
background: "red",
color: "white",
border: "none",
padding: "8px 10px"
}}
>
Reject
</button>

</td>

</tr>

))}

</tbody>

</table>

<br />

<button
onClick={() => navigate(-1)}
style={{
padding: "10px 20px",
background: "#003366",
color: "white",
border: "none"
}}
>
Back
</button>

</div>

);

}

export default ViewApplicants;