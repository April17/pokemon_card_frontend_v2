import React from 'react'
// import { connect } from "react-redux"
import { Image, Header, Button } from 'semantic-ui-react'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-skyblue.min.css'
import CardBack from '../assets/Image/pokemon_card_backside.png'
import Card from './Card'

const PhotoSlider = (props) => {

    const genSlide = (props) => {
        window.dataProps = props
        return props.data.map(cardData => 
            <SplideSlide key={cardData.id}>
                <Card cardData={cardData}/>
            </SplideSlide> 
        )
    }
    
    
    return(
        <Splide 
            options={ {
                rewind : true,
                autoHeight : true,
                perPage : 4,
                heightRatio : 0.3,
                gap : '1rem',
            } }>
            {props.data? 
                genSlide(props) 
                : 
                <SplideSlide>
                    <div className="ui link cards">
                        <div className="card transparent">
                            <div className="image">
                                <Image src={CardBack} size='small' centered />
                            </div>
                            <div className="content">
                                <div className="header">
                                    Loading...
                                </div>
                                {/* <div className="meta">
                                    
                                </div> */}
                                <div className="description">
                                    <Header inverted as='h4' textAlign='left'>Loading...</Header>
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
                </SplideSlide>
            }
        </Splide>
    )
}

export default PhotoSlider