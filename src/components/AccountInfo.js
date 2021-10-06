import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from "react-redux"
import { Header, Grid, Segment } from 'semantic-ui-react'
import ProfileOrder from './ProfileOrder'



const AccountInfo = (props) => {

    let userData = props.userData
    let sortedOrders = userData.orders.sort(function(a,b){
        return new Date(b.createdTime) - new Date(a.createdTime);
    }).slice(0, 2)

    React.useEffect(() => {
        
    }, [])

    const genProfileOrders = () => {
        return sortedOrders.map(sortedOrder => <ProfileOrder key={sortedOrder.orderId} order={sortedOrder} />)
    }

    return(
        <Segment className='frostglass'>
            <Grid textAlign='left' divided='vertically'>
                <Grid.Row  stretched>
                    <Grid.Column>
                        <Segment className='transparent'>
                            <Header inverted> Basic Info</Header>
                            <Grid textAlign='left' divided='vertically'>
                                <Grid.Row columns={3}  stretched>
                                    <Grid.Column>
                                        <Segment className='transparent'>
                                            <Header inverted>UserId: {userData.userId}</Header>
                                        </Segment>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Segment className='transparent'>
                                            <Header inverted>Nickname: {userData.nickName}</Header>
                                        </Segment>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Segment className='transparent'>
                                            <Header inverted>Account Type: {userData.accountType}</Header>
                                        </Segment>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row  stretched>
                    <Grid.Column>
                        <Segment className='transparent'>
                            <Header inverted> Recent Orders </Header>
                                {genProfileOrders()}
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row  stretched>
                    <Grid.Column>
                        <Segment className='transparent'>
                            <Header inverted> Deck List</Header>
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
    // getProfileAdapter
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(AccountInfo));