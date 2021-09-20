import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUnPokeDetalleAction } from '../redux/pokeDucks'

const Detalle = () => {

    const dispatch = useDispatch()

    React.useEffect(()=>{
        const fetchData = () => {
            dispatch(getUnPokeDetalleAction())
        }
        fetchData()
    }, [dispatch])

    const pokemon = useSelector( store => store.pokemones.unPokemon )
    //console.log(pokemon)

    return pokemon ? (
        <div className="card mt-4 text-center">
            <div className="card-body">
                <img src={pokemon.foto} className="img-fluid" alt={pokemon.name} />
                <div className="card-title text-capitalize ">{pokemon.name}</div>
                <p className="card-text">Alto: {pokemon.alto}  | Peso: {pokemon.peso} </p>
            </div>
        </div>
    ) : null
}

export default Detalle
