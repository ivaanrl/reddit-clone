export const formatDate = (date: string) => {
  const splitDate = date.split("T");
  const dateAsStr = splitDate[0].split("-");
  const timeAsStr = splitDate[1].split(":");

  const dateAsNum = dateAsStr.map((str) => {
    return parseInt(str, 10);
  });
  const timeAsNum = timeAsStr.map((str) => {
    return parseInt(str, 10);
  });

  const postDate = new Date(
    dateAsNum[0],
    dateAsNum[1],
    dateAsNum[2],
    timeAsNum[0],
    timeAsNum[1],
    timeAsNum[2]
  );
  const now = new Date();
  const timeDiff = (postDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);

  if (timeDiff < 23) {
    return `${Math.floor(timeDiff)} hours ago`;
  } else {
    const days = Math.floor(timeDiff / 24);
    if (days > 1) {
      return `${days} days ago`;
    } else {
      return `${days} day ago`;
    }
  }
};
