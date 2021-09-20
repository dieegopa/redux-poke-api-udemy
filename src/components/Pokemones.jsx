import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPokemonsAction, getNextPokemonsAction, getPreviousPokemonsAction, getUnPokeDetalleAction } from '../redux/pokeDucks'
import Detalle from './Detalle'

const Pokemones = () => {

    const dispatch = useDispatch()

    const pokemones = useSelector(store => store.pokemones.results)
    const next = useSelector(store => store.pokemones.next)
    const previous = useSelector(store => store.pokemones.previous)

    React.useEffect(()=>{
        const fetchData = () => {
            dispatch(getPokemonsAction())
        }
        fetchData()
    }, [dispatch])

    return (
        <div className="row mt-5">

            <div className="col-md-6 col-12">

            
                <h3>Lista de Pokemones</h3>

                <ul className="list-group mt-4">
                    {
                        pokemones.map( item => (
                            <li className="list-group-item text-capitalize" key={item.name}>
                                {item.name}
                                <button className="btn btn-dark btn-sm float-right" onClick={ ()=> dispatch(getUnPokeDetalleAction(item.url))}>Info</button>
                            </li>
                        ))
                    }
                </ul>

                <div className="d-flex justify-content-between mt-4">
                    {
                        pokemones.length === 0 && <button className="btn btn-dark" onClick={() => dispatch(getPokemonsAction())} >Get Pokemones</button>
                    }

                    {
                        previous && <button className="btn btn-dark" onClick={()=> dispatch(getPreviousPokemonsAction())}>Anterior</button>
                    }

                    {
                        next && <button className="btn btn-dark" onClick={()=> dispatch(getNextPokemonsAction())}>Siguiente</button>
                    }

                </div>

                
                
            </div>
            <div className="col-md-6 col-12">
                <h3>Detalle Pokemon</h3>
                <Detalle/>
            </div>
        </div>
    )
}

export default Pokemones
