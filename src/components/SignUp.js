import React from 'react'
import { Button, Form, Grid, Header, Segment, Dimmer, Icon } from 'semantic-ui-react'
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
    const [showPasswordBtn, setShowPasswordBtn] = React.useState("Show")
    const [showPassword, setShowPassword] = React.useState("password")
    const [showPasswordCFBtn, setShowPasswordCFBtn] = React.useState("Show")
    const [showPasswordCF, setShowPasswordCF] = React.useState("password")

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
                        setUserIdError({ content: 'User ID already exist.' })
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
            userIdValidation(event.target.value)? setUserIdError(false) : setUserIdError({ content: 'Please enter your User ID' })
            signUpData.userId = event.target.value
        } else if (inputValue === "nickName"){
            nickNameValidation(event.target.value)? setNickNameError(false) : setNickNameError({ content: 'Please enter your Nickname' })
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
            confirmPasswordValidation(signUpData.password, event.target.value)? setConfirmPasswordError(false) : setConfirmPasswordError({ content: 'Password does not match' })
            signUpData.confirmPassword = event.target.value
        }        
        setIsDisabled(!signUpFormValidation(signUpData))
    }

    const handlePWClick = (event) => {
        event.preventDefault()
        if(event.target.attributes.name.value === "Show"){
            setShowPasswordBtn("Hide")
            setShowPassword("text")
        } else {
            setShowPasswordBtn("Show")
            setShowPassword("password")
        }
    }

    const handlePWCClick = (event) => {
        event.preventDefault()
        if(event.target.attributes.name.value === "Show"){
            setShowPasswordCFBtn("Hide")
            setShowPasswordCF("text")
        } else {
            setShowPasswordCFBtn("Show")
            setShowPasswordCF("password")
        }
    }

    return(
        <Grid.Column style={{ maxWidth: 1000 }}>
            <Dimmer active={loadingState}>
                <Icon loading name='spinner' size='huge' />
            </Dimmer>
            <Form inverted onSubmit={handleSubmit}>
                <Segment className="transparent" textAlign="left">
                    <Form.Field>
                        <Header inverted className="textColor" as='h2' textAlign='center'>
                            Sign Up
                        </Header>
                    </Form.Field>
                    <Form.Group widths='equal'>
                        <Form.Input
                            fluid
                            required
                            label="User ID"
                            name="userId"
                            icon='user'
                            iconPosition='left'
                            placeholder='User ID'
                            error={userIdError}
                            onChange={(event) => {setUserId(event.target.value); validation(event)}}
                        />
                        <Form.Input
                            fluid
                            required
                            label="Nickname"
                            name="nickName"
                            icon='user outline'
                            iconPosition='left'
                            placeholder='Nickname'
                            error={nickNameError}
                            onChange={(event) => {setNickName(event.target.value); validation(event)}}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Input
                            fluid
                            required
                            label="Password"
                            name="password"
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            type={showPassword}
                            width={16}
                            onFocus={handleFocus}
                            onChange={(event) => {setPassword(event.target.value); validation(event)}}
                        />
                        <Form.Button inverted className="show" label="show" onClick={handlePWClick} name={showPasswordBtn} > {showPasswordBtn} </Form.Button>
                    </Form.Group>
                    <Segment textAlign='left' className={showHide} >
                        <Header inverted as='h5'color={eightCharacter}>The password should be at least 8 characters</Header>
                        <Header inverted as='h5'color={upperCase}>The password should contains at least 1 upper case character</Header>
                        <Header inverted as='h5'color={lowerCase}>The password should contains at least 1 lower case character</Header>
                        <Header inverted as='h5'color={number}>The password should contains at least 1 number</Header>
                        <Header inverted as='h5'color={specialChar}>The password should contains at least 1 *@!#%&()^~</Header>
                    </Segment>
                    <Form.Group>
                    <Form.Input
                        fluid
                        required
                        label="Confirm Password"
                        name="confirmPassword"
                        icon='lock'
                        iconPosition='left'
                        placeholder='Confirm Password' 
                        type={showPasswordCF}
                        width={16}
                        error={confirmPasswordError}
                        onChange={(event) => {setPasswordConfirmation(event.target.value); validation(event)}}
                    />
                        <Form.Button inverted className="show" label="show" onClick={handlePWCClick} name={showPasswordCFBtn} > {showPasswordCFBtn} </Form.Button>
                    </Form.Group>
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