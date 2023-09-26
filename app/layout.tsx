import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Providers from './providers';
import { createMetaDataObject } from '@/lib/createMetadataObject';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = createMetaDataObject({
  title: 'Inventory App',
  description: 'Manage inventory with ease.',
  viewport: 'width=device-width, initial-scale=1, user-scalable=no',
  imageUrl:
    'https://res.cloudinary.com/dum2lqmke/image/upload/v1695768084/cover-inventory-app_qrjdql.jpg',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex min-h-screen flex-col">
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  );
}
