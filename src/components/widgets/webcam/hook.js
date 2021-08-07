import {
  useState, useEffect, useCallback,
} from 'react';
import isEqual from 'lodash.isequal';
import { mod } from 'components/helpers/utils';

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

export default function useWebcam() {
  const [selectedUrl, setSelectedUrl] = useState(webcams[0].url);
  const [panoramic, setPanoramic] = useState(webcams[0].panoramic);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [imageList, setImageList] = useState([]);

  const handleOnChange = (e) => {
    const selectedWebcam = webcams.find((w) => w.url === e.target.value);
    setPanoramic(selectedWebcam?.panoramic || false);
    setSelectedUrl(e.target.value);
  };

  const preloadImage = useCallback((index) => {
    if (imageList.length) {
      const imgPreloadedUrl = `${selectedUrl}/${imageList[`${mod(index + 1, imageList.length)}`]}`;
      const imgPreloaded = new Image();
      imgPreloaded.src = imgPreloadedUrl;
      window.imgPreloaded = imgPreloaded;
    }
  }, [imageList, selectedUrl]);

  const fetchImageList = useCallback(() => {
    const url = `${selectedUrl}/listdir.php`;
    return fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (!isEqual(data, imageList)) {
          setImageList(data);
          setImageLoaded(true);
          preloadImage(1);
        }
        return (data);
      });
  }, [selectedUrl, preloadImage, imageList]);

  const changePhoto = useCallback((index) => {
    preloadImage(index);
    setPhotoIndex(mod(index, imageList.length));
  }, [preloadImage, imageList.length]);

  useEffect(() => {
    preloadImage(0);
  }, [imageList, preloadImage]);

  useEffect(() => {
    if (imageList.length === 0) {
      setImageLoaded(false);
      fetchImageList();
    }
  }, [imageLoaded, fetchImageList, imageList.length]);

  useEffect(() => {
    setImageLoaded(false);
    fetchImageList();
    preloadImage(0);
  }, [fetchImageList, preloadImage]);

  useEffect(() => {
    if (playing) {
      setTimeout(() => {
        changePhoto(photoIndex + 1);
      }, 500);
    }
  }, [playing, photoIndex, changePhoto]);

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

  return {
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
  };
}
