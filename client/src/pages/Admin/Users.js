// import React from 'react'
// import Layout from '../../components/Layout/Layout'
// import AdminMenu from '../../components/Layout/AdminMenu'

// const Users = () => {
//   return (
//     <Layout title={"All-Users"}>
//         <div className="container-fluid m-3 p-3">
     
//       <div className='row'> 
//       <div className='col-md-3'>
//         <AdminMenu/>
//       </div>

//       <div className="col-md-9">
//       <h1>All users</h1>
//       </div>
//       </div>
//       </div>
//     </Layout>
//   )
// }

// export default Users


import React,{useState,useEffect} from 'react'
import AdminMenu from '../../components/Layout/AdminMenu';
import Layout from '../../components/Layout/Layout';
import { getAllUsersAdmin, updateOrder } from '../../services/ProductApi';
import moment from 'moment';
import { useAuth } from '../../context/auth';
import { Select } from 'antd';
import { toast } from 'react-hot-toast';
import "../../../src/style/adminStyle/adminMenu.css";



const {Option} =Select;

const AdminUsers = () => {

  const URL = process.env.REACT_APP_API;


    const [users,setUsers]=useState([]);
    const [status, setStatus]=useState(["Not Process","Processing","Shipped","Delivered","Canceled"]);

    const [changeStatus,setChangeStatus]=useState("");

    const [auth]=useAuth();
 
     
    const getUsersList = async()=>{
         const data= await getAllUsersAdmin();

         console.log("admin users is ",data);
 
           setUsers(data);
         
    }

    const handleChange=async(orderId,value)=>{
                try{
                        const data=await updateOrder(orderId,{status:value});

                        getUsersList();

                }
                catch(error){
                    console.log("Error while updating order ",error.message);
                    toast.error("Error while updating order ",error.message)
                }
    }
    useEffect(()=>{
       if(auth?.token){
         getUsersList()
       }
         
    },[auth?.token])

  return (
    <Layout>
    

    <div className='admin-dashboard-product'>
           <AdminMenu/>
           <div className="col-md-9" style={{margin:"auto"}}>
    
    <h1 className='text-center'>
      All Users ({users.length})
    </h1>
  
          <div className="border shadow">
          <table className='table table-striped'>
          <thead>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Name</th>
              <th scope='col'>Email</th>
              <th scope='col'>Phone</th>
              <th scope='col'>Address</th>
              <th scope='col'>Role</th>
            </tr>
          </thead>
          <tbody>
            
           
            {
              users?.map((u,i)=>(
                  <>
                  <tr>
                  <td>{i+1}</td>
              <td>{u?.name}</td>
             
              <td>{u?.email}
              </td>
              <td>{u?.phone}</td>
              <td>{u?.address}</td>
              <td>{u?.role===0? <span style={{color:"green"}}>User</span>: <span style={{color:"Red", fontWeight:"700"}}>Admin</span> }</td>
              </tr>
                  </>
                
                
              ))
            }
              
          </tbody>

          </table>
          </div>
  
</div>



    </div>

    </Layout>
  )
}

export default AdminUsers;

