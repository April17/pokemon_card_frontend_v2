import React from 'react'
import { connect } from "react-redux"
import { Header, Image, Grid, Segment, Dimmer, Icon, Rail } from 'semantic-ui-react'
import PhotoSlider from '../components/PhotoSlider'
import { frontPageFeaturedCard, frontPageRecommendedCard } from '../redux/adapters/frontPageAdapters'
import { getCart } from '../redux/adapters/cartAdapters'
import BannerSmall2 from '../assets/Image/swsh07en.jpg'
import BannerSmall3 from '../assets/Image/swsh07-card-highlights-169-en.jpg'
import BannerLarge from '../assets/Image/swsh07-card-highlights-169-en.jpg'
import '../assets/style/FrontPage.css'



const Frontpage = (props) => {

    React.useEffect(() => {
        if(localStorage.token){
            props.getCart()
        }
        props.frontPageFeaturedCard()
        props.frontPageRecommendedCard()
    }, [])

    return(
        <div className='page'>
            <Grid textAlign='center' style={{ height: '100vh' }} >
                <Grid.Row className="first-row">
                    <Grid.Column  width={10}>
                        <Segment className="frostglass" textAlign='center' >
                            <Image className="banner-height" src={BannerLarge} spaced='right'/>
                            <Rail internal attached position='left' size='huge' id='rail'>
                                <Segment className='frostglass' id='rail-segment'>
                                    <Header as='h2'> Sword & Shield</Header>
                                    <Header as='h2'> Evolving Skies</Header>
                                </Segment>
                            </Rail>
                        </Segment> 
                    </Grid.Column>
                    <Grid.Column  width={6}>
                        <Segment className="frostglass no-bottom-margin" >
                            <Image className="third-height" src={BannerSmall2} fluid centered/>
                            <Image className="third-height" src={BannerSmall3} fluid centered/>
                        </Segment>  
                    </Grid.Column>
                </Grid.Row>  
                <Grid.Row stretched>
                    <Grid.Column width={16}>
                        <Header inverted as='h2' textAlign='left'> Featured </Header>
                        <Segment className="frostglass" >
                            <Dimmer active={ (props.featuredData.length !== 0)? false:true }>
                                <Icon loading name='spinner' size='huge' />
                            </Dimmer>
                            <PhotoSlider data={props.featuredData}/>
                        </Segment>
                        <Header inverted as='h2' textAlign='left'> Recommended </Header>
                        <Segment className="frostglass" textAlign='center'>
                            <Dimmer active={ (props.recommendedData.length !== 0)? false:true }>
                                <Icon loading name='spinner' size='huge' />
                            </Dimmer>
                            <PhotoSlider data={props.recommendedData}/>
                        </Segment> 
                        <Segment className="frostglass" >
                            
                        </Segment> 
                        <Segment className="frostglass" >
                        
                        </Segment> 
                        <Segment className="frostglass" >
                            
                        </Segment>     
                    </Grid.Column>
                </Grid.Row>  
            </Grid>
        </div>
    )


}

const mapStateToProps = state => {
    return {
      featuredData: state.frontPageReducers.featuredData,
      recommendedData: state.frontPageReducers.recommendedData
    }
}

const mapDispatchToProps = {
    frontPageFeaturedCard,
    frontPageRecommendedCard,
    getCart
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Frontpage);