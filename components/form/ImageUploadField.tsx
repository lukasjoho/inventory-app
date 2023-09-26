import React, { FC } from 'react';
import Image from 'next/image';
import { Loader2, X } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import ImageUploadPlaceholder from './ImageUploadPlaceholder';

interface ImageUploadFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  isUploading: boolean;
  imageUrl: string;
  setImageUrl: (key: string, value: string) => void;
}

const ImageUploadField: FC<ImageUploadFieldProps> = ({
  isUploading,
  imageUrl,
  setImageUrl,
  ...props
}) => {
  const handleRemove = (e: any) => {
    e.stopPropagation();
    setImageUrl('imageUrl', '');
  };
  return (
    <>
      <div
        tabIndex={0}
        className={cn(
          'group relative flex aspect-square cursor-pointer items-center justify-center overflow-hidden rounded-md border border-input ring-offset-background transition duration-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
        )}
        {...props}
      >
        {!isUploading && !imageUrl && <ImageUploadPlaceholder />}
        {imageUrl && !isUploading && (
          <Image
            src={imageUrl}
            style={{ objectFit: 'contain' }}
            alt="image"
            fill={true}
          />
        )}
        {imageUrl && !isUploading && (
          <RemoveImageButton onClick={handleRemove} />
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

const RemoveImageButton = (
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) => {
  return (
    <Button
      className="absolute right-2 top-2 z-10 h-6 w-6 cursor-pointer rounded-full p-0"
      {...props}
    >
      <X className="h-4 w-4" />
    </Button>
  );
};
