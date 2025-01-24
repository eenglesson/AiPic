'use client';

import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '../ui/slider';
import { Textarea } from '../ui/textarea';
import { InfoIcon } from 'lucide-react';

import { useEffect } from 'react';

import useGeneratedStore from '@/store/useGeneratedStore';
import { toast } from 'sonner';

export const ImageGenerationFormSchema = z.object({
  model: z.string({
    required_error: 'Please select a model',
  }),
  prompt: z.string({
    required_error: 'Please enter a prompt',
  }),
  guidance: z.number({
    required_error: 'Please enter a guidance value',
  }),
  num_outputs: z
    .number()
    .min(1, { message: 'Please enter a number thats at least 1' })
    .max(4, { message: 'Please enter a number thats at most 4' }),
  aspect_ratio: z.string({ required_error: 'Please enter an aspect ratio' }),
  output_format: z.string({ required_error: 'Please enter an output format' }),
  output_quality: z
    .number()
    .min(1, { message: 'Please enter a number thats at least 1' })
    .max(100, { message: 'Please enter a number thats at most 100' }),
  num_inference_steps: z
    .number()
    .min(1, { message: 'Please enter a number thats at least 1' })
    .max(50, { message: 'Please enter a number thats at most 50' }),
});

export default function Configurations() {
  const generateImage = useGeneratedStore((state) => state.generateImage);
  const form = useForm<z.infer<typeof ImageGenerationFormSchema>>({
    resolver: zodResolver(ImageGenerationFormSchema),
    defaultValues: {
      model: 'black-forest-labs/flux-schnell',
      prompt: '',
      guidance: 4,
      num_outputs: 1,
      aspect_ratio: '1:1',
      output_format: 'jpg',
      output_quality: 80,
      num_inference_steps: 4,
    },
  });

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'model') {
        let newSteps;
        if (value.model === 'black-forest-labs/flux-schnell') {
          newSteps = 4;
        } else {
          newSteps = 28;
        }
        if (newSteps !== undefined) {
          form.setValue('num_inference_steps', newSteps);
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof ImageGenerationFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    if (!values.prompt.trim()) {
      toast.error('Please enter a Prompt, it cannot be empty');
      return;
    }
    await generateImage(values);
  }

  return (
    <TooltipProvider>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <fieldset className='grid gap-6 p-4 bg-background rounded-lg border'>
            <legend className='text-sm -ml-1 px-1 font-medium'>Settings</legend>
            <FormField
              control={form.control}
              name='model'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='flex gap-2 items-center'>
                    Model
                    <Tooltip>
                      <TooltipTrigger>
                        <InfoIcon className='w-4 h-4' />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>You can select any model from the dropdown menu.</p>
                      </TooltipContent>
                    </Tooltip>
                  </FormLabel>

                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select a model' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='black-forest-labs/flux-schnell'>
                        Flux Schnell
                      </SelectItem>
                      <SelectItem value='black-forest-labs/flux-dev'>
                        Flux Dev
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='grid grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name='aspect_ratio'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='flex items-center gap-2'>
                      Aspect Ratio
                      <Tooltip>
                        <TooltipTrigger>
                          <InfoIcon className='w-4 h-4' />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Aspect ratio for the generated image.</p>
                        </TooltipContent>
                      </Tooltip>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select a model' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='1:1'>1:1</SelectItem>
                        <SelectItem value='16:9'>16:9</SelectItem>
                        <SelectItem value='9:16'>9:16</SelectItem>
                        <SelectItem value='21:9'>21:9</SelectItem>
                        <SelectItem value='9:21'>9:21</SelectItem>
                        <SelectItem value='5:4'>5:4</SelectItem>
                        <SelectItem value='4:5'>4:5</SelectItem>
                        <SelectItem value='4:3'>4:3</SelectItem>
                        <SelectItem value='3:4'>3:4</SelectItem>
                        <SelectItem value='3:2'>3:2</SelectItem>
                        <SelectItem value='2:3'>2:3</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='num_outputs'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='flex items-center gap-2'>
                      Number of Outputs
                      <Tooltip>
                        <TooltipTrigger>
                          <InfoIcon className='w-4 h-4' />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Total number of output images to generate.</p>
                        </TooltipContent>
                      </Tooltip>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        min={1}
                        max={4}
                        {...field}
                        onChange={(event) =>
                          field.onChange(+event.target.value)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name='guidance'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='flex justify-between items-center'>
                    <div className='flex items-center gap-2'>
                      Guidance
                      <Tooltip>
                        <TooltipTrigger>
                          <InfoIcon className='w-4 h-4' />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Prompt guidance for generated image.</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>{' '}
                    <span>{field.value}</span>
                  </FormLabel>
                  <FormControl>
                    <Slider
                      defaultValue={[field.value]}
                      min={0}
                      max={10}
                      step={0.5}
                      onValueChange={(value) => field.onChange(value[0])}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='num_inference_steps'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='flex justify-between items-center'>
                    <div className='flex items-center gap-2'>
                      Number of Inference Steps
                      <Tooltip>
                        <TooltipTrigger>
                          <InfoIcon className='w-4 h-4' />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            Number of denoising steps. Recommended range is
                            28-50 for Dev model and 1-4 Schnell model.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <span>{field.value}</span>
                  </FormLabel>
                  <FormControl>
                    <Slider
                      defaultValue={[field.value]}
                      min={0}
                      max={
                        form.getValues('model') ===
                        'black-forest-labs/flux-schnell'
                          ? 4
                          : 50
                      }
                      step={1}
                      onValueChange={(value) => field.onChange(value[0])}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='output_quality'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='flex justify-between items-center'>
                    <div className='flex items-center gap-2'>
                      Output Quality
                      <Tooltip>
                        <TooltipTrigger>
                          <InfoIcon className='w-4 h-4' />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            Output quality for the generated image. Recommended
                            range is 50-100.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <span>{field.value}</span>
                  </FormLabel>
                  <FormControl>
                    <Slider
                      defaultValue={[field.value]}
                      min={50}
                      max={100}
                      step={1}
                      onValueChange={(value) => field.onChange(value[0])}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='output_format'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='flex items-center gap-2'>
                    Output Format
                    <Tooltip>
                      <TooltipTrigger>
                        <InfoIcon className='w-4 h-4' />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Format of the generated image.</p>
                      </TooltipContent>
                    </Tooltip>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select a ouput format' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='webp'>WebP</SelectItem>
                      <SelectItem value='png'>PNG</SelectItem>
                      <SelectItem value='jpg'>JPG</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='prompt'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='flex items-center gap-2'>
                    Prompt
                    <Tooltip>
                      <TooltipTrigger>
                        <InfoIcon className='w-4 h-4' />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          Enter a prompt to guide the model in generating the
                          image.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={6} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit' className='font-medium'>
              Generate
            </Button>
          </fieldset>
        </form>
      </Form>
    </TooltipProvider>
  );
}
