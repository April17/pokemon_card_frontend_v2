import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from "react-redux"
import { Header, Divider, Grid, Segment } from 'semantic-ui-react'
import Login from '../components/Login'
import SignUp from  '../components/SignUp'


const SignUPLoginPage = (props) => {
    const[formState, setFormState] = React.useState("logIn")

    React.useEffect(() => {
        if (localStorage.token) {
            props.history.push('/')
        }
    }, [props.history])

    return(
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
            <Header inverted className="textColor" as='h1' textAlign='center' >Welcome to Pokémon Card</Header>
            <Segment inverted className="frostglass">
                {(formState === "logIn")?
                    <Login />:
                    <SignUp />
                }                    
                <Divider inverted className="textColor" horizontal>Or</Divider>
                <Segment className="transparent" raised>
                    {(formState === "logIn")?
                        <Header inverted as='h4'>Not with us yet? <Link to="/signup" onClick={() => setFormState("signUp")}>Sign Up</Link></Header>:
                        <Header inverted as='h4'>Already with us yet? <Link to="/login" onClick={() => setFormState("logIn")}>Login</Link></Header>
                    }

                </Segment>
            </Segment>
            </Grid.Column>
        </Grid>
    )
}

const mapStateToProps = state => {
    return {
        currentUser: state.currentUserReducers
    }
}

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps,mapDispatchToProps)(SignUPLoginPage)