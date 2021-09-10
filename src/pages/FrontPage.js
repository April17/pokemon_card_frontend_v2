import React from 'react'
import { connect } from "react-redux"
import { Header, Grid, Segment } from 'semantic-ui-react'



const Frontpage = (props) => {

    return(
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Segment className="transparent" >
                    <Header inverted>Front Page</Header>
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
)(Frontpage);