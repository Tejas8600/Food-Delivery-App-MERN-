// import React, { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import Badge from 'react-bootstrap/Badge'
// import Cart from '../screens/Cart';
// import Modal from "../Modal";
// import { useCart } from './ContextReducer';


// export default function Navbar() {
//   const[cartView,setCartView]=useState(false)
//   let data = useCart();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem('authToken');
//     navigate("/login")
//   }


//   return (
//     <div>
//       <nav class="navbar navbar-expand-lg navbar-dark bg-transparent">
//         <div class="container-fluid">
//           <Link class="navbar-brand fs-1 fst-italic" to="/">Foodiee!</Link>
//           <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
//             <span class="navbar-toggler-icon"></span>
//           </button>
//           <div class="collapse navbar-collapse" id="navbarNav">
//             <ul class="navbar-nav me-auto mb-2">
//               <li class="nav-item">
//                 <Link class="nav-link active  fs-5" aria-current="page" to="/">Home</Link>
//               </li>
//               {(localStorage.getItem("authToken")) ?
//                 <li class="nav-item">
//                   <Link class="nav-link active  fs-5" aria-current="page" to="/">My Orders</Link>
//                 </li>
//                 : ""}


//             </ul>
//             {(!localStorage.getItem("authToken")) ?
//               <div className='d-flex'>
//                 <Link className="btn bg-success text-white mx-1" to="/login">Login</Link>
//                 <Link className="btn bg-success text-white mx-1" to="/createuser">SignUp</Link>
//               </div>
//               :
//               <div>
//                 <div className='btn bg-white text-success fw-bold mx-2' onClick={()=>{setCartView(true)}}>
//                   My Cart{" "}
//                   <Badge pill bg="danger" > {data.length} </Badge>
                  
//                   {cartView?<Modal onClose={()=>setCartView(false)}><Cart></Cart></Modal>:null }
                  
//                 </div>
//                 <div className='btn bg-white text-danger fw-bold mx-2' onClick={handleLogout}>
//                   Logout
//                 </div></div>
//             }
//           </div>
//         </div>
//       </nav>

//     </div>
//   )
// }
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import Cart from '../screens/Cart';
import Modal from '../Modal';
import { useCart } from '../components/ContextReducer';

export default function Navbar() {
  const [cartView, setCartView] = useState(false);
  let data = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">Foodiee!</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
              </li>
              {localStorage.getItem("authToken") && (
                <li className="nav-item">
                  <Link className="nav-link active fs-5" aria-current="page" to="/myOrder">My Orders</Link>
                </li>
              )}
            </ul>
            {!localStorage.getItem("authToken") ? (
              <div className="d-flex">
                <Link className="btn bg-success text-white mx-1" to="/login">Login</Link>
                <Link className="btn bg-success text-white mx-1" to="/createuser">Sign Up</Link>
              </div>
            ) : (
              <div>
                <div className="btn bg-white text-success fw-bold mx-2" onClick={() => setCartView(true)}>
                  My Cart{" "}
                  <Badge pill bg="danger"> {data.length} </Badge>
                  {cartView && <Modal onClose={() => setCartView(false)}><Cart /></Modal>}
                </div>
                <div className="btn bg-white text-danger fw-bold mx-2" onClick={handleLogout}>
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
