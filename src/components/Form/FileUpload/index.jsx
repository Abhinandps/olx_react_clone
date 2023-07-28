import { useEffect, useState } from "react";

export const FileUpload = ({ value, onChange, error }) => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    if (files.length === 0) return;
    uploadFiles();
  }, [files]);

  useEffect(() => {
    if (!value) setFiles([]);
  }, [value]);

  const uploadFiles = async () => {
    const formData = [];

    files.forEach((file) => {
      formData.push(file);
    });

    onChange(formData);
  };

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles(selectedFiles);
  };

  return (
    <>
      <div className="flex gap-3">
        {files.map((file, i) => {
          return (
            <img
              key={i}
              className="w-24"
              src={file ? URL.createObjectURL(file) : ""}
              alt=""
            />
          );
        })}
      </div>

      <div className="w-[350px] my-5 flex flex-col">
        <input
          onChange={handleFileChange}
          type="file"
          className="text-lg outline-none  py-3 "
          multiple
        ></input>
      </div>

      <div className="text-red-500 mt-2 font-bold text-sm">{error}</div>
    </>
  );
};
