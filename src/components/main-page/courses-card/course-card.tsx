import React, { useContext, useState, Fragment } from 'react';
import { ThemeContext } from '../../../contexts/ThemeContext';
import { Card } from '../../card';
import {
  ContainerPage,
  SubContainerInfo,
  SubContainerImage,
} from '../../test/container-page/container-page';
import { useWindowSize } from '../../../hooks/useWindowSize';
import './courses-card.scss';
import './courses-card-mobile.scss';

import '../../../styles/theme-buttons.scss';
import '../../../styles/effects.scss';
import { Slider } from '../../slider';
import { Text } from '../../text';

export const CoursesCard = (props: {
  courses: any[];
  title: string;
  subTitle: string;
}) => {
  const [selectedCourse, setSelectedCourse] = useState(props.courses[0]);
  const [effects, setEffects] = useState('');
  const screenSize = useWindowSize();

  const {
    // @ts-ignore
    getTheme,
  } = useContext(ThemeContext);


  const CourseItem = (props: {
    img: any;
    name: string;
    info: string;
    key?: number;
    course?: any;
  }) => {
    const {
      // @ts-ignore
      getTheme,
    } = useContext(ThemeContext);
    return (
      <div className={`course-item`} key={props.key}>
        <img
          onMouseEnter={() => {
            setEffects(
              screenSize.size.width > 1100
                ? 'effect-slide-left'
                : 'effect-slide-top'
            );
            setSelectedCourse(props.course);
          }}
          onMouseLeave={() => {
            setEffects('');
          }}
          className="course-img"
          src={props.img}
          alt=""
        />
        <p className={`course-name text text-light`}>{props.name}</p>
      </div>
    );
  };

  const getCourses = () => {
    return props.courses.map((course, i) => (
      <div
        key={i}
      >
        <ContainerPage className="container-course">
          <SubContainerInfo
            className="sub-container-info"
            title={course.name}
            info={course.info}
            cost=""
          />

          <SubContainerImage
            imgClassName="course-img"
            img={course.img}
            imgFooter={
              <div className="payform-container-style">
                {course.cost.split('\n').map((line, i) => {
                  return (
                    <div key={i}>
                      <Text type="text" className="info">{line}</Text>
                      <br />
                    </div>
                  )
                })}
              </div>
            }
          />

        </ContainerPage>
      </div>
    ));
  };

  return (
    <Card
      title="Nuestros Cursos"
      background="https://i.ibb.co/p2rw6YR/Whats-App-Image-2020-09-26-at-17-38-45.jpg"
      className="course-card"
    >
      <Slider
        steps={getCourses()} />
    </Card>


    // <Divider
    //   title="Nuestros Cursos"
    //   img="https://i.ibb.co/p2rw6YR/Whats-App-Image-2020-09-26-at-17-38-45.jpg"
    //   align="left"
    //   className="divider"
    // >
    //   <div className="course-card">
    //     <ContainerPage
    //       className={`container-course`}
    //       containerClassName={`${effects}`}
    //       leftContent={
    //         <div className="courses-items">
    //           <p className="help-action">Cursos</p>
    //           {getCourses()}
    //         </div>
    //       }
    //     >
    //       <SubContainerInfo
    //         className="sub-container-info"
    //         title={selectedCourse.name}
    //         info={selectedCourse.info}
    //         cost={selectedCourse.cost}
    //       />
    //       <SubContainerImage img={selectedCourse.img} />
    //     </ContainerPage>
    //   </div>
    // </Divider>
  );
};
