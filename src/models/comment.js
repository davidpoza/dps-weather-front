import PropTypes from 'prop-types';

export default function createComment({
  id,
  authorImage,
  authorName,
  authorUrl,
  fav,
  publishedDate,
  replies = [], // replies on this comment, using same entity
  text,
}) {
  return ({
    id,
    authorImage,
    authorName,
    authorUrl,
    fav,
    publishedDate,
    replies,
    text,
  });
}

export const propTypes = {
  authorImage: PropTypes.string,
  authorName: PropTypes.string,
  authorUrl: PropTypes.string,
  isReply: PropTypes.bool,
  publishedDate: PropTypes.string,
  text: PropTypes.string,
};
