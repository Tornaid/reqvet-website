import "./globals.css";

export const metadata = {
  title: 'ReqVet - Assistant IA pour vétérinaires',
  description: 'ReqVet est une application pour vétérinaires qui automatise la rédaction des comptes-rendus de consultation grâce à l’intelligence artificielle. Gagnez du temps, améliorez la traçabilité.',
  keywords: [
    "application vétérinaire",
    "assistant vétérinaire",
    "intelligence artificielle vétérinaire",
    "rédaction compte rendu consultation",
    "compte-rendu vétérinaire",
    "IA santé animale",
    "automatisation vétérinaire",
    "outil pour vétérinaire",
    "ReqVet",
  ],
  icons: {
    icon: '/favicon.ico', 
  },
  openGraph: {
    title: 'ReqVet - Assistant IA pour vétérinaires',
    description: 'Automatisez vos comptes-rendus de consultation vétérinaire grâce à ReqVet, une application IA simple, rapide et efficace.',
    url: 'https://reqvet.com',
    siteName: 'ReqVet',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'ReqVet - Assistant vétérinaire intelligent',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ReqVet - Gagnez du temps sur vos consultations vétérinaires',
    description: 'Automatisez vos comptes-rendus de consultation vétérinaire grâce à ReqVet, une application IA simple, rapide et efficace.',
    images: ['/opengraph-image.png'],
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
