import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KRAMA Drops",
};

export default function DropsRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#05070f" }}>{children}</body>
    </html>
  );
}
