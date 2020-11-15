export default function reducer(state, action) {
  const newHistory = { ...state.history };
  const newForecastObj = {
    ...state.forecast,
  };
  switch (action.type) {
    case 'SIGNUP_ATTEMPT':
      return {
        ...state, loading: true, error: false,
      };
    case 'SIGNUP_SUCCESS':
      return {
        ...state, loading: false, msg: action.payload.msg,
      };
    case 'SIGNUP_FAIL':
      return {
        ...state, loading: false, error: true, msg: action.payload.msg,
      };
    case 'LOGIN_ATTEMPT':
      return {
        ...state, user: undefined, loading: true, error: false,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state, loading: false, user: action.payload,
      };
    case 'LOGIN_FAIL':
      return {
        ...state, loading: false, error: true, msg: action.payload.msg,
      };
    case 'LOGOUT':
      return {
        ...state, loading: false, error: false, user: undefined, history: {},
      };
    case 'GET_CHART_ATTEMPT':
      if (action.payload.graph === 1) {
        return {
          ...state, loading: true, error: false, graph1_points: [],
        };
      }
      return {
        ...state, loading: true, error: false, graph2_points: [],
      };
    case 'GET_CHART_SUCCESS':
      if (action.payload.graph === 1) {
        return {
          ...state, loading: false, graph1_points: action.payload.points,
        };
      }
      return {
        ...state, loading: false, graph2_points: action.payload.points,
      };
    case 'GET_CHART_FAIL':
      return {
        ...state, loading: false, error: true, msg: action.payload.msg,
      };
    case 'GET_FORECAST_ATTEMPT':
      newForecastObj[action.payload.location] = [];
      return {
        ...state, loading: true, error: false, forecast: newForecastObj,
      };
    case 'GET_FORECAST_SUCCESS':
      newForecastObj[action.payload.location] = action.payload.forecast;
      return {
        ...state, loading: false, forecast: newForecastObj,
      };
    case 'GET_FORECAST_FAIL':
      return {
        ...state, loading: false, error: true, msg: action.payload.msg,
      };
    case 'GET_CURRENT_ATTEMPT':
      return {
        ...state,
        loading: true,
        error: false,
        currentConditions: {
          outdoorTemp: undefined,
          indoorTemp: undefined,
          outdoorHum: undefined,
          indoorHum: undefined,
          pressure: undefined,
          wind: undefined,
          date: undefined,
        },
      };
    case 'GET_CURRENT_SUCCESS':
      return {
        ...state,
        loading: false,
        currentConditions: {
          outdoorTemp: action.payload.outdoorTemp,
          indoorTemp: action.payload.indoorTemp,
          outdoorHum: action.payload.outdoorHum,
          indoorHum: action.payload.indoorHum,
          pressure: action.payload.pressure,
          wind: action.payload.wind,
          date: action.payload.date,
        },
      };
    case 'GET_CURRENT_FAIL':
      return {
        ...state, loading: false, error: true, msg: action.payload.msg,
      };
    case 'CLEAN_ALERT_BAR':
      return {
        ...state, msg: '',
      };
    case 'SET_GRAPH_SENSOR':
      if (action.payload.graph === 1) {
        return {
          ...state, graph1_sensor: action.payload.sensor,
        };
      }
      return {
        ...state, graph2_sensor: action.payload.sensor,
      };
    case 'SET_GRAPH_DATE':
      if (action.payload.graph === 1) {
        return {
          ...state, graph1_date: action.payload.date,
        };
      }
      return {
        ...state, graph2_date: action.payload.date,
      };
    default:
      return state;
  }
}
