import '@/app/globals.css'
import { Metadata } from 'next';
import { Inter } from 'next/font/google'



const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Cookbooks",
  description: "Website description",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "public/image/favicon.png",
        href: "public/image/favicon.png",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "public/image/favicon.png",
        href: "public/image/favicon.png",
      },
    ],
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
  })
{
  return (
    <html lang="en">
      <head>
  <link
    href="https://fonts.googleapis.com/icon?family=Material+Icons"
    rel="stylesheet"
  />
</head>
      <body className="antialiased bg-white text-gray-900">
        <main >
        {children}
        </main>
      </body>
    </html>
  );
}


