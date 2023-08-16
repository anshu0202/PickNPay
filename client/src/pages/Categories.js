import React,{useState,useEffect} from 'react'
import Layout from '../components/Layout/Layout';
import useCategory from '../hooks/useCategory';
import { Link } from 'react-router-dom';

const Categories = () => {

    // const [categories,setCategories]=useState([]);

    const categories=useCategory();



    const getAllCat=async()=>{
       
        try{

        }
        catch(error){

            console.log("Error while getting all categories ",error.message);

        }
    }

    useEffect(()=>{
         getAllCat();
    },[]);

  return (
    <Layout title={'All Categories'}>

    
        <div className="container">
            <div className="row">

            {
                categories?.map(c=>(
                <div className="col-md-6" key={c._id}>
                  
                    <Link to={`/category/${c.slug}`}className='btn btn-primary mt-5 mb-2 gx-2 gy-2'>
                        {c.name}
                    </Link>
            
                </div>
                ))
            }
            </div>
        </div>

    </Layout>
  )
}

export default Categories;
