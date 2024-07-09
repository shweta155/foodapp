import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Card from '../components/Card'
import Footer from '../components/Footer'

function Home() {
    const [foodCat, setFoodCat] = useState([]);
    const [foodItems, setFoodItems] = useState([]);
    const [search, setSearch] = useState('');

    const loadData = async () => {
        let response = await fetch('http://localhost:3000/api/foodData', {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            }
        })
        response = await response.json();

        setFoodItems(response[0]);
        setFoodCat(response[1]);
        //  console.log(response[0],response[1]);
    }

    useEffect(() => {
        loadData();
    }, [])

    return (
        <div>
            <div><Navbar /></div>
            <div>
                <div id="carouselExampleFade" className="carousel slide carousel-fade " data-bs-ride="carousel" style={{ "objectFit": "contain !important" }}>

                    <div className="carousel-inner " id='carousel'>
                        <div class=" carousel-caption  " style={{ zIndex: "9" }}>
                            <div className=" d-flex justify-content-center">
                                <input className="form-control me-2 w-75 bg-white text-dark" 
                                type="search" placeholder="Search Here"
                                 value={search} onChange={(e)=>{setSearch(e.target.value)}} />
                                {/* <button className="btn text-white bg-success" type="submit">Search</button> */}
                            </div>
                        </div>
                        <div className="carousel-item active" >

                            <img src="https://images.unsplash.com/photo-1586190848861-99aa4a171e90?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                className="d-block w-100  " style={{ filter: "brightness(30%)", "height": "52rem" }} alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://images.unsplash.com/photo-1661994215679-cde7c2c5c060?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                className="d-block w-100 " style={{ filter: "brightness(30%)", "height": "52rem" }} alt="..." />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>

            <div className='container'> {/* boootstrap is mobile first */}
                {
                    foodCat !== []
                        ? foodCat.map((data) => {
                            return (
                                // justify-content-center
                                <div className='row mb-3'>
                                    <div key={data.id} className='fs-3 m-3'>
                                        {data.CategoryName}
                                    </div>
                                    {/* <hr/> */}
                                    <hr id="hr-success" style={{ height: "4px", backgroundImage: "-webkit-linear-gradient(left,rgb(0, 255, 137),rgb(0, 0, 0))" }} />
                                    {foodItems !== [] ? foodItems.filter(
                                        (items) => (items.CategoryName === data.CategoryName && items.name.toLowerCase().includes(search.toLowerCase())))
                                        .map(filterItems => {
                                            return (
                                                <div key={filterItems.id} className='col-12 col-md-6 col-lg-3'>
                                                    {console.log(filterItems.url)}

                                                    <Card 
                                                    // foodName={filterItems.name}
                                                     item={filterItems} 
                                                     options={filterItems.options[0]} 
                                                    //  ImgSrc={filterItems.img} 
                                                     ></Card>

                                                </div>
                                            )
                                        }) : <div> No Such Data </div>}
                                </div>
                            )
                        })
                        : ""}
            </div>
            <Footer />
        </div>









    )
}
export default Home
