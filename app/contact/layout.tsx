import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact | Marcos Morales',
  description: 'Get in touch with Marcos Morales for work, collaborations or just to say hello.',
  openGraph: {
    title: 'Contact | Marcos Morales',
    description: 'Get in touch with Marcos Morales for work, collaborations or just to say hello.',
    images: ['/images/commercial/nat-geo-asombrosamente/1.jpg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact | Marcos Morales',
    description: 'Get in touch with Marcos Morales for work, collaborations or just to say hello.',
    images: ['/images/commercial/nat-geo-asombrosamente/1.jpg'],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
