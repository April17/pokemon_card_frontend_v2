import React from 'react'
import { Button, Form, Grid, Header, Segment, Dimmer, Loader } from 'semantic-ui-react'
import { connect } from "react-redux"
import { withRouter } from 'react-router-dom'
import { signUp } from '../redux/adapters/currentUserAdapters'
import { logInFromState } from '../redux/adapters/utilityAdapters'
import { userIdValidation, nickNameValidation, passwordValidation, confirmPasswordValidation, signUpFormValidation } from '../validation/signUpFormValidations'

let signUpData = {
    userId: "",
    nickName: "",
    password: "",
    confirmPassword: ""
}

const SignUp = (props) => {
    const [userId, setUserId] = React.useState("")
    const [nickName, setNickName] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [passwordConfirmation, setPasswordConfirmation] = React.useState("")
    const [showHide, setShowHide] = React.useState("transparent hide")
    const [eightCharacter, setEightCharacter] = React.useState("red")
    const [upperCase, setUpperCase] = React.useState("red")
    const [lowerCase, setLowerCase] = React.useState("red")
    const [number, setNumber] = React.useState("red")
    const [specialChar, setSpecialChar] = React.useState("red")
    const [userIdError, setUserIdError] = React.useState(false)
    const [nickNameError, setNickNameError] = React.useState(false)
    const [confirmPasswordError, setConfirmPasswordError] = React.useState(false)
    const [loadingState, setLoadingState] = React.useState(false)
    const [isDisabled, setIsDisabled] = React.useState(true)

    const handleSubmit = () => {
        setLoadingState(true)
        setShowHide("transparent hide")
        if(passwordConfirmation === password){
            let signUpDataPost = {
                userId: userId,
                nickName: nickName,
                password: password,
                accountType: "User"
            }
            props.signUp(signUpDataPost)
                .then(data => {
                    setLoadingState(false)
                    if(data === "UserName already exist."){
                        setIsDisabled(true)
                        setUserIdError({ content: 'Username already exist.', pointing: 'below' })
                    } else {
                        props.logInFromState("logIn")
                        props.history.push("/login")
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        } else {
            setLoadingState(false)
            console.log("Password do not match")
        }
    }
    
    const handleFocus = () => {
        setShowHide("transparent")
    }

    const validation = (event) => {
        let inputValue = event.target.attributes.name.nodeValue
        if(inputValue === 'userId'){
            userIdValidation(event.target.value)? setUserIdError(false) : setUserIdError({ content: 'Please enter your Username', pointing: 'below' })
            signUpData.userId = event.target.value
        } else if (inputValue === "nickName"){
            nickNameValidation(event.target.value)? setNickNameError(false) : setNickNameError({ content: 'Please enter your Nickname', pointing: 'below' })
            signUpData.nickName = event.target.value
        } else if (inputValue === "password") {
            let passowrdCheck = passwordValidation(event.target.value)
            passowrdCheck.eightCharacter? setEightCharacter("green") : setEightCharacter("red");
            passowrdCheck.upperCase? setUpperCase("green") : setUpperCase("red");
            passowrdCheck.lowerCase? setLowerCase("green") : setLowerCase("red");
            passowrdCheck.number? setNumber("green") : setNumber("red");
            passowrdCheck.specialChar? setSpecialChar("green") : setSpecialChar("red");
            signUpData.password = event.target.value
        } else if (inputValue === "confirmPassword"){
            confirmPasswordValidation(signUpData.password, event.target.value)? setConfirmPasswordError(false) : setConfirmPasswordError({ content: 'Password does not match', pointing: 'below' })
            signUpData.confirmPassword = event.target.value
        }        
        setIsDisabled(!signUpFormValidation(signUpData))
    }

    return(
        <Grid.Column style={{ maxWidth: 450 }}>
            <Dimmer active={loadingState}>
                <Loader content='Loading' />
            </Dimmer>
            <Form inverted onSubmit={handleSubmit}>
                <Segment className="transparent" textAlign="left">
                    <Form.Field>
                        <Header inverted className="textColor" as='h2' textAlign='center'>
                            Sign Up
                        </Header>
                    </Form.Field>
                    <Form.Input
                        fluid
                        required
                        label="Username"
                        name="userId"
                        icon='user'
                        iconPosition='left'
                        placeholder='Username'
                        error={userIdError}
                        onChange={(event) => {setUserId(event.target.value); validation(event)}}
                    />
                    <Form.Input
                        fluid
                        required
                        label="Nick Name"
                        name="nickName"
                        icon='user outline'
                        iconPosition='left'
                        placeholder='Nick Name'
                        error={nickNameError}
                        onChange={(event) => {setNickName(event.target.value); validation(event)}}
                    />
                    <Form.Input
                        fluid
                        required
                        label="Password"
                        name="password"
                        icon='lock'
                        iconPosition='left'
                        placeholder='Password'
                        type='password'
                        onFocus={handleFocus}
                        onChange={(event) => {setPassword(event.target.value); validation(event)}}
                    />
                    <Segment textAlign='left' className={showHide} >
                        <Header inverted as='h4'color={eightCharacter}>The password should be at least 8 characters</Header>
                        <Header inverted as='h4'color={upperCase}>The password should contains at least 1 upper case character</Header>
                        <Header inverted as='h4'color={lowerCase}>The password should contains at least 1 lower case character</Header>
                        <Header inverted as='h4'color={number}>The password should contains at least 1 number</Header>
                        <Header inverted as='h4'color={specialChar}>The password should contains at least 1 *@!#%&()^~</Header>
                    </Segment>
                    <Form.Input
                        fluid
                        required
                        label="Confirm Password"
                        name="confirmPassword"
                        icon='lock'
                        iconPosition='left'
                        placeholder='Confirm Password' 
                        type='password'
                        error={confirmPasswordError}
                        onChange={(event) => {setPasswordConfirmation(event.target.value); validation(event)}}
                    />
                    <Button inverted disabled={isDisabled} fluid size='large'>
                        Sign Up
                    </Button>
                </Segment>
            </Form>
          </Grid.Column>
    )
}

const mapDispatchToProps = {
    signUp,
    logInFromState
}

export default withRouter(connect(
    null,
    mapDispatchToProps
)(SignUp));