import { getImages } from '@/app/actions/image-actions';
import GalleryComponent from '@/components/gallery/GalleryComponent';

export default async function GalleryPage() {
  const { data: images } = await getImages();
  return (
    <section className='mx-auto max-w-[2000px]'>
      <h1 className='text-3xl font-semibold mb-2'>My Images</h1>
      <p className='text-muted-foreground mb-6 '>
        Here you can see all the images you have generated. click on an image to
        view details.
      </p>
      <GalleryComponent images={images || []} />
    </section>
  );
}
