import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from "react-redux"
import { Header, Grid, Segment, Item, Divider, Image } from 'semantic-ui-react'
import CheckoutItem from '../components/CheckoutItem'
import PayPal from '../components/PayPal'
import { totalAdapter } from '../redux/adapters/payPalAdapters'
import { priceChecker } from '../utility/utility'
import CardBack from '../assets/Image/pokemon_card_backside.png'
import '../assets/style/CheckoutPage.css'



const CheckoutPage = (props) => {

    let cartItems = props.cartItems
    let subTotal = 0
    let tax = 0
    let total = 0

    React.useEffect(() => {

    }, [])

    const genCheckoutItems = () => {
        return cartItems.map(cartItem =>             
            <CheckoutItem key={cartItem.name} data={{...cartItem}} />
        )
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
    

    return(
        <div className="page">
            <Grid textAlign='left' divided='vertically'>
                <Grid.Row className="checkout-page-first-row">
                    <Grid.Column >
                        <Segment className="transparent" >
                            <Header as='h2' inverted>{(cartItems.length === 0)? "Shopping Cart is empty" : "Shopping Cart"}</Header>
                        </Segment>    
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row className="second-row">
                    <Grid.Column width={10}>
                        <Segment className="frostglass" >
                            <Header as='span' className="price-to-right" inverted>Price</Header>
                            <Item.Group>
                                {(cartItems.length === 0)?
                                <Item>
                                    <Item.Image size='small' src={CardBack} />
                                    <Item.Content>
                                        <Item.Header as='a' className="inverted-color" >Pokéball</Item.Header>
                                        <Item.Meta className="inverted-color" >Description</Item.Meta>
                                        <Item.Description>
                                        <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
                                        </Item.Description>
                                    </Item.Content>
                                </Item> :
                                genCheckoutItems()}
                            </Item.Group>
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
                        {(cartItems.length === 0)? null :
                        <Segment className="frostglass" textAlign='center'>
                            <PayPal total={total} />
                        </Segment>}  
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
    
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(CheckoutPage));