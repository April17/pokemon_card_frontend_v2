import { POKEMON_API_ROOT, API_KEY } from '../../assets/API_Route';
import { actions } from "../actions/searchActions"


export const search = (query, page) => dispatch => {
    console.log(`${POKEMON_API_ROOT}/cards?q=${query}&pageSize=9&page=${page}`)
    const config = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-Api-Key': API_KEY
          }
    }
    fetch(`${POKEMON_API_ROOT}/cards?q=${query}&pageSize=9&page=${page}`, config)
        .then(rsp => rsp.json())
        .then(data => {
            dispatch(actions.resultAction(data))
            // console.log(data)
        })
        .catch(error => {
            console.log("Error: ", error)
        })
}

export const nameAdapter = (name) => dispatch =>{
    dispatch(actions.nameAction(name))
}

export const typesAdapter = (types) => dispatch =>{
    dispatch(actions.typesAction(types))
}

export const subtypeAdapter = (subtype) => dispatch =>{
    dispatch(actions.subtypeAction(subtype))
}

export const supertypeAdapter = (supertype) => dispatch =>{
    dispatch(actions.supertypeAction(supertype))
}

export const rarityAdapter = (rarity) => dispatch =>{
    dispatch(actions.rarityAction(rarity))
}