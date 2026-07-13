import AdminStats from "./AdminStats";

function AdminDashboard() {
return (

<div  
    style={{  
      flex: 1,  
      padding: "30px",  
      backgroundColor: "#f5f7fa",  
      minHeight: "100vh"  
    }}  
  >  
    <h1>Welcome Admin 👨‍💻</h1>  

    <p>Alumni Engagement and Management System</p>  

    <AdminStats />  



     

  </div>

);
}

export default AdminDashboard;