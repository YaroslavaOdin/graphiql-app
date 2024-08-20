import Foother from "../components/foother/foother.component";
import Header from "../components/header/header.component";
import "../styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Foother />
      </body>
    </html>
  );
}
