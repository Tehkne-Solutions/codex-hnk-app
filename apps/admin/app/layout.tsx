import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'HNK Studio',
  description: 'Cockpit de produção do HNK Codex',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
