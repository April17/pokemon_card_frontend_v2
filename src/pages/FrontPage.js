import React from 'react'
import { connect } from "react-redux"
import { Header, Image, Grid, Segment } from 'semantic-ui-react'
import PhotoSlider from '../components/PhotoSlider'
import TPG from '../assets/Image/illustration-contest-169.jpg'
import TPG_2 from '../assets/Image/25th_promo_2x_optimized.png'
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
        return fetch(`https://api.pokemontcg.io/v2/cards?q=name:"Celebi"&pageSize=20`, config)
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
            <Grid.Row className="first-row" >
                <Grid.Column width={1}></Grid.Column>
                <Grid.Column  width={9}>
                    <Image src={TPG_2} size='big' centered/>
                </Grid.Column>
                <Grid.Column  width={5}>
                    <Grid.Row><Image className="row-height" src={TPG} fluid centered/></Grid.Row>
                    <Grid.Row><Image className="row-height" src={TPG} fluid centered/></Grid.Row>
                    <Grid.Row><Image className="row-height" src={TPG} fluid centered/></Grid.Row>
                </Grid.Column>
                <Grid.Column width={1}></Grid.Column>
            </Grid.Row>
            <Grid.Row >
                <Grid.Column width={1}></Grid.Column>
                <Grid.Column width={14} textAlign='left' verticalAlign='bottom'>
                    <Header inverted as='h2'> Featured </Header>
                </Grid.Column>
                <Grid.Column width={1}></Grid.Column>
            </Grid.Row>   
            <Grid.Row>
                
                <Grid.Column width={1}></Grid.Column>
                <Grid.Column width={14}>
                    <Segment className="frostglass" >
                        <PhotoSlider data={data.data}/>
                    </Segment>    
                </Grid.Column>
                <Grid.Column width={1}></Grid.Column>
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