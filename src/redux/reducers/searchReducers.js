const defaultState = {
    name:"",
    types:['All'],
    subtype:"",
    supertype:"",
    rarity:"",
    result:{}
  }
  
  export const searchReducers = (state = defaultState, action) => {
    switch (action.type) {
      case 'NAME_DATA':
        return {...state, name: action.payload}
    case 'TYPES_DATA':
        return {...state, types: action.payload}
    case 'SUBTYPE_DATA':
        return {...state, subtype: action.payload}
    case 'SUPERTYPE_DATA':
        return {...state, supertype: action.payload}
    case 'RARITY_DATA':
        return {...state, rarity: action.payload}
    case 'RESULT_DATA':
        return {...state, result: action.payload}
      default:
        return state
    }
  }