import fetch from 'isomorphic-fetch';
import config from '../config';
import mockSearchComments from './mocks/search-comments';
import mockListVideos from './mocks/list-videos';
import mockListChannels from './mocks/list-channel';

const AEMET_API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwb3phc3VhcmV6QGdtYWlsLmNvbSIsImp0aSI6IjkwNDVkMWI3LTVjYzgtNDI1Mi1hMjE4LWUxMDk2MDY4NjFkZiIsImlzcyI6IkFFTUVUIiwiaWF0IjoxNjA1MDA1OTkyLCJ1c2VySWQiOiI5MDQ1ZDFiNy01Y2M4LTQyNTItYTIxOC1lMTA5NjA2ODYxZGYiLCJyb2xlIjoiIn0.QRnV3UFCQD-5WGWqgkdZ_1CdBDWHEpq0qdA5WVYTw3g';

export default {
  user: {
    login(email, password) {
      const q = [
        process.env.REACT_APP_API_URL,
        '/api/auth',
        '/authenticate',
      ].join('');
      const opt = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      };
      return (process.env.REACT_APP_DEBUG === 'true' ? Promise.resolve({}) : fetch(q, opt));
    },
    register(email, password) {
      const q = [
        process.env.REACT_APP_API_URL,
        '/api/auth',
        '/register',
      ].join('');
      const opt = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      };
      return (process.env.REACT_APP_DEBUG === 'true' ? Promise.resolve({}) : fetch(q, opt));
    },
    getUserInfo(token) {
      const q = [
        process.env.REACT_APP_API_URL,
        '/api/users/me',
      ].join('');
      const opt = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      return (process.env.REACT_APP_DEBUG === 'true' ? Promise.resolve({}) : fetch(q, opt));
    },
  },
  chart: {
    getData(date, stationId, token) {
      const q = [
        process.env.REACT_APP_API_URL,
        '/api/logging/log/',
        `${date}/`,
        `${stationId}`,
      ].join('');
      const opt = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      return (fetch(q, opt));
    },
    getCurrentData(stationId, token) {
      const q = [
        process.env.REACT_APP_API_URL,
        '/api/logging/log/',
        `${stationId}`,
      ].join('');
      const opt = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      return (fetch(q, opt));
    },
  },
  weather: {
    // devuelve un array con todas las mediciones
    station(idema) {
      return fetch(`
      https://opendata.aemet.es/opendata/api/observacion/convencional/datos/estacion/${idema}?api_key=${AEMET_API_KEY}`)
        .then((res) => res.json())
        .then((data) => fetch(data.datos))
        .then((res) => res.json())
        .then((data) => data);
    },
    // código de municipio, colmenar-> 28045
    forecastAEMET(cmun) {
      return fetch(`
      https://opendata.aemet.es/opendata/api/prediccion/especifica/municipio/diaria/${cmun}?api_key=${AEMET_API_KEY}`)
        .then((res) => res.json())
        .then((data) => fetch(data.datos))
        .then((res) => res.json())
        .then((data) => data);
    },
    forecastClimaCell(location) {
      return fetch(`https://tiempo.davidinformatico.com/forecast/${location}.json`);
    },
    realtimeClimaCell(location) {
      return fetch(`https://tiempo.davidinformatico.com/realtime/${location}.json`);
    },
    getLast24Comparison(datetime, stationId, token) {
      const q = [
        process.env.REACT_APP_API_URL,
        '/api/logging/log/nearest/',
        `${datetime}/`,
        `${stationId}`,
      ].join('');
      const opt = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      return (fetch(q, opt));
    },
  },
  comments: {
    search(videoId, keywords, token) {
      const q = [
        process.env.REACT_APP_API_URL,
        '/api/videos/',
        `${videoId}/`,
        'comments',
        `?keywords=${keywords}`, // TODO: encode
      ].join('');
      const opt = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      return (process.env.REACT_APP_DEBUG === 'true' ? Promise.resolve(mockSearchComments) : fetch(q, opt));
    },
  },
  videos: {
    list(videoId, token) {
      const q = [
        process.env.REACT_APP_API_URL,
        '/api/videos/',
        `${videoId}`,
      ].join('');
      const opt = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      return (process.env.REACT_APP_DEBUG === 'true' ? Promise.resolve(mockListVideos) : fetch(q, opt));
    },
  },
  channels: {
    list(channelId, token) {
      const q = [
        process.env.REACT_APP_API_URL,
        '/api/channels/',
        `${channelId}`,
      ].join('');
      const opt = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      return (process.env.REACT_APP_DEBUG === 'true' ? Promise.resolve(mockListChannels) : fetch(q, opt));
    },
  },
};
