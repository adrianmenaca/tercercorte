import Requerimiento from './Components/Requerimiento';
import Inicio from './Components/Inicio';
import Login from './Components/Login';
import Navbar from './Components/Navbar';
import { auth } from './firebase';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  } from "react-router-dom";
import React from 'react';

  

function App() {
  const [firebaseUser,setFirebaseUser]=React.useState(false)
  React.useEffect(()=>{
   auth.onAuthStateChanged(user=>{
    console.log(user);
    if (user) {
      setFirebaseUser(user)

    } else {
      setFirebaseUser(null)
      
    }

   })

  },[])
  return firebaseUser!==false ? (
    <Router>
      <div className='container'>
        <Navbar firebaseUser={firebaseUser}/>
     <Routes>
      <Route path="/" element={<Inicio/>}/>
      <Route path="Login" element={<Login/>}/>
      <Route path="Requerimiento" element={<Requerimiento/>}/>
     </Routes>

      </div>
    </Router>
  

  ): (
    <p>Cargando...</p>
  )
  
  ;
}

export default App;
