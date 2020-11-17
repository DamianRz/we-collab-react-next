import React, { ReactElement, createContext, useState, useEffect } from 'react';
//import TimeActions from '../actions/AvailableTime.actions';
//
//export const FirebaseContext = createContext({
//  query: (queryText: string) => undefined,
//});
//
//export const FirebaseProvider = (props: { children: ReactElement }) => {
//  const timeActions: TimeActions = new TimeActions();
//
//  Get Query -> Naming Convention -> getAvailableTimes
//  const query = (queryText: string) => {
//       let response = timeActions.getReservatesHoursByReserves(queryText);
//       return response);
//       console.log('Objeto response', response);
//  };
//
//  const context = { query };
//
//  return (
//    <FirebaseContext.Provider value={context}>
//      {props.children}
//    </FirebaseContext.Provider>
//  );
//};
