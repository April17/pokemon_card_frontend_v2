import React from 'react'
import { Button, Form, Header, Segment, Message, Dimmer, Icon, Grid } from 'semantic-ui-react'
import { connect } from "react-redux"
import { withRouter } from 'react-router-dom'
import { logIn } from '../redux/adapters/currentUserAdapters'
import '../assets/style/Form.css'

const Login = (props) => {
    const [userId, setUserId] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [isDisabled, setIsDisabled] = React.useState(true)
    const [loadingState, setLoadingState] = React.useState(false)
    const [rememberMe, setRememberMe] = React.useState(false)
    const [showPasswordBtn, setShowPasswordBtn] = React.useState("Show")
    const [showPassword, setShowPassword] = React.useState("password")

    React.useEffect(() => {
        if(localStorage.rememberMe === "false" || !localStorage.rememberMe){
            setRememberMe(false)
            localStorage.userId = ""
        } else {
            setRememberMe(true)
            setUserId(localStorage.userId)
        }
    }, [])

    const buttonState = () => {
        if(userId !=="" && password !==""){
            setIsDisabled(false)
        } else {
            setIsDisabled(true)
        }
    }

    const checkBoxState = (event) => {
        setRememberMe(event.target.checked)
        localStorage.rememberMe = event.target.checked
        localStorage.userId = userId
    }

    const handleUsername = event => {
        setUserId(event.target.value); 
        buttonState(); 
        if(rememberMe){
            localStorage.userId = event.target.value
        } else {
            localStorage.userId = ""
        }
    }

    const handleSubmit = () => {
        setLoadingState(true)
        const logInData = {
            userId: userId,
            password: password
        }
        props.logIn(logInData)
            .then(()=> {
                setLoadingState(false)
                if(localStorage.token){
                    props.history.push("/")
                }
            })
    }

    const handleClick = (event) => {
        event.preventDefault()
        if(event.target.attributes.name.value === "Show"){
            setShowPasswordBtn("Hide")
            setShowPassword("text")
        } else {
            setShowPasswordBtn("Show")
            setShowPassword("password")
        }
    }

    return(
        <div>
            <Dimmer active={loadingState}>
                <Icon loading name='spinner' size='huge' />
            </Dimmer>
            <Header className="textColor" as='h2' inverted color="grey" textAlign='center'>
                Login to your account
            </Header>
            <Form error={props.currentUser.errorState} inverted size='large' onSubmit={handleSubmit}>

                <Segment className="transparent" textAlign='left' raised>
                    <Form.Input
                        fluid
                        label="Username"
                        name="username"
                        icon='user'
                        iconPosition='left'
                        placeholder='Username'
                        value={userId}
                        onChange={handleUsername}
                    />
                    <Form.Group >
                        <Form.Input
                            fluid
                            label="Password"
                            name="password"
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            type={showPassword}
                            width={16}
                            value={password}
                            onChange={(event) => {setPassword(event.target.value); buttonState();}}
                        />
                        <Form.Button inverted className="show" label="show" onClick={handleClick} name={showPasswordBtn} > {showPasswordBtn} </Form.Button>
                    </Form.Group>
                    <Form.Checkbox id="remember_me" label='Remember me' checked={rememberMe} onChange={ (event) => checkBoxState(event)} />
                    <Button inverted fluid disabled={isDisabled} size='large'>
                        Login
                    </Button>
                    <Message error content='Username or Password is incorrect.'/>
                </Segment>
            </Form>
        </div>
    )
}

const mapDispatchToProps = {
    logIn
}

const mapStateToProps = state => {
    return {
        currentUser: state.currentUserReducers
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
  )(Login));