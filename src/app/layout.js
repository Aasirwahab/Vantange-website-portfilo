import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import ClientLayout from "@/client-layout";
import FontLoader from "@/components/FontLoader/FontLoader";

export const metadata = {
  title: "VANTAGE | Modern Brutalist Architecture",
  description: "VANTAGE defines the skyline with unyielding form and absolute precision.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <FontLoader />
        </head>
        <body suppressHydrationWarning={true}>
          <ClientLayout>
            {children}
          </ClientLayout>
        </body>
      </html>
    </ClerkProvider>
  );
}
