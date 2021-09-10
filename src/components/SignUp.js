import React from 'react'
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'
import { connect } from "react-redux"
import { withRouter } from 'react-router-dom'
import { signUp } from '../redux/adapters/currentUserAdapters'


const SignUp = (props) => {
    const [userId, setUserId] = React.useState("")
    const [nickName, setNickName] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [passwordConfirmation, setPasswordConfirmation] = React.useState("")

    const handleSubmit = () => {
    
        if(passwordConfirmation === password){
            const signUpData = {
                userId: userId,
                nickName: nickName,
                password: password,
                accountType: "User"
            }
            props.signUp(signUpData)
                .then(()=> {
                    props.history.push("/login")
                })
        } else {
            console.log("Password do not match")
        }
    }


    return(
        <Grid.Column style={{ maxWidth: 450 }}>
            <Form onSubmit={handleSubmit}>
                <Segment className="transparent" >
                    <Form.Field>
                        <Header inverted className="textColor" as='h2' textAlign='center'>
                            Sign Up
                        </Header>
                    </Form.Field>
                    <Form.Field>
                        <div className="ui left icon input">
                            <i className="user icon"></i>
                            <input name="username" onChange={(event) => setUserId(event.target.value)} placeholder='Username' />
                        </div>
                    </Form.Field>
                    <Form.Field>
                        <div className="ui left icon input">
                            <i className="user outline icon"></i>
                            <input name="name" onChange={(event) => setNickName(event.target.value)} placeholder='Nick Name' />
                        </div>
                    </Form.Field>
                    <Form.Field>
                        <div className="ui left icon input">
                            <i className="lock icon"></i>
                            <input type="password" name="password" onChange={(event) => setPassword(event.target.value)} placeholder='Password' />
                        </div>
                    </Form.Field>
                    <Form.Field>
                        <div className="ui left icon input">
                            <i className="lock icon"></i>
                            <input type="password" name="password_confirmation" onChange={(event) => setPasswordConfirmation(event.target.value)} placeholder='Confirm Password' />
                        </div>
                    </Form.Field>
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