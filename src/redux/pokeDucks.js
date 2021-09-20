import axios from "axios"

//constantes
const dataInicial = {
    count: 0,
    next: null,
    previous: null,
    results: []
}

//types
const GET_POKEMONS_EXITO = 'GET_POKEMONS_EXITO'
const GET_NEXT_POKEMONS_EXITO = 'GET_NEXT_POKEMONS_EXITO'
const GET_PREVIOUS_POKEMONS_EXITO = 'GET_PREVIOUS_POKEMONS_EXITO'
const GET_POKE_INFO_EXITO = 'GET_POKE_INFO_EXITO'

//reducer
export default function pokeReducer(state = dataInicial, action){
    switch(action.type){
        case GET_POKEMONS_EXITO: 
            return {...state, ...action.payload}
        case GET_NEXT_POKEMONS_EXITO:
            return {...state, ...action.payload}
        case GET_PREVIOUS_POKEMONS_EXITO:
            return {...state, ...action.payload}
        case GET_POKE_INFO_EXITO:
            return {...state, unPokemon: action.payload}
        default:
            return state
    }
}


//acciones
export const getPokemonsAction = () => async(dispatch) => {

    //console.log('getState', getState().pokemones.offset)
    //const offset = getState().pokemones.offset

    if(localStorage.getItem('offset=0')){
        dispatch({
            type: GET_POKEMONS_EXITO,
            payload: JSON.parse(localStorage.getItem('offset=0'))
        })
        return
    }

    try{
        const respuesta = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=10`)
        dispatch({
            type: GET_POKEMONS_EXITO,
            payload: respuesta.data
        })

        localStorage.setItem('offset=0', JSON.stringify(respuesta.data))

    }catch(error){
        console.log(error)
    }
}

export const getNextPokemonsAction = () => async(dispatch, getState) => {

    //const {offset} = getState().pokemones
    //const siguiente = offset + 20
    const {next} = getState().pokemones

    if(localStorage.getItem(next)){
        dispatch({
            type: GET_NEXT_POKEMONS_EXITO,
            payload: JSON.parse(localStorage.getItem(next))
        })
        return
    }


    try{
        const respuesta = await axios.get(next)
        
        dispatch({
            type: GET_NEXT_POKEMONS_EXITO,
            payload: respuesta.data
        })

        localStorage.setItem(next, JSON.stringify(respuesta.data))

    }catch(error){
        console.log(error)
    }

}

export const getPreviousPokemonsAction = () => async(dispatch, getState) => {

    const {previous} = getState().pokemones

    if(localStorage.getItem(previous)){
        dispatch({
            type: GET_PREVIOUS_POKEMONS_EXITO,
            payload: JSON.parse(localStorage.getItem(previous))
        })
        return
    }

    try{
        const respuesta = await axios.get(previous)
        dispatch({
            type: GET_PREVIOUS_POKEMONS_EXITO,
            payload: respuesta.data
        })
        localStorage.setItem(previous, JSON.stringify(respuesta.data))
    }catch(error){
        console.log(error)
    }

}

export const getUnPokeDetalleAction = (url = 'https://pokeapi.co/api/v2/pokemon/1/') => async(dispatch, getState)=>{

    if(localStorage.getItem(url)){
        dispatch({
            type: GET_POKE_INFO_EXITO,
            payload: JSON.parse(localStorage.getItem(url))
        })
        return
    }

    try{

        const respuesta = await axios.get(url)
        dispatch({
            type: GET_POKE_INFO_EXITO,
            payload: {
                name: respuesta.data.name,
                peso: respuesta.data.weight,
                alto: respuesta.data.height,
                foto: respuesta.data.sprites.front_default
            }
        })

        localStorage.setItem(url, JSON.stringify({
            name: respuesta.data.name,
            peso: respuesta.data.weight,
            alto: respuesta.data.height,
            foto: respuesta.data.sprites.front_default
        }))

    }catch(error){
        console.log(error)
    }
}