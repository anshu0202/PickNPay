import React,{useState,useEffect} from 'react'
import AdminMenu from '../../components/Layout/AdminMenu';
import Layout from '../../components/Layout/Layout';
import { getAllOrdersAdmin, updateOrder } from '../../services/ProductApi';
import moment from 'moment';
import { useAuth } from '../../context/auth';
import { Select } from 'antd';
import { toast } from 'react-hot-toast';

const {Option} =Select;

const AdminOrders = () => {

  const URL = process.env.REACT_APP_API;


    const [orders,setOrders]=useState([]);
    const [status, setStatus]=useState(["Not Process","Processing","Shipped","Delivered","Canceled"]);

    const [changeStatus,setChangeStatus]=useState("");

    const [auth]=useAuth();
 
     
    const getOrdersList = async()=>{
         const data= await getAllOrdersAdmin();
 
           setOrders(data);
         
    }

    const handleChange=async(orderId,value)=>{
                try{
                        const data=await updateOrder(orderId,{status:value});

                        getOrdersList();

                }
                catch(error){
                    console.log("Error while updating order ",error.message);
                    toast.error("Error while updating order ",error.message)
                }
    }
    useEffect(()=>{
       if(auth?.token){
         getOrdersList()
       }
         
    },[auth?.token])

  return (
    <Layout>
     <div className='row container-fluid m-3 p-3'>

    <div className='row'>

    <div className="col-md-3">
    <AdminMenu/>
    </div>
    <div className="col-md-9">
    
                  <h1 className='text-center'>
                    All Orders
                  </h1>
                  {
                    orders?.map((o,i)=>{
                      return (
                        <div className="border shadow">
                        <table className='table'>
                        <thead>
                          <tr>
                            <th scope='col'>#</th>
                            <th scope='col'>Status</th>
                            <th scope='col'>Buyer</th>
                            <th scope='col'>Date</th>
                            <th scope='col'>Payment</th>
                            <th scope='col'>Quantity</th>
                          </tr>
                        </thead>
                        <tbody>

                          <tr>
                            <td>{i+1}</td>
                            <td><Select bordered={false} onChange={(value)=>handleChange(o?._id,value)} defaultValue={o?.status} >
                            {
                                status?.map( (s,i)=>(
                                    <Option key={i} value={s}>
                                    {s}
                                    </Option>
                                ))
                            }

                            </Select></td>
                            <td>{o?.buyer?.name}</td>
                            <td>{moment(o?.createdAt).fromNow()}</td>
                            <td>{o?.payment?.success ?"Success":"Failed"}
                            </td>
                            <td>{o?.products?.length}</td>
                          </tr>
                        </tbody>

                        </table>
                        <div className="container">
            {
                o?.products?.map(product=>(
                    <div className="row mb-2 p-3 card flex-row">
                        <div className="col-md-4">
                        <img src={`${URL}/api/v1/product/product-photo/${product._id}`} style={{width: '120px', height:'120px'}} className="card-img-top" alt={product.name} />
                        </div>
                        <div className="col-md-8">
                            <p>
                                Name: {product.name}
                            </p>
                            <p>
                               Description :  {product.description.substring(0,30)}...
                            </p>
                            <p>₹ Price : {product.price}</p>
                          
                        </div>
                    </div>
                ))
            }
          </div>
                        
                        </div>
                      )
                    })
                  }
                     

            

    </div>

      
    </div>
    </div>
    </Layout>
  )
}

export default AdminOrders
