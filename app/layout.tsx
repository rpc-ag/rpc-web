import "@styles/app.scss";

export const metadata = {
  title: "rpc.ag: Interactive Specification",
  description: "rpc.ag interactive gateway specification and simulator.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-stone-50 text-gray-800 font-sans leading-relaxed selection:bg-blue-100 selection:text-blue-900">
        {children}
      </body>
    </html>
  );
}
