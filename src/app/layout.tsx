import { Toaster } from 'sonner';
import './globals.css';

import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang='en' suppressHydrationWarning className={inter.className}>
        <head />
        <body>
          <ThemeProvider
            attribute='class'
            defaultTheme=''
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster richColors />
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
