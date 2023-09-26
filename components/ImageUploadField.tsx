import React, { FC } from "react";
import Image from "next/image";
import { Loader2, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ImageUploadFieldProps {
  isUploading: boolean;
  imageUrl: string;
  [x: string]: any;
}

const ImageUploadField: FC<ImageUploadFieldProps> = ({
  isUploading,
  imageUrl,
  setImageUrl,
  ...props
}) => {
  const handleRemove = (e: any) => {
    e.stopPropagation();
    setImageUrl("imageUrl", "");
  };
  return (
    <>
      <div
        tabIndex={0}
        {...props}
        className={cn(
          "relative aspect-video group flex items-center justify-center cursor-pointer transition duration-100 overflow-hidden rounded-md border border-input ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        )}
      >
        {!isUploading && !imageUrl && <Placeholder />}
        {imageUrl && !isUploading && (
          <Image
            src={imageUrl}
            style={{ objectFit: "cover" }}
            alt="image"
            fill={true}
          />
        )}
        {imageUrl && !isUploading && (
          <>
            <Button
              variant="outline"
              className="w-10 rounded-full p-0 absolute bottom-2 right-2 bg-background"
              onClick={handleRemove}
            >
              <X className="h-4 w-4" />
            </Button>
          </>
        )}
        {isUploading && (
          <div>
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        )}
      </div>
    </>
  );
};

export default ImageUploadField;

const Placeholder = () => {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative ">
        <img
          src="/image-placeholder.svg"
          alt=""
          className="absolute top-0 left-0 w-32 overflow-hidden rounded-lg transition duration-300 group-hover:-translate-x-1/2 group-hover:-rotate-12 opacity-50 group-hover:scale-95"
        />
        <img
          src="/image-placeholder.svg"
          alt=""
          className="absolute top-0 left-0 w-32 overflow-hidden rounded-lg transition duration-300 group-hover:translate-x-1/2 group-hover:rotate-12 opacity-50 group-hover:scale-95"
        />
        <img
          src="/image-placeholder.svg"
          alt=""
          className="relative w-32 overflow-hidden rounded-lg transition duration-300 group-hover:-translate-y-4 group-hover:scale-105"
        />
      </div>
      <div className="text-center">
        <h1 className="text-lg font-semibold">Click to upload</h1>
        <p className="text-muted-foreground text-sm">
          Supports JPG, PNG up to 10mb
        </p>
      </div>
    </div>
  );
};
