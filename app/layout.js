import { Poppins, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavbarWrapper from "./components/NavbarWrapper";
import ClerkProviderWrapper from "./components/ClerkProviderWrapper";
// Define Poppins as the main font
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

// Define Geist Sans & Geist Mono as variable fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <ClerkProviderWrapper >
          <NavbarWrapper />
          {children}
        </ClerkProviderWrapper>
      </body>
    </html>
  );
}

