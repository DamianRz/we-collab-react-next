import React, { useContext, useEffect, useState } from 'react';
import { BarberListContext } from '../../../contexts/BarberListContext';
import { IBarber } from '../../../types/Barber.type';
import { ThemeContext } from '../../../contexts/ThemeContext';
import './barbers-list.scss';
import '../../../styles/theme.scss';

export const BarberItem = (props: {
  name: string;
  img: string;
  selected?: boolean;
  onSelect?: any;
  key?: number;
}) => {
  const {
    // @ts-ignore
    getTheme,
  } = useContext(ThemeContext);
  return (
    <div
      className={`barber ${props.selected ? 'selected-barber' : null}`}
      key={props.key}
      onClick={() => {
        props.onSelect ? props.onSelect() : null;
      }}
    >
      <img src={props.img} className="img" />
      <p className={`text text-${getTheme()} barber-name`}>{props.name}</p>
    </div>
  );
};

export const BarbersList = (props: { value: any; setBarber: any }) => {
  const [barbers, setBarbers] = useState([]);

  const {
    // @ts-ignore
    getBarbersList,
  } = useContext(BarberListContext);
  const {
    // @ts-ignore
    getTheme,
  } = useContext(ThemeContext);

  useEffect(() => {
    let barbersx = getBarbersList();
    setBarbers(barbersx);
  }, []);

  return (
    <div className="barbers-box">
      <div className="list_barbers-box effect-slide-left">
        {barbers.map((barber: any, i: number) => {
          return (
            <div key={i}>
              <BarberItem
                name={barber.name}
                img={barber.urlProfileImage}
                selected={props.value.name === barber.name ? true : false}
                onSelect={() => {
                  props.setBarber(barber);
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
