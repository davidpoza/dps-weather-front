import React, {
  useState, useContext, useEffect, useRef,
} from 'react';

import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import PauseIcon from '@material-ui/icons/Pause';
import Typography from '@material-ui/core/Typography';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import PropTypes from 'prop-types';
import useStyles from './useStyles';
import Store from '../../reducers/store';
import WidgetBase from '../widgets/base';

const webcams = [
  {
    name: 'Aventúrate',
    url: 'https://aventurate.com/webcam',
    panoramic: true,
  },
  {
    name: 'Navacerrada 1',
    url: 'https://aventurate.com/webcam_externas/navacerrada-1',
  },
  {
    name: 'Navacerrada 2',
    url: 'https://aventurate.com/webcam_externas/navacerrada-2',
  },
  {
    name: 'Venta Marcelino 1',
    url: 'https://aventurate.com/webcam_externas/venta-marcelino-1',
  },
  {
    name: 'Venta Marcelino 2',
    url: 'https://aventurate.com/webcam_externas/venta-marcelino-2',
  },
  {
    name: 'Venta Marcelino 3',
    url: 'https://aventurate.com/webcam_externas/venta-marcelino-3',
  },
];
function Webcam(props) {
  const [state, dispatch] = useContext(Store);
  const [selectedUrl, setSelectedUrl] = useState(webcams[0].url);
  const [panoramic, setPanoramic] = useState(webcams[0].panoramic);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [imageList, setImageList] = useState([]);
  const classes = useStyles();
  const imageElement = useRef(null);

  function fetchImageList() {
    const url = `${selectedUrl}/listdir.php`;
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
    }
  }, [imageLoaded]);

  useEffect(() => {
    setImageLoaded(false);
    fetchImageList();
  }, [selectedUrl]);

  useEffect(() => {
    if (playing) {
      setTimeout(() => {
        changePhoto(photoIndex + 1);
      }, 500);
    }
  }, [playing, photoIndex]);

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

  const { day, hour, minute } = parseImageDate(imageList[photoIndex]);
  return (imageList.length > 0
    ? (
      <WidgetBase
        title="Webcams"
        image={`${selectedUrl}/${imageList[`${photoIndex}`]}`}
        actionsClasses={classes.buttons}
        panoramic={panoramic}
        actions={(
          <>
            <FormControl variant="outlined" className={classes.formControl}>
              <Select
                labelId="selected"
                id="selected"
                value={selectedUrl}
                onChange={(e) => {
                  const selectedWebcam = webcams.find(w => w.url === e.target.value);
                  setPanoramic(selectedWebcam?.panoramic || false);
                  setSelectedUrl(e.target.value);
                }}
                label="Selecciona webcam"
              >
                {
                  webcams.map((w) => (
                    <MenuItem value={w.url}>
                      {w.name}
                    </MenuItem>
                  ))
                }
              </Select>
            </FormControl>
            <IconButton title="Anterior foto" onClick={() => changePhoto(photoIndex - 1)}>
              <NavigateBeforeIcon />
            </IconButton>
            <IconButton title="Ver animación (hacia atrás en el tiempo)" onClick={play}>
              { playing ? <PauseIcon /> : <PlayArrowIcon /> }
            </IconButton>
            <IconButton title="Siguiente foto" onClick={() => changePhoto(photoIndex + 1)}>
              <NavigateNextIcon />
            </IconButton>

            <IconButton title="Volver a foto actual" onClick={() => changePhoto(0)}>
              <SkipNextIcon />
            </IconButton>
          </>
        )}
      >
        <CardMedia
          image={`https://aventurate.com/webcam/${imageList[`${mod(photoIndex + 1, imageList.length)}`]}`}
        />
        <Typography variant="body1" component="div">
          { `Foto ${photoIndex + 1} de ${imageList.length}, el día ${parseInt(day, 10)} a las ${hour}:${minute}` }
        </Typography>
      </WidgetBase>
    )
    : null
  );
}

export default Webcam;

Webcam.propTypes = {

};
