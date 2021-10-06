import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from "react-redux"
import { Header, Grid, Segment } from 'semantic-ui-react'
import ProfileOrder from './ProfileOrder'



const ProfileOrders = (props) => {

    let sortedOrders = props.userData.orders.sort(function(a,b){
        return new Date(b.createdTime) - new Date(a.createdTime);
    })

    React.useEffect(() => {
        
    }, [])

    const genProfileOrders = () => {
        return sortedOrders.map(sortedOrder => <ProfileOrder key={sortedOrder.orderId} order={sortedOrder} />)
    }



    console.log("sortedOrders: ", sortedOrders)
    console.log("userData: ", props.userData.orders)
    return(
        <Segment className='frostglass'>
            <Grid textAlign='left' divided='vertically'>
                <Grid.Row  stretched>
                    <Grid.Column>
                        <Segment className='transparent'>
                            <Header inverted> All Orders </Header>
                                {genProfileOrders()}
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
)(ProfileOrders));