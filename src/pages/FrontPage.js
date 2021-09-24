import React from 'react'
import { connect } from "react-redux"
import { Header, Image, Grid, Segment, Dimmer, Icon, Rail } from 'semantic-ui-react'
import PhotoSlider from '../components/PhotoSlider'
import BannerSmall1 from '../assets/Image/swsh08_logo_169_en.png'
import BannerSmall2 from '../assets/Image/swsh07en.jpg'
import BannerSmall3 from '../assets/Image/swsh07-card-highlights-169-en.jpg'
import BannerLarge from '../assets/Image/swsh07-card-highlights-169-en.jpg'
import '../assets/style/FrontPage.css'



const Frontpage = (props) => {

    const [data, setData] = React.useState({})

    React.useEffect(() => {
        const config = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-Api-Key': 'fab1100e-a24f-425c-a0f9-610eced48d67'
              }
        }
        return fetch(`https://api.pokemontcg.io/v2/cards?q=name:"Rayquaza"&pageSize=12`, config)
            .then(rsp => rsp.json())
            .then(data => {
                setData(data)
            })
            .catch(error => {
                console.log("Error: ", error)
            })
    }, [])

    return(
        <Grid textAlign='center' style={{ height: '100vh' }} >
            <Grid.Row className="first-row">
                <Grid.Column width={1}></Grid.Column>
                <Grid.Column  width={8}>
                    <Segment className="frostglass" textAlign='right'>
                        <Image className="banner-height" src={BannerLarge} spaced='right'/>
                        <Rail internal position='left' size='huge' >
                            <Segment>Left Rail Content</Segment>
                        </Rail>
                    </Segment> 
                </Grid.Column>
                <Grid.Column  width={6}>
                    <Segment className="frostglass no-bottom-margin" >
                        
                        <Image className="third-height" src={BannerSmall2} fluid centered/>
                        <Image className="third-height" src={BannerSmall3} fluid centered/>
                    </Segment>  
                </Grid.Column>
                <Grid.Column width={1}></Grid.Column>
            </Grid.Row>  
            <Grid.Row stretched>
                <Grid.Column width={1}><Segment className="transparent" /></Grid.Column>
                <Grid.Column width={10}>
                    <Header inverted as='h2' textAlign='left'> Featured </Header>
                    <Segment className="frostglass" >
                        <Dimmer active={ data.data? false:true }>
                            <Icon loading name='spinner' size='huge' />
                        </Dimmer>
                        <PhotoSlider data={data.data}/>
                    </Segment>
                    <Header inverted as='h2' textAlign='left'> Recommended </Header>
                    <Segment className="frostglass" >
                        <Dimmer active={ data.data? false:true }>
                            <Icon loading name='spinner' size='huge' />
                        </Dimmer>
                        <PhotoSlider data={data.data}/>
                    </Segment> 
                    <Segment className="frostglass" >
                        
                    </Segment> 
                    <Segment className="frostglass" >
                       
                    </Segment> 
                    <Segment className="frostglass" >
                        
                    </Segment>     
                </Grid.Column>
                <Grid.Column width={4}>
                    <Segment className="frostglass" >

                    </Segment> 
                </Grid.Column>
                <Grid.Column width={1}><Segment className="transparent" /></Grid.Column>
            </Grid.Row>  
        </Grid>
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
)(Frontpage);