import { API_BASE_URL } from "../api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function StudentMentorshipStatus() {

    const navigate = useNavigate();

    const [requests, setRequests] = useState([]);

    useEffect(() => {

        const studentName = localStorage.getItem("name");

        fetch(`${API_BASE_URL}/mentorship/student/${studentName}`)
            .then(res => res.json())
            .then(data => setRequests(data))
            .catch(err => console.log(err));

    }, []);

    return (

        <div style={{ textAlign: "center", padding: "30px" }}>

            <h1>My Mentorship Status</h1>

            <table
                border="1"
                style={{
                    margin: "auto",
                    width: "90%",
                    borderCollapse: "collapse"
                }}
            >

                <thead>

                    <tr>

                        <th>ID</th>
                        <th>Mentor</th>
                        <th>Message</th>
                        <th>Status</th>
                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {requests.map((request) => (

                        <tr key={request.id}>

                            <td>{request.id}</td>
                            <td>{request.mentorName}</td>
                            <td>{request.message}</td>
                            <td>{request.status}</td>

                            <td>

                                {request.status === "Accepted" ? (

                                    <button>

                                        Open Chat

                                    </button>

                                ) : request.status === "Pending" ? (

                                    "Waiting..."

                                ) : (

                                    "Rejected"

                                )}

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

            <br />

            <button
                onClick={() => navigate("/dashboard")}
            >

                Back To Dashboard

            </button>

        </div>

    );

}

export default StudentMentorshipStatus;