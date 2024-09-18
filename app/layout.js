import Link from "next/link";
import "./globals.css";



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="navbar">
          <Link href="/" className="logo">뭐먹</Link>
          <Link href="/calendar">달력</Link>
          <Link href="/stats">통계</Link>
        </div>
        {children}
      </body>
    </html>
  );
}
