import {Tinos,Roboto_Flex} from "next/font/google";



const tinos = Tinos({
  weight:"700",
  variable : "--font-tinos",
  subsets:["latin"],
})

const roboto = Roboto_Flex({
  weight:"700",
  variable : "--font-roboto",
  subsets:["latin"],
})
export default function userPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div style={{fontFamily: "var(--font-roboto)"}} className={`${roboto.variable} pb-50 `}>
        {children}
      </div>
  );
}
