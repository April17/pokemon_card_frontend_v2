import React from 'react'
import { Button, Form, Header, Segment, Message } from 'semantic-ui-react'
import { connect } from "react-redux"
import { withRouter } from 'react-router-dom'
import { logIn } from '../redux/adapters/currentUserAdapters'

const Login = (props) => {
    const [userId, setUserId] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [isDisabled, setIsDisabled] = React.useState(true)

    const buttonState = () => {
        if(userId !=="" && password !==""){
            console.log("hi")
            setIsDisabled(false)
        }
    }

    const handelSubmit = () => {
        const logInData = {
            userId: userId,
            password: password
        }
        props.logIn(logInData)
            .then(()=> {
                if(localStorage.token){
                    props.history.push("/")
                }
            })
    }

    return(
        <div>
            <Header className="textColor" as='h2' inverted color="grey" textAlign='center'>
                Login to your account
            </Header>
            <Form error={props.currentUser.errorState} inverted size='large' onSubmit={handelSubmit}>
                <Segment className="transparent" raised>
                    <Form.Input
                        fluid
                        name="username"
                        icon='user'
                        iconPosition='left'
                        placeholder='Username'
                        onChange={(event) => {setUserId(event.target.value); buttonState()}}
                    />
                    <Form.Input
                        fluid
                        name="password"
                        icon='lock'
                        iconPosition='left'
                        placeholder='Password'
                        type='password'
                        onChange={(event) => {setPassword(event.target.value); buttonState()}}
                    />
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