"use client";

import React, { useRef, useState } from "react";
import { toast } from "react-hot-toast";
import ImageUploadField from "./ImageUploadField";

function FileInput({ value, setValue }: any) {
  const [isUploading, setIsUploading] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);

  const [imageUrl, setImageUrl] = useState("");

  const handleButtonClick = (event: any) => {
    event.stopPropagation();
    event.preventDefault();
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.click();
    fileInput.onchange = (event: any) => uploadPhoto(event);
  };

  const uploadPhoto = async (e: any) => {
    setIsUploading(true);
    const file = e.target.files[0];
    if (!file) {
      setIsUploading(false);
      return;
    }
    const filename = encodeURIComponent(file.name);
    const res = await fetch(`/api/images?filename=${filename}`);
    const data = await res.json();
    const formData = new FormData();

    Object.entries({ ...data.post.fields, file }).forEach(
      ([key, value]: any) => {
        formData.append(key, value);
      }
    );

    const upload = await fetch(data.post.url, {
      method: "POST",
      body: formData,
    });

    const handleNewURL = () => {
      // setImageUrl(
      //   `https://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME}.s3.amazonaws.com/experiments/${data.timestamp}-${filename}`
      // )
      setValue(
        "imageUrl",
        `https://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME}.s3.amazonaws.com/experiments/${data.timestamp}-${filename}`
      );
    };

    if (!res.ok || !upload.ok) {
      toast.error("Image could not be uploaded.");
      return;
    }

    setTimeout(handleNewURL, 1000);

    setIsUploading(false);
  };

  const handleFileChange = (event: any) => {
    uploadPhoto(event);
  };

  return (
    <div>
      <ImageUploadField
        onClick={handleButtonClick}
        isUploading={isUploading}
        imageUrl={value}
        setImageUrl={setValue}
      />
      <input
        type="file"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </div>
  );
}

export default FileInput;
