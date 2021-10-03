import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from "react-redux"
import { Header, Grid, Segment, Image, Message, Button } from 'semantic-ui-react'
import '../assets/style/CardDetailPage.css'
import { editCart } from '../redux/adapters/cartAdapters'




const CardDetailPage = (props) => {

    const cardData = props.history.location.state
    let [qty, setQty] = React.useState(1)
    let price = 0

    const genAttacks = () => {
        const attacks = cardData.attacks
        return attacks.map((attack, index) =>             
        <Message className="transparent attack-message" key={attack.name+index}>
            <Message.Header>{attack.name}</Message.Header>
            <Message.List>
                <Message.Item>Cost: {attack.cost.join("/")}</Message.Item>
                <Message.Item>Damage: {attack.damage}</Message.Item>
                {attack.text? <Message.Item>Description: {attack.text}</Message.Item> : null}
            </Message.List>
        </Message>
        )
    }

    const genAbilities = () => {
        const abilities = cardData.abilities
        return abilities.map((ability, index) =>             
        <Message className="transparent attack-message" key={ability.name+index}>
            <Message.Header>{ability.name}</Message.Header>
            <Message.List>
                {ability.text? <Message.Item>Description: {ability.text}</Message.Item> : null}
            </Message.List>
        </Message>
        )
    }

    const genRules = () => {
        const rules = cardData.rules
        return rules.map((rule, index) =>
        <Message className="transparent attack-message" key={cardData.id+index}>
            {rule}
        </Message>
        )
    }

    const handleQty = (event) => {
        if (event.currentTarget.name === "plus") {
            setQty(qty+=1)
        } else if (event.currentTarget.name === "minus" && qty > 1){
            setQty(qty-=1)
        }
    }

    const handleClick = () => {
        let cartData = [...props.cartItems]
        const itemIndex = props.cartItems.findIndex(item => item.id === cardData.id)
        if (itemIndex === -1){
            cardData.qty = qty
            cartData.push(cardData)
        } else {
            cartData[itemIndex].qty += qty
        }
        setQty(1)
        props.editCart(cartData)
    }

    const supertypeSwitch = () => {
        if(cardData.supertype === "Pokémon"){
            return pokemonDetail()
        } else if (cardData.supertype === "Energy"){
            return energyDetail()
        } else if (cardData.supertype === "Trainer"){
            return trainerDetail()
        }
    }

    const pokemonDetail = () => {
        return (
            <Segment className="frostglass" textAlign='left' >
                <Header as="h4" inverted>{`Card Number / Rarity: ${cardData.number} / ${cardData.rarity}`}</Header>
                <Header as="h4" inverted>{`Card Types / HP / subtypes: ${cardData.types.join(" ")} / ${cardData.hp} / ${cardData.subtypes.join(" ")}`}</Header>
                {cardData.abilities?                 
                    <Header as="h4" inverted>
                        Abilities: {genAbilities()}
                    </Header> : null}
                <Header as="h4" inverted>
                    Attacks: {genAttacks()}
                </Header>
            </Segment>
        )
    }

    const energyDetail = () => {
        return (
            <Segment className="frostglass" textAlign='left' >
                <Header as="h4" inverted>{`Card Number / Rarity: ${cardData.number} / ${cardData.rarity}`}</Header>
                <Header as="h4" inverted>{`Card supertype / subtypes: ${cardData.supertype} / ${cardData.subtypes.join(" ")}`}</Header>
                <Header as="h4" inverted>
                    Rules: {genRules()}
                </Header>
            </Segment>
            )
    }

    const trainerDetail = () => {
        return (
            <Segment className="frostglass" textAlign='left' >
                <Header as="h4" inverted>{`Card Number / Rarity: ${cardData.number} / ${cardData.rarity}`}</Header>
                <Header as="h4" inverted>{`Card supertype: ${cardData.supertype}`}</Header>
                <Header as="h4" inverted>
                    Rules: {genRules()}
                </Header>
            </Segment>
            )
    }

    const priceChecker = () => {
        if(cardData.tcgplayer){
            price = cardData.tcgplayer.prices[Object.keys(cardData.tcgplayer.prices)[0]].low
        } else if (cardData.cardmarket) {
            price = cardData.cardmarket.prices.lowPrice * 1.35
        }
        if(!price){
            price = 0
        }
        return price
    }

    
    console.log(cardData)
    return(
        <div className="page">
            <Grid textAlign='left' columns={2} divided='vertically'>
                <Grid.Row className="detail-page-first-row">
                    <Grid.Column  width={16}>
                        <Segment textAlign="left" className="transparent">
                            <Header inverted>{cardData.name}</Header>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row className="second-row" columns={2}>
                    <Grid.Column width={6}>
                        <Image src={cardData.images.large} />
                    </Grid.Column>
                    <Grid.Column className='padding-left' width={10}>
                        <Grid verticalAlign="top">
                            <Grid.Row columns={2} stretched> 
                                <Grid.Column>
                                    <Segment className="frostglass" textAlign='center'>
                                        <Header inverted>New</Header>
                                        <Header inverted>${priceChecker().toFixed(2)}</Header>
                                        <Grid columns='equal' textAlign="center">
                                            <Grid.Row>
                                                <Grid.Column floated='left' textAlign='right' >
                                                    <Button name="plus" icon='plus' size='tiny' onClick={handleQty} inverted circular/>
                                                </Grid.Column>
                                                <Grid.Column textAlign='center' width={2} verticalAlign="middle">
                                                    <Header inverted className='qty' as='h4' textAlign='center' >{qty}</Header>
                                                </Grid.Column>
                                                <Grid.Column floated='right' textAlign='left' >
                                                    <Button name="minus" icon='minus' size='tiny' onClick={handleQty} inverted circular/>
                                                </Grid.Column>
                                            </Grid.Row>
                                            <Grid.Row >
                                                <Button onClick={handleClick} name="addtocart" inverted>Add to Cart</Button>
                                            </Grid.Row>
                                        </Grid>
                                    </Segment>
                                </Grid.Column>
                                <Grid.Column stretched>
                                    <Segment className="frostglass" textAlign="center">
                                        <Button name="addtodecklist" inverted disabled>Add to Decklist</Button>
                                    </Segment>
                                    <Segment className="frostglass" textAlign="center">
                                        <Button color='green' name="addtocart" inverted>Check Out</Button>
                                    </Segment>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row stretched>
                                <Grid.Column>
                                    {supertypeSwitch()}
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
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
)(CardDetailPage));