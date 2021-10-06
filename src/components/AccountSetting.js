import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from "react-redux"
import { Header, Grid, Segment } from 'semantic-ui-react'



const AccountSetting = (props) => {

    React.useEffect(() => {
        
    }, [])


    return(
        <Segment className='frostglass'>
            <Grid textAlign='left' divided='vertically'>
                <Grid.Row  stretched>
                    <Grid.Column>
                        <Segment className='transparent'>
                            <Header inverted> Account Setting </Header>
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
)(AccountSetting));