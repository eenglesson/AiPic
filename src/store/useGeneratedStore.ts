import { create } from 'zustand';
import { z } from 'zod';
import { ImageGenerationFormSchema } from '@/components/image-generation/Configurations';
import { generateImageAction, storeImages } from '@/app/actions/image-actions';
import { toast } from 'sonner';

interface GenerateState {
  loading: boolean;
  images: Array<{ url: string }>;
  error: string | null;
  generateImage: (
    values: z.infer<typeof ImageGenerationFormSchema>
  ) => Promise<void>;
}

const useGeneratedStore = create<GenerateState>((set) => ({
  loading: false,
  images: [],
  error: null,

  generateImage: async (values: z.infer<typeof ImageGenerationFormSchema>) => {
    set({ loading: true, error: null });

    const toastId = toast.loading('Generating images...');

    try {
      const { error, success, data } = await generateImageAction(values);
      if (!success) {
        set({ error: error, loading: false });
        return;
      }

      const dataWithUrl = data.map((url: string) => {
        return { url, ...values };
      });

      set({ images: dataWithUrl, loading: false });
      toast.success('Images generated successfully', { id: toastId });

      await storeImages(dataWithUrl);
    } catch (error) {
      console.log(error);
      set({
        error: 'Failed to generate images. please try again.',
        loading: false,
      });
    }
  },
}));

export default useGeneratedStore;
