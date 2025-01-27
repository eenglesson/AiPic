'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Tables } from '../../../database.types';
import ImageDialog from './ImageDialog';

type ImageProps = {
  url: string | undefined;
} & Tables<'generated_images'>;

interface GalleryProps {
  images: ImageProps[];
}

export default function GalleryComponent({
  images: initialImages,
}: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState<ImageProps | null>(null);
  const [images, setImages] = useState<ImageProps[]>(initialImages);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function handleRemoveFromUI(deleteImageName: string) {
    setImages((prev) =>
      prev.filter((img) => img.image_name !== deleteImageName)
    );
    setIsDialogOpen(false);
  }

  const handleImageClick = (image: ImageProps) => {
    setSelectedImage(image);
    setIsDialogOpen(true);
  };

  if (images.length === 0) {
    return (
      <div className='flex items-center justify-center h-[50vh] text-muted-foreground'>
        No images found
      </div>
    );
  }

  return (
    <section className='mx-auto py-8'>
      <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4'>
        {images.map((image, i) => (
          <div key={i}>
            <div
              className='relative group overflow-hidden cursor-pointer transition-transform'
              onClick={() => handleImageClick(image)}
            >
              <div className='absolute inset-0 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-70 rounded'>
                <div className='flex items-center justify-center h-full'>
                  <p className='text-primary-foreground text-lg font-semibold'>
                    View Details
                  </p>
                </div>
              </div>
              <Image
                src={image.url || ''}
                alt={image.prompt || ''}
                width={image.width || 0}
                height={image.height || 0}
                className='object-cover rounded-md'
              />
            </div>
          </div>
        ))}
      </div>
      {selectedImage && (
        <ImageDialog
          image={selectedImage}
          isOpen={isDialogOpen}
          setIsOpen={setIsDialogOpen}
          handleRemoveFromUI={handleRemoveFromUI}
        />
      )}
    </section>
  );
}
