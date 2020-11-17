import React from 'react';
import { Card } from '../../card';
import { ContainerPage } from '../../test/container-page/container-page';
import { Maps } from '../google_maps/google-maps';
import { Text } from '../../text';
import { FaInstagram, FaFacebook } from 'react-icons/fa';
import './home-footer.scss';
import './home-footer-mobile.scss';

export const HomeFooter = (props: {
  email: string;
  number: string;
  title: string;
  subtitle: string;
  instagram: string;
  facebook: string;
  theme?: 'dark' | 'light';
}) => {

  const getFooterInfo = () => {
    return (
      <div className="footer-info">
        <div className="footer-social">
          <img
            className="footer_logo-img effect-opacity"
            src="https://i.ibb.co/hfX81DT/art-experience-500.png"
            alt=""
          />
          <Text type="text">{props.email}</Text>
          <br />
          <Text type="text">{props.number}</Text>
          <br />
          <a href={props.instagram}>
            <i className="fa fa-instagram" aria-hidden="true"></i>
            <FaInstagram className="footer-social-logo social-logo" />
          </a>
          <a href={props.facebook}>
            <FaFacebook className="footer-social-logo social-logo" />
          </a>
        </div>
        <a
          className="footer-bussiness-link"
          href="https://www.instagram.com/zerobyone_/"
        >
          <Text type="small">© 2020 Art Experience - Desarrollado por ZeroByOne</Text>
        </a>
      </div>
    )
  }

  return (
    <Card
      className="footer-card"
      title={props.title}
    >
      <ContainerPage className={`footer-container`}>
        <div className="map-info">
          {props.subtitle.split('\n').map((line, i) => {
            return (
              <div key={i}>
                <div className="info-item">
                  <img src="https://img.icons8.com/fluent/15/000000/chevron-right.png" alt="" />
                  <Text type="text">{line}</Text>
                </div>
                <br />

              </div>
            )
          })}
        </div>
        <Maps className="footer-map" subtitle={props.subtitle} />
      </ContainerPage>
      {getFooterInfo()}
    </Card>
  );
};
