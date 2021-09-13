import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from "react-redux"
import { Header, Divider, Grid, Segment } from 'semantic-ui-react'
import Login from '../components/Login'
import SignUp from  '../components/SignUp'
import { logInFromState } from '../redux/adapters/utilityAdapters'


const SignUPLoginPage = (props) => {

    React.useEffect(() => {
        if(props.formState === "logIn"){
            props.history.push('/login')
        }
        if (localStorage.token) {
            props.history.push('/')
        }
    }, [props.formState, props.history])

    return(
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
            <Header inverted className="textColor" as='h1' textAlign='center' >Welcome to Pokéball</Header>
            <Segment inverted className="frostglass">
                {(props.formState === "logIn")?
                    <Login />:
                    <SignUp />
                }                    
                <Divider inverted className="textColor" horizontal>Or</Divider>
                <Segment className="transparent" raised>
                    {(props.formState === "logIn")?
                        <Header inverted as='h4'>Not with us yet? <Link to="/signup" onClick={() => props.logInFromState("signUp")}>Sign Up</Link></Header>:
                        <Header inverted as='h4'>Already with us? <Link to="/login" onClick={() => props.logInFromState("logIn")}>Login</Link></Header>
                    }
                </Segment>
            </Segment>
            </Grid.Column>
        </Grid>
    )
}

const mapStateToProps = state => {
    return {
        currentUser: state.currentUserReducers,
        formState: state.utilityReducers.formState
    }
}

const mapDispatchToProps = {
    logInFromState
}

export default connect(mapStateToProps,mapDispatchToProps)(SignUPLoginPage)