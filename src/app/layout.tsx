import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OdoBack",
  description: "Track your mileage. Maximise your cashback.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
