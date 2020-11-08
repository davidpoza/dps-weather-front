import React, { useState, useContext, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import Typography from '@material-ui/core/Typography';
import {
  faTemperatureLow, faTemperatureHigh, faWind, faTint, faSignal,
} from '@fortawesome/free-solid-svg-icons';
import get from 'lodash.get';
import PropTypes from 'prop-types';
import useStyles from './useStyles';
import Store from '../../reducers/store';

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

  return (
    <Card className={classes.root}>

      <CardMedia
        className={classes.cover}
        image={`https://aventurate.com/webcam/${imageList[0]}`}
        title="Live from space album cover"
      />
      <CardActions disableSpacing classes={{ root: classes.buttons }}>
        <IconButton>
          <NavigateBeforeIcon />
        </IconButton>
        <IconButton>
          <PlayArrowIcon />
        </IconButton>
        <IconButton>
          <NavigateNextIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default Webcam;

Webcam.propTypes = {

};
