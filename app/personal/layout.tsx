import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Personal Projects | Marcos Morales',
  description: 'A collection of personal projects and collage art by Marcos Morales.',
  openGraph: {
    title: 'Personal Projects | Marcos Morales',
    description: 'A collection of personal projects and collage art by Marcos Morales.',
    images: ['/images/commercial/nat-geo-asombrosamente/1.jpg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Personal Projects | Marcos Morales',
    description: 'A collection of personal projects and collage art by Marcos Morales.',
    images: ['/images/commercial/nat-geo-asombrosamente/1.jpg'],
  },
};

export default function PersonalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
