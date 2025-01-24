import Configurations from '@/components/image-generation/Configurations';
import GeneratedImages from '@/components/image-generation/GeneratedImages';

export default function ImageGenerationPage() {
  return (
    <section className='container flex-1 mx-auto grid gap-4 grid-cols-3'>
      <Configurations />
      <div className='col-span-2 rounded-xl flex items-center p-6 justify-center h-fit'>
        <GeneratedImages />
      </div>
    </section>
  );
}
