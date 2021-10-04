import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from "react-redux"
import { Header, Segment, Item, Grid, Button } from 'semantic-ui-react'
import { editCart } from '../redux/adapters/cartAdapters'
import { priceChecker } from '../utility/utility'




const CheckoutItem = (props) => {
    
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

    const supertypeSwitch = () => {
        if(itemData.supertype === "Pokémon"){
            return pokemonDetail()
        } else if (itemData.supertype === "Energy"){
            return energyDetail()
        } else if (itemData.supertype === "Trainer"){
            return trainerDetail()
        }
    }

    const pokemonDetail = () => {
        return (
            <Segment className="transparent item-description" textAlign='left' >
                <Header as="h5" className="item-description" inverted>{`Card Number / Rarity: ${itemData.number} / ${itemData.rarity}`}</Header>
                <Header as="h5" className="item-description" inverted>{`Card Types / HP / subtypes: ${itemData.types.join(" ")} / ${itemData.hp} / ${itemData.subtypes.join(" ")}`}</Header>
            </Segment>
        )
    }

    const energyDetail = () => {
        return (
            <Segment className="transparent item-description" textAlign='left' >
                <Header as="h5" className="item-description" inverted>{`Card Number / Rarity: ${itemData.number} / ${itemData.rarity}`}</Header>
                <Header as="h5" className="item-description" inverted>{`Card supertype / subtypes: ${itemData.supertype} / ${itemData.subtypes.join(" ")}`}</Header>
            </Segment>
            )
    }

    const trainerDetail = () => {
        return (
            <Segment className="transparent item-description" textAlign='left' >
                <Header as="h5" className="item-description" inverted>{`Card Number / Rarity: ${itemData.number} / ${itemData.rarity}`}</Header>
                <Header as="h5" className="item-description" inverted>{`Card supertype: ${itemData.supertype}`}</Header>
            </Segment>
            )
    }

    const toDetailPage = () => {
        props.history.push(`/card/${itemData.id}`, itemData)
    }

    return(
        <Item>
            <Item.Image size='small' src={itemData.images.small} />
            <Item.Content >
                <Item.Header as='a' className="inverted-color" onClick={toDetailPage} >{itemData.name}</Item.Header>
                <Item.Header as='span' className="price-to-right inverted-color" >${priceChecker(itemData)}</Item.Header>
                <Item.Meta className="inverted-color" >Description</Item.Meta>
                <Item.Description>
                    {supertypeSwitch()}
                </Item.Description>
                <Item.Extra className="inverted-color" >
                    <Grid className="no-right-margin" >
                        <Grid.Row columns={2} verticalAlign="middle">
                            <Grid.Column>
                                <Button icon='plus' name='plus' size='mini' onClick={handleQty} inverted/>
                                Qty: {itemData.qty}
                                <Button icon='minus' name='minus' size='mini' onClick={handleQty} inverted/>
                            </Grid.Column>
                            <Grid.Column className="no-right-padding" textAlign='right'>
                                <Button as="span" className="price-to-right no-right-margin" inverted color='red' onClick={handleClick}> Remove </Button>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>    
                </Item.Extra>
            </Item.Content>
        </Item>
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

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(CheckoutItem));