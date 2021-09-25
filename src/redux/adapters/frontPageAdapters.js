import { POKEMON_API_ROOT, API_KEY } from '../../assets/API_Route';
import { actions } from "../actions/frontPageActions"

export const frontPageFeaturedCard = () => dispatch => {
    const config = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-Api-Key': API_KEY
          }
    }
    fetch(`${POKEMON_API_ROOT}/cards?q=name:"Rayquaza"&pageSize=12`, config)
        .then(rsp => rsp.json())
        .then(data => {
            dispatch(actions.featuredData(data.data))
        })
        .catch(error => {
            console.log("Error: ", error)
        })
}

export const frontPageRecommendedCard = () => dispatch => {
    const config = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-Api-Key': API_KEY
          }
    }
    fetch(`${POKEMON_API_ROOT}/cards?q=name:"Jirachi"&pageSize=12`, config)
        .then(rsp => rsp.json())
        .then(data => {
            dispatch(actions.recommendedData(data.data))
        })
        .catch(error => {
            console.log("Error: ", error)
        })
}
