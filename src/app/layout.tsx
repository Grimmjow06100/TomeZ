
import type { Metadata } from "next";
import {Jacques_Francois} from "next/font/google" 
import '@/styles/globals.css'


const jacques = Jacques_Francois({
  weight:"400",
  variable : "--font-jacques",
  subsets:["latin"],
})




export const metadata: Metadata = {
  title: "Tomez",
  description: "l'univers du manga",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={jacques.variable}>
      <body className="overflow-x-hidden">
        <div>
          {children }
        </div>
      </body>
    </html>
  );
}
