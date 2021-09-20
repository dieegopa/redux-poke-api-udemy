import React from 'react'
import { useSelector, useDispatch} from 'react-redux' 
import { actualizarUsuarioAccion, editarFotoAccion } from '../redux/usuarioDucks'

const Perfil = () => {

    const usuario = useSelector(store => store.usuario.user)
    const loading = useSelector(store => store.usuario.loading)
    const [nombreUsuario, setNombreUsuario] = React.useState(usuario.displayName)
    const [activarFormulario, setActivarFormulario] = React.useState(false)
    const [error, setError] =  React.useState(false)
    const dispatch = useDispatch()

    const actualizarUsuario = () => {
        if(!nombreUsuario.trim()){
            return
        }

        dispatch(actualizarUsuarioAccion(nombreUsuario))
        setActivarFormulario(false)
    }

    const seleccionarArchivo = (imagen) => {
        //console.log(imagen.target.files[0])
        const imagenElegida = imagen.target.files[0];

        if(imagenElegida === undefined) {
            return
        }

        if(imagenElegida.type === 'image/png' || imagenElegida.type === 'image/jpg' || imagenElegida.type === 'image/jpeg'){
            dispatch(editarFotoAccion(imagenElegida))
            setError(false)
        }else{
            setError(true)
        }
    }

    

    return (
        <div className="mt-5 text-center">
            <div className="card">
                <div className="card-body">
                    <img src={usuario.photoURL} alt="" width="100px" className="img-fluid"/>
                    <h5 className="card-title">Nombre: {usuario.displayName}</h5>
                    <p className="card-text">Email: {usuario.email} </p>
                    <button className="btn btn-dark" onClick={()=>setActivarFormulario(true)}>Editar Nombre</button>
                    {
                        error && 
                            <div className="alert alert-warning mt-3">
                                Solo archivos .png o .jpg
                            </div>
                    }
                    <div className="custom-file">
                        <input 
                            type="file" 
                            className="custom-file-input" 
                            id="validatedCustomFile" 
                            required
                            disabled = {loading}
                            style={{display:'none'}}
                            onChange={ (e) => seleccionarArchivo(e) }
                        />
                        <label 
                            className={loading ? "btn btn-dark disabled mt-2" : "btn btn-dark mt-2"}
                            htmlFor="validatedCustomFile"
                            >
                                Editar foto perfil
                        </label>
                    </div>
                
                </div>
                {
                    loading && 
                        <div className="card-body">
                            <p className="text-center">Cargando...</p>
                        </div>
                }
                {
                    activarFormulario ? (
                        <div className="card-body">
                            <div className="row justify-content-center">
                                <div className="col-md-5">
                                    <div className="input-group mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            aria-label="Recipient's username"
                                            value={nombreUsuario}
                                            onChange={(e)=>setNombreUsuario(e.target.value)}
                                        />
                                        <div className="input-group-append">
                                            <button
                                                className="btn btn-dark"
                                                type="button"
                                                onClick={ ()=> actualizarUsuario()}
                                            >
                                                Actualizar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : null
                }
            </div>
        </div>
    )
}

export default Perfil
