import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from "react-redux"
import { Header, Grid, Segment, Image, Button, Dimmer, Icon } from 'semantic-ui-react'
import { search } from '../redux/adapters/searchAdapters'
import { queryMaker } from '../utility/utility'
import CardBack from '../assets/Image/pokemon_card_backside.png'
import Card from './Card'



const Items = (props) => {
    const itemsData = props.searchData.result.data

    React.useEffect(() => {
        if (!itemsData) {
            props.search(queryMaker({
                name:"Jirachi",
                types:['All'],
                subtype:"",
                supertype:"",
                rarity:"",
                result:{}
              }))
        }
    }, [])

    const genCards = () => {
        return itemsData.map(itemData => 
            <Grid.Column key={itemData.id} >
                <Segment textAlign="center" className="frostglass card-margin-bottom" >
                    <Card cardData={itemData}/>
                </Segment>    
            </Grid.Column>
            )
    }

    console.log("Search Props: ", props.searchData.result.data)
    return(
        <Grid textAlign='left' style={{ height: '100vh' }} >
            <Grid.Row columns={3} textAlign='left'>
                {itemsData? genCards() :                
                            <Grid.Column >
                                <Segment textAlign="center" className="frostglass card-margin-bottom" >
                                    <Dimmer active={ itemsData? false:true }>
                                        <Icon loading name='spinner' size='huge' />
                                    </Dimmer>
                                    <div className="ui link cards center">
                                        <div className="card transparent">
                                            <div className="image">
                                                <Image src={CardBack} size='small' centered />
                                            </div>
                                            <div className="content">
                                                <div className="header">
                                                    <Header inverted as='h3' textAlign='center'>Loading...</Header>
                                                </div>
                                                <div className="description">
                                                    <Header inverted as='h4' textAlign='center'>Loading...</Header>
                                                </div>
                                            </div>
                                            <div className="extra content">
                                                <span className="center floated">
                                                    <Button disabled inverted>Loading...</Button>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Segment>    
                            </Grid.Column>
                }
            </Grid.Row> 
        </Grid>
    )


}

const mapStateToProps = state => {
    return {
        searchData: state.searchReducers
    }
}

const mapDispatchToProps = {
    search
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Items));