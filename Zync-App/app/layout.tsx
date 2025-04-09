import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@heroui/link";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";

import { Inter, Space_Grotesk } from 'next/font/google';
import { Github, Youtube, Globe, Instagram, Twitter, ArrowRight } from "lucide-react";

const inter = Inter({ subsets: ['latin'] });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body  
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          spaceGrotesk.className,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col h-screen">
            <Navbar />

            <main className="flex-grow">
              {children}
            </main>
            <br />
            <footer className="bg-[#1a1b1e] text-white py-20 px-6">
  <div className="max-w-7xl mx-auto space-y-12">
    {/* Top Grid Section */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
      {/* Connect */}
      <div>
        <h3 className="text-[#5865F2] font-bold text-base mb-4 tracking-widest uppercase">Connect with us</h3>
        <div className="flex space-x-4">
          {[Twitter, Instagram, Github, Youtube].map((Icon, i) => (
            <a key={i} href="#" className="hover:text-[#5865F2] transition">
              <Icon className="h-6 w-6" />
            </a>
          ))}
        </div>
      </div>

      {/* Product */}
      <div>
        <h3 className="text-[#5865F2] font-bold text-base mb-4 tracking-widest uppercase">Product</h3>
        <ul className="space-y-2 text-gray-300">
          {["Download", "Nitro", "Status", "App Directory"].map((item, i) => (
            <li key={i}>
              <a href="#" className="hover:text-white transition">{item}</a>
            </li>
          ))}
        </ul>
      </div>

      {/* Company */}
      <div>
        <h3 className="text-[#5865F2] font-bold text-base mb-4 tracking-widest uppercase">Company</h3>
        <ul className="space-y-2 text-gray-300">
          {["About", "Jobs", "Brand", "News"].map((item, i) => (
            <li key={i}>
              <a href="#" className="hover:text-white transition">{item}</a>
            </li>
          ))}
        </ul>
      </div>

      {/* Newsletter */}
      <div>
        <h3 className="text-[#5865F2] font-bold text-base mb-4 tracking-widest uppercase">Stay Updated</h3>
        <div className="flex w-full">
          <input
            type="email"
            placeholder="Enter your email"
            className="bg-[#2F3136] text-white px-4 py-2 rounded-l-lg w-full focus:outline-none focus:ring-2 focus:ring-[#5865F2]"
          />
          <button className="bg-[#5865F2] px-4 py-2 rounded-r-lg hover:bg-[#4752C4] transition">
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
        <p className="text-sm text-gray-400 mt-2">
          Subscribe to our newsletter for updates
        </p>
      </div>
    </div>

    {/* Divider */}
    <div className="border-t border-[#40444B]" />

    {/* Bottom Bar */}
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sm text-gray-400">
      <div className="flex items-center gap-2">
        <Globe className="h-4 w-4 text-[#5865F2]" />
        <span>English, US</span>
      </div>
      <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
        <a href="#" className="hover:text-white transition">Privacy Policy</a>
        <a href="#" className="hover:text-white transition">Terms of Service</a>
        <a href="#" className="hover:text-white transition">Cookie Settings</a>
        <a href="#" className="hover:text-white transition">Guidelines</a>
      </div>
      <div className="text-center sm:text-right w-full sm:w-auto">
        © 2025 Zync
      </div>
    </div>
  </div>
</footer>

          </div>
        </Providers>
      </body>
    </html>
  );
}
