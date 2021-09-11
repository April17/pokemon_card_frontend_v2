import React from 'react'
import { Button, Form, Grid, Header, Segment, Dimmer, Loader } from 'semantic-ui-react'
import { connect } from "react-redux"
import { withRouter } from 'react-router-dom'
import { signUp } from '../redux/adapters/currentUserAdapters'


const SignUp = (props) => {
    const [userId, setUserId] = React.useState("")
    const [nickName, setNickName] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [passwordConfirmation, setPasswordConfirmation] = React.useState("")
    const [loadingState, setLoadingState] = React.useState(false)

    const handleSubmit = () => {
        setLoadingState(true)
        if(passwordConfirmation === password){
            const signUpData = {
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
                        name="username"
                        icon='user'
                        iconPosition='left'
                        placeholder='Username'
                        onChange={(event) => setUserId(event.target.value)}
                    />
                    <Form.Input
                        fluid
                        required
                        label="Nick Name"
                        name="nickName"
                        icon='user outline'
                        iconPosition='left'
                        placeholder='Nick Name'
                        onChange={(event) => setNickName(event.target.value)}
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
                        onChange={(event) => setPassword(event.target.value)}
                    />
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
                    <Button inverted disabled={false} fluid size='large'>
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