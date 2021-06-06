import React, {
  useState, useContext, useEffect, useRef,
} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Typography from '@material-ui/core/Typography';
import {
  faSun, faMoon,
} from '@fortawesome/free-solid-svg-icons';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import PropTypes from 'prop-types';
import useStyles from './useStyles';
import Store from '../../../reducers/store';
import WidgetBase from '../base';
import {
  getCESTTime,
} from '../../helpers/utils';

function Webcam(props) {
  const [state, dispatch] = useContext(Store);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [imageList, setImageList] = useState([]);
  const classes = useStyles();
  const isXl = useMediaQuery('(min-width:1920px)');
  const imageElement = useRef(null);

  function fetchImageList() {
    const url = 'https://aventurate.com/webcam/listdir.php';
    return fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setImageList(data);
        setImageLoaded(true);
        return (data);
      });
  }

  function mod(n, m) {
    return ((n % m) + m) % m;
  }

  function changePhoto(index) {
    setPhotoIndex(mod(index, imageList.length));
  }

  useEffect(() => {
    if (imageList.length === 0) {
      setImageLoaded(false);
      fetchImageList();
      // .then((data) => {
      //   // image preloading
      //   data.forEach((image) => {
      //     const img = new Image();
      //     img.src = `https://aventurate.com/webcam/${image}`;
      //   });
      // });
    }
    if (playing) {
      setTimeout(() => {
        changePhoto(photoIndex + 1);
      }, 500);
    }
  }, [imageLoaded, playing, photoIndex]);

  function play() {
    setPlaying(!playing);
  }

  /**
   * Receives filename format: 20201107_180000M.jpg
   */
  function parseImageDate(filename) {
    if (!filename) return ({});
    const matches = filename.match(/(\d{4})(\d{2})(\d{2})_(\d{2})(\d{2})/);
    return ({
      year: matches[1],
      month: matches[2],
      day: matches[3],
      hour: matches[4],
      minute: matches[5],
    });
  }

  const sunrise = state?.forecast?.['colmenar-viejo']?.data?.[0]?.sunrise?.value;
  const sunset = state?.forecast?.['colmenar-viejo']?.data?.[0]?.sunset?.value;

  return (imageList.length > 0
    ? (
      <WidgetBase
        title="Webcam"
        image={`https://aventurate.com/webcam/${imageList[`${photoIndex}`]}`}
        moreInfo="Ver evolución"
      >
        <div className={classes.sunrise}>
          <Typography variant="body1">
            <FontAwesomeIcon icon={faSun} />
            { ` Amanecer: ${sunrise ? getCESTTime(sunrise) : 'No disponible'}` }
          </Typography>
          <Typography variant="body1">
            <FontAwesomeIcon icon={faMoon} />
            { ` Anochecer: ${sunset ? getCESTTime(sunset) : 'No disponible'}` }
          </Typography>
        </div>
      </WidgetBase>
    )
    : null
  );
}

export default Webcam;

Webcam.propTypes = {

};
