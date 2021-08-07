import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import PauseIcon from '@material-ui/icons/Pause';
import Typography from '@material-ui/core/Typography';
import useStyles from './useStyles';
import WidgetBase from '../base';
import useWebcam from './hook';

function WebcamWidget() {
  const classes = useStyles();
  const {
    changePhoto,
    day,
    handleOnChange,
    hour,
    imageList,
    minute,
    panoramic,
    photoIndex,
    play,
    playing,
    selectedUrl,
    webcams,
  } = useWebcam();

  return (
    imageList.length > 0
      ? (
        <WidgetBase
          actionsClasses={classes.buttons}
          panoramic={panoramic}
          spaceBetween
          actions={(
            <>
              <FormControl variant="outlined" className={classes.formControl}>
                <Select
                  labelId="selected"
                  id="selected"
                  value={selectedUrl}
                  onChange={handleOnChange}
                  label="Selecciona webcam"
                >
                  {
                    webcams.map((w) => (
                      <MenuItem key={`item${w.name}`} value={w.url}>
                        {w.name}
                      </MenuItem>
                    ))
                  }
                </Select>
              </FormControl>

              <IconButton key="prev" title="Anterior foto" onClick={() => changePhoto(photoIndex - 1)}>
                <NavigateBeforeIcon />
              </IconButton>
              <IconButton key="animation" title="Ver animación (hacia atrás en el tiempo)" onClick={play}>
                {playing ? <PauseIcon /> : <PlayArrowIcon />}
              </IconButton>
              <IconButton key="next" title="Siguiente foto" onClick={() => changePhoto(photoIndex + 1)}>
                <NavigateNextIcon />
              </IconButton>

              <IconButton key="current" title="Volver a foto actual" onClick={() => changePhoto(0)}>
                <SkipNextIcon />
              </IconButton>
            </>
          )}
        >
          <div
            style={{ backgroundImage: `url(${selectedUrl}/${imageList[`${photoIndex}`]})` }}
            className={panoramic ? classes.panoramicMedia : classes.media}
          />

          <Typography variant="body1" component="div">
            {`Foto ${photoIndex + 1} de ${imageList.length}, el día ${parseInt(day, 10)} a las ${hour}:${minute}`}
          </Typography>
        </WidgetBase>
      )
      : null
  );
}

export default WebcamWidget;

WebcamWidget.propTypes = {

};
