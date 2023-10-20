import React from 'react'
import { Checkbox, Radio } from 'antd';

const Filter = ({handleFilter,categories,Prices,setRadio}) => {

  
  return (
    <div className='filter-section'>
       <h4 className='text-center'>Filters</h4>
       {
         categories.length>0?<>
         <h5 className='text-center'>   Categories  </h5>
         <hr />
              <div className="d-flex flex-column cat-list">

              {
                categories?.map(c=>(
                  <Checkbox key={c._id} className='cat-list-checkbox' onChange={(e)=>{ handleFilter(e.target.checked, c._id)}} >{c.name}</Checkbox>
                ))
              }
              </div>
              
              <hr />
         </>:<></> 
       }



              <h4 className='text-center mt-4'>   Price  </h4>
              <hr />
              <div className="d-flex flex-column">
              <Radio.Group onChange={(e)=>{setRadio(e.target.value)}} >
                {
                  Prices?.map(p=>(
                    <div key={p._id}>
                    <Radio value={p.array} className='cat-list-checkbox'> {p.name}
                    </Radio>
                    </div>
                  ))
                }
              </Radio.Group>
             
              </div>
              <div className="d-flex flex-row mt-2" style={{ justifyContent:"center"}}>
                
               <button className='btn-filter' onClick={()=>{window.location.reload()}}>Reset Filters</button>
              </div>
      
    </div>
  )
}

export default Filter
