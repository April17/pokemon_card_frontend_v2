import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from "react-redux"
import { Header, Grid, Segment } from 'semantic-ui-react'



const DeckList = (props) => {

    React.useEffect(() => {
        
    }, [])


    return(
        <Segment className='frostglass'>
            <Grid textAlign='left' divided='vertically'>
                <Grid.Row  stretched>
                    <Grid.Column>
                        <Segment className='transparent'>
                            <Header inverted> Deck List </Header>
                            <Header inverted>Under Development</Header>  
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Segment>
    )


}

const mapStateToProps = state => {
    return {
      userData: state.currentUserReducers.userData
    }
}

const mapDispatchToProps = {

}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(DeckList));