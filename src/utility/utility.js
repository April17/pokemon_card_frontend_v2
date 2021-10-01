
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
    console.log(searchData)
    let query = ''
    if(searchData.name !== ''){
        query = `name:"${upcaseFirstLetter(searchData.name)}"`
    }
    if(!searchData.types.includes('All')){
        query = `${query} types:${searchData.types}`
    }
    console.log("Query: ", query)
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
