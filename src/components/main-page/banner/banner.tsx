import React, { useContext } from 'react';
import { ThemeContext } from '../../../contexts/ThemeContext';
import { Text } from '../../text';
import './banner.scss';
import '../../../styles/effects.scss';
import { Slider } from '../../slider';

export const Banner = () => {
  const {
    // @ts-ignore
    getTheme,
  } = useContext(ThemeContext);

  const urlImages = [
    // 'https://instagram.fmvd3-1.fna.fbcdn.net/v/t51.2885-15/e35/106270708_155945212770871_2760920324088556480_n.jpg?_nc_ht=instagram.fmvd3-1.fna.fbcdn.net&_nc_cat=107&_nc_ohc=gUMZ-HH5s3sAX8NxgPN&_nc_tp=18&oh=15cdc74251a10ea8f785a8c19d3948af&oe=5FC31511',
    'https://raw.githubusercontent.com/DamianRz/organize-frontend/master/src/assets/banner.jpg'
  ];

  const getSteps = () => {
    return urlImages.map((img, i) => {
      return (
        <div key={i} className="pictures-step">
          <img src={img} alt="" />
        </div>
      )
    })
  }

  return (
    <div className={`banner ${getTheme()}`}>
      <Slider hideArrows={true} steps={getSteps()} />
      <div className="title-box">
        <div className="box-shadow_space"></div>
        <Text type="brand">We Collab</Text>
        <div className="box-shadow_logo"></div>
      </div>
    </div>
  );
};
