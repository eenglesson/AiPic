'use client';
import Image from 'next/image';
import { Card, CardContent } from '../ui/card';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import useGeneratedStore from '@/store/useGeneratedStore';

// const images = [
//   {
//     src: '/hero-images/Confident Businesswoman on Turquoise Backdrop.jpeg',
//     alt: 'Confident Businesswoman on Turquoise Backdrop',
//   },
//   {
//     src: '/hero-images/Futuristic Helmet Portrait.jpeg',
//     alt: 'Confident Businesswoman on Turquoise Backdrop',
//   },
//   {
//     src: '/hero-images/Poised Elegance of a Young Professional.jpeg',
//     alt: 'Confident Businesswoman on Turquoise Backdrop',
//   },
//   {
//     src: '/hero-images/Professional Woman in Navy Blue Suit.jpeg',
//     alt: 'Confident Businesswoman on Turquoise Backdrop',
//   },
// ];
export default function GeneratedImages() {
  const images = useGeneratedStore((state) => state.images);

  if (images.length === 0) {
    return (
      <Card className='w-full max-w-2xl bg-muted'>
        <CardContent className='flex aspect-square items-center justify-center p-6'>
          <span className='text-2xl'>No images generated</span>
        </CardContent>
      </Card>
    );
  }

  return (
    <Carousel className='w-full max-w-2xl'>
      <CarouselContent>
        {images.map((img, index) => (
          <CarouselItem key={index}>
            <div className='flex relative items-center justify-center rounded-lg overflow-hidden aspect-square'>
              <Image
                src={img.url}
                alt='Generated Image'
                fill
                sizes='100vw' // Adjust the size based on your layout
                className='w-full h-full object-cover'
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className='-left-10' />
      <CarouselNext className='-right-10' />
    </Carousel>
  );
}
