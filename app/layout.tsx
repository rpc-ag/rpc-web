import "@styles/app.scss";

import { Header } from "@components";
import { Footer } from "@components";

export const metadata = {
  title: "RPC.ag - Blockchain Infrastructure for Developers",
  description: "RPC.ag is a comprehensive blockchain infrastructure platform designed to support developers and project owners in the blockchain space. Join our community today and start building the next generation of blockchain applications with RPC.ag.",
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
