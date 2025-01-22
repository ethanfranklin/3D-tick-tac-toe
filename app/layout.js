import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "3D Tic Tac Toe",
  description: "A modern 3D version of the classic Tic Tac Toe game. Play in a 3x3x3 cube with winning combinations across three dimensions!",
  keywords: ["tic tac toe", "3D game", "puzzle game", "strategy game", "Next.js", "React"],
  authors: [{ name: "3D Tic Tac Toe" }],
  openGraph: {
    title: "3D Tic Tac Toe",
    description: "Challenge yourself with 3D Tic Tac Toe - a three-dimensional twist on the classic game!",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
