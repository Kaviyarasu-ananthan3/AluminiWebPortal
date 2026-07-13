import { API_BASE_URL } from "../api";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


function AlumniSearch() {

  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");
  const [alumni, setAlumni] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [batches, setBatches] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [locations, setLocations] = useState([]);

  const [department, setDepartment] = useState("");
  const [batch, setBatch] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
const [selectedColumns, setSelectedColumns] = useState([
  "name",
  "email",
  "phone",
  "department",
  "batch",
  "company",
  "designation",
  "salary",
  "location",
  "skills",
  "linkedin"
]);
const allColumns = [
  "name",
  "email",
  "phone",
  "department",
  "batch",
  "company",
  "designation",
  "salary",
  "location",
  "skills",
  "linkedin"
];

const handleSelectAll = () => {

  if (selectedColumns.length === allColumns.length) {
    setSelectedColumns([]);
  } else {
    setSelectedColumns(allColumns);
  }

};
const toggleColumn = (column) => {

  if (selectedColumns.includes(column)) {

    setSelectedColumns(
      selectedColumns.filter((item) => item !== column)
    );

  } else {

    setSelectedColumns([
      ...selectedColumns,
      column
    ]);

  }

};



  const exportExcel = () => {

  const url =
  `${API_BASE_URL}/auth/admin/export-excel?keyword=${encodeURIComponent(keyword)}&department=${encodeURIComponent(department)}&batch=${encodeURIComponent(batch)}&company=${encodeURIComponent(company)}&location=${encodeURIComponent(location)}`;

  window.open(
  url + "&columns=" + selectedColumns.join(",")
);
};

const exportPdf = () => {

  const url =
    `${API_BASE_URL}/auth/admin/export-pdf?keyword=${encodeURIComponent(keyword)}&department=${encodeURIComponent(department)}&batch=${encodeURIComponent(batch)}&company=${encodeURIComponent(company)}&location=${encodeURIComponent(location)}`;

  window.open(
    url + "&columns=" + selectedColumns.join(",")
  );

};


  useEffect(() => {

  fetch(`${API_BASE_URL}/auth/admin/filters`)
    .then((response) => response.json())
    .then((data) => {
      setDepartments(data.departments);
      setBatches(data.batches);
      setCompanies(data.companies);
      setLocations(data.locations);
    })
    .catch((error) => console.log(error));

}, []);


  useEffect(() => {

  // Search keyword இருந்தா பழைய search API use பண்ணு
  if (keyword.trim() !== "") {

    fetch(`${API_BASE_URL}/auth/admin/search?keyword=${encodeURIComponent(keyword)}`)
      .then((response) => response.json())
      .then((data) => setAlumni(data))
      .catch((error) => console.log(error));

    return;
  }

  // இல்லனா filters use பண்ணு
  fetch(
    `${API_BASE_URL}/auth/admin/filter-search?department=${encodeURIComponent(department)}&batch=${encodeURIComponent(batch)}&company=${encodeURIComponent(company)}&location=${encodeURIComponent(location)}`
  )
    .then((response) => response.json())
    .then((data) => setAlumni(data))
    .catch((error) => console.log(error));

}, [keyword, department, batch, company, location]);

  return (
    <div style={styles.container}>

      <h2>🔍 Search Alumni</h2>

      <input
        type="text"
        placeholder="Search by Name, Company, Department, Batch, Skills, Location..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        style={styles.input}
      />
      <div style={styles.filterContainer}>

  <select
  style={styles.select}
  value={department}
  onChange={(e) => setDepartment(e.target.value)}
>
  <option value="">All Departments</option>

  {departments.map((item) => (
    <option key={item} value={item}>
      {item}
    </option>
  ))}
</select>

  <select
  style={styles.select}
  value={batch}
  onChange={(e) => setBatch(e.target.value)}
>
  <option value="">All Batches</option>

  {batches.map((item) => (
    <option key={item} value={item}>
      {item}
    </option>
  ))}
</select>
  <select
  style={styles.select}
  value={company}
  onChange={(e) => setCompany(e.target.value)}
>
  <option value="">All Companies</option>

  {companies.map((item) => (
    <option key={item} value={item}>
      {item}
    </option>
  ))}
</select>
  <select
  style={styles.select}
  value={location}
  onChange={(e) => setLocation(e.target.value)}
>
  <option value="">All Locations</option>

  {locations.map((item) => (
    <option key={item} value={item}>
      {item}
    </option>
  ))}
</select>

<div style={styles.checkboxContainer}>
  <label>
  <input
    type="checkbox"
    checked={selectedColumns.length === allColumns.length}
    onChange={handleSelectAll}
  />
  Select All
</label>

  <label>
    <input
      type="checkbox"
      checked={selectedColumns.includes("name")}
      onChange={() => toggleColumn("name")}
    />
    Name
  </label>

  <label>
    <input
      type="checkbox"
      checked={selectedColumns.includes("email")}
      onChange={() => toggleColumn("email")}
    />
    Email
  </label>

  <label>
    <input
      type="checkbox"
      checked={selectedColumns.includes("phone")}
      onChange={() => toggleColumn("phone")}
    />
    Phone
  </label>

  <label>
    <input
      type="checkbox"
      checked={selectedColumns.includes("department")}
      onChange={() => toggleColumn("department")}
    />
    Department
  </label>

  <label>
    <input
      type="checkbox"
      checked={selectedColumns.includes("company")}
      onChange={() => toggleColumn("company")}
    />
    Company
  </label>
  
  <label>
  <input
    type="checkbox"
    checked={selectedColumns.includes("batch")}
    onChange={() => toggleColumn("batch")}
  />
  Batch
</label>

<label>
  <input
    type="checkbox"
    checked={selectedColumns.includes("designation")}
    onChange={() => toggleColumn("designation")}
  />
  Designation
</label>

<label>
  <input
    type="checkbox"
    checked={selectedColumns.includes("salary")}
    onChange={() => toggleColumn("salary")}
  />
  Salary
</label>

<label>
  <input
    type="checkbox"
    checked={selectedColumns.includes("location")}
    onChange={() => toggleColumn("location")}
  />
  Location
</label>

<label>
  <input
    type="checkbox"
    checked={selectedColumns.includes("skills")}
    onChange={() => toggleColumn("skills")}
  />
  Skills
</label>

<label>
  <input
    type="checkbox"
    checked={selectedColumns.includes("linkedin")}
    onChange={() => toggleColumn("linkedin")}
  />
  LinkedIn
</label>
  

</div>

</div>
<div style={{ marginBottom: "20px" }}>

  <button
    style={styles.exportBtn}
    onClick={exportExcel}
  >
    📋 Export Excel
  </button>

  <button
    style={{
      ...styles.exportBtn,
      marginLeft: "10px",
      backgroundColor: "#dc3545"
    }}
    onClick={exportPdf}
  >
    📄 Export PDF
  </button>

</div>

      {(keyword !== "" ||
department !== "" ||
batch !== "" ||
company !== "" ||
location !== "") &&
alumni.length > 0 && (
        <table style={styles.table}>
          <thead>
  <tr>
    <th style={styles.th}>Name</th>
    <th style={styles.th}>Department</th>
    <th style={styles.th}>Batch</th>
    <th style={styles.th}>Company</th>
    <th style={styles.th}>Designation</th>
    <th style={styles.th}>Location</th>
    <th style={styles.th}>Action</th>
  </tr>
</thead>

          <tbody>
  {alumni.map((user) => (
    <tr key={user.id}>
      <td style={styles.td}>{user.name}</td>
      <td style={styles.td}>{user.department}</td>
      <td style={styles.td}>{user.batch}</td>
      <td style={styles.td}>{user.company}</td>
      <td style={styles.td}>{user.designation}</td>
      <td style={styles.td}>{user.location}</td>

      <td style={styles.td}>
        <button
          style={styles.button}
          onClick={() =>
            navigate(`/admin/alumni-profile/${user.id}`)
          }
        >
          👁 View
        </button>
      </td>
    </tr>
  ))}
</tbody>
        </table>
      )}

    </div>
  );
}

const styles = {

  container: {
    marginTop: "30px"
  },

  input: {
    width: "100%",
    padding: "12px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #ccc"
  },

  table: {
    width: "100%",
    marginTop: "20px",
    borderCollapse: "collapse",
    backgroundColor: "white"
  },

  th: {
    backgroundColor: "#003366",
    color: "white",
    padding: "12px",
    textAlign: "left"
  },

  td: {
    padding: "12px",
    borderBottom: "1px solid #ddd"
  },

  button: {
    backgroundColor: "#003366",
    color: "white",
    border: "none",
    padding: "8px 15px",
    borderRadius: "5px",
    cursor: "pointer"
  },

  filterContainer: {
  display: "flex",
  gap: "15px",
  marginTop: "20px",
  marginBottom: "20px",
  flexWrap: "wrap"
},

select: {
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  minWidth: "180px"
},
exportBtn: {
  backgroundColor: "#198754",
  color: "white",
  padding: "12px 20px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: "bold"
},

checkboxContainer: {
  display: "flex",
  gap: "20px",
  flexWrap: "wrap",
  marginTop: "20px",
  marginBottom: "20px"
},

};

export default AlumniSearch;
