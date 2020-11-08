import React, { useState, useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {
  faTemperatureLow, faTemperatureHigh, faWind, faTint, faSignal,
} from '@fortawesome/free-solid-svg-icons';
import get from 'lodash.get';
import PropTypes from 'prop-types';
import useStyles from './useStyles';
import Store from '../../reducers/store';
import { fetchCurrentData } from '../../actions/chart-actions';

function Webcam(props) {
  const [state, dispatch] = useContext(Store);
  const [imageList, setImageList] = useState([]);
  const classes = useStyles();

  function fetchImageList() {
    const url = 'https://aventurate.com/webcam/listdir.php';
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setImageList(data);
      });
  }

  useEffect(() => {
    if (imageList.length === 0) {
      fetchImageList();
    }
  }, [imageList]);

  const {
    indoorTemp, outdoorTemp, indoorHum, outdoorHum, pressure, wind,
  } = state.currentConditions;
  return (
    <Card className={classes.root}>
      <CardContent>
        {
          imageList.length > 0
          && <img src={`https://aventurate.com/webcam/${imageList[0]}`} alt="estado actual" width="100%" />
        }
      </CardContent>
    </Card>
  );
}

export default Webcam;

Webcam.propTypes = {

};
