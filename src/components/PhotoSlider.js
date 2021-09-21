import React from 'react'
// import { connect } from "react-redux"
import { Image, Dimmer, Loader } from 'semantic-ui-react'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';


const PhotoSlider = (props) => {

    const genSlide = (props) => {
        return props.data.map(images => 
            <SplideSlide>
                <Image src={images.images.small} alt="Image 1" size='small' key={images.id} centered/>
            </SplideSlide> 
        )
    }

    return(
        <Splide 
            options={ {
                rewind : true,
                height : 210,
                perPage : 10,
                heightRatio : 0.3,
                gap : '1rem',
            } }>
            {props.data? genSlide(props) : null}
        </Splide>
    )
}

export default PhotoSlider