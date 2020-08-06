import React, { useState } from "react";
import superagent from "superagent";

const ImageUploader = () => {
  const [file, setFile] = useState<FileList | null>(null);

  const submitFile = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (file === null) return;

    const formData = new FormData();
    formData.append("file", file[0]);
    superagent
      .agent()
      .withCredentials()
      //Need to be commented out so browser can add boundary
      //.set("Content-Type", "multipart/form-data")
      .post("http://localhost:5000/api/post/createImagePost")
      .attach("file", file[0])
      .then((response) => console.log(response));
    alert("sentt");
  };
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files);
  };

  return (
    <form onSubmit={submitFile}>
      <input type="file" onChange={handleFileUpload} />
      <button type="submit">Send</button>
    </form>
  );
};

export default ImageUploader;
