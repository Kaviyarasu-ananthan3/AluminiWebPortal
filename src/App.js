import { BrowserRouter as Router ,Routes, Route} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";

import Dashboard from "./components/Dashboard";
import AlumniList from "./components/AlumniList";
import JobReferrals from "./components/JobReferrals";
import AlumniProfile from "./components/AlumniProfile";
import StudentProfile from "./components/StudentProfile";
import Mentorship from "./components/Mentorship";
import StudentResponses from "./components/StudentResponses";
import Chat from "./components/Chat";
import Notification from "./components/Notification";

import PostJob from "./components/PostJob";
import ManageJobs from "./components/ManageJobs";
import ViewApplicants from "./components/ViewApplicants";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import AdminAlumniProfile from "./components/AdminAlumniProfile";
import AdminLayout from "./components/AdminLayout";
import AlumniSearch from "./components/AlumniSearch";
import MentorshipDashboard from "./components/MentorshipDashboard";
import StudentList from "./components/StudentList";


function App() {
return (
<Router>
  <Routes>

{/* Authentication */}  
    <Route path="/" element={<Login />} />  
    <Route path="/register" element={<Register />} />  
      
    {/* Admin */}  
    <Route path="/admin-login" element={<AdminLogin />} />  
    
    <Route path="/admin" element={<AdminLayout />}>

<Route path="dashboard" element={<AdminDashboard />} />

<Route path="alumni-management" element={<AlumniSearch />} />

<Route
path="alumni-profile/:id"
element={<AdminAlumniProfile />}
/>
<Route
path="student-list"
element={<StudentList />}
/>

</Route>  {/* Dashboard */}  
    <Route path="/dashboard" element={<Dashboard />} />  

    {/* Student */}  
    <Route path="/alumni" element={<AlumniList />} />  
    <Route path="/jobs" element={<JobReferrals />} />  
    <Route path="/alumni-profile" element={<AlumniProfile />} />  
    <Route path="/student-profile" element={<StudentProfile />} />  
    <Route path="/mentorship" element={<Mentorship />} />  
    <Route  
      path="/student-response"  
      element={<StudentResponses />}  
    />  
    <Route path="/chat" element={<Chat />} />  
    <Route path="/notifications" element={<Notification />} />  
    
      
    {/* Alumni */}  
    <Route path="/post-job" element={<PostJob />} />  
    <Route path="/manage-jobs" element={<ManageJobs />} />  
    <Route  
      path="/view-applicants/:jobId"  
      element={<ViewApplicants />}  
    />  
    <Route  
      path="/mentorship-dashboard"  
      element={<MentorshipDashboard />}  
    />  

    {/* Page Not Found */}  
    <Route path="*" element={<h2>Page Not Found</h2>} />  

  </Routes>  
</Router>

);
}

export default App;