export default function createSearch({
  comments = [],
  date, // date of search
  id,
  keywords,
  totalResults = 0,
  userName, // channel name
  userLink, // chanel link
  channelId,
  userImage, // link to channel avatar
  userSubs, // suscribers count
  imageLink,
  imageWidth,
  imageHeight,
  videoId,
  videoTitle,
  videoDescription,
  videoDate, // date of video
}) {
  return ({
    comments,
    date,
    id,
    keywords,
    totalResults,
    userName,
    userLink,
    channelId,
    imageLink,
    userImage,
    userSubs,
    imageWidth,
    imageHeight,
    videoId,
    videoTitle,
    videoDescription,
    videoDate,
  });
}
