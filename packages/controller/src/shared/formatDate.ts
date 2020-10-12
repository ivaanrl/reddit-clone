export const formatDate = (date: string) => {
  const postDate= new Date(date);
    const now = new Date();
    const timeDiff = Math.floor((now.getTime() - postDate.getTime()));
    const dayDiff = Math.floor(timeDiff / (1000 * 3600 * 24));

    if (dayDiff < 1) {
        if(timeDiff < 60000){
          return "Just now";
        } else if(timeDiff < 3600000){
          return Math.floor(timeDiff/60000) + " minutes ago";
        } else {
          return Math.floor(timeDiff/(1000*60*60) % 24) + " hours ago";
        }
    }
    else {
        if(dayDiff > 365){
            return Math.floor(dayDiff/365) + " years ago"
        } else if( dayDiff > 30){
        const monthsDiff = Math.floor(dayDiff/30);
        if (monthsDiff > 1){
            return monthsDiff + " months ago"
        } else {
            return monthsDiff + " month ago";
        }}else if (dayDiff < 30 && dayDiff > 1){
            return dayDiff + " days ago";
        } else {
            return dayDiff + " day ago";
        }
        
    }
};
