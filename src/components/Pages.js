import { useEffect, useMemo, useState } from "react";
import { Link, NavLink, Outlet, useNavigate, useParams } from "react-router-dom";
import {
  FaBell,
  FaBriefcase,
  FaComments,
  FaGraduationCap,
  FaHome,
  FaLock,
  FaPaperPlane,
  FaSearch,
  FaUserGraduate,
  FaUsers,
} from "react-icons/fa";

const API_BASE_URL = (
  process.env.REACT_APP_API_URL || "https://aluminiwebportalbackend.onrender.com"
).replace(/\/$/, "");

const demoAlumni = [
  {
    id: 1,
    name: "Kavi Arasu",
    batchYear: 2021,
    department: "Computer Science",
    company: "Zoho",
    role: "Backend Engineer",
    skills: "Java, Spring Boot, MySQL",
    location: "Chennai",
  },
  {
    id: 2,
    name: "Nila Kumar",
    batchYear: 2020,
    department: "Information Technology",
    company: "Freshworks",
    role: "Product Engineer",
    skills: "React, APIs, Product Design",
    location: "Bengaluru",
  },
  {
    id: 3,
    name: "Arun Prakash",
    batchYear: 2019,
    department: "Electronics",
    company: "TCS",
    role: "Cloud Consultant",
    skills: "AWS, DevOps, SQL",
    location: "Hyderabad",
  },
];

const demoStudents = [
  { id: 1, name: "Meena S", department: "Computer Science", year: 3, interest: "Full-stack development" },
  { id: 2, name: "Rahul V", department: "Information Technology", year: 4, interest: "Cloud internships" },
  { id: 3, name: "Divya P", department: "Electronics", year: 2, interest: "Embedded systems" },
];

const demoJobs = [
  {
    id: 1,
    title: "Junior Java Developer",
    company: "Zoho",
    location: "Chennai",
    type: "Referral",
    description: "Spring Boot and MySQL role for recent graduates.",
  },
  {
    id: 2,
    title: "React Intern",
    company: "Freshworks",
    location: "Remote",
    type: "Internship",
    description: "Frontend internship for students comfortable with React.",
  },
];

const demoMentorship = [
  { id: 1, topic: "Resume review", studentName: "Meena S", alumniName: "Nila Kumar", status: "Scheduled" },
  { id: 2, topic: "Java interview prep", studentName: "Rahul V", alumniName: "Kavi Arasu", status: "Requested" },
];

function useApiResource(path, fallback) {
  const [data, setData] = useState(fallback);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const controller = new AbortController();

    fetch(`${API_BASE_URL}${path}`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with ${response.status}`);
        }
        return response.json();
      })
      .then((payload) => {
        setData(payload);
        setStatus("live");
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          setData(fallback);
          setStatus("demo");
        }
      });

    return () => controller.abort();
  }, [path, fallback]);

  return { data, status };
}

function Shell({ title, subtitle, children }) {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <Link className="brand" to="/dashboard">
          <span className="brand-mark"><FaGraduationCap /></span>
          <span>
            <strong>Alumni Connect</strong>
            <small>Portal Demo</small>
          </span>
        </Link>
        <nav className="nav-stack" aria-label="Main navigation">
          <NavItem to="/dashboard" icon={<FaHome />} label="Dashboard" />
          <NavItem to="/alumni" icon={<FaUsers />} label="Alumni" />
          <NavItem to="/jobs" icon={<FaBriefcase />} label="Jobs" />
          <NavItem to="/mentorship" icon={<FaUserGraduate />} label="Mentorship" />
          <NavItem to="/chat" icon={<FaComments />} label="Chat" />
          <NavItem to="/notifications" icon={<FaBell />} label="Alerts" />
        </nav>
      </aside>
      <main className="main-panel">
        <header className="page-header">
          <div>
            <h1>{title}</h1>
            <p>{subtitle}</p>
          </div>
          <Link className="ghost-button" to="/">Sign out</Link>
        </header>
        {children}
      </main>
    </div>
  );
}

function NavItem({ to, icon, label }) {
  return (
    <NavLink className="nav-link" to={to}>
      {icon}
      <span>{label}</span>
    </NavLink>
  );
}

function StatusPill({ status }) {
  return <span className={`status-pill ${status}`}>{status === "live" ? "Live API" : "Demo data"}</span>;
}

function AuthPanel({ mode }) {
  const navigate = useNavigate();
  const isAdmin = mode === "admin";
  const title = mode === "register" ? "Create account" : isAdmin ? "Admin login" : "Portal login";

  function handleSubmit(event) {
    event.preventDefault();
    navigate(isAdmin ? "/admin/dashboard" : "/dashboard");
  }

  return (
    <main className="auth-screen">
      <section className="auth-copy">
        <div className="brand auth-brand">
          <span className="brand-mark"><FaGraduationCap /></span>
          <span>
            <strong>Alumni Connect</strong>
            <small>Students, alumni, referrals, and mentorship</small>
          </span>
        </div>
        <h1>Alumni network demo ready for deployment.</h1>
        <p>
          This version includes a React frontend, a Spring Boot API, and MySQL-backed demo records for
          Render deployment.
        </p>
        <div className="auth-actions">
          <Link to="/admin-login">Admin</Link>
          <Link to="/register">Register</Link>
        </div>
      </section>
      <section className="auth-card" aria-label={title}>
        <div className="lock-icon"><FaLock /></div>
        <h2>{title}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Email
            <input type="email" placeholder="demo@alumni.edu" required />
          </label>
          <label>
            Password
            <input type="password" placeholder="password" required />
          </label>
          {mode === "register" && (
            <label>
              Role
              <select defaultValue="student">
                <option value="student">Student</option>
                <option value="alumni">Alumni</option>
              </select>
            </label>
          )}
          <button className="primary-button" type="submit">
            <FaPaperPlane />
            Continue
          </button>
        </form>
      </section>
    </main>
  );
}

export function Login() {
  return <AuthPanel mode="login" />;
}

export function Register() {
  return <AuthPanel mode="register" />;
}

export function AdminLogin() {
  return <AuthPanel mode="admin" />;
}

export function Dashboard() {
  const alumni = useApiResource("/api/alumni", demoAlumni);
  const students = useApiResource("/api/students", demoStudents);
  const jobs = useApiResource("/api/jobs", demoJobs);
  const mentorship = useApiResource("/api/mentorship", demoMentorship);

  return (
    <Shell title="Dashboard" subtitle="Overview of alumni engagement, referrals, and mentorship activity.">
      <section className="stats-grid">
        <Stat label="Alumni" value={alumni.data.length} status={alumni.status} />
        <Stat label="Students" value={students.data.length} status={students.status} />
        <Stat label="Open jobs" value={jobs.data.length} status={jobs.status} />
        <Stat label="Mentorship" value={mentorship.data.length} status={mentorship.status} />
      </section>
      <section className="content-grid">
        <Panel title="Recent alumni">
          <AlumniRows alumni={alumni.data.slice(0, 3)} />
        </Panel>
        <Panel title="Latest opportunities">
          <JobRows jobs={jobs.data.slice(0, 3)} />
        </Panel>
      </section>
    </Shell>
  );
}

function Stat({ label, value, status }) {
  return (
    <div className="stat-tile">
      <span>{label}</span>
      <strong>{value}</strong>
      <StatusPill status={status} />
    </div>
  );
}

function Panel({ title, children }) {
  return (
    <section className="panel">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

export function AlumniList() {
  const { data, status } = useApiResource("/api/alumni", demoAlumni);

  return (
    <Shell title="Alumni Directory" subtitle="Search alumni by department, company, role, or skills.">
      <SearchBar />
      <StatusPill status={status} />
      <AlumniRows alumni={data} />
    </Shell>
  );
}

function AlumniRows({ alumni }) {
  return (
    <div className="rows">
      {alumni.map((item) => (
        <article className="row-card" key={item.id}>
          <div>
            <h3>{item.name}</h3>
            <p>{item.role} at {item.company}</p>
          </div>
          <div className="meta-list">
            <span>{item.department}</span>
            <span>{item.batchYear}</span>
            <span>{item.location}</span>
          </div>
          <small>{item.skills}</small>
        </article>
      ))}
    </div>
  );
}

function SearchBar() {
  return (
    <label className="search-bar">
      <FaSearch />
      <input placeholder="Search directory" />
    </label>
  );
}

export function JobReferrals() {
  const { data, status } = useApiResource("/api/jobs", demoJobs);

  return (
    <Shell title="Job Referrals" subtitle="Referral and internship opportunities shared by alumni.">
      <div className="toolbar">
        <StatusPill status={status} />
        <Link className="primary-button compact" to="/post-job">Post job</Link>
      </div>
      <JobRows jobs={data} />
    </Shell>
  );
}

function JobRows({ jobs }) {
  return (
    <div className="rows">
      {jobs.map((job) => (
        <article className="row-card" key={job.id}>
          <div>
            <h3>{job.title}</h3>
            <p>{job.company} · {job.location}</p>
          </div>
          <span className="badge">{job.type}</span>
          <small>{job.description}</small>
          <Link to={`/view-applicants/${job.id}`}>View applicants</Link>
        </article>
      ))}
    </div>
  );
}

export function PostJob() {
  const [message, setMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(`${API_BASE_URL}/api/jobs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Unable to save job");
      }
      event.currentTarget.reset();
      setMessage("Job posted to backend.");
    } catch {
      setMessage("Backend not connected yet. Set REACT_APP_API_URL after deploying the API.");
    }
  }

  return (
    <Shell title="Post Job" subtitle="Alumni can share referral or internship openings.">
      <form className="form-panel" onSubmit={handleSubmit}>
        <label>Title<input name="title" required /></label>
        <label>Company<input name="company" required /></label>
        <label>Location<input name="location" required /></label>
        <label>Type<input name="type" defaultValue="Referral" required /></label>
        <label>Description<textarea name="description" rows="4" required /></label>
        <button className="primary-button" type="submit">Publish</button>
        {message && <p className="form-message">{message}</p>}
      </form>
    </Shell>
  );
}

export function ManageJobs() {
  return <JobReferrals />;
}

export function ViewApplicants() {
  const { jobId } = useParams();
  return (
    <Shell title="Applicants" subtitle={`Applications for job #${jobId}.`}>
      <div className="rows">
        {demoStudents.slice(0, 2).map((student) => (
          <article className="row-card" key={student.id}>
            <h3>{student.name}</h3>
            <p>{student.department} · Year {student.year}</p>
            <small>{student.interest}</small>
          </article>
        ))}
      </div>
    </Shell>
  );
}

export function Mentorship() {
  const { data, status } = useApiResource("/api/mentorship", demoMentorship);
  return (
    <Shell title="Mentorship" subtitle="Track student mentorship requests and alumni guidance.">
      <StatusPill status={status} />
      <MentorshipRows items={data} />
    </Shell>
  );
}

function MentorshipRows({ items }) {
  return (
    <div className="rows">
      {items.map((item) => (
        <article className="row-card" key={item.id}>
          <div>
            <h3>{item.topic}</h3>
            <p>{item.studentName} with {item.alumniName}</p>
          </div>
          <span className="badge">{item.status}</span>
        </article>
      ))}
    </div>
  );
}

export function MentorshipDashboard() {
  return <Mentorship />;
}

export function StudentResponses() {
  return (
    <Shell title="Student Responses" subtitle="Follow up on mentorship and referral responses.">
      <MentorshipRows items={demoMentorship} />
    </Shell>
  );
}

export function AlumniProfile() {
  return (
    <Shell title="Alumni Profile" subtitle="Public profile preview for an alumni member.">
      <AlumniRows alumni={[demoAlumni[0]]} />
    </Shell>
  );
}

export function StudentProfile() {
  return (
    <Shell title="Student Profile" subtitle="Student academic and career-interest profile.">
      <StudentRows students={[demoStudents[0]]} />
    </Shell>
  );
}

export function StudentList() {
  const { data, status } = useApiResource("/api/students", demoStudents);
  return (
    <Shell title="Students" subtitle="Students available for mentorship and placement support.">
      <StatusPill status={status} />
      <StudentRows students={data} />
    </Shell>
  );
}

function StudentRows({ students }) {
  return (
    <div className="rows">
      {students.map((student) => (
        <article className="row-card" key={student.id}>
          <h3>{student.name}</h3>
          <p>{student.department} · Year {student.year}</p>
          <small>{student.interest}</small>
        </article>
      ))}
    </div>
  );
}

export function Chat() {
  return (
    <Shell title="Chat" subtitle="Simple conversation area for mentorship follow-ups.">
      <section className="chat-panel">
        <p><strong>Nila:</strong> Share your resume and I will review it tonight.</p>
        <p><strong>Meena:</strong> Thank you. I also added my GitHub profile.</p>
        <label>
          Message
          <input placeholder="Type a message" />
        </label>
      </section>
    </Shell>
  );
}

export function Notification() {
  return (
    <Shell title="Notifications" subtitle="Recent portal alerts.">
      <div className="rows">
        <article className="row-card"><h3>New referral posted</h3><p>Junior Java Developer is open for applications.</p></article>
        <article className="row-card"><h3>Mentorship request</h3><p>Rahul requested Java interview preparation.</p></article>
      </div>
    </Shell>
  );
}

export function AdminLayout() {
  return (
    <div className="admin-shell">
      <aside className="sidebar">
        <Link className="brand" to="/admin/dashboard">
          <span className="brand-mark"><FaGraduationCap /></span>
          <span>
            <strong>Admin</strong>
            <small>Alumni Connect</small>
          </span>
        </Link>
        <nav className="nav-stack" aria-label="Admin navigation">
          <NavItem to="/admin/dashboard" icon={<FaHome />} label="Dashboard" />
          <NavItem to="/admin/alumni-management" icon={<FaUsers />} label="Alumni" />
          <NavItem to="/admin/student-list" icon={<FaUserGraduate />} label="Students" />
        </nav>
      </aside>
      <main className="main-panel">
        <Outlet />
      </main>
    </div>
  );
}

export function AdminDashboard() {
  const alumni = useApiResource("/api/alumni", demoAlumni);
  const students = useApiResource("/api/students", demoStudents);
  return (
    <>
      <header className="page-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Manage alumni, student records, and demo data.</p>
        </div>
      </header>
      <section className="stats-grid">
        <Stat label="Alumni records" value={alumni.data.length} status={alumni.status} />
        <Stat label="Student records" value={students.data.length} status={students.status} />
      </section>
    </>
  );
}

export function AlumniSearch() {
  const { data, status } = useApiResource("/api/alumni", demoAlumni);
  return (
    <>
      <header className="page-header">
        <div>
          <h1>Alumni Management</h1>
          <p>Review alumni profiles and placement support details.</p>
        </div>
      </header>
      <SearchBar />
      <StatusPill status={status} />
      <div className="rows">
        {data.map((alumni) => (
          <article className="row-card" key={alumni.id}>
            <h3>{alumni.name}</h3>
            <p>{alumni.company} · {alumni.role}</p>
            <Link to={`/admin/alumni-profile/${alumni.id}`}>Open profile</Link>
          </article>
        ))}
      </div>
    </>
  );
}

export function AdminAlumniProfile() {
  const { id } = useParams();
  const alumni = useMemo(
    () => demoAlumni.find((item) => String(item.id) === id) || demoAlumni[0],
    [id],
  );

  return (
    <>
      <header className="page-header">
        <div>
          <h1>{alumni.name}</h1>
          <p>{alumni.role} at {alumni.company}</p>
        </div>
      </header>
      <AlumniRows alumni={[alumni]} />
    </>
  );
}

export function NotFound() {
  return (
    <main className="not-found">
      <h1>Page not found</h1>
      <Link className="primary-button compact" to="/dashboard">Go to dashboard</Link>
    </main>
  );
}
