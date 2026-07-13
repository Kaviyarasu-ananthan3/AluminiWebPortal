import { API_BASE_URL } from "../api";
import { useEffect, useState } from "react";

function StudentList() {

  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/students`)
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>

      <h2>Student List 👨‍🎓</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Batch</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.department}</td>
              <td>{student.batch}</td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}

export default StudentList;