import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from "react-redux"
import { Header, Grid, Segment, Image } from 'semantic-ui-react'



const CardDetailPage = (props) => {

    const cardData = props.history.location.state

    React.useEffect(() => {

    }, [])
    
    console.log(cardData)
    return(
        <div className="page">
            <Grid textAlign='center' columns={3} >
                <Grid.Row className="first-row" stretched>
                    <Grid.Column>
                        <Segment className="frostglass">
                            <Header inverted>{cardData.name}</Header>
                            <Image src={cardData.images.large} />
                        </Segment>
                    </Grid.Column>
                    <Grid.Column>
                        <Segment className="frostglass">
                            <Header inverted>Price</Header>
                            <Header inverted>Qty</Header>
                        </Segment>
                        <Segment className="frostglass">
                            <Header inverted>Detail</Header>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column>
                        <Segment className="frostglass">
                            <Header inverted>Add to Cart</Header>
                        </Segment>
                        <Segment className="frostglass">
                            <Header inverted>N/A</Header>
                        </Segment>
                        <Segment className="frostglass">
                            <Header inverted>N/A</Header>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    )


}
{/* <Grid.Column style={{ maxWidth: 450 }}>
<Segment className="transparent" >
    <Header inverted>{cardData.name}</Header>
</Segment>    
</Grid.Column> */}

const mapStateToProps = state => {
    return {
      
    }
}

const mapDispatchToProps = {
    
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(CardDetailPage));