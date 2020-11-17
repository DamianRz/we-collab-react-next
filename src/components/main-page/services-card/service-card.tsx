import React, { useContext } from 'react';
import { ThemeContext } from '../../../contexts/ThemeContext';
import { Card } from '../../card';
import { Text } from '../../text';
import './services-card.scss';
import '../../../styles/theme.scss';

export const ServiceItem = (props: {
  key?: number;
  icon: any;
  name: string;
  info: string;
}) => {
  return (
    <div className={`service-item`} key={props.key}>
      <br />
      {props.icon}
      {/* <p className={` text text-light`}>{props.name}</p> */}
      <Text className="service-name" type="text">{props.name}</Text>

      <div className={`service-info text text-light`}>
        {props.info.split('\n').map((line, i) => {
          return (
            <div key={i}>
              <Text type="text">{line}</Text>
            </div>
          )
        })}
      </div>


    </div>
  );
};

export const ServicesCard = (props: {
  services: any[];
  title: string;
  subTitle: string;
}) => {
  const {
    // @ts-ignore
    getTheme,
  } = useContext(ThemeContext);

  const getServices = () => {
    return props.services.map((service, i) => (
      <div className="service-item" key={i}>
        <ServiceItem
          name={service.name}
          info={service.info}
          icon={service.icon}
        />
      </div>
    ));
  };

  return (
    <Card
      title="Servicios / Promos"
      subtitle="Brindamos Servicios de Calidad y Asesoramiento Personalizado"
      background="https://i.ibb.co/DfFncm2/Whats-App-Image-2020-09-26-at-17-38-45-1.jpg"
      className="service-divider"
    >
      <div className="divider-content">
        <div className="services-card">{getServices()}</div>
      </div>
    </Card>
  );
};
