/* eslint-disable react-refresh/only-export-components */

import { Inter } from "next/font/google";
import "../../styles/globals.css";
import { Locale, i18n  } from '../../../i18n.config';
import Header from '../../components/header/header.component';
const inter = Inter({ subsets: ["latin"] });



export async function generateStaticParams() {
  return i18n.locales.map(locale => ({ lang: locale }))
}

interface RootLayoutProps {
  readonly children: React.ReactNode,
  params: { lang: Locale }
}


export default function RootLayout({children, params}:RootLayoutProps) {
  return (
    <html lang={params.lang}>
    
      <body className={inter.className}>
        <Header lang={params.lang}/>
        {children}
      </body>
    </html>
  );
}
