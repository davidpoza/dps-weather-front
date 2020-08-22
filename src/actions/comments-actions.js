import moment from 'moment';
import { v4 as uuid } from 'uuid';
import get from 'lodash.get';
import api from '../api';
import createSearch from '../models/search';
import createComment from '../models/comment';

/* eslint-disable import/prefer-default-export */
export function fetchComments(dispatch, { videoId, keywords, token }) {
  const search = createSearch({
    id: uuid(),
    date: moment().format('DD-MM-YYYY HH:mm'),
    videoId,
    videoTitle: 'temporal title',
    keywords,
  });
  dispatch({
    type: 'GET_COMMENTS_ATTEMPT',
  });
  api.videos.list(videoId, token)
    .then((res) => (process.env.REACT_APP_DEBUG === 'true' ? Promise.resolve(res) : res.json()))
    .then((data) => {
      if (data.items.length > 0) {
        search.videoTitle = get(data.items[0], 'snippet.title');
        search.videoDescription = get(data.items[0], 'snippet.description');
        search.videoDate = get(data.items[0], 'snippet.publishedAt');
        search.userName = get(data.items[0], 'snippet.channelTitle');
        search.channelId = get(data.items[0], 'snippet.channelId');
        search.imageLink = get(data.items[0], 'snippet.thumbnails.default.url');
        search.imageWidth = get(data.items[0], 'snippet.thumbnails.default.width');
        search.imageHeight = get(data.items[0], 'snippet.thumbnails.default.height');
        return (api.comments.search(videoId, keywords, token));
      }
      return Promise.reject(new Error('Video does not exist'));
    })
    .then((res) => (process.env.REACT_APP_DEBUG === 'true' ? Promise.resolve(res) : res.json()))
    .then((data) => {
      search.totalResults = get(data, 'pageInfo.totalResults');
      search.comments = data.items.map((c) => {
        const comment = createComment({
          id: get(c, 'id'),
          text: get(c, 'snippet.topLevelComment.snippet.textOriginal'),
          authorName: get(c, 'snippet.topLevelComment.snippet.authorDisplayName'),
          authorImage: get(c, 'snippet.topLevelComment.snippet.authorProfileImageUrl'),
          authorUrl: get(c, 'snippet.topLevelComment.snippet.authorChannelUrl'),
          publishedDate: get(c, 'snippet.topLevelComment.snippet.publishedAt'),
        });
        comment.replies = get(c, 'replies.comments', []).map((r) => {
          const reply = createComment({
            id: get(r, 'id'),
            text: get(r, 'snippet.textOriginal'),
            authorName: get(r, 'snippet.authorDisplayName'),
            authorImage: get(r, 'snippet.authorProfileImageUrl'),
            authorUrl: get(r, 'snippet.authorChannelUrl'),
            publishedDate: get(r, 'snippet.publishedAt'),
          });
          return (reply);
        });
        return (comment);
      });
      return (api.channels.list(search.channelId, token));
    })
    .then((res) => (process.env.REACT_APP_DEBUG === 'true' ? Promise.resolve(res) : res.json()))
    .then((data) => {
      search.userImage = get(data.items[0], 'snippet.thumbnails.default.url');
      search.userSubs = get(data.items[0], 'statistics.subscriberCount');
      search.userLink = `https://youtube.com/channel/${get(data.items[0], 'id')}/videos`;
      dispatch({
        type: 'GET_COMMENTS_SUCCESS',
        payload: search,
      });
    })
    .catch((err) => {
      dispatch({
        type: 'GET_COMMENTS_FAIL',
        payload: { msg: `Error fetching: ${err.message}` },
      });
    });
}


export function cleanAlertBar(dispatch) {
  dispatch({
    type: 'CLEAN_ALERT_BAR',
  });
}

export function removeSearch(dispatch, { searchId }) {
  dispatch({
    type: 'REMOVE_SEARCH',
    payload: { id: searchId },
  });
}
/* eslint-enable import/prefer-default-export */
