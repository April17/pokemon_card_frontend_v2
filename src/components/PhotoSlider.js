import React from 'react'
// import { connect } from "react-redux"
// import { Dimmer, Icon } from 'semantic-ui-react'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-skyblue.min.css'
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
                height : 420,
                perPage : 6,
                heightRatio : 0.3,
                gap : '1rem',
            } }>
            {props.data? 
                genSlide(props) 
                : 
                <SplideSlide>
                </SplideSlide>
            }
        </Splide>
    )
}

export default PhotoSlider