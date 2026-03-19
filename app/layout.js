import './globals.css';
import Script from 'next/script';

export const metadata = {
  title: 'leTalk — 대화의 맛을 더하다',
  description: '뉴스, 문화, 만약에, 선택은?, 상식까지. 순한맛부터 깊은맛까지, 대화의 깊이를 선택하세요.',
  openGraph: {
    title: 'leTalk — 대화의 맛을 더하다',
    description: '어색한 침묵을 흥미로운 대화로. 이번 주 대화 주제를 확인하세요 🌶️',
    type: 'website',
    locale: 'ko_KR',
  },
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
  themeColor: '#d4453b',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <Script id="gtm-script" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-WSR9FHZC');`}
        </Script>
      </head>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WSR9FHZC"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
