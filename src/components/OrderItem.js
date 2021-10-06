import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from "react-redux"
import { Header, Segment, Item, Grid } from 'semantic-ui-react'
import { editCart } from '../redux/adapters/cartAdapters'
import { priceChecker } from '../utility/utility'




const OrderItem = (props) => {
    
    const itemData = props.data

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
                                Qty: {itemData.qty}
                            </Grid.Column>
                            <Grid.Column className="no-right-padding" textAlign='right'>
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
        
    }
}

const mapDispatchToProps = {
    editCart
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(OrderItem));