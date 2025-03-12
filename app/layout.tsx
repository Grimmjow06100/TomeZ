import type { Metadata } from "next";
import "./globals.css";


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
    <html lang="en">
      <body>
      <video
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/gojo.mp4" type="video/mp4" />
      </video>
        {children}
      </body>
    </html>
  );
}
