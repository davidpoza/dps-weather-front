import React, { createContext, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import storeReducer from './store-reducer';

const initialState = {
  loading: false,
  error: false,
  msg: '',
  lastSearchId: undefined,
  user: undefined, // Object from user entity /models/user.js
  history: {}, // object with search entities (/models/search.js)
  graph1_sensor: '',
  graph2_sensor: '',
  graph1_date: '',
  graph2_date: '',
  graph1_points: [],
  graph2_points: [],
  forecast: {}, // locations as keys
  graphs: {},
  currentConditions: {
    date: undefined,
    outdoorTemp: undefined,
    indoorTemp: undefined,
    outdootHum: undefined,
    indoorHum: undefined,
    pressure: undefined,
    wind: undefined,
  },
};

const Store = createContext();
export default Store;

export function StoreProvider(props) {
  const { children } = props;
  const [state, dispatch] = useReducer(storeReducer, [], () => {
    const ls = localStorage.getItem('dps_weather_store');
    return (ls ? JSON.parse(ls) : initialState);
  });

  useEffect(() => {
    localStorage.setItem('dps_weather_store', JSON.stringify(state));
  }, [state]);

  return (
    <Store.Provider value={[state, dispatch]}>
      {children}
    </Store.Provider>
  );
}

StoreProvider.propTypes = {
  children: PropTypes.node,
};
