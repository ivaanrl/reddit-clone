import React from "react";

interface Props {
  setFile: (file: FileList | null) => void;
}

const ImageUploader = (props: Props) => {
  const { setFile } = props;

  /*const submitFile = (event: React.FormEvent<HTMLFormElement>) => {
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
  }; */
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files);
  };

  return (
    <form>
      <input type="file" onChange={handleFileUpload} />
    </form>
  );
};

export default ImageUploader;
