import React from 'react'
import { connect } from "react-redux"
import { Image, Header, Button, Label } from 'semantic-ui-react'
import Image2 from '../assets/Image/1_hires_small.png'




const Card = (props) => {

    console.log(props.cardData)
    const data = props.cardData
    return(
        <div className="ui link cards">
            <div className="card transparent">
                <div className="image">
                    <Image src={data.images.small} size='small' centered />
                </div>
                <div className="content">
                    <div className="header">
                        <Header inverted as='h3' textAlign='center'>{data.name}</Header>
                    </div>
                    <div className="meta">
                        
                    </div>
                    <div className="description">
                        <Header inverted as='h4' textAlign='center'>Price: ${data.cardmarket.prices.averageSellPrice}</Header>
                    </div>
                </div>
                <div className="extra content">
                    <span className="center floated">
                        <Button inverted>Add to Cart</Button>
                    </span>
                    {/* <span>
                        <i className="user icon"></i>
                        75 Friends
                    </span> */}
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
    
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Card);