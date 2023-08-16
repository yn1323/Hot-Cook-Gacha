import { Metadata } from 'next'
import { Noto_Sans_JP } from 'next/font/google'
import { Suspense } from 'react'
import { PageLoading } from '@/components/layout/PageLoading'
import { CheckLogin } from '@/components/layout/wrapper/CheckLogin'
import { Providers } from '@/config/Providers'

const font = Noto_Sans_JP({
  subsets: ['latin'],
  display: 'auto',
})

export const metadata: Metadata = {
  title: 'ホットクック献立ガチャ',
  robots: {
    googleBot: 'false',
    index: false,
  },
}

export default function RootLayout({
  children,
}: {
  children: JSX.Element | JSX.Element[]
}) {
  return (
    <html lang="ja">
      <body className={font.className}>
        <Providers>
          <Suspense fallback={<PageLoading />}>
            <CheckLogin>{children}</CheckLogin>
          </Suspense>
        </Providers>
      </body>
    </html>
  )
}
