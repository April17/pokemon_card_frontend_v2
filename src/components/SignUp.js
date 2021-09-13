import React from 'react'
import { Button, Form, Grid, Header, Segment, Dimmer, Loader } from 'semantic-ui-react'
import { connect } from "react-redux"
import { withRouter } from 'react-router-dom'
import { signUp } from '../redux/adapters/currentUserAdapters'
import { userIdValidation, nickNameValidation, passwordValidation, signUpFormValidation } from '../validation/signUpFormValidations'

let signUpData = {
    userId: "",
    nickName: "",
    password: ""
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
    const [loadingState, setLoadingState] = React.useState(false)
    const [isDisabled, setIsDisabled] = React.useState(true)

    const handleSubmit = () => {
        setLoadingState(true)
        if(passwordConfirmation === password){
            signUpData = {
                userId: userId,
                nickName: nickName,
                password: password,
                accountType: "User"
            }
            props.signUp(signUpData)
                .then(()=> {
                    setLoadingState(false)
                    props.history.push("/login")
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
            userIdValidation(event.target.value)
            signUpData.userId = event.target.value
        } else if (inputValue === "nickName"){
            nickNameValidation(event.target.value)
            signUpData.nickName = event.target.value
        } else if (inputValue === "password") {
            let passowrdCheck = passwordValidation(event.target.value)
            passowrdCheck.eightCharacter? setEightCharacter("green") : setEightCharacter("red");
            passowrdCheck.upperCase? setUpperCase("green") : setUpperCase("red");
            passowrdCheck.lowerCase? setLowerCase("green") : setLowerCase("red");
            passowrdCheck.number? setNumber("green") : setNumber("red");
            passowrdCheck.specialChar? setSpecialChar("green") : setSpecialChar("red");
            signUpData.password = event.target.value
        }
        // console.log(signUpFormValidation(signUpData))
        setIsDisabled(!signUpFormValidation(signUpData))

    }


    return(
        <Grid.Column style={{ maxWidth: 450 }}>
            <Dimmer active={loadingState}>
                <Loader content='Loading' />
            </Dimmer>
            <Form inverted onSubmit={handleSubmit}>
                <Segment className="transparent" >
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
                        <Header inverted as='h4'color={eightCharacter}>At least 8 characters long</Header>
                        <Header inverted as='h4'color={upperCase}>Have at least one upper case character</Header>
                        <Header inverted as='h4'color={lowerCase}>Have at least one lower case character</Header>
                        <Header inverted as='h4'color={number}>Have at least one number</Header>
                        <Header inverted as='h4'color={specialChar}>Have at least one *@!#%&()^~</Header>
                    </Segment>
                    <Form.Input
                        fluid
                        required
                        label="Confirm Password"
                        name="password"
                        icon='lock'
                        iconPosition='left'
                        placeholder='Confirm Password'
                        type='password'
                        onChange={(event) => setPasswordConfirmation(event.target.value)}
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
    signUp
}

export default withRouter(connect(
    null,
    mapDispatchToProps
)(SignUp));