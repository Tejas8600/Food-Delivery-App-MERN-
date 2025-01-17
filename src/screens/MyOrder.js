// import React, { useState } from 'react'
// import Footer from '../components/Footer'
// import Navbar from '../components/Navbar'
// export default function MyOrder() {
//     const[orderData,setOrderData]=useState("");

//     const fetchMyOrder = async () => {
//         console.log(localStorage.getItem('userEmail'))
//         await fetch("http://localhost:5000/api/myOrderData", {
//             // credentials: 'include',
//             // Origin:"http://localhost:3000/login",
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body:JSON.stringify({
//                 email:localStorage.getItem('userEmail')
//             })
//         }).then(async (res) => {
//             let response = await res.json()
//             await setOrderData(response)
//         })



//         // await res.map((data)=>{
//         //    console.log(data)
//         // })


//     }

//     useEffect(() => {
//         fetchMyOrder()
//     }, [])


import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {

    const [orderData, setOrderData] = useState([]);

    const fetchMyOrder = async () => {
        const userEmail = localStorage.getItem('userEmail');
        if (!userEmail) return;

        try {
            const response = await fetch("http://localhost:5000/api/myOrderData", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: userEmail })
            });

            if (!response.ok) throw new Error("Failed to fetch orders");

            const data = await response.json();
            console.log("Fetched order data:", data);
            setOrderData(data.orderData.order_data || []); // Ensure we set an array to the state
        } catch (error) {
            console.error("Error fetching order data:", error);
        }
    };

    useEffect(() => {
        fetchMyOrder();
    }, []);

    useEffect(() => {
        console.log("Current order data state:", orderData); // Log the current state
    }, [orderData]);

    return (
        <div>
            <div>
                <Navbar />
            </div>
            <div className='container'>
                <div className='row'>
                    {orderData.length > 0 ? orderData.slice(0).reverse().map((order, orderIndex) => (
                        <React.Fragment key={orderIndex}>
                            <div className='m-auto mt-5'>
                                <div>Order Date: {order[0].Order_date}</div>
                                <hr />
                            </div>
                            {order.map((item, itemIndex) => (
                                item.Order_date ? null : (
                                    <div className='col-12 col-md-6 col-lg-3' key={itemIndex}>
                                        <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                            {/* <img src={item.img} className="card-img-top" alt={item.name} style={{ height: "120px", objectFit: "fill" }} /> */}
                                            <div className="card-body">
                                                <h5 className="card-title">{item.name}</h5>
                                                <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                    <span className='m-1'>{item.qty}</span>
                                                    <span className='m-1'>{item.size}</span>
                                                    <span className='m-1'>{order[0].Order_date}</span>
                                                    <div className='d-inline ms-2 h-100 w-20 fs-5'>
                                                        ₹{item.price}/-
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            ))}
                        </React.Fragment>
                    )) : <div className='m-5 w-100 text-center fs-3'>No Orders Found!</div>}
                </div>
            </div>
            <Footer />
        </div>
    );
}






// import React, { useEffect, useState } from 'react';
// import Footer from '../components/Footer';
// import Navbar from '../components/Navbar';

// export default function MyOrder() {

//     const [orderData, setOrderData] = useState([]);

//     const fetchMyOrder = async () => {
//         const userEmail = localStorage.getItem('userEmail');
//         if (!userEmail) {
//             return;
//         }

//         try {
//             const response = await fetch("http://localhost:5000/api/myOrderData", {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({ email: userEmail })
//             });

//             if (!response.ok) {
//                 throw new Error("Failed to fetch orders");
//             }

//             const data = await response.json();
//             console.log("Fetched order data:", data);  // Checking consloe
//             setOrderData(data);
//         } catch (error) {
//             console.error("Error fetching order data:", error);
//         }
//     };

//     useEffect(() => {
//         fetchMyOrder();
//     }, []);

//     useEffect(() => {
//         console.log("Current order data state:", orderData); // Log the current state
//     }, [orderData]);
    
//     return (
//         <div>
//             <div>
//                 <Navbar />
//             </div>
//             <div className='container'>
//                 <div className='row'>
//                     {orderData.length > 0 ? orderData.map((data, index) => (
//                         data.orderData ? data.orderData.order_data.slice(0).reverse().map((item, itemIndex) => (
//                             item.map((arrayData, arrayIndex) => (
//                                 <div key={`${index}-${itemIndex}-${arrayIndex}`}>
//                                     {arrayData.Order_date ? (
//                                         <div className='m-auto mt-5'>
//                                             <div>{arrayData.Order_date}</div>
//                                             <hr />
//                                         </div>
//                                     ) : (
//                                         <div className='col-12 col-md-6 col-lg-3'>
//                                             <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
//                                                 <img src={arrayData.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
//                                                 <div className="card-body">
//                                                     <h5 className="card-title">{arrayData.name}</h5>
//                                                     <div className='container w-100 p-0' style={{ height: "38px" }}>
//                                                         <span className='m-1'>{arrayData.qty}</span>
//                                                         <span className='m-1'>{arrayData.size}</span>
//                                                         <span className='m-1'>{arrayData.Order_date}</span>
//                                                         <div className='d-inline ms-2 h-100 w-20 fs-5'>
//                                                             ₹{arrayData.price}/-
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     )}
//                                 </div>
//                             ))
//                         )) : null
//                     )) : <div className='m-5 w-100 text-center fs-3'>No Orders Found!</div>}
//                 </div>
//             </div>
//             <Footer />
//         </div>
//     );
// }



// {"orderData":{"_id":"63024fd2be92d0469bd9e31a","email":"mohanDas@gmail.com","order_data":[[[{"id":"62ff20fbaed6a15f800125e9","name":"Chicken Fried Rice","qty":"4","size":"half","price":520},{"id":"62ff20fbaed6a15f800125ea","name":"Veg Fried Rice","qty":"4","size":"half","price":440}],"2022-08-21T15:31:30.239Z"],[[{"id":"62ff20fbaed6a15f800125f4","name":"Mix Veg Pizza","qty":"4","size":"medium","price":800},{"id":"62ff20fbaed6a15f800125f3","name":"Chicken Doub;e Cheeze Pizza","qty":"4","size":"regular","price":480}],"2022-08-21T15:32:38.861Z"]],"__v":0}}