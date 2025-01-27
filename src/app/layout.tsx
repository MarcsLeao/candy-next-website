import type { Metadata } from "next";
import { Poppins } from "next/font/google"
import "./globals.css";
import { Provider } from "../contexts/Provider";
import { AuthProvider } from "../contexts/AuthContext";

const font = Poppins({subsets: ["latin"], weight: ['200', '300', '400', '500', '600', '700']})

export const metadata: Metadata = {
  title: "Candy.",
  description: "An easy-to-use platform to register and view your personal products.",
  icons: {
    icon: [{
      url: '/icons/candy-favicon.png',
      href: '/icons/candy-favicon.png'
    }]
  }
}

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={`${font.className} w-full min-h-screen text-sm sm:text-base`}>
        <Provider>
          <AuthProvider>
              {children}
          </AuthProvider>
        </Provider>
      </body>
    </html>
  );
}
