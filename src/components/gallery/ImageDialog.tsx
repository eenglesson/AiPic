import Image from 'next/image';
import { Tables } from '../../../database.types';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '../ui/button';
import { Download } from 'lucide-react';
import { Badge } from '../ui/badge';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import DeleteImage from './DeleteImage';

interface ImageDialogProps {
  image: { url: string | undefined } & Tables<'generated_images'>;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleRemoveFromUI: (deleteImageName: string) => void;
}

export default function ImageDialog({
  image,
  isOpen,
  setIsOpen,
  handleRemoveFromUI,
}: ImageDialogProps) {
  function handleDownloadImage() {
    fetch(image.url || '')
      .then((res) => res.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute(
          'download',
          `generated-image-${Date.now()}.${image?.output_format}`
        );
        document.body.appendChild(link);
        link.click();

        //cleanup
        link.parentNode?.removeChild(link);
      })
      .catch((error) => console.log(error));
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent
        className='max-w-[full] h-full sm:max-w-xl w-full'
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <SheetHeader className='text-left'>
          <SheetTitle className='text-2xl w-full'>Image Details</SheetTitle>
          <ScrollArea className='flex flex-col h-[100vh]'>
            <div className='relative w-full h-fit'>
              <Image
                src={image.url || ''}
                alt={image.prompt || 'image'}
                width={image.width || 1000}
                height={image.height || 600}
                className='w-full h-auto flex mb-3 rounded-md'
              />
              <div className='flex gap-4 absolute bottom-4 right-4'>
                <Button
                  onClick={handleDownloadImage}
                  className='w-fit flex items-center justify-center'
                >
                  <Download className='w-4 h-4 mr-2' />
                  Download
                </Button>
                <DeleteImage
                  imageId={image.id.toString()}
                  onDelete={() => handleRemoveFromUI(image.image_name || '')}
                  className='w-fit'
                  imageName={image.image_name || ''}
                  handleRemoveFromUI={handleRemoveFromUI}
                />
              </div>
            </div>
            <hr className='inline-block w-full border-primary/20 mb-2' />
            <div className='w-full flex flex-col'>
              <span className='text-primary text-xl font-semibold'>Prompt</span>
              <p className='text-primary/80'>{image.prompt || 'No prompt'}</p>
            </div>
            <hr className='inline-block w-full border-primary/20 my-2' />
            <div className='flex flex-wrap gap-4 mb-28'>
              <Badge
                variant='secondary'
                className='rounded-full border border-primary/20 px-4 py-2 text-sm font-normal'
              >
                <span className='text-primary uppercase mr-2 font-semibold'>
                  Model ID:
                </span>
                {image.model}
              </Badge>
              <Badge
                variant='secondary'
                className='rounded-full border border-primary/20 px-4 py-2 text-sm font-normal'
              >
                <span className='text-primary uppercase mr-2 font-semibold'>
                  Aspect Ratio:
                </span>
                {image.aspect_ratio}
              </Badge>
              <Badge
                variant='secondary'
                className='rounded-full border border-primary/20 px-4 py-2 text-sm font-normal'
              >
                <span className='text-primary uppercase mr-2 font-semibold'>
                  Dimensions:
                </span>
                {image.width} x {image.height}
              </Badge>
              <Badge
                variant='secondary'
                className='rounded-full border border-primary/20 px-4 py-2 text-sm font-normal'
              >
                <span className='text-primary uppercase mr-2 font-semibold'>
                  Image Guidance:
                </span>
                {image.guidance}
              </Badge>
              <Badge
                variant='secondary'
                className='rounded-full border border-primary/20 px-4 py-2 text-sm font-normal'
              >
                <span className='text-primary uppercase mr-2 font-semibold'>
                  Inference Steps:
                </span>
                {image.num_inference_steps}
              </Badge>
              <Badge
                variant='secondary'
                className='rounded-full border border-primary/20 px-4 py-2 text-sm font-normal'
              >
                <span className='text-primary uppercase mr-2 font-semibold'>
                  Output Format:
                </span>
                {image.output_format}
              </Badge>
              <Badge
                variant='secondary'
                className='rounded-full border border-primary/20 px-4 py-2 text-sm font-normal'
              >
                <span className='text-primary uppercase mr-2 font-semibold'>
                  Created At:
                </span>
                {new Date(image.created_at).toLocaleDateString()}
              </Badge>
            </div>
            <ScrollBar orientation='vertical' />
          </ScrollArea>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
