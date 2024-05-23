import { Inter } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import { cookies } from 'next/headers';
import { themeSelectionKey } from '@/theme/config';

const inter = Inter({ subsets: ['latin'] });

export function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const selection = cookies().get(themeSelectionKey);
  const theme = selection?.value === 'system'
    ? undefined
    : selection?.value;
  return (
    <html lang="en" data-theme={theme}>
      <body className={inter.className}>
        <Header />
        <main className="flex flex-col items-start justify-start w-full px-2">
          {children}
        </main>
      </body>
    </html>
  );
}
