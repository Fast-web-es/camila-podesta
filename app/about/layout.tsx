import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | Marcos Morales',
  description: 'Marcos Morales is a graphic designer and artist based in Norway, specializing in editorial design and collage art.',
  openGraph: {
    title: 'About | Marcos Morales',
    description: 'Marcos Morales is a graphic designer and artist based in Norway, specializing in editorial design and collage art.',
    images: ['/images/commercial/nat-geo-asombrosamente/1.jpg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About | Marcos Morales',
    description: 'Marcos Morales is a graphic designer and artist based in Norway, specializing in editorial design and collage art.',
    images: ['/images/commercial/nat-geo-asombrosamente/1.jpg'],
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
