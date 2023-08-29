import React,{useState,useEffect} from 'react'
import AdminMenu from '../../components/Layout/AdminMenu';
import Layout from '../../components/Layout/Layout';
import { getAllOrdersAdmin, updateOrder } from '../../services/ProductApi';
import moment from 'moment';
import { useAuth } from '../../context/auth';
import { Select } from 'antd';
import { toast } from 'react-hot-toast';
import "../../../src/style/adminStyle/adminMenu.css";



const {Option} =Select;

const AdminOrders = () => {

  const URL = process.env.REACT_APP_API;


    const [orders,setOrders]=useState([]);
    const [status, setStatus]=useState(["Not Process","Processing","Shipped","Delivered","Canceled"]);

    const [changeStatus,setChangeStatus]=useState("");

    const [auth]=useAuth();
 
     
    const getOrdersList = async()=>{
         const data= await getAllOrdersAdmin();

         console.log("admin order is ",data);
 
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
    

    <div className='admin-dashboard-product'>
           <AdminMenu/>
           <div className="col-md-9" style={{margin:"auto"}}>
    
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
              <td>{o?.payment!=undefined ?"Success":"Failed"}
              </td>
              <td>{o?.products?.length}</td>
            </tr>
          </tbody>

          </table>
          <div className="container">
{
  o?.products?.map(product=>(
      <div className="row mb-2 p-3 card flex-row">
          <div className="col-md-4" style={{display:"flex" , alignItems:"center", justifyContent:"center"}}>
          <img src={`${URL}/api/v1/product/product-photo/${product.productId._id}`} style={{width: '10rem', height:'10rem'}} className="card-img-top" alt={product.name} />
          </div>
          <div className="col-md-8">
              <p>
                  Name: {product.productId.name}
              </p>
              <p>
                 {/* Description :  {product.productId.description.substring(0,50)}... */}
                 Description :  {product.productId.description}
              </p>
              <p>₹ Price : {product.price}</p>
              <p>₹ Quantity : {product.quantity}</p>
              <p>
                            Size:{" "}
                            {product.size === "s" ? (
                              <span>Small</span>
                            ) : product.size === "m" ? (
                              <span>Medium</span>
                            ) : product.size === "l" ? (
                              <span>Large</span>
                            ) : product.size === "xl" ? (
                              <span>Extra-large</span>
                            ) : (
                              <span>Unknown</span>
                            )}
                          </p>
            
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

    </Layout>
  )
}

export default AdminOrders
