import React from 'react'
import { connect } from "react-redux"
import { Image, Header, Button } from 'semantic-ui-react'
import { addToCart } from '../redux/adapters/cartAdapters'




const Card = (props) => {

    // console.log(props.cardData)
    const data = props.cardData

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
                <div>
                    <Header inverted as='h3' textAlign='center'>{name}</Header>
                </div>
            )
        }
    }

    const handleClick = () => {
        props.addToCart(data)
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
      
    }
}

const mapDispatchToProps = {
    addToCart
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Card);