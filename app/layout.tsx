import "./globals.css";

export const metadata = {
  title: 'ReqVet - Simplifiez vos consultations vétérinaires',
  description: 'Une application conçue pour libérer les vétérinaires de la rédaction de leurs comptes-rendus, simple, rapide et efficace.',
  icons: {
    icon: '/favicon.ico', 
  },
  openGraph: {
    title: 'ReqVet',
    description: 'Générez automatiquement vos comptes-rendus vétérinaires grâce à l’intelligence artificielle.',
    url: 'https://reqvet.com',
    siteName: 'ReqVet',
    images: [
      {
        url: '/opengraph-image.jpg', 
        width: 1200,
        height: 630,
        alt: 'ReqVet - Simplifiez vos consultations',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ReqVet',
    description: 'Une application conçue pour simplifier les consultations vétérinaires.',
    images: ['/opengraph-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
