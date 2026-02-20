import "@styles/tailwind.css";
import "@styles/app.scss";
import { Archivo, JetBrains_Mono } from "next/font/google";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "rpc.ag: Interactive Specification",
  description: "rpc.ag interactive gateway specification and simulator.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${archivo.variable} ${jetbrainsMono.variable} site-surface`}>
        {children}
      </body>
    </html>
  );
}
