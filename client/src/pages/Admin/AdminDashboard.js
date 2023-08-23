// import React from 'react'
// import Layout from "./../../components/Layout/Layout";
// import AdminMenu from '../../components/Layout/AdminMenu';

// import { useAuth } from '../../context/auth';

// import '../../../src/style/adminStyle/adminMenu.css'

// const AdminDashboard = () => {

//     const [auth  ]=useAuth();
//     console.log("aut ",auth?.user)

//   return (
//     <Layout title={"Admin-Panel"}>
//      {/* <div className="container-fluid m-3 p-3">
//       <div className="row">
//         <div className="col-md-3">
//       <AdminMenu/>
//         </div>
//         <div className='col-md-9'>
//           <div className="card w-75 p-3" >
//             <h3>Admin Name : {auth?.user?.name}</h3>
//             <h3>Admin Email : {auth?.user?.email}</h3>
//             <h3>Admin Contact : {auth?.user?.phone}</h3>
//           </div>
//         </div>
//       </div>
//      </div> */}
//      <div className='admin-dashboard'>
//         <AdminMenu/>
//         <div className='admin-dashboard-content'>
//            <h2 className='text-center'>Welcome  {auth?.user?.name} to admin dashboard!</h2>

//            <div className="admin-data-box">
//             <h4>Admin Name : {auth?.user?.name}</h4>
//             <h4>Admin Email : {auth?.user?.email}</h4>
//             <h4>Admin Contact : {auth?.user?.phone}</h4>
//             <h4>Admin Address : {auth?.user?.address}</h4>
//            </div>

//         </div>

//      </div>
//     </Layout>
//   )
// }

// export default AdminDashboard;

import React from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";
import "../../../src/style/adminStyle/adminMenu.css";

const AdminDashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout title={"Admin-Panel"}>
      <div className="admin-dashboard">
        <AdminMenu />
        <div className="admin-dashboard-content">
          <h2 className="text-center">
            Welcome {auth?.user?.name} to admin dashboard!
          </h2>

          <div className="admin-data-box ">
            <table className="table table-striped">
              <tbody>
                <tr className="admin-tr">
                  <th scope="row" className="px-0 admin-th">
                    Admin Name :
                  </th>
                  <td className="px-0">{auth?.user?.name}</td>
                </tr>
                <tr>
                  <th scope="row" className="px-0 admin-th">
                    Admin Email :
                  </th>
                  <td className="px-0">{auth?.user?.email}</td>
                </tr>
                <tr>
                  <th scope="row" className="px-0 admin-th">
                    Admin Contact :
                  </th>
                  <td className="px-0">{auth?.user?.phone}</td>
                </tr>
                <tr>
                  <th scope="row" className="px-0 admin-th">
                    Admin Address :
                  </th>
                  <td className="px-0">{auth?.user?.address}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
