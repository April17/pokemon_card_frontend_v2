import React from 'react'
import { withRouter , Link } from 'react-router-dom'
import { connect } from "react-redux"
import { Header, Grid, Segment, Popup } from 'semantic-ui-react'
import { priceChecker } from '../utility/utility'
 



const ProfileOrder = (props) => {

    let orderData = props.order
    let subTotal = 0
    let tax = 0
    let total = 0

    React.useEffect(() => {

    }, [ ])

    const addressBuilder = () => {
        const addressData = JSON.parse(orderData.shippingAddress)
        return (`${addressData.streetAddress} 
                 ${addressData.streetAddress2} ${"\n"} 
                 ${addressData.city} , 
                 ${addressData.state}  
                 ${addressData.zipCode}`)
    }

    const calculateTotal = () => {
        let orderedItems = JSON.parse(orderData.items)
        orderedItems.forEach(item => {
          subTotal = subTotal + priceChecker(item) * item.qty
        });
        tax = subTotal * 0.056
        total = (Math.round((subTotal + tax) * 100) / 100).toFixed(2)
        return total
    }



    
    // console.log("userData: ", props.userData)
    return(
        <Segment className="frostglass-dark" textAlign='left'>
            <Grid textAlign='center' divided='vertically'>
                <Grid.Row columns={6} stretched>
                    <Grid.Column className='no-right-padding'>
                        <Segment className="transparent" textAlign='left'>
                            <Header className="compact-headers" as="h5" inverted>OrderId:</Header>
                            <Header className="compact-headers" as="h5" inverted>{orderData.orderId}</Header>
                        </Segment> 
                    </Grid.Column>
                    <Grid.Column className='no-right-padding'>
                        <Segment className="transparent" textAlign='left'>
                            <Popup
                                position='bottom center'
                                hoverable
                                className="frostglass-dark" 
                                trigger={
                                    <div>
                                        <Header as="h5" className="compact-headers" inverted>Shipping Address:</Header>
                                        <Header as="h5" className="compact-headers" inverted>{`${orderData.firstName} ${orderData.lastName}`} </Header>
                                    </div>
                                } 
                                >
                                    <Popup.Content>
                                        <Header className="compact-headers" as="h5" inverted>Email</Header>
                                        <Header className="compact-headers" as="h5" inverted>{orderData.email}</Header>
                                        <Header className="compact-headers" as="h5" inverted>Address</Header>
                                        <Header className="compact-headers" as="h5" inverted>{addressBuilder()}</Header>
                                    </Popup.Content>
                            </Popup>
                        </Segment> 
                    </Grid.Column>
                    <Grid.Column className='no-right-padding'>
                        <Segment className="transparent" textAlign='left'>
                            <Header className="compact-headers" as="h5" inverted>Order Date:</Header>
                            <Header className="compact-headers" as="h5" inverted>{orderData.createdTime.substring(0,10)}</Header>
                        </Segment> 
                    </Grid.Column>
                    <Grid.Column className='no-right-padding'>
                        <Segment className="transparent" textAlign='left'>
                            <Header className="compact-headers" as="h5" inverted>Status</Header>
                            <Header className="compact-headers" as="h5" inverted>{orderData.status}</Header>
                        </Segment> 
                    </Grid.Column>
                    <Grid.Column className='no-right-padding'>
                        <Segment className="transparent" textAlign='left'>
                            <Header className="compact-headers" as="h5" inverted>Total:</Header>
                            <Header className="compact-headers" as="h5" inverted>${calculateTotal()}</Header>
                        </Segment> 
                    </Grid.Column>
                    <Grid.Column className='no-right-padding' width={1}>
                        <Segment className="transparent" textAlign='left'>
                            <Link to={`/order/${orderData.orderId}`}><Header className="compact-headers" as="h5" inverted>More Detail</Header></Link>
                        </Segment> 
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Segment>
    )


}

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = {

}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileOrder));