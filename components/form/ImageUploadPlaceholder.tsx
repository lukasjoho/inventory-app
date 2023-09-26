const ImageUploadPlaceholder = () => {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative ">
        <img
          src="/image-placeholder.svg"
          alt=""
          className="absolute left-0 top-0 w-32 overflow-hidden rounded-lg opacity-50 transition duration-300 group-hover:-translate-x-1/2 group-hover:-rotate-12 group-hover:scale-95"
        />
        <img
          src="/image-placeholder.svg"
          alt=""
          className="absolute left-0 top-0 w-32 overflow-hidden rounded-lg opacity-50 transition duration-300 group-hover:translate-x-1/2 group-hover:rotate-12 group-hover:scale-95"
        />
        <img
          src="/image-placeholder.svg"
          alt=""
          className="relative w-32 overflow-hidden rounded-lg transition duration-300 group-hover:-translate-y-4 group-hover:scale-105"
        />
      </div>
      <div className="text-center">
        <h1 className="text-lg font-semibold">Click to upload</h1>
        <p className="text-sm text-muted-foreground">
          Supports JPG, PNG up to 10mb
        </p>
      </div>
    </div>
  );
};

export default ImageUploadPlaceholder;
