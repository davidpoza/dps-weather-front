import {
  useState, useEffect, useCallback,
} from 'react';
import isEqual from 'lodash.isequal';
import { mod } from 'components/helpers/utils';
import useCachedFetch from 'hooks/useCachedFetch';

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
  const [playing, setPlaying] = useState(false);
  const [imageList, setImageList] = useState([]);
  const [data] = useCachedFetch(`${selectedUrl}/listdir.php`);

  const preloadImage = useCallback((index) => {
    if (imageList?.length) {
      const imgPreloadedUrl = `${selectedUrl}/${imageList[`${mod(index, imageList.length)}`]}`;
      const imgPreloaded = new Image();
      imgPreloaded.src = imgPreloadedUrl;
      window.imgPreloaded = imgPreloaded;
    }
  }, [imageList, selectedUrl]);

  // added comparation of data.url and current selectedUrl to avoid mismatching between url and list of images
  if (data.data && data.data.length && !isEqual(data.data, imageList) && data.url.startsWith(selectedUrl)) {
    setImageList(data.data);
  }

  const handleOnChange = (e) => {
    setImageList([]); // invalidate current list doesnt match with selectedUrl
    const selectedWebcam = webcams.find((w) => w.url === e.target.value);
    setPanoramic(selectedWebcam?.panoramic || false);
    setSelectedUrl(e.target.value);
  };

  const changePhoto = useCallback((index) => {
    preloadImage(index + 1);
    // preloadImage(index + 2);
    setPhotoIndex(mod(index, imageList.length));
  }, [preloadImage, imageList.length]);

  useEffect(() => {
    preloadImage(1);
    // preloadImage(2);
  }, [imageList, preloadImage]);

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
