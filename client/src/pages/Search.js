import React, { useState } from 'react'
import Layout from "../components/Layout/Layout";
import { useSearch } from '../context/search';
import { Link } from 'react-router-dom';

const Search = () => {
    const [values,setValues]=useSearch();
     const [products,setProducts]=useState(values?.results.products);
    console.log("values are ",values);
    const URL = process.env.REACT_APP_API;

    

  return (
    <Layout>

    <div className="container">
        <div className="text-center">
            <h1>Search Results</h1>
            <h6>{values?.results?.products?.length<1?"No Products Found":`Found ${values?.results?.products?.length}`}</h6>
            <div className="d-flex flex-wrap mt-4">
          {
          products?.map(product =>(
            <Link className='product-link' key={product._id} to={`/dashboard/admin/products/${product.slug}`}>

           <div className="card m-2"   >
  <img src={`${URL}/api/v1/product/product-photo/${product._id}`} style={{width: '18rem'}} className="card-img-top" alt={product.name} />
  <div className="card-body">
    <h5 className="card-title">{product.name}</h5>
    <p className="card-text">{product.description.substring(0,20)}....</p>
    <p className="card-text"> ₹ {product.price}</p>
    <button className='btn btn-primary ms-1'>More Details</button>
    <button className='btn btn-secondary ms-1'>ADD TO CART</button>
  </div>
</div>
            </Link>

          )) 
        }
          </div>
        </div>
    </div>
      
    </Layout>
  )
}

export default Search;
