import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from "react-redux"
import { Header, Grid, Segment, Item, Divider, Image, Button } from 'semantic-ui-react'
import CheckoutItem from '../components/CheckoutItem'
import CheckoutComfirmation from '../components/CheckoutConfirmation'
import PayPal from '../components/PayPal'
import { priceChecker } from '../utility/utility'
import { auth } from '../redux/adapters/currentUserAdapters'
import CardBack from '../assets/Image/pokemon_card_backside.png'
import '../assets/style/CheckoutPage.css'



const CheckoutPage = (props) => {

    let [checkout, setCheckout] = React.useState(false)
    let cartItems = props.cartItems
    let subTotal = 0
    let tax = 0
    let total = 0

    React.useEffect(() => {

        if(localStorage.token){
            props.auth()
        }

        return() => {
            console.log("unmount")
        }
    }, [])

    const genCheckoutItems = () => {
        return cartItems.map(cartItem =>             
            <CheckoutItem key={cartItem.id} data={{...cartItem}} />
        )
    }

    const handleCheckout = () => {
        setCheckout(true)
    }

    const calculateSubtotal = () => {
        cartItems.forEach(cartItem => {
          subTotal = subTotal + priceChecker(cartItem) * cartItem.qty
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

    const shoppingCartCondition = () => {
        if(cartItems.length !== 0){
            return genCheckoutItems()
        } else {
            return (
                <Item>
                    <Item.Image size='small' src={CardBack} />
                    <Item.Content>
                        <Item.Header as='a' className="inverted-color" >Pokéball</Item.Header>
                        <Item.Meta className="inverted-color" >Description</Item.Meta>
                        <Item.Description>
                        <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
                        </Item.Description>
                    </Item.Content>
                </Item>
            )
        }
    }

    const proceedToCheckoutCondition = () => {
        if (cartItems.length !== 0){
            return <Button inverted color='green' onClick={handleCheckout}> Proceed to Checkout </Button>
        } else {
            return null
        }
    }

    const titleCondition = () => {
        if (cartItems.length !== 0){
            return "Shopping Cart"
        } else {
            return "Shopping Cart is empty"
        }
    }
    

    return(
        <div className="page">
            <Grid textAlign='left' divided='vertically'>
                <Grid.Row className="checkout-page-first-row">
                    <Grid.Column >
                        <Segment className="transparent" >
                            <Header as='h2' inverted>{checkout? "Checkout" : titleCondition()}</Header>
                        </Segment>    
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row className="second-row">
                    <Grid.Column width={10}>
                        <Segment className="frostglass" >
                            {checkout? null : <Header as='span' className="price-to-right" inverted>Price</Header>}
                            <Item.Group>
                                {checkout? null : shoppingCartCondition()}
                            </Item.Group>
                            {checkout? <CheckoutComfirmation/> : null}
                        </Segment>    
                    </Grid.Column>
                    <Grid.Column width={1}>
                        <Segment className="transparent" >
                            <Header inverted></Header>
                        </Segment>    
                    </Grid.Column>
                    <Grid.Column width={5}>
                        {(cartItems.length === 0)? null :
                        <Segment className="frostglass" >
                            <Grid>
                                <Grid.Row>
                                    <Grid.Column>
                                        <Segment className="transparent" >
                                            <Header inverted>Subtotal</Header>
                                            <Header inverted className="price-to-right" as="span"> ${calculateSubtotal()} </Header>
                                        </Segment>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column>
                                        <Segment className="transparent" >
                                            <Header inverted>Tax</Header>
                                            <Header inverted className="price-to-right" as="span"> ${calculateTax()} </Header>
                                        </Segment>
                                    </Grid.Column>
                                </Grid.Row>
                                <Divider/>
                                <Grid.Row>
                                    <Grid.Column>
                                        <Segment className="transparent" >
                                            <Header inverted>Total</Header>
                                            <Header inverted className="price-to-right" as="span"> ${calculateTotal()} </Header>
                                        </Segment>
                                    </Grid.Column>
                                </Grid.Row> 
                            </Grid>  
                        </Segment>}
                        <Segment className="frostglass" textAlign='center'>
                            {checkout? <PayPal total={total} /> : proceedToCheckoutCondition()}
                        </Segment>      
                    </Grid.Column>
                </Grid.Row>   
            </Grid>
        </div>
    )


}

const mapStateToProps = state => {
    return {
        cartItems: state.cartReducers.cart,
    }
}

const mapDispatchToProps = {
    auth
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(CheckoutPage));