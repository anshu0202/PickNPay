import React from 'react'
import { NavLink } from 'react-router-dom'

import '../../../src/style/adminStyle/adminMenu.css'

const AdminMenu = () => {
  return (
    <>

    {/* <div className='text-center'>

  <div className="list-group">
  <h4>Admin Panel</h4>
  
  <NavLink to="/dashboard/admin/create-category" className="list-group-item list-group-item-action">Create Category</NavLink>
  <NavLink to="/dashboard/admin/create-product" className="list-group-item list-group-item-action">Create Product</NavLink>
  <NavLink to="/dashboard/admin/products" className="list-group-item list-group-item-action">Products</NavLink>
  <NavLink to="/dashboard/admin/orders" className="list-group-item list-group-item-action">Orders</NavLink>
  <NavLink to="/dashboard/admin/users" className="list-group-item list-group-item-action">Users</NavLink>
</div>
    </div> */}

    <div className='admin-navbar-1'>

 
  
  <NavLink to="/dashboard/admin/create-category" className="admin-link">Create Category</NavLink>
  <NavLink to="/dashboard/admin/create-product" className="admin-link">Create Product</NavLink>
  <NavLink to="/dashboard/admin/products" className="admin-link">Products</NavLink>
  <NavLink to="/dashboard/admin/orders" className="admin-link">Orders</NavLink>
  <NavLink to="/dashboard/admin/users" className="admin-link">Users</NavLink>
</div>
    

      
    </>
  )
}

export default AdminMenu
