import React from 'react'
import { connect } from "react-redux"
import { Image, Card, Button, Header, Grid, Segment } from 'semantic-ui-react'


const CartCard = (props) => {
    
    const itemData = props.data

    return(
        <Card className='frostglass'>
            <Card.Content>
                <Grid columns={2}>
                    <Grid.Column width={7}>
                        <Image floated='left' fluid src={itemData.images.small}/>
                    </Grid.Column>
                    <Grid.Column width={9} >
                        <Grid.Row>
                            <Header as='h4' inverted> {itemData.name} </Header>
                            <Header className='card-content' as='h5' inverted > ${itemData.cardmarket.prices.trendPrice} </Header>
                            <Header className='card-content' as='h5' inverted> Qty: {itemData.qty}</Header>
                        </Grid.Row>
                        <Grid.Row verticalAlign='bottom' textAlign='right' >
                            <Segment className='transparent botton-right'>
                                <Button inverted color='red'> Remove </Button>
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

    }
}

const mapDispatchToProps = {
    
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CartCard);