import React, { ReactChild, Fragment, ReactElement } from 'react';
import { Text } from '../../text';
import { useWindowSize } from '../../../hooks/useWindowSize';
import './container-page.scss';
import './container-page-mobile.scss';

// compoents used into ContainerPage component
export const SubContainerInfo = (props: {
  title: string;
  info: string;
  cost: string | undefined;
  className?: string
}) => {
  return (
    <div className={`info-box ${props.className}`}>
      <Text type="subtitle" className="title">{props.title}</Text>
      {
        props.info.split('\n').map((line, i) => {
          return (
            <div key={i}>
              <Text type="text" className="info">{line}</Text>
              <br />
            </div>
          );
        })
      }
      {
        props.cost &&
        <div className={`cost__info`}>
          {props.cost.split('\n').map((line, i) => {
            return (
              <div key={i}>
                <Text type="text" className="info">{line}</Text>
                <br />
              </div>
            )
          })}
        </div>
      }
    </div>
  );
};



export const SubContainerImage = (props: {
  imgClassName?: string,
  img: string,
  imgFooter?: any,
  title?: string,
}) => {
  const screenSize = useWindowSize();
  return (
    <div className={`img-box ${props.imgClassName}`}>
      <div className="image">
        <Text type="subtitle" className="title">{props.title}</Text>
        {typeof props.img === 'string' ? (
          <Fragment>
            <img
              style={
                screenSize.size.width > 1100
                  ? { width: `${(screenSize.size.width - 520) / 2}px` }
                  : null
              }
              src={props.img}
            />
            {props.imgFooter ? (
              <div className="image-footer">{props.imgFooter}</div>
            ) : null}
          </Fragment>
        ) : (
            props.img
          )}
      </div>
    </div>
  );
};

export const ContainerPage = (props: {
  children: ReactChild | ReactChild[];
  leftContent?: any;
  RightContent?: Element;
  key?: number;
  className?: string;
  containerClassName?: string;
}) => {

  const getTotalChilds = () => {
    let childs: any = props.children;
    try {
      return childs.length;
    } catch (error) {
      return 1
    }
  }

  return (
    <div key={props.key} className={`container-page ${props.className}`}>

      {/* left box */}
      <div className="left-box">
        {props.leftContent}
      </div>

      {/* center containers */}
      <div className={`containers ${props.containerClassName}`}>
        {React.Children.map(props.children, (child: ReactElement, i: number) => {
          return (
            <div className="sub-container"
              style={{ width: `${100 / getTotalChilds()}%`, margin: `${getTotalChilds() != 1 ? 'auto' : 'none'}` }}
              key={i}
            >
              {child}
            </div>
          );
        })}
      </div>

      {/* right box */}
      <div className="right-box">
        {props.RightContent}
      </div>
    </div>
  );
};
