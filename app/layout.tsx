import '../styles/globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
return (
<html lang="en">
<head>
<meta charSet="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>AI Lounge After Dark</title>
<link rel="icon" href="/favicon.png" type="image/png" />
{/* If your logo is PNG, favicon.png is recommended for Vercel */}
</head>
<body>{children}</body>
</html>
);
}
