import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import ClientLayout from "@/client-layout";

export const metadata = {
  title: "VANTAGE | Modern Brutalist Architecture",
  description: "VANTAGE defines the skyline with unyielding form and absolute precision.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body suppressHydrationWarning={true}>
          <ClientLayout>
            {children}
          </ClientLayout>
        </body>
      </html>
    </ClerkProvider>
  );
}
