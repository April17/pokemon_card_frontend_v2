
export const logOut = () => {
    if(localStorage.token){
        const rememberMe = localStorage.rememberMe
        const userId = localStorage.userId
        const cart = localStorage.cart
        localStorage.clear()
        localStorage.rememberMe = rememberMe
        localStorage.userId = userId
        localStorage.cart = cart
    } 
}

export const queryMaker = (searchData) => {
    // console.log(searchData)
    let query = ''
    if(searchData.name !== ''){
        query = `name:"${upcaseFirstLetter(searchData.name)}*"`
    }
    if(!searchData.types.includes('All') && searchData.types.length <= 1){
        query = `${query} types:${searchData.types}`
    }
    if(searchData.types.length > 1) {
        let tempStrs = []
        searchData.types.forEach(type => tempStrs.push(`types:${type}`))
        query = `${query} ${tempStrs.join(" AND ")}`
    }
    if(searchData.subtype && searchData.subtype !== "Select"){
        query = `${query} subtypes:"${searchData.subtype}"`
    }
    if(searchData.supertype){
        query = `${query} supertype:${searchData.supertype}`
    }
    if(searchData.rarity && searchData.rarity !== "Select"){
        query = `${query} rarity:"${searchData.rarity}"`
    }
    // console.log("Query: ", query)
    return query
}

const upcaseFirstLetter = (string) => {
    let tempStrs = string.split(' ')
    for (let i = 0; i < tempStrs.length; i++) {
        if(tempStrs[i]){
            tempStrs[i] = tempStrs[i][0].toUpperCase() + tempStrs[i].substr(1);
        }
    }
    return encodeURIComponent(tempStrs.join(" ").trim())
}


export const priceChecker = (itemData) => {
    // console.log(itemData)
    let price = 0
    if(itemData.tcgplayer){
        if(itemData.tcgplayer.prices[Object.keys(itemData.tcgplayer.prices)[0]]){
            price = itemData.tcgplayer.prices[Object.keys(itemData.tcgplayer.prices)[0]].low
        }
    }
    // console.log("price: ", price) 
    if (itemData.cardmarket && !price) {
        if(itemData.cardmarket.prices.trendPrice){
            price = itemData.cardmarket.prices.trendPrice * 1.35
        }
    }
    if(!price){
        price = 0
    }
    return price.toFixed(2)
}
