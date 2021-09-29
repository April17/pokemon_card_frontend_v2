import React from 'react'
import { connect } from "react-redux"
import { Header, Grid, Segment } from 'semantic-ui-react'



const Footer = (props) => {

    React.useEffect(() => {
        if (!localStorage.token || localStorage.token === "undefined") {
            localStorage.clear()
            props.history.push('/')
        }
    }, [props.history])
    

    return(
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Segment className="transparent" >
                    <Header inverted>Profile Page</Header>
                </Segment>    
            </Grid.Column>
        </Grid>
    )


}

const mapStateToProps = state => {
    return {
      
    }
}

const mapDispatchToProps = {
    
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Footer);