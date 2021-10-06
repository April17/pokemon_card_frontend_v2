import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from "react-redux"
import { Header, Grid, Segment, Popup, Item, Divider } from 'semantic-ui-react'
import { getOrders } from '../redux/adapters/orderAdapters'
import { priceChecker } from '../utility/utility'
import OrderItem  from '../components/OrderItem'
import '../assets/style/OrderPage.css'


const OrderPage = (props) => {

    let orderData = props.order
    let subTotal = 0
    let tax = 0
    let total = 0

    React.useEffect(() => {
        props.getOrders([props.match.params.id])
    }, [])

    const addressBuilder = () => {
        const addressData = JSON.parse(orderData.shippingAddress)
        return (`${addressData.streetAddress} 
                 ${addressData.streetAddress2} ${"\n"} 
                 ${addressData.city} , 
                 ${addressData.state}  
                 ${addressData.zipCode}`)
    }

    const genOrderItems = () => {
        let orderedItems = JSON.parse(orderData.items)
        return orderedItems.map(item =>             
            <OrderItem key={item.id} data={{...item}} />
        )
    }

    const calculateSubtotal = () => {
        let orderedItems = JSON.parse(orderData.items)
        orderedItems.forEach(item => {
          subTotal = subTotal + priceChecker(item) * item.qty
        });
        return (Math.round(subTotal * 100) / 100).toFixed(2)
    }

    const calculateTax = () => {
        tax = subTotal * 0.056
        return (Math.round(tax * 100) / 100).toFixed(2)
    }

    const calculateTotal = () => {
        total = (Math.round((subTotal + tax) * 100) / 100).toFixed(2)
        return total
    }
    
    console.log(props.order)
    return(
        <div className="page">
            <Grid textAlign='center' verticalAlign='middle' divided='vertically' columns={3}>
                <Grid.Column width={3}>
                    <Segment className="transparent" textAlign='left'>
                    </Segment>  
                </Grid.Column>
                <Grid.Column width={10}>
                    {orderData.orderId? <Grid textAlign='center' divided='vertically'>
                        <Grid.Row className='order-page-first-row' columns={4} stretched>
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
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column className='no-right-padding'>
                                <Segment className="frostglass" textAlign='left'>
                                    <Header as='span' className="price-to-right" inverted>Price</Header>
                                    <Item.Group>
                                        {genOrderItems()}
                                    </Item.Group>
                                </Segment>
                            </Grid.Column>  
                        </Grid.Row>
                        <Grid.Row className='order-page-no-top-padding'>
                            <Grid.Column className='no-right-padding order-page-no-top-margin' >
                                <Segment className="frostglass to-right" compact textAlign="right">
                                    <Grid>
                                        <Grid.Row className='no-padding'>
                                            <Grid.Column>
                                                <Segment className="transparent " textAlign="right" >
                                                    <Header className="compact-headers" inverted>Subtotal</Header>
                                                    <Header className="price-to-right compact-headers" inverted as="span"> ${calculateSubtotal()} </Header>
                                                </Segment>
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row className='no-padding'>
                                            <Grid.Column>
                                                <Segment className="transparent" textAlign="right">
                                                    <Header className="compact-headers" inverted>Tax</Header>
                                                    <Header className="price-to-right compact-headers" inverted  as="span"> ${calculateTax()} </Header>
                                                </Segment>
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Divider/>
                                        <Grid.Row >
                                            <Grid.Column>
                                                <Segment className="transparent" textAlign="right">
                                                    <Header className="compact-headers" inverted>Total</Header>
                                                    <Header className="price-to-right compact-headers" inverted as="span"> ${calculateTotal()} </Header>
                                                </Segment>
                                            </Grid.Column>
                                        </Grid.Row> 
                                    </Grid>  
                                </Segment>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid> : null}
                </Grid.Column>
                <Grid.Column width={3}>
                    <Segment className="transparent" textAlign='center'>
                    </Segment>  
                </Grid.Column>
            </Grid>
        </div>

    )


}

const mapStateToProps = state => {
    return {
      order: state.orderReducers
    }
}

const mapDispatchToProps = {
    getOrders
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(OrderPage));