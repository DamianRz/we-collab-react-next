import React, { Fragment, useState } from 'react';
import { FaInstagram, FaFacebook } from 'react-icons/fa';
import { Text } from '../../text';
import { Card } from '../../card';
import { Slider } from '../../slider';
import { ContainerPage, SubContainerInfo } from '../../test/container-page/container-page';
import './barbers-card.scss';
import './barbers-card-mobile.scss';
import '../../../styles/theme.scss';
import '../../../styles/effects.scss';

export const BarbersCard = (props: {
  barbers: any[];
  title: string;
  subTitle: string;
}) => {

  const [barber, setBarber] = useState(undefined);

  const BarberItem = (props: {
    img: any;
    name: string;
    info: string;
    key?: number;
    barber?: any;
  }) => {
    return (
      <div className={`barber-item`} key={props.key}>
        <Text type="subtitle" className="barber-name">{props.name}</Text>
        <img
          className="barber-img"
          src={props.img}
          alt=""
        />
      </div>
    );
  };

  const BarberSocials = (props: { instagram: string; facebook: string }) => {
    return (
      <Fragment>
        <div className="employee-social">
          <a href={props.instagram}>
            <i className="fa fa-instagram" aria-hidden="true"></i>
            <FaInstagram className="employee-social-logo social-logo" />
          </a>
          <a href={props.facebook}>
            <FaFacebook className="employee-social-logo social-logo" />
          </a>
        </div>
      </Fragment>
    );
  };

  const getSteps = () => {
    return props.barbers.map((barber, i) => {
      return (
        <div key={i} className="barber-step">
          <BarberItem
            barber={barber}
            name={barber.name}
            info={barber.info}
            img={barber.urlProfileImage}
          />
        </div>
      )
    })
  }

  const SliderBarbers = () => {
    return (
      <div className="barbers-slider">
        <Slider steps={getSteps()} />
      </div>
    )
  }

  const AboutBarber = () => {
    return (
      <div className="about-barber">

        <div className="barber-social">
          <div className="social-box">
            <div className="picture">
            </div>
            <div className="social-list">

            </div>
          </div>
          <div className="about-box">
            <p>Breve descripcion del barbero, sus estudios aspiraciones etc</p>
          </div>
        </div>

        <div className="pictures-box">
        </div>
      </div>
    )
  }

  return (
    <Card
      title="Nuestros Equipo"
      background="https://i.ibb.co/R0Lxwsz/Whats-App-Image-2020-09-26-at-17-38-44.jpg"
      className="barber-card"
    >
      <ContainerPage>
        <SliderBarbers />
        <AboutBarber />
      </ContainerPage>
    </Card>
  );
};
