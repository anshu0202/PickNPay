import React ,{useState,useEffect}from 'react'
import Layout from '../../components/Layout/Layout';
import UserMenu from '../../components/Layout/UserMenu';
import { useAuth } from '../../context/auth';
import { toast } from 'react-hot-toast';
import { RegisterData, updateProfile } from '../../services/LoginApi';

const Profile = () => {

    const [auth,setAuth]=useAuth();
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    


      const getUserData=async()=>{
        try{
          const {email,name,address,phone}=auth?.user;
          setEmail(email);
          setPhone(phone);
          setAddress(address);
          setName(name)
        }
        catch(error){
          console.log("Error while getting user data ",error.message);
        }
      }

      const profileUpdate=async(e)=>{
        e.preventDefault();

        try{
          const data=await updateProfile({name,phone,email,address});
          if(data.success){
            toast.success("Profile updated successsfully")
            setAuth({...auth,user:data?.updatedUser})
            let ls=localStorage.getItem('auth');
            ls=JSON.parse(ls);
            ls.user=data.updatedUser;
            localStorage.setItem('auth',JSON.stringify(ls));

          }

        }
        catch(error){
          console.log("Error while updating profile ",error.message);
          toast.error("Error while updating profile ",error.message);
        }
      }

      useEffect(()=>{
          getUserData();
      },[auth?.user])

   
    
  return (
    <Layout title={"Profile"} >
    <div className="container-fluid m-3 p-3">
    <div className='row'>
        <div className="col-md-3">
       <UserMenu/>
        </div>
        <div className="col-md-8">
            <div className="form-container" style={{ marginTop: "20px" }}>
              <form onSubmit={profileUpdate}>
                <h4 className="title">USER PROFILE</h4>
                <div className="mb-3">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Enter Your Name"
                    autoFocus
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Enter Your Email "
                    disabled
                  />
                </div>
               
                <div className="mb-3">
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Enter Your Phone"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Enter Your Address"
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  UPDATE
                </button>
              </form>
            </div>
          </div>

    </div>

    </div>
      
    </Layout>
  )
}

export default Profile;
