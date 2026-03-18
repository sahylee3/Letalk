import './globals.css';

export const metadata = {
  title: 'LeTalk — 대화에 맛을 더하다',
  description: '최신 뉴스 기반 스몰토크 & 토론 주제 생성기. 순한맛부터 매운맛까지, 대화의 깊이를 선택하세요.',
  openGraph: {
    title: 'LeTalk — 대화에 맛을 더하다',
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
      <body>{children}</body>
    </html>
  );
}
