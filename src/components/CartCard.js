import React from 'react'
import { connect } from "react-redux"
import { Image, Card, Button, Header, Grid, Segment } from 'semantic-ui-react'
import { editCart } from '../redux/adapters/cartAdapters'
import { priceChecker } from '../utility/utility'


const CartCard = (props) => {
    
    const itemData = props.data

  

    const handleClick = () => {
        const itemIndex = props.cartItems.findIndex(item => item.id === itemData.id)
        props.cartItems.splice(itemIndex, 1)
        props.editCart(props.cartItems)
    }

    const handleQty = (event) => {
        let cartData = [...props.cartItems]
        const itemIndex = props.cartItems.findIndex(item => item.id === itemData.id)
        if (event.currentTarget.name === "plus") {
            itemData.qty+=1
        } else if (event.currentTarget.name === "minus" && itemData.qty > 1){
            itemData.qty-=1
        }
        cartData[itemIndex].qty = itemData.qty
        props.editCart(cartData)
    }

    return(
        <Card className='frostglass'>
            <Card.Content>
                <Grid columns={2}>
                    <Grid.Column width={7}>
                        <Image className='cart-card-padding'  src={itemData.images.small}/>
                    </Grid.Column>
                    <Grid.Column width={9} >
                        <Grid.Row>
                            <Header as='h4' inverted> {itemData.name} </Header>
                            <Header className='card-content' as='h5' inverted > ${priceChecker(itemData)} </Header>
                        </Grid.Row>
                        <Grid.Row>
                            <Button icon='plus' name='plus' size='mini' onClick={handleQty} inverted/>
                            Qty: {itemData.qty}
                            <Button icon='minus' name='minus' size='mini' onClick={handleQty} inverted/>
                        </Grid.Row>
                        <Grid.Row verticalAlign='bottom' textAlign='right' >
                            <Segment className='transparent botton-right'>
                                <Button inverted color='red' onClick={handleClick}> Remove </Button>
                            </Segment>                            
                        </Grid.Row>
                    </Grid.Column>    
                </Grid>
            </Card.Content>
        </Card>
    )
}


const mapStateToProps = state => {
    return {
        cartItems: state.cartReducers.cart
    }
}

const mapDispatchToProps = {
    editCart
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CartCard);