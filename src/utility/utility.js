
export const logOut = () => { 
    const rememberMe = localStorage.rememberMe
    const userId = localStorage.userId
    const cart = localStorage.cart
    localStorage.clear()
    localStorage.rememberMe = rememberMe
    localStorage.userId = userId
    localStorage.cart = cart
}