import Link from "next/link";
import "./globals.css";



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="navbar">
          <Link href="/">뭐먹</Link>
          <Link href="/statistics">통계</Link>
        </div>
        {children}
      </body>
    </html>
  );
}
