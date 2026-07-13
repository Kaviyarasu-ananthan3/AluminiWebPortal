import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

function AdminLayout() {
return (
<div style={{ display: "flex" }}>
<AdminSidebar />

<div  
    style={{  
      flex: 1,  
      padding: "30px",  
      backgroundColor: "#f5f7fa",  
      minHeight: "100vh"  
    }}  
  >  
    <Outlet />  
  </div>  
</div>

);
}

export default AdminLayout;