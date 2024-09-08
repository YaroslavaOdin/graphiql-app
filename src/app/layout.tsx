import { Inter } from 'next/font/google';
import '../styles/globals.css';
import ReduxProvider from '../hoc/ReduxProvider';
const inter = Inter({ subsets: ['latin'] });

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html className="h-screen">
      <body className={inter.className}>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
