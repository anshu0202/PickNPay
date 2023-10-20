

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
