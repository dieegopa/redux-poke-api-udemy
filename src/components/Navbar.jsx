import React from 'react'
import {Link, NavLink} from "react-router-dom";
import { cerrarSesionUsuarioAccion } from '../redux/usuarioDucks';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';

const Navbar = (props) => {

    const dispatch = useDispatch()
    const activo = useSelector(store=>store.usuario.activo)

    const cerrarSesion = () => {
        dispatch(cerrarSesionUsuarioAccion())
        props.history.push('/login')
    }

    return (
        <div className="navbar navbar-dark bg-dark">
            <Link to="/" className="navbar-brand">Poke API</Link>
            <div>
                <div className="d-flex">
                    {
                        activo ? (
                            <>
                                <NavLink 
                                    className="btn btn-dark mr-2" 
                                    to="/"
                                    exact
                                >
                                    Pokemon
                                </NavLink>
                                <NavLink 
                                    className="btn btn-dark mr-2" 
                                    to="/perfil"
                                    exact
                                >
                                    Perfil
                                </NavLink>
                                <button
                                    className="btn btn-dark"
                                    onClick={ ()=> cerrarSesion() }
                                >
                                    Cerrar Sesión
                                </button>
                            </>
                            
                        ) : (
                            <NavLink 
                                className="btn btn-dark mr-2" 
                                to="/login"
                                exact
                            >
                                Login
                            </NavLink>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default withRouter(Navbar)
