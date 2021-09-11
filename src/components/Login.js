import React from 'react'
import { Button, Form, Header, Segment, Message, Dimmer, Loader } from 'semantic-ui-react'
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

    React.useEffect(() => {
        console.log("hi")
        if(localStorage.rememberMe){
            console.log("hi")
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
        console.log(event.target.checked)
        setRememberMe(event.target.checked)
        console.log(rememberMe)
        // if(event.target.checked){
        //     localStorage.rememberMe = true
        //     localStorage.userId = userId
        // } else {
        //     localStorage.rememberMe = false
        //     localStorage.userId = ""
        // }
    }

    const handelSubmit = () => {
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

    return(
        <div>
            <Dimmer active={loadingState}>
                <Loader content='Loading' />
            </Dimmer>
            <Header className="textColor" as='h2' inverted color="grey" textAlign='center'>
                Login to your account
            </Header>
            <Form error={props.currentUser.errorState} inverted size='large' onSubmit={handelSubmit}>

                <Segment className="transparent" textAlign='left' raised>
                    <Form.Input
                        fluid
                        label="Username"
                        name="username"
                        icon='user'
                        iconPosition='left'
                        placeholder='Username'
                        onChange={(event) => {setUserId(event.target.value); buttonState()}}
                    />
                    <Form.Input
                        fluid
                        label="Password"
                        name="password"
                        icon='lock'
                        iconPosition='left'
                        placeholder='Password'
                        type='password'
                        onChange={(event) => {setPassword(event.target.value); buttonState()}}
                    />
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