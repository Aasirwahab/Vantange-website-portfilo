import "./globals.css";
import ClientLayout from "@/client-layout";
import TopBar from "@/components/TopBar/TopBar";

export const metadata = {
  title: "VANTAGE | Modern Brutalist Architecture",
  description: "VANTAGE defines the skyline with unyielding form and absolute precision.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning={true}>
        <ClientLayout>
          <TopBar />
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
