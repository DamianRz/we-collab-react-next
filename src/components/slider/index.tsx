import React from 'react';
import SlickSlider from 'react-slick';
import './slider.scss';
import './slider-mobile.scss';

export const Slider = (props: {
    steps: any,
    className?: string,
    hideArrows?: boolean
}) => {
    const defaultConf = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: !props.hideArrows
    };

    return (
        <SlickSlider
            className={`slider ${props.className}`}
            {...defaultConf}
        >
            {props.steps}
        </SlickSlider>
    );
}