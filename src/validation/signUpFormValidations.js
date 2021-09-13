
export const signUpFormValidation = (signUpData) => {
    console.log(signUpData)
    
    if (userIdValidation(signUpData.userId) && nickNameValidation(signUpData.nickName) && passowrdCheckBoolean()){
        return true
    } else {
        return false
    }
}
export const userIdValidation = (userId) => {
    let isDirty = false
    let hasId = false
    if(userId !== ""){
        isDirty = true
        hasId = true
    } else {
        hasId = false
    }
    if (isDirty && hasId){
        return true
    } else {
        return false
    }
}

export const nickNameValidation = (nickName) => {
    let isDirty = false
    let hasNickName = false
    if(nickName !== ""){
        isDirty = true
        hasNickName = true
    } else {
        hasNickName = false
    }
    if (isDirty && hasNickName){
        return true
    } else {
        return false
    }
}

let passwordCheck = {
    isDirty: false,
    eightCharacter: false,
    upperCase: false,
    lowerCase: false,
    number: false,
    specialChar: false
}
export const passwordValidation = (password) => {
    if(password !== ""){
        passwordCheck.isDirty = true
    }

    (password.length >= 8)? passwordCheck.eightCharacter = true : passwordCheck.eightCharacter = false;
    (password.match(/[A-Z]/))? passwordCheck.upperCase = true : passwordCheck.upperCase = false;
    (password.match(/[a-z]/))? passwordCheck.lowerCase = true : passwordCheck.lowerCase = false;
    (password.match(/[0-9]/))? passwordCheck.number = true : passwordCheck.number = false;
    (password.match(/[*@!#%&()^~]/))? passwordCheck.specialChar = true : passwordCheck.specialChar = false;
    
    return passwordCheck
}

const passowrdCheckBoolean = () => {
    if (passwordCheck.eightCharacter && 
        passwordCheck.upperCase &&
        passwordCheck.lowerCase &&
        passwordCheck.number &&
        passwordCheck.specialChar&&
        passwordCheck.isDirty){
            return true
        } else {
            return false
        }
}