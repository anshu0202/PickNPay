import React, {useEffect} from 'react'
import "../../style/home.css"


const HomeBanner = () => {

  
  
  return (
    <>
   
<div id="carouselExampleInterval" className="carousel slide home-slider" data-bs-ride="carousel">
  <div className="carousel-inner">
    <div className="carousel-item active " data-bs-interval={1000}>
      <img src="https://i.pinimg.com/originals/14/0d/82/140d824f8af317352197f741fe036b36.png" className="d-block w-100" alt="..." />
    </div>
    <div className="carousel-item" data-bs-interval={2000}>
      <img src="https://www.grandhotelgardone.it/images/slide/shopping/slides_shopping.jpg" className="d-block w-100" alt="..." />
    </div>
    <div className="carousel-item" data-bs-interval={3000}>
      <img src="https://learn.g2.com/hubfs/iStock-984796804.jpg" className="d-block w-100" alt="..." />
    </div>
  </div>
  <button class="carousel-control-prev"  type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
    <span class="carousel-control-prev-icon"  aria-hidden="false"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button"   data-bs-target="#carouselExampleInterval" data-bs-slide="next">
    <span class="carousel-control-next-icon"  aria-hidden="false"></span>
    <span class="visually-hidden">Next</span>
  </button>
  
</div>

  {/* <div className='home-slider'>
    <img src="https://wallpaperboat.com/wp-content/uploads/2020/11/10/60057/shopping-17.jpg" className='slider-sec-img' alt="" />
  </div> */}



   
    </>
  )
}

export default HomeBanner
