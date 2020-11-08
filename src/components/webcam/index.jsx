import React, {
  useState, useContext, useEffect, useRef,
} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
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


function Webcam(props) {
  const [state, dispatch] = useContext(Store);
  const [photoIndex, setPhotoIndex] = useState(0);
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
      fetchImageList()
        .then((data) => {
          // image preloading
          data.forEach((image) => {
            const img = new Image();
            img.src = `https://aventurate.com/webcam/${image}`;
          });
        });
    }
    if (playing) {
      setTimeout(() => {
        changePhoto(photoIndex + 1);
      }, 500);
    }
  }, [imageList, playing, photoIndex]);

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

  const fullWidth = imageElement.current?.offsetWidth;
  const calculatedHeight = (456 * fullWidth) / 1472;
  const { day, hour, minute } = parseImageDate(imageList[photoIndex]);
  console.log("---->", day, hour, minute)
  return (
    <Card className={classes.root}>

      <CardMedia
        className={isXl ? classes.coverXl : classes.cover}
        image={`https://aventurate.com/webcam/${imageList[`${photoIndex}`]}`}
        ref={imageElement}
        style={!isXl && { height: fullWidth ? `${calculatedHeight}px` : '100px' }}
      />
      <CardMedia
        image={`https://aventurate.com/webcam/${imageList[`${mod(photoIndex + 1, imageList.length)}`]}`}
      />
      <CardContent className={classes.content}>
        <Typography variant="body1" component="div">
          { `Fotografía ${photoIndex + 1} de ${imageList.length}, el día ${parseInt(day, 10)} a las ${hour}:${minute}` }
        </Typography>
      </CardContent>
      <CardActions disableSpacing classes={{ root: classes.buttons }}>
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
      </CardActions>
    </Card>
  );
}

export default Webcam;

Webcam.propTypes = {

};
