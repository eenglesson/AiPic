'use client';
import React, { useId, useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { cn } from '@/lib/utils';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { toast } from 'sonner';
import { login } from '@/app/actions/auth-actions';
import { Loader2 } from 'lucide-react';
import { redirect } from 'next/navigation';

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email adress.' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long.' }),
});

export default function LoginForm({ className }: { className?: string }) {
  const [loading, setLoading] = useState(false);
  const toastId = useId();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    toast.loading('Signing in...', { id: toastId });
    setLoading(true);

    const formData = new FormData();

    formData.append('email', values.email);
    formData.append('password', values.password);

    const { success, error } = await login(formData);
    if (!success) {
      toast.error(String(error), { id: toastId });
      setLoading(false);
    } else {
      toast.success('Signed in successfully!', { id: toastId });
      setLoading(false);
      redirect('/dashboard');
    }
  }
  return (
    <div className={cn('grid gap-6', className)}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder='name@example.com' {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    placeholder='Enter your password'
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button className='w-full' type='submit'>
            {loading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
            Log in
          </Button>
        </form>
      </Form>
    </div>
  );
}
