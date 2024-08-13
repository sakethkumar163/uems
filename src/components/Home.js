import React from 'react'

const Home = () => {
  return (
    <div className='container'>
      <div id="carouselExample" className="carousel slide">
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src="img1.jpeg" className="d-block w-100" alt="..." height={630}/>
    </div>
    <div className="carousel-item">
      <img src="img2.jpeg" className="d-block w-100" alt="..." height={630}/>
    </div>
    <div className="carousel-item">
      <img src="img3.avif" className="d-block w-100" alt="..." height={630}/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
    </div>
  )
}

export default Home
