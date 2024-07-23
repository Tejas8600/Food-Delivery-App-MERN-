
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'

import { useEffect, useState } from 'react'


export default function Home() {

    const [search, setSearch] = useState('');//Searching The items according to their names
    const [foodCat, setFoodCat] = useState([]);
    const [foodItem, setFoodItem] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const loadData = async () => {
        let response = await fetch("http://localhost:5000/api/foodData", {
            method: "POST",
            headers: {
                'content-Type': 'application/json'
            }
        });

        response = await response.json();

        setFoodItem(response[0])
        setFoodCat(response[1]);
        setIsLoading(false);
        // console.log(response[0],response[1]);
    }


    useEffect(() => {
        loadData()
    }, [])





    return (
        <div>
            <div><Navbar /></div>
            <div> <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride='carousel' style={{ objectFit: "contain !important" }}>

                <div className="carousel-inner" id='carousel'>
                    <div className="carousel-caption" style={{ zIndex: "10" }}>
                        <div className="d-flex justify-content-center"  role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
                            {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
                        </div>
                    </div>
    
                    <div className="carousel-item active">
                        <img src="https://img.etimg.com/thumb/width-640,height-480,imgsize-567550,resizemode-75,msid-108623023/top-trending-products/kitchen-dining/outdoor/best-barbeque-grills-under-1000/best-barbeque-grills.jpg" className="d-block w-100" style={{ filter: "brightness(60%" }} alt="..." />
                    </div>
                    <div className="carousel-item active">
                        <img src=" https://healthnewshub.org/wp-content/uploads/2024/03/Fast-Food-Restaurants.jpg" className="d-block w-100" style={{ filter: "brightness(60%" }} alt="..." />
                    </div>
                   
                    <div className="carousel-item active">
                        <img src="https://i.pinimg.com/736x/56/ec/99/56ec99be64f9c128563540fae6598f83.jpg" className="d-block w-100" style={{ filter: "brightness(60%" }} alt="..." />
                    </div>
                    
                    <div className="carousel-item">
                        <img src="https://img.onmanorama.com/content/dam/mm/en/food/readers-recipe/images/2020/8/20/chocolatepastry.jpg" className="d-block w-100" style={{ filter: "brightness(60%" }} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://img.freepik.com/free-photo/grill-with-variety-meats-it_188544-8372.jpg" className="d-block w-100" style={{ filter: "brightness(60%" }} alt="..." />
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
            <div className='container'>
                {isLoading ? (
                    <div>Loading Categories...</div>
                ) : (
                    foodCat.length > 0 ? (
                        foodCat.map((data) => (
                            <div key={data._id} className='category-section'>
                                <h3 className='fs-3 m-3'>{data.CategoryName}</h3> {/* Adding margin for spacing */}
                                <hr />
                                <div className='row mb-3'> {/* Bootstrap row for items */}
                                    {foodItem.length > 0 ? (
                                        foodItem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase()))) 
                                            .map((filteredItem) => (
                                                <div key={filteredItem._id} className='col-12 col-md-6 col-lg-3 '> {/* Bootstrap column for item */}

                                                    <Card foodItem={filteredItem}
                                                    // foodName={filteredItem.name}
                                                        options={filteredItem.options[0]}
                                                        // imgSrc={filteredItem.img}
                                                    ></Card>
                                                </div>
                                            ))
                                    ) : (
                                        <div>No Data Found</div>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div>No Categories Found</div>
                    )
                )}
            </div>
            <Footer />
        </div>
    );

}
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';
// import Card from '../components/Card';
// import Carousel from '../components/Carousel';
// import { useEffect, useState } from 'react';

// export default function Home() {
//     const [foodCat, setFoodCat] = useState([]);
//     const [foodItem, setFoodItem] = useState([]);

//     const loadData = async () => {
//         try {
//             let response = await fetch("http://localhost:5000/api/foodData", {
//                 method: "POST",
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             });

//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }

//             const data = await response.json();
//             setFoodItem(data[0]);
//             setFoodCat(data[1]);
//         } catch (error) {
//             console.error('Failed to fetch food data:', error);
//         }
//     };

//     useEffect(() => {
//         loadData();
//     }, []);

//     return (
//         <div>
//             <Navbar />
//             <Carousel />
//             <div className='container'>
//                 {
//                     foodCat.length > 0
//                         ? foodCat.map((data, catIndex) => (
//                             <div key={catIndex} className='category-section'>
//                                 <h3 className='fs-3 m-3'>{data.CategoryName}</h3>
//                                 <hr />
//                                 <div className='food-items'>
//                                     {
//                                         foodItem.length > 0
//                                             ? foodItem.filter((item) => item.CategoryName === data.CategoryName)
//                                                 .map((filteritems, itemIndex) => (
//                                                     <Card key={itemIndex} item={filteritems} />
//                                                 ))
//                                             : <div>No Data Found</div>
//                                     }
//                                 </div>
//                             </div>
//                         ))
//                         : <div>Loading Categories...</div>
//                 }
//             </div>
//             <Footer />
//         </div>
//     );
// }
