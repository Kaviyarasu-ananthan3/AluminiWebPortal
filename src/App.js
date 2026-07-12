import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  AdminAlumniProfile,
  AdminDashboard,
  AdminLayout,
  AdminLogin,
  AlumniList,
  AlumniProfile,
  AlumniSearch,
  Chat,
  Dashboard,
  JobReferrals,
  ManageJobs,
  Mentorship,
  MentorshipDashboard,
  Notification,
  NotFound,
  PostJob,
  Register,
  StudentList,
  StudentProfile,
  StudentResponses,
  ViewApplicants,
  Login,
} from "./components/Pages";
import "./App.css";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin-login" element={<AdminLogin />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="alumni-management" element={<AlumniSearch />} />
          <Route path="alumni-profile/:id" element={<AdminAlumniProfile />} />
          <Route path="student-list" element={<StudentList />} />
        </Route>

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/alumni" element={<AlumniList />} />
        <Route path="/jobs" element={<JobReferrals />} />
        <Route path="/alumni-profile" element={<AlumniProfile />} />
        <Route path="/student-profile" element={<StudentProfile />} />
        <Route path="/mentorship" element={<Mentorship />} />
        <Route path="/student-response" element={<StudentResponses />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/notifications" element={<Notification />} />
        <Route path="/post-job" element={<PostJob />} />
        <Route path="/manage-jobs" element={<ManageJobs />} />
        <Route path="/view-applicants/:jobId" element={<ViewApplicants />} />
        <Route path="/mentorship-dashboard" element={<MentorshipDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
