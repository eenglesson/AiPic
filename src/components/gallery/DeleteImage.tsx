import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '../ui/button';
import { Trash2 } from 'lucide-react';
import { useId } from 'react';
import { toast } from 'sonner';
import { deleteImage } from '@/app/actions/image-actions';
import { cn } from '@/lib/utils';

interface deleteImageProps {
  imageId: string;
  onDelete?: () => void;
  className?: string;
  imageName: string;
  handleRemoveFromUI?: (deleteImageName: string) => void;
}

export default function DeleteImage({
  imageId,
  onDelete,
  className,
  imageName,
  handleRemoveFromUI,
}: deleteImageProps) {
  const toastId = useId();

  async function handleDelete() {
    toast.loading('Deleting image...', { id: toastId });

    const { success, error } = await deleteImage(imageId, imageName);

    if (error) {
      toast.error(error, { id: toastId });
      return;
    } else if (success) {
      toast.success('Image deleted successfully', { id: toastId });
      handleRemoveFromUI?.(imageName);
      onDelete?.();
    } else {
      toast.dismiss(toastId);
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild className={cn('w-fit', className)}>
        <Button
          className='w-fit flex items-center justify-center'
          variant={'destructive'}
        >
          <Trash2 className='w-4 h-4' />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            image.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className='bg-destructive hover:bg-destructive/50'
            onClick={handleDelete}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
