import React from 'react';
import {
  SubContainerImage,
  SubContainerInfo,
  ContainerPage,
} from '../../test/container-page/container-page';
import { Card } from '../../card';

import './about-us-card.scss';
import './about-us-card-mobile.scss';
import '../../../styles/theme.scss';

export const AboutUsCard = (props: {
  title: string;
  info: string;
  picture: string;
}) => {
  return (
    <Card className="about-us-card" title={props.title}>
      <ContainerPage className={`container-about-us`}>
        <SubContainerInfo
          className="sub-container-info"
          info={props.info}
          title={""}
          cost={''} />
        <SubContainerImage img={props.picture} />
      </ContainerPage>
    </Card>
  );
};
