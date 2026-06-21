import "./globals.css";

export const metadata = {
  title: "AI Executive Intelligence Hub — BCP",
  description: "Multi-agent prospect intelligence",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
