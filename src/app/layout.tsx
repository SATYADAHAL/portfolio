import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from './components/Footer'; // Import the Footer component

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Portfolio - Creative Designer & Developer",
  description: "Portfolio website showcasing creative design and development work",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body className={inter.className}>
        {/* Main Content */}
        <main className="min-h-screen flex flex-col">
          {children}
        </main>

        {/* Footer Section */}
        <Footer />
      </body>
    </html>
  );
}
