const defaultState = {
    featuredData: [],
    recommendedData: []
  }
  
  export const frontPageReducers = (state = defaultState, action) => {
    switch (action.type) {
      case 'FEATURED_DATA':
        return {...state, featuredData: action.payload}
    case 'RECOMMENDED_DATA':
        return {...state, recommendedData: action.payload}
      default:
        return state
    }
  }