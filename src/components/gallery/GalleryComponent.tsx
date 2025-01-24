import Image from 'next/image';
import { Tables } from '../../../database.types';

type ImageProps = {
  url: string | undefined;
} & Tables<'generated_images'>;

interface GalleryProps {
  images: ImageProps[];
}

export default function GalleryComponent({ images }: GalleryProps) {
  console.log('images', images);

  if (images.length === 0)
    return (
      <div className='flex items-center justify-center h-[50vh] text-muted-foreground'>
        No images found
      </div>
    );

  return (
    <section className='container mx-auto py-8'>
      <div className='grid grid-cols-4 gap-4'>
        {images.map((image, i) => (
          <div key={i}>
            <div className='relative group overflow-hidden cursor-pointer transition-transform'>
              <div className='absolute inset-0 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-60 rounded'>
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
    </section>
  );
}
