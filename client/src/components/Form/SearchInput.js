import React from 'react';
import { useSearch } from '../../context/search';

import {useNavigate} from "react-router-dom";
import { getSearchProducts } from '../../services/ProductApi';

const SearchInput = () => {
    const [values, setValues]= useSearch();

    const navigate=useNavigate();


    const handleSubmit= async(e)=>{
        e.preventDefault();
        try{

          const data=await getSearchProducts(values.keyword);

          setValues({...values,results:data});
          navigate("/search");
          
        }
        catch(error){
            console.log("Error while searching products ", error.message)
        }

    }

  return (
    <div>
    <form role="search" className='d-flex' onSubmit={handleSubmit}>
    <input className='form-control me-2' type="search" placeholder='Search' aria-label="Search" value={values.keyword} onChange={(e)=>setValues({...values,keyword:e.target.value})} />
    <button className='btn btn-outline-success' type='submit'>
        Search
    </button>
    </form>
      
    </div>
  )
}

export default SearchInput
