import React from 'react'
import { connect } from "react-redux"
import { Image, Header, Button, Grid } from 'semantic-ui-react'
import { editCart } from '../redux/adapters/cartAdapters'




const Card = (props) => {

    let [qty, setQty] = React.useState(1)

    const data = {...props.cardData, qty: 0}

    const nameFormat = (name) => {   
        if(name.length <= 16){
            return (
                <div style={{"height":"46px"}}>
                    <Header inverted as='h3' textAlign='center'>{name}</Header>
                </div>
            )
        } else if (name.length >= 24){
            return (
                <div style={{"height":"46px"}}>
                    <Header inverted as='h3' textAlign='center'>{name.substring(0,20)+"..."}</Header>
                </div>
            )
        } else {
            return (
                <div style={{"height":"46px"}}>
                    <Header inverted as='h3' textAlign='center'>{name}</Header>
                </div>
            )
        }
    }

    const handleClick = () => {
        let cartData = [...props.cartItems]
        const itemIndex = props.cartItems.findIndex(item => item.id === data.id)
        if (itemIndex === -1){
            data.qty = qty
            cartData.push(data)
        } else {
            cartData[itemIndex].qty += qty
        }
        setQty(1)
        props.editCart(cartData)
    }

    const handleQty = (event) => {
        if (event.currentTarget.name === "plus") {
            setQty(qty+=1)
        } else if (event.currentTarget.name === "minus" && qty > 1){
            setQty(qty-=1)
        }
    }

    
    return(
        <div className="ui link cards center">
            <div className="card transparent">
                <div className="image">
                    <Image src={data.images.large} size='small' centered />
                </div>
                <div className="content">
                    <div className="header">
                        {nameFormat(data.name)}
                    </div>
                    <div className="meta">
                        <Grid columns='equal'>
                            <Grid.Row>
                            <Grid.Column floated='left' textAlign='right' >
                                <Button name="plus" icon='plus' size='tiny' onClick={handleQty} inverted circular/>
                            </Grid.Column>
                            <Grid.Column textAlign='center' width={2}>
                                <Header inverted className='qty' as='h4' textAlign='center' >{qty}</Header>
                            </Grid.Column>
                            <Grid.Column floated='right' textAlign='left' >
                                <Button name="minus" icon='minus' size='tiny' onClick={handleQty} inverted circular/>
                            </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </div>
                    <div className="description">
                        <Header inverted as='h4' textAlign='center'>${data.cardmarket.prices.trendPrice}</Header>
                    </div>
                </div>
                <div className="extra content">
                    <span className="center floated">
                        <Button onClick={handleClick} inverted>Add to Cart</Button>
                    </span>
                </div>
            </div>
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

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Card);