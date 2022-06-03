import React from 'react'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'
import Registro from './Registro'

const Requerimiento = () => {
  const navigate = useNavigate()
  const [user, setUser] = React.useState(null)
  React.useEffect(() => {
    if (auth.currentUser) {
      console.log('Existe el Usuario')
      setUser(auth.currentUser)
    } else {
      console.log('No existe el ususario')
      navigate("/Login")
    }

  }, [navigate])


  return (

    <div>
     
      {
         
        user && (
         // <h3>Usuario:{user.email}</h3>
          <Registro user={user}/>

        )
      }
     
    </div>
  )
}

export default Requerimiento
