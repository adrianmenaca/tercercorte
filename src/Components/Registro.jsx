import React from 'react'
import { db } from '../firebase'

const Registro = (props) => {
    const [servicio, setServicio] = React.useState('')
    const [descripcion, setDescripcion] = React.useState('')

    const [id, setId] = React.useState('')
    const [lista, setLista] = React.useState([])
    const [modoEdicion, setModoEdicion] = React.useState(false)
    const [error, setError] = React.useState(null)

    React.useEffect(() => {
        const obtenerDatos = async () => {
            try {

                const data = await db.collection(props.user.email).get()
                const arrayData = data.docs.map(doc=> ( {  id: doc.id, ...doc.data()}
                ))
                console.log(arrayData)
                setLista(arrayData)
            } catch (error) {
                console.log(error)
            }
        }
        obtenerDatos()
    }, [])

    // datos
    const guardarDatos = async (e) => {
        e.preventDefault()

        if (!servicio.trim()) {
            setError("Digite el servicio")
            return
        }
        if (!descripcion.trim()) {
            setError("Digite la descripcion")
            return
        }
        try {
            const nuevoUsuario = {
                servicio, descripcion
            }
            const dato = await db.collection(props.user.email).add(nuevoUsuario)
            setLista([
                ...lista, { ...nuevoUsuario, id: dato.id }
            ])
        } catch (error) {
            console.log(error)
        }
        setServicio('')
        setDescripcion('')
        setError(null)
    }

    //función eliminar dato
    const eliminarDato = async (id) => {
        try {

            await db.collection(props.user.email).doc(id).delete()
            const listaFiltrada = lista.filter((elemento) => elemento.id !== id)
            setLista(listaFiltrada)
        } catch (error) {
            console.log(error);
        }


    }



    //funcion editar elemento
    const editar = (elemento) => {
        setModoEdicion(true)//cambiar modo edicion a verdadero
        //se actualiza estados para que los datos aparezcan en input
        setServicio(elemento.servicio)
        setDescripcion(elemento.descripcion)
        setId(elemento.id)
    }

    const editarDatos = async (e) => {
        e.preventDefault()
        //validaciones
        if (!servicio.trim()) {
            setError('Ingrese el servicio')
            return
        }
        if (!descripcion.trim()) {
            setError('Ingrese la descripcion')
            return
        }
        try {
            await db.collection(props.user.email).doc(id).update({
                servicio, descripcion
            })
            const listaEditada = lista.map(
                //recorre toda la lista, cuando encuentre el id agrega id, nuevoservicio y nuevdescripcion, 
                //sino devuelve cada elemento
                //nueva lista
                (elemento) => elemento.id === id ? { id: id, servicio: servicio, descripcion: descripcion } :
                    elemento)
            //listar con los valores nuevos...lista nueva
            setLista(listaEditada)
            //cambiar modo a dejar de editar y limpiar estados
            setModoEdicion(false)
            setServicio('')
            setDescripcion('')
            setId('')
            //quitar msj de error
            setError(null)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="container">
            <h2 className="text-center">{
                modoEdicion ? 'Editar Servicio' : 'Registro de Servicio'
            }</h2>
            {/*primera fila para el formulario*/}
            <div className="row">
                <div className="col-12">
                    <form onSubmit={modoEdicion ? editarDatos : guardarDatos}>
                        {/*mensaje error */}
                        {
                            error ? (
                                <div className="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            ) :
                                null
                        }

                         <h4>Categoria Y Tipos de Servicio</h4>
                        <select className="form-select form-select-sm mb-3" aria-label=".form-select-sm example"
                            onChange={(e) => { setServicio(e.target.value) }}
                            value={servicio}
                        >
                            <option selected>Open Menu</option>
                            <optgroup label="MANTENIMIENTO INMUEBLES">
                                <option value="baños">Baños</option>
                                <option value="cielo raso">Cielo Raso</option>
                                <option value="electrico">Electrico</option>
                                <option value="pared">Pared</option>
                                <option value="puerta">Puerta</option>
                            </optgroup>
                            <optgroup label="MANTENIMIENTO MUEBLES">
                                <option value="aire acondicionado">Aire acondicionado</option>
                                <option value="archivador">Archivador</option>
                                <option value="puesto de trabajo">Puesto de Trabajo</option>
                                <option value="silla">Silla</option>
                            </optgroup>
                            <optgroup label="SERVICIOS">
                                <option value="aseo">Aseo</option>
                                <option value="transporte">Transporte</option>
                                <option value="vigilancia">Vigilancia</option>
                            </optgroup>
                        </select>

                        <h4>Describe el Servicio</h4>            
                        {/*input servicio */}
                        <input type="text"
                            placeholder="Descripcion del Problema"
                            className="form-control mb-3"
                            onChange={(e) => { setDescripcion(e.target.value) }}
                            value={descripcion}
                        />
                        {/*boton agregar*/}
                        <div className="d-grid gap-2">
                            {
                                modoEdicion ? <button className="btn btn-outline-warning mb-3" type="submit">Editar</button>
                                    : <button className="btn btn-dark mr-3 " type="submit">Agregar</button>
                            }
                        </div>
                    </form>
                </div>
            </div>
            {/*fila para la lista */}
            <div className="row">
                <div className="col-12">
                    <h4 className="text-center">Consulta de Servicio</h4>
                    <ul className="list-group">
                        {
                            lista.length === 0 ? <li className="list-group-item">No existen Usuarios</li> :
                                (
                                    lista.map((elemento) => (
                                        <li className="list-group-item" key={elemento.id}><span className="lead">
                                            {elemento.servicio}-  Descripcion: {elemento.descripcion}
                                        </span>
                                            <button className="btn btn-success btn-sm mx-2 float-end"
                                                onClick={() => editar(elemento)}
                                            >Editar</button>
                                            <button className="btn btn-danger btn-sm mx-2 float-end"
                                                onClick={() => eliminarDato(elemento.id)}
                                            >Eliminar</button>
                                        </li>
                                    ))
                                )
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Registro
