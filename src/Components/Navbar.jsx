import React from 'react'
import {Link,useNavigate} from "react-router-dom";
import { auth } from '../firebase';


const Navbar = (props) => {
  const navigate=useNavigate()
  const cerrarSesion=()=>{
   auth.signOut()
   
   .then(()=>{
     navigate("/login")
   })
  }

  return (
    <div className='navbar navbar-dark bg-dark'>
        <Link className="navbar-brand" to="/">TECK
        </Link>
        <div>
           <div className='d-flex'>
            <Link to="/" className='btn btn-dark mr-3'>inicio </Link>
            {
              props.firebaseUser !==null ? (
              <Link to="/Requerimiento" className='btn btn-dark mr-3'>Requerimiento</Link>):null
            }
            
            {
              props.firebaseUser !==null ? (
                <button className='btn btn-warning mr-3'
                onClick={()=>cerrarSesion()}
                >Cerrar Sesion</button>
              ):(
              <Link to="/Login" className='btn btn-dark mr-3'>login </Link>
              )
            }
            

           </div>


        </div>
    
    </div>
  


  )
}

export default Navbar