import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from "react-redux"
import { Header, Grid, Segment, Image, Button, Dimmer, Icon, Pagination } from 'semantic-ui-react'
import { search } from '../redux/adapters/searchAdapters'
import { queryMaker } from '../utility/utility'
import CardBack from '../assets/Image/pokemon_card_backside.png'
import Card from './Card'



const Items = (props) => {
    const itemsData = props.searchData.result.data

    React.useEffect(() => {
        if (!itemsData) {
            props.search(queryMaker(props.searchData),1)
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

    const handlePageChange = (event, data) => {
        props.search(queryMaker(props.searchData), data.activePage)
    }

    const calculateTotalPages = () => {
        const data = props.searchData.result
        let totalPage = Math.ceil(data.totalCount/data.pageSize)
        return totalPage
    }

    const cardsConditions = () => {
        if(itemsData){
            if(itemsData.length >= 1){
                return genCards()
            } else {
                return(
                    <Grid.Column>
                        <Segment textAlign="center" className="transparent card-margin-bottom" >
                            <Header inverted>No result</Header>
                        </Segment>
                    </Grid.Column>
                )
            }
        } else {
            return(
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
            )
        }
    }

    const pagerCondition = () => {
        if(itemsData){
            if(itemsData.length >= 1){
                return(
                    <Segment className="transparent no-botton-padding" textAlign='center'>
                        <Pagination onPageChange={handlePageChange} className="frostglass pager-text-color" defaultActivePage={1} totalPages={calculateTotalPages()} />
                    </Segment>
                )
            } else {
                return(
                    <Segment className="transparent no-botton-padding" textAlign='center'>
                        <Pagination className="frostglass pager-text-color" defaultActivePage={1} totalPages={1} />
                    </Segment>
                )
            }
        } else {
            return(
                <div>
                    <Dimmer active={true}>
                        <Icon loading name='spinner' size='huge' />
                    </Dimmer>
                    <Segment className="transparent no-botton-padding" textAlign='center'>
                        <Pagination className="frostglass pager-text-color" defaultActivePage={1} totalPages={10} />
                    </Segment>
                </div>
            )
        }
    }

    // console.log("Search Props: ", props.searchData.result)
    return(
        <Grid textAlign='left' style={{ height: '100vh' }} >
            <Grid.Row columns={3} textAlign='left'>
                {cardsConditions()}
            </Grid.Row>
            <Grid.Row className="no-botton-padding" textAlign='center'>
                <Grid.Column  verticalAlign='bottom'>
                    {pagerCondition()}
                </Grid.Column> 
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