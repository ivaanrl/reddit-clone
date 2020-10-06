let APIUrl: string;
if (process.env.NODE_ENV === "production") {
} else {
}

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  APIUrl = "https://192.168.0.45:5000/api";
} else {
  APIUrl = "https://awesome-reddit-clone.herokuapp.com/api";
}

export default APIUrl;
