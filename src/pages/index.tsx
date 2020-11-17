import React, { useContext, useEffect, useState } from 'react';
import BarberAction from '../actions/Barber.actions';
import moment from 'moment';
import { FaGift, FaCartArrowDown } from 'react-icons/fa';
import { FiUserPlus } from 'react-icons/fi';
import { GiCoffeeCup, GiBeard, GiPaintedPottery } from 'react-icons/gi';
import { ButtonContext } from '../contexts/ButtonsContext';
import { ThemeContext } from '../contexts/ThemeContext';
import { BarberListContext } from '../contexts/BarberListContext';
import { IBarber } from '../types/Barber.type';
import { LoaderPage } from '../components/loader-page/loader-page';
import { Toolbar } from '../components/toolbar/toolbar';
import { BarbersCard } from '../components/main-page/barbers-card/barber-card';
import { AboutUsCard } from '../components/main-page/about-us-card';
import { HomeFooter } from '../components/main-page/home-footer/home-footer';
import { CoursesCard } from '../components/main-page/courses-card/course-card';
import { Banner } from '../components/main-page/banner/banner';
import { ServicesCard } from '../components/main-page/services-card/service-card';
import './index.scss';

const IndexPage = () => {
  const [barbers, setBarbers] = useState([]);

  const pageInfo = {
    name: 'Art Experience',
    slogan: '',
    openTimeLV: '11 a 19hs',
    openTimeSBD: '10 a 18hs',
    number: '22913056',
    cel: '095 499 023',
    email: 'art.experience.uy.2020@gmail.com',
    instagram: 'https://www.instagram.com/artexperiencee/',
    facebook: 'https://www.facebook.com/artexperiencee/?epa=SEARCH_BOX',
    aboutUsTitle: 'Acerca de Nosotros',

    aboutUs: `
    En Art Experience nos enfocamos en brindar un servicio de calidad y atención en cada detalle.\n
     El ambiente, la música y nuestra atención serán algunos de los muchos aspectos que podrás experimentar en nuestro local.\n
     Nuestro equipo se supera de manera constante para asi brindar una experiencia de calidad y mantenerse en lo último en tendencia.\n
     ... Marcamos la diferencia ...\n
     Bienvenid@ a Art Experience`,

    servicesTitle: 'Nuestros Servicios',
    services: 'Brindamos Servicios de Calidad y Asesoramiento Personalizado',
    coursesTitle: 'Nuestros Cursos',
    courses: 'Ofrecemos Cursos para Aumentaran su Experiencia',
    contactUsTitle: 'Contactenos',
    contactUs: ` Por cualquier tipo de informacion sobre cursos o productos, busquenos en nuestras redes sociales o dejenos un email.
                Recuerda que nuestro horario de atención es de Lunes a Sabados a partir de 10:00 hrs - 19:00 hrs 
                Puedes dejarnos un correo electronico o si lo prefieres un mensaje en algunas de nuestras redes sociales 
                A la brevedad alguien del equipo de Art lo atenderá.`,
  };
  const services = [
    {
      icon: <GiBeard className="service-icon" />,
      name: 'Barberia',
      info:
        'La mejor calidad en Cortes Modernos y Clasicos,\n Barba - Cejas - Black Mask',
      url: 'Read More',
    },
    {
      icon: <FiUserPlus className="service-icon" />,
      name: 'Peluquería',
      info:
        'Incorporamos la mejor calidad en \nCortes, Colores y Peinados para Damas',
      url: 'Read More',
    },
    {
      icon: <GiCoffeeCup className="service-icon" />,
      name: 'CoffeShop',
      info:
        'El nuevo servicio de Cafetería \nTragos y un menu para que puedas disfrutar',
      url: 'Read More',
    },
    {
      icon: <FaCartArrowDown className="service-icon" />,
      name: 'Productos',
      info:
        'La mejor calidad en todos los productos \n para tu cuidado personal',
      url: 'Read More',
    },
    {
      icon: <FaGift className="service-icon" />,
      name: 'Beneficios',
      info:
        'Beneficios y descuentos en todos nuestros servicios \npara usuarios de la barberia',
      url: 'Read More',
    },
  ];

  const courses = [
    {
      name: 'INTENSIVO',
      duration: '4 meses', //  1 clase por semana a partir de las 13:30hrs
      info: `
      El curso incluye los materiales a utilizar en el mismo.
      Conoceras y entenderas las diferentes tecnicas y conceptos claves 
      Que te harán ser un barbero capaz de Manejar, Utilizar y Perfeccionar. 
      🏆 Estilos de las últimas tendencias 🏆
      ➬ Freestyle      
      ➫ Fade (Degradé) 
      ➬ Peinados       
      ➫ Marketing      
      ➬ Fotografía     
      ➬ Particiones y secciones de la cabeza 
      ..🕒 Duración 4 meses ..
      ... 🗓️ Fecha a coordinar ...`,
      cost: `💈 Formas de Pago 💈
         Contamos con 2 posibilidades de pago 🙌
         👉 Contado:   💲 13.000 
         👉 Financiado: 💲 4.000 (hasta en 4 cuotas) 
         Posibilidad de reservar un lugar con una seña de 💲 1.500 
      `,
      icon: 'event',
      img: 'https://i.ibb.co/xgD16sC/Modelo-3.jpg',
      url: 'Read More',
    },
    {
      name: 'COLORIMETRIA',
      info: `
      Materiales incluidos.
      Se realizaran los siguientes trabajos en cada uno de los modelos
      Dando lugar a poder conocer las diferentes técnicas 
      utilizadas en cada color que apliquemos en el curso.
      🏆 En la clase trabajamos con 3 modelos 🏆
      ➬ 👦 Platinado
      ➫ 👧 Fantasia
      ➬ 👩 Mechitas

      Este curso le otorgará un certificado de concurrencia
      ..🕒 Duración 6 Horas ..
      ... 🗓️ Fecha a coordinar ... 
      `,
      duration: '6 Horas',
      cost: `💈 Formas de Pago 💈
           Contamos con 1 posibilidad de pago 🙌
           👉 Contado:   💲 8.000 
      Posibilidad de reservar un lugar con una seña de 💲 1.000 
   `,
      icon: 'event',
      img: 'https://i.ibb.co/HnG4W5H/modelo-5.jpg',
      url: 'Read More',
    },
    {
      name: 'AVANZADO',
      info: `
          En este perfeccionamiento Trabajaremos con 4 modelos
        En los cuales se realizaran 3 estilos diferentes.
        Tendras la oportunidad de expandir tus conocimientos. 
        Realizando tres de los estilos mas demandados 🚀
        La modalidad sera, escojeras uno de los estilos que mas te guste.
        Una vez que escojas ese estilo, Lo applicarás en dos de tus modelos.
        mientras que los otros dos modelos, se les hará los demas estilos.
        🏆 Estos son los estilos que aprenderas a realizar 🏆  
        ➬ 👦 FrenchCrop 
        ➫ 👦 Pompadour
        ➬ 👦 Classic Cuts
        ..🕒 Duración 6 Horas ..
        ... 🗓️ Fecha a coordinar ... 
      `,
      duration: '2 dias', //  / 2 cortes diarios
      cost: `💈 Formas de Pago 💈
             Contamos con 1 posibilidad de pago 🙌
             👉 Contado:   💲 6.000 
             Posibilidad de reservar un lugar con una seña de 💲 1.000`,
      icon: 'event',
      img: 'https://i.ibb.co/0Y6jz8s/modelo-4.jpg',
      url: 'Read More',
    },
  ];
  const aboutusPictures = [
    { url: 'https://i.ibb.co/9ZqynfD/Premiacion-Barber-Shop-Style.jpg' },
  ];
  const dividers = [
    {
      img:
        'https://instagram.fmvd1-1.fna.fbcdn.net/v/t51.2885-15/e35/57488298_2276560875734649_7666756016645949298_n.jpg?_nc_ht=instagram.fmvd1-1.fna.fbcdn.net&_nc_cat=109&_nc_ohc=MskQCPZA-BkAX_omsCq&oh=44ff4fcc828dcbe2403bedd48f6383e6&oe=5F57538C',
      align: 'right',
    },
    {
      img:
        'https://instagram.fmvd4-1.fna.fbcdn.net/v/t51.2885-15/e35/54800426_106275450418894_8601708499349892562_n.jpg?_nc_ht=instagram.fmvd4-1.fna.fbcdn.net&_nc_cat=110&_nc_ohc=q4qz70Pjc80AX-b06U8&oh=3251c0cae9f80fbccf8e56c45667f64f&oe=5F30DAD3',
      align: 'left',
    },
    {
      img:
        'https://scontent.fmvd4-1.fna.fbcdn.net/v/t1.0-9/s960x960/45230851_310326229560512_8082084365997178880_o.jpg?_nc_cat=110&_nc_sid=dd9801&_nc_ohc=LwkdhjYPttcAX8sw6hk&_nc_ht=scontent.fmvd4-1.fna&_nc_tp=7&oh=e90cde8ea10295ce8a00a64d7e1cae1a&oe=5F565319',
      align: 'right',
    },
  ];
  const {
    // @ts-ignore
    getTheme,
  } = useContext(ThemeContext);
  const {
    // @ts-ignore
    setDisabledButton,
    disabled,
  } = useContext(ButtonContext);
  const {
    // @ts-ignore
    setBarbersList,
    getBarbersList,
  } = useContext(BarberListContext);
  const barberActions = new BarberAction();

  useEffect(() => {
    const fetchData = async () => {
      setDisabledButton(true);
      let resultBarbers = null;
      do {
        resultBarbers = await getBarbers();
      } while (!resultBarbers);
      setBarbersList(resultBarbers); // save in store
      setBarbers(resultBarbers);
      setDisabledButton(false);
    };
    // execute the async function
    fetchData();
  }, []);

  const getBarbers = async () => {
    const response: IBarber[] = await barberActions.getAll();
    if (response) {
      barbers.map((barber: IBarber) => {
        // formatting data
        barber.startDate = moment(barber.startDate)
          .format('DD/MM/YYYY hh:mm:ss')
          .substr(0, 16);
      });
      return response;
    }
    return undefined;
  };

  return (
    <div className="index_page">
      <div className="toolbar-box">
        <Toolbar />
      </div>
      <div className="page-box">
        <div className="dashboard">
          <div id="banner" />
          <Banner />
          <div id="about_us" />

          <AboutUsCard
            title={pageInfo.aboutUsTitle}
            info={pageInfo.aboutUs}
            picture={aboutusPictures[0].url}
          />
          <div id="barbers" />
          {barbers.length ? (
            <BarbersCard
              barbers={barbers}
              title="Nuestros Equipo"
              subTitle={''}
            />
          ) : null}
          <div id="services" />
          <ServicesCard
            services={services}
            title={pageInfo.servicesTitle}
            subTitle={pageInfo.contactUs}
          />
          <div id="courses" />
          <CoursesCard
            courses={courses}
            title={pageInfo.coursesTitle}
            subTitle={pageInfo.contactUs}
          />
          <div id="contact" />

          <HomeFooter
            title={pageInfo.contactUsTitle}
            subtitle={pageInfo.contactUs}
            email={pageInfo.email}
            number={pageInfo.number}
            instagram={pageInfo.instagram}
            facebook={pageInfo.facebook}
            theme="light"
          />
        </div>
      </div>
      <LoaderPage show={disabled} />
    </div>
  );
};

IndexPage.displayName = 'Index Page';
export default IndexPage;
