import "@styles/app.scss";

import { Header } from "@components";
import { Footer } from "@components";

export const metadata = {
  title: "RPC",
  description: "RPC",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
