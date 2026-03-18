"use client";
import { useState } from "react";

// ─── Glossary Database ───
const GLOSSARY = {
  "호르무즈 해협": "이란과 오만 사이의 좁은 바닷길(폭 33km). 전 세계 석유 수송량의 약 20%가 이곳을 지나감. 이란이 봉쇄하면 글로벌 에너지 위기 발생",
  "브렌트유": "영국 북해에서 생산되는 원유의 국제 기준 가격. 국제유가를 말할 때 가장 많이 쓰는 기준",
  "IEA": "국제에너지기구(International Energy Agency). 석유 위기에 대응하기 위해 만들어진 국제기구로, 비상시 전략 석유 비축량 방출 결정",
  "석유제품 최고가격제": "정부가 휘발유·경유 등의 최대 판매 가격을 정해 그 이상으로 팔 수 없게 하는 제도. 2026년 3월 한국 최초 시행",
  "환율": "한 나라의 돈을 다른 나라 돈으로 바꿀 때의 비율. 환율 1,500원 = 달러 1개를 사려면 1,500원 필요. 환율이 오르면 해외여행·수입품이 비싸짐",
  "경상수지": "나라 간 돈의 흐름을 계산한 것. 수출이 수입보다 많으면 흑자, 적으면 적자. 적자가 지속되면 환율이 오름",
  "HBM": "고대역폭메모리(High Bandwidth Memory). AI 학습에 필수적인 반도체로, 삼성·SK하이닉스가 세계 시장을 주도. 일반 메모리보다 데이터 처리 속도가 수십 배 빠름",
  "스태그플레이션": "경기 침체(stagnation) + 물가 상승(inflation)이 동시에 일어나는 최악의 경제 상황. 1970년대 오일쇼크 때 대표적으로 발생",
  "7나노 공정": "반도체 회로의 굵기가 7nm(나노미터). 숫자가 작을수록 더 정밀하고 성능이 좋음. 사람 머리카락 굵기의 1만분의 1 수준",
  "PWA": "Progressive Web App. 웹사이트인데 앱처럼 설치하고 사용할 수 있는 기술. 앱스토어 없이도 홈 화면에 추가 가능",
  "알고리즘": "SNS가 사용자의 관심사를 분석해서 자동으로 콘텐츠를 추천해주는 계산 방식. 2016년 인스타그램이 시간순에서 알고리즘 기반으로 전환",
  "늘봄학교": "초등학교에서 오전 7시~오후 8시까지 돌봄·교육 프로그램을 제공하는 정책. 2026년 전국 확대 시행. 맞벌이 가정 지원 목적",
  "앱인토스": "토스 앱 안에서 별도 설치 없이 외부 서비스를 이용할 수 있는 미니앱 플랫폼. 3,000만 토스 사용자에게 바로 노출 가능",
};

// ─── Flavor Levels (대화의 맛) ───
const FLAVOR_LEVELS = [
  { id: "mild", label: "순한맛 🌤️", desc: "가볍게 꺼내기 좋은 수준", color: "#4CAF50" },
  { id: "medium", label: "중간맛 🌶️", desc: "대화가 자연스럽게 깊어지는 수준", color: "#FF9800" },
  { id: "hot", label: "매운맛 🔥", desc: "토론급 깊이, 인사이트 폭발", color: "#F44336" },
];

// ─── News Topics with enhanced 꼬꼬무 ───
const TRENDING = [
  {
    id: "oil100", emoji: "⛽", badge: "경제", badgeColor: "#E65100",
    title: "기름값이 미쳤다 — 유가 100달러 돌파",
    headline: "중동 전쟁으로 호르무즈 해협이 마비되며 브렌트유가 100달러를 돌파. 석유제품 최고가격제 시행.",
    glossaryKeys: ["호르무즈 해협", "브렌트유", "IEA", "석유제품 최고가격제"],
    keyFacts: [
      "3월 12일 브렌트유 100달러 돌파 — 2022년 이후 처음",
      "IEA 분석: 하루 약 800만 배럴 공급 차질 (사상 최대)",
      "정부 대응: '석유제품 최고가격제' 3/13 전격 시행",
      "국내 휘발유 가격 리터당 2,200원대 돌파 전망",
    ],
    talkStarters: [
      "\"요즘 기름값 때문에 차 끌기 무섭지 않아요?\"",
      "\"석유 최고가격제라는 게 시행됐는데, 효과가 있을까요?\"",
      "\"호르무즈 해협이 막히면 전 세계 석유 20%가 멈춘대요\"",
    ],
    flavors: {
      mild: { starter: "\"요즘 기름값이 장난 아니에요. 주유하셨어요?\"", context: "리터당 2,200원대. 한 달 기름값이 30만 원 넘는 시대." },
      medium: { starter: "\"석유 최고가격제라는 게 시행됐는데 효과가 있을까요?\"", context: "정부가 가격 상한선을 정했지만, 주유소 폐업 우려도 나옴. 과거 베네수엘라가 유가 통제했다가 오히려 석유 부족 사태를 겪은 사례가 있음." },
      hot: { starter: "\"이번 유가 위기가 1973년 오일쇼크랑 비교되던데, 어떻게 보세요?\"", context: "1차 오일쇼크(1973): 유가 4배 상승 → 세계 경제 대혼란. 당시 미국은 고속도로 속도제한을 55마일로 낮추고 일요일 주유소 휴업까지 시행. 지금은 전기차와 재생에너지가 있어서 충격 흡수 능력이 다르다는 분석과, 오히려 글로벌 공급망이 더 복잡해져서 충격이 더 클 수 있다는 반론이 대립 중." },
    },
    followUp: ["전기차 전환이 더 빨라질까?", "유가가 라면값까지 올리는 구조는?", "한국의 전략비축유는 며칠분?"],
    updatedAt: "2026-03-17",
  },
  {
    id: "fx1500", emoji: "💱", badge: "경제", badgeColor: "#E65100",
    title: "환율 1,500원 돌파 — 17년 만의 충격",
    headline: "원·달러 환율이 2009년 이후 처음으로 1,500원을 넘기며 수입물가와 해외여행 비용이 급등.",
    glossaryKeys: ["환율", "경상수지", "스태그플레이션"],
    keyFacts: [
      "3월 17일 원·달러 환율 1,500원 돌파 (2009년 이후 처음)",
      "원인: 중동 전쟁 → 유가 급등 → 달러 강세 + 경상수지 악화",
      "해외여행 비용 체감 15~20% 상승",
      "일본 엔화도 160엔/달러 부근 — 아시아 통화 전반 약세",
    ],
    talkStarters: [
      "\"환율 1,500원 넘었다는 거 보셨어요? 해외여행 엄두가 안 나요\"",
      "\"장바구니 물가 체감되세요? 수입 식료품이 다 올랐어요\"",
    ],
    flavors: {
      mild: { starter: "\"환율 1,500원 넘었다는 거 보셨어요? 해외직구 부담스러워졌어요\"", context: "1달러에 1,500원이면 작년 대비 약 15% 상승. 100만원짜리 해외여행이 115만원이 된 셈." },
      medium: { starter: "\"환율이 오르면 삼성전자는 좋은 거 아니에요? 수출 기업이니까\"", context: "맞는 말이지만 절반만 맞음. 삼성은 달러로 벌지만, 반도체 장비·원재료도 달러로 사야 함. 순수익 증가 효과는 환율 상승분의 30~40% 정도. 오히려 내수 기업과 소비자가 더 큰 타격." },
      hot: { starter: "\"일본이 '잃어버린 30년' 동안 엔저 정책을 썼는데, 한국도 그런 길로 가는 건 아닐까요?\"", context: "일본은 의도적으로 엔화를 약하게 만들어 수출을 밀었지만, 내수 경제와 국민 구매력이 무너졌음. 한국은 의도한 게 아니라 외부 충격(중동전쟁)이 원인이라 맥락이 다르지만, 결과적으로 국민 체감 구매력 하락은 비슷한 패턴." },
    },
    followUp: ["한국은행이 환율 방어하는 방법은?", "환율 1,500원이면 유학생은?", "달러 예금이 답?"],
    updatedAt: "2026-03-17",
  },
  {
    id: "middleeast", emoji: "🌍", badge: "국제", badgeColor: "#1565C0",
    title: "미국-이란 직접 충돌 — 3차 세계대전 우려",
    headline: "미국의 이란 군사시설 공습 → 이란 호르무즈 해협 봉쇄 → 트럼프, 한국 포함 7개국에 군함 파견 요청.",
    glossaryKeys: ["호르무즈 해협"],
    keyFacts: [
      "미국, 이란 핵심 군사시설 공습 → 이란 호르무즈 해협 봉쇄",
      "이스라엘, 이란 정권 전복 목표 공식화 (3/13)",
      "트럼프, 한국 포함 7개국에 군함 파견 요청",
      "호르무즈 해협 통과 선박 보험료 선박 가치의 5%까지 급등",
    ],
    talkStarters: [
      "\"중동 상황이 심각한데, 3차 세계대전 가능성도 있을까요?\"",
      "\"트럼프가 한국에도 군함 보내라고 했대요. 어떻게 해야 할까요?\"",
    ],
    flavors: {
      mild: { starter: "\"중동 뉴스 보셨어요? 요즘 좀 무서운 것 같아요\"", context: "이란과 미국이 직접 군사적으로 충돌. 이스라엘도 이란 정권 전복을 공식 목표로 선언(3/13)." },
      medium: { starter: "\"트럼프가 한국에도 군함 보내라고 했대요. 보내야 할까요?\"", context: "딜레마: 보내면 이란과의 외교 관계 파탄(한국은 이란산 원유의 주요 수입국이었음). 안 보내면 한미동맹에 균열. 일본은 헌법상 '전투 지역' 파병 불가 입장, 사우디도 이란 자극 우려로 신중." },
      hot: { starter: "\"호르무즈 해협 봉쇄가 장기화되면 세계 경제 질서 자체가 바뀔 수도 있지 않을까요?\"", context: "이미 IEA가 '사상 최대 규모인 하루 800만 배럴 공급 차질'이라고 분석. 1990년 걸프전 때 공급 차질은 하루 450만 배럴이었으니 거의 2배. 장기화되면 미국·사우디 중심의 석유 질서가 붕괴하고, 에너지 자립국(노르웨이, 캐나다 등)의 지정학적 위상이 급변할 수 있다는 분석." },
    },
    followUp: ["한국의 중동 석유 의존도는?", "걸프전과 뭐가 다른가?", "에너지 자립은 현실적?"],
    updatedAt: "2026-03-17",
  },
  {
    id: "chip", emoji: "🔬", badge: "기술", badgeColor: "#6A1B9A",
    title: "반도체 부족 2030년까지 — AI가 칩을 다 먹는다",
    headline: "SK 최태원 회장 '메모리 부족 4~5년 지속' 경고. 중국은 미국 규제 속에서도 7나노 자체 개발 성공.",
    glossaryKeys: ["HBM", "7나노 공정"],
    keyFacts: [
      "SK 최태원 회장: '메모리 부족 2030년까지 지속 가능'",
      "중국 화훙반도체, 미국 규제 속 7나노 공정 자체 개발 성공",
      "AI 수요 폭증이 반도체 부족의 핵심 원인",
      "싱가포르 전자 수출 43.2% 급증 — AI 칩 수요 덕분",
    ],
    talkStarters: [
      "\"반도체 부족이 2030년까지 간다는데, 스마트폰 가격 오를까요?\"",
      "\"중국이 미국 규제 뚫고 7나노 칩 만들었대요\"",
    ],
    flavors: {
      mild: { starter: "\"반도체 부족이 2030년까지 간다는데, 스마트폰 가격도 오를까요?\"", context: "AI 데이터센터 하나에 들어가는 HBM 칩만 수만 개. 엔비디아 GPU 하나에 HBM 8개가 탑재됨." },
      medium: { starter: "\"중국이 미국 규제 뚫고 7나노 칩 만들었대요. 규제가 오히려 역효과?\"", context: "화훙반도체가 중국 내 2번째 7나노 업체로 부상. '찍어 누르면 오히려 기를 쓰고 올라온다'는 역설. 미국 CHIPS Act(반도체법)로 520억 달러를 자국 투자했지만, 중국은 그보다 훨씬 많은 돈을 반도체에 투입 중." },
      hot: { starter: "\"반도체 전쟁이 결국 AI 패권 전쟁인 거죠? 한국은 어디에 서야 할까요?\"", context: "삼성·SK는 메모리(HBM)에서 세계 1위이지만, 시스템 반도체(CPU·GPU)는 TSMC·엔비디아에 밀림. 한국의 전략적 위치: 메모리 독점력을 지렛대로 미국·중국 모두와 협상력을 유지하되, 장기적으로 시스템 반도체 진입이 필수. GTC 2026에서 젠슨 황이 삼성 파운드리를 언급한 건 긍정 신호." },
    },
    followUp: ["HBM이 정확히 뭐예요?", "삼성 vs TSMC 현황은?", "AI 때문에 전력도 부족?"],
    updatedAt: "2026-03-16",
  },
  {
    id: "ai_fatigue", emoji: "🤖", badge: "트렌드", badgeColor: "#00838F",
    title: "AI 피로 시대 — 2016년이 그리운 Z세대",
    headline: "2026 트렌드 키워드 'K-Society: 회복에서 적응으로'. 알고리즘 이전 시대를 그리워하는 현상 확산.",
    glossaryKeys: ["알고리즘"],
    keyFacts: [
      "문체부 2026 트렌드: 'K-Society: 회복에서 적응으로'",
      "AI 관련 온라인 언급량 전년 대비 44% 증가",
      "팬톤 2026 올해의 색 'Cloud Dancer' — 평온함 추구",
      "'2026 is the new 2016' — Z세대가 알고리즘 이전 시대를 그리워하는 현상",
    ],
    talkStarters: [
      "\"요즘 AI 피로감 느끼세요? 저는 좀 지쳤어요\"",
      "\"알고리즘 없던 시대가 그립다는 트렌드가 있대요\"",
    ],
    flavors: {
      mild: { starter: "\"요즘 AI 피로감 느끼세요? 저는 좀 지쳤어요\"", context: "AI 관련 온라인 언급량 전년 대비 44% 증가. 특히 '규제', '일자리', '공정성' 키워드가 급증." },
      medium: { starter: "\"'2026 is the new 2016' 트렌드 아세요? 알고리즘 이전 시대가 그립다는 거래요\"", context: "2016년까지 인스타그램은 시간순 피드. 내가 볼 콘텐츠를 직접 선택했음. 2016년 이후 알고리즘 피드로 전환 → 추천 콘텐츠가 내 선택을 대체. Z세대가 그리워하는 건 2016년이 아니라 '내가 직접 선택하는 감각' 자체." },
      hot: { starter: "\"AI가 편하긴 한데, '생각하는 능력'을 잃어가는 건 아닌지 걱정돼요\"", context: "덴츠 2026 보고서의 'Trad Lives' 트렌드: 자연·전통·공동체로의 회귀. 팬톤 올해의 색 'Cloud Dancer' = 디지털 소음 속 여백 추구. 메타인지(내가 모르는 걸 아는 능력)가 AI 시대 가장 중요한 인간 역량이라는 학계 논의 증가." },
    },
    followUp: ["디지털 디톡스 해보신 적?", "AI 없이 살 수 있을까?", "SNS 알고리즘 끄는 법은?"],
    updatedAt: "2026-03-15",
  },
  {
    id: "nulbom", emoji: "🏫", badge: "사회", badgeColor: "#2E7D32",
    title: "늘봄학교 전국 확대 — 오전 7시 ~ 오후 8시",
    headline: "맞벌이 가정 돌봄 해소를 위해 전국 늘봄학교 확대. 13시간 학교 체류에 대한 찬반 논란도.",
    glossaryKeys: ["늘봄학교"],
    keyFacts: [
      "2026년 3월 전국적으로 늘봄학교 확대 시행",
      "운영 시간: 오전 7시 ~ 오후 8시 (13시간)",
      "코딩·예술·체육 등 다양한 프로그램 제공",
      "맞벌이 가정 돌봄 공백 해소 + 사교육비 절감 기대",
    ],
    talkStarters: [
      "\"늘봄학교 들어보셨어요? 아침 7시부터 저녁 8시까지래요\"",
      "\"13시간 학교에 있는 게 아이에게 좋을까요?\"",
    ],
    flavors: {
      mild: { starter: "\"늘봄학교라고 아침 7시부터 저녁 8시까지 학교에서 돌봐준대요\"", context: "코딩, 예술, 체육 등 프로그램 제공. 사교육비 절감 기대." },
      medium: { starter: "\"13시간 학교에 있는 게 아이에게 좋은 걸까요?\"", context: "핀란드는 오래전부터 국가 돌봄 시스템 운영. 하지만 핀란드는 수업 자체가 짧고 자유 놀이 시간이 많음. 한국형 늘봄은 '프로그램 제공'에 초점이라 질적 차이가 있을 수 있음." },
      hot: { starter: "\"저출생 문제의 근본 원인이 돌봄이 아니라 주거·소득인데, 늘봄학교가 해답이 될 수 있을까요?\"", context: "합계출산율 0.65(2025): 세계 최저. 전문가 분석에 따르면 출산 기피 1순위는 '경제적 부담(주거비·교육비)', 2순위가 '일-가정 양립 어려움'. 늘봄학교는 2순위에 대한 대응이지만, 1순위 해결 없이는 한계가 있다는 시각." },
    },
    followUp: ["교사 노동 강도는?", "해외 돌봄 비교?", "저출생 진짜 해결책은?"],
    updatedAt: "2026-03-16",
  },
  // ─── 재미·문화 주제 ───
  {
    id: "wangsanam", emoji: "🎬", badge: "재미", badgeColor: "#AB47BC",
    title: "왕과 사는 남자 1,300만 돌파 — 역대 흥행 TOP 10 진입",
    headline: "장항준 감독의 첫 사극. 유해진·박지훈 주연. 개봉 31일 만에 천만, 40일 만에 1,300만. 2020년대 개봉 영화 흥행 1위.",
    glossaryKeys: [],
    keyFacts: [
      "2026년 2월 4일 개봉 → 3월 6일 천만 돌파 (31일), 3월 15일 1,300만",
      "역대 사극 영화 흥행 2위 (1위: 명량), 2020년대 개봉 영화 1위",
      "제작비 100억 → 매출 1,000억 돌파 (ROI 10배)",
      "장항준 감독 인스타: 2004년 싸이월드 사진 올리며 '22년 걸렸네...'",
      "조선왕조실록 관련 도서 판매 2.9배 증가 — 역사 붐 촉발",
    ],
    talkStarters: [
      "\"왕사남 보셨어요? 저는 두 번 봤는데 또 보고 싶어요\"",
      "\"유해진이 단종 모시는 장면에서 울었어요. 혹시 우신 분?\"",
      "\"장항준 감독이 22년 걸렸다고 했는데, 진짜 대단하지 않아요?\"",
    ],
    flavors: {
      mild: { starter: "\"왕사남 보셨어요? 1,300만 넘었대요\"", context: "유해진·박지훈 주연 사극. 단종과 엄흥도의 이야기. 장항준 감독 첫 사극인데 천만 영화가 됨." },
      medium: { starter: "\"왕사남이 조선왕조실록 책 판매를 3배 올렸대요. 영화가 역사 교육까지 하네요\"", context: "교보문고 기준 관련 도서 2.9배 증가. 단종애사가 새로 출간될 정도. '관상' 같은 사극도 넷플릭스 역주행. 영화 한 편이 사회 전체 관심사를 바꿀 수 있다는 좋은 사례." },
      hot: { starter: "\"왕사남 흥행 비결이 뭘까요? 서울의 봄처럼 '시대극+감정'의 공식인 걸까요\"", context: "서울의 봄(1,312만)과 왕사남(1,346만) 모두 역사+감정 조합. 한국 관객은 '아는 역사를 새롭게 해석하는 것'에 강하게 반응. 장항준 감독: '먹자골목에 한 집만 잘되면 골목 전체에 안 좋다'는 발언이 화제." },
    },
    takMode: {
      intro: "\"왕사남 1,300만이면 대한민국 국민 4명 중 1명이 본 건데, 안 본 3명은 뭐 하고 사는 거임? 국민의 의무 아님?\"",
      kkokkomu: [
        "\"영화 보고 조선왕조실록 사는 사람이 3배 늘었다는 거 실화? ㅋㅋ 왕사남이 교과서보다 교육 효과가 좋은 거 아닌가. 교육부 해체하고 장항준한테 맡겨야 함\"",
        "\"장항준이 인스타에 '22년 걸렸네' 올렸는데, 나는 22년 동안 뭐 했지 싶어서 갑자기 현타 옴. 나의 천만 관객은 언제 오는 거?\"",
        "\"유해진이 22년 전에 '왕의 남자'도 찍고 이번에 '왕과 사는 남자'도 찍었는데, 이쯤 되면 조선 공무원 아님? 600년 근속이면 연금 얼마야\"",
      ],
    },
    followUp: ["올해 천만 영화 또 나올까?", "한국 관객이 사극을 좋아하는 이유?", "장항준 감독 다음 작품은?"],
    updatedAt: "2026-03-15",
  },
  {
    id: "bts_comeback", emoji: "💜", badge: "재미", badgeColor: "#AB47BC",
    title: "BTS 광화문 컴백 — 3월 21일, 서울이 보라색으로",
    headline: "BTS 완전체 컴백 라이브 'ARIRANG'이 광화문광장에서 열린다. 16일부터 광장 통행 제한 시작. 전 세계가 주목.",
    glossaryKeys: [],
    keyFacts: [
      "2026년 3월 21일(토) 오후 8시, 광화문광장",
      "완전체 컴백 + 신곡 'ARIRANG' 최초 공개",
      "광화문광장 3/20(금) 21시부터 전면 통행 제한",
      "온·오프라인 동시 진행 — 전 세계 스트리밍",
      "서울시 인파 위기경보 발령 — 경찰·소방 총력 안전관리",
    ],
    talkStarters: [
      "\"BTS 광화문 공연 가세요? 티켓이 전쟁이래요\"",
      "\"광화문이 통행 제한된대요. 출퇴근 대란 각오하셔야 해요\"",
      "\"완전체 컴백이면 'ARIRANG'이 신곡명인데, 아리랑을 어떻게 재해석했을지 궁금하지 않아요?\"",
    ],
    flavors: {
      mild: { starter: "\"BTS 광화문 공연 소식 들으셨어요? 21일이래요\"", context: "완전체 컴백. 광화문광장에서 라이브. 전 세계 생중계. 16일부터 광장 부분 통행 제한 시작됨." },
      medium: { starter: "\"BTS가 신곡 제목을 아리랑으로 했대요. K-pop이 전통 음악을 재해석하는 거 어떻게 보세요?\"", context: "아리랑은 유네스코 무형문화유산. BTS가 이걸 글로벌 팝으로 재해석한다는 건 문화적으로 큰 의미. 과거에도 서태지의 '하여가', 이날치의 '범 내려온다'처럼 전통+현대 융합이 성공한 사례가 있음." },
      hot: { starter: "\"BTS 광화문 공연이 공공 자원 투입 논란도 있던데, 문화 행사와 시민 불편 사이의 균형 어떻게 봐야 할까요?\"", context: "광화문 일대 교통 통제, 경찰·소방 총동원. 찬성: 글로벌 홍보 효과·관광 수입 엄청남. 반대: 도심 마비·세금 투입. 서울시는 경제 효과가 투입 비용의 수십 배라고 주장하지만, 통행 불편을 겪는 시민 입장도 있음." },
    },
    takMode: {
      intro: "\"광화문 통행 제한이래. 세종대왕님이 한글 만들 때도 이 정도 통제는 없었을 텐데, BTS가 세종대왕 앞에서 공연하면 세종대왕도 아미 되는 거 아님?\"",
      kkokkomu: [
        "\"서울시가 인파 위기경보를 발령했는데, BTS 보러 가는 게 재난 수준이라는 뜻임 ㅋㅋ 콘서트가 아니라 자연재해 급\"",
        "\"신곡이 아리랑이래. 할머니한테 말씀드렸더니 '내가 원조다' 하시면서 아리랑 부르심. 아미 가입 가능한 거?\"",
        "\"출근길에 광화문 못 지나간다고 회사에 말했더니 재택근무 승인남. BTS 덕분에 재택 얻었으니 이게 진짜 팬서비스 아닌가\"",
      ],
    },
    followUp: ["K-pop 경제 효과 얼마나?", "다음 월드투어 일정은?", "아리랑의 유네스코 등재 의미?"],
    updatedAt: "2026-03-17",
  },
  {
    id: "kdh_oscar", emoji: "🏆", badge: "재미", badgeColor: "#AB47BC",
    title: "케이팝 데몬 헌터스, 오스카 2관왕 — K-애니메이션의 역사",
    headline: "제98회 아카데미 시상식에서 장편 애니메이션상 + 주제가상 수상. K-pop을 소재로 한 K-애니메이션의 쾌거.",
    glossaryKeys: [],
    keyFacts: [
      "제98회 아카데미 장편 애니메이션상 + 주제가상 2관왕",
      "K-pop 아이돌이 악마와 싸우는 스토리 — K-pop × 애니메이션 융합",
      "안효섭이 아카데미 레드카펫 참석해 화제",
      "관련 OST '소다 팝', '골든' 등이 틱톡·유튜브 쇼츠에서 챌린지 유행",
    ],
    talkStarters: [
      "\"케데헌 오스카 받은 거 보셨어요? K-애니메이션이 오스카를!\"",
      "\"K-pop 소재 애니메이션이 오스카를 받다니, 기생충 이후 또 역사를 썼네요\"",
    ],
    flavors: {
      mild: { starter: "\"케이팝 데몬 헌터스가 오스카 2관왕 했대요! 보셨어요?\"", context: "장편 애니메이션상 + 주제가상. K-pop을 소재로 한 한국 애니메이션. 안효섭이 레드카펫 등장해 글로벌 화제." },
      medium: { starter: "\"기생충 이후로 K-콘텐츠가 오스카에서 계속 성과를 내고 있는데, 비결이 뭘까요?\"", context: "기생충(작품상), 미나리(조연상), 케데헌(2관왕). 한국 콘텐츠의 '로컬이지만 유니버설한' 스토리텔링 능력. 틱톡·유튜브 쇼츠에서 OST 챌린지가 자연스럽게 글로벌 마케팅 역할." },
      hot: { starter: "\"K-콘텐츠가 전 세계를 장악하고 있는데, 이 열풍이 언제까지 갈 수 있을까요?\"", context: "K-콘텐츠 팬덤 기반 2차 창작이 폭발적. 하지만 '한류 피로감'도 일부 시장에서 감지. 일본 애니메이션 시장이 여전히 압도적이라 K-애니가 지속 성장하려면 IP 확장(게임·굿즈·테마파크) 전략이 필수라는 분석." },
    },
    takMode: {
      intro: "\"K-pop이 악마 잡는 애니메이션이 오스카 받았는데, 우리 회사 야근하는 건 왜 아무도 상 안 줌? 야근이야말로 진짜 헌터스인데\"",
      kkokkomu: [
        "\"오스카 2관왕이면 기생충에 이어 두 번째 쾌거인데, 이제 한국이 할리우드 들어가는 게 아니라 할리우드가 한국한테 오는 거 아님?\"",
        "\"OST가 틱톡에서 유행이래. 나도 회사에서 야근할 때 '소다 팝' 틀었더니 팀장님이 신나서 춤추심. 야근 시간 30분 늘어남. 감다뒤\"",
        "\"안효섭이 아카데미 레드카펫 갔는데, 나도 회사 복도에 빨간 카펫 깔면 출근 의욕이 좀 생기려나. 아 그건 그냥 소방 통로인가\"",
      ],
    },
    followUp: ["K-애니가 일본 애니를 넘을 수 있을까?", "다음 오스카 도전작은?", "K-콘텐츠 IP 확장 전략?"],
    updatedAt: "2026-03-14",
  },
  {
    id: "butter_run", emoji: "🧈", badge: "재미", badgeColor: "#AB47BC",
    title: "버터런 챌린지 — 달리면서 버터를 만든다고?",
    headline: "생크림을 지퍼백에 넣고 10km 이상 달리면 진동으로 수제 버터가 완성. SNS에서 폭발적 유행 중.",
    glossaryKeys: [],
    keyFacts: [
      "생크림을 지퍼백에 넣고 달리면 진동으로 버터가 만들어지는 원리",
      "10km 이상 달려야 성공 — 초보 러너에게는 도전적",
      "'18km 뛰어서 처음 버터 만들었다'는 후기 화제",
      "'사 먹는 버터가 더 맛있다'는 솔직 후기도 인기",
      "러닝 + 콘텐츠 + 음식이 결합된 MZ세대 트렌드",
    ],
    talkStarters: [
      "\"버터런 챌린지 아세요? 달리면서 버터를 만드는 거래요\"",
      "\"10km 뛰어야 버터가 된다는데, 그냥 마트에서 사면 안 되나요? ㅋㅋ\"",
    ],
    flavors: {
      mild: { starter: "\"버터런 챌린지라고 달리면서 버터 만드는 게 유행이래요 ㅋㅋ\"", context: "생크림을 지퍼백에 넣고 10km+ 달리면 진동으로 버터가 됨. SNS에서 인증 폭발 중." },
      medium: { starter: "\"버터런이 유행인 거 보면, 사람들이 단순한 운동은 지루해하는 거 같아요. 뭔가 '목적'이 있어야 움직이는 시대?\"", context: "러닝 인구 폭증 + '그냥 뛰기'는 지루함 → 러닝에 게이미피케이션을 더한 트렌드. 이전에도 러닝 크루, 플로깅(달리면서 쓰레기 줍기) 등이 유행. 운동 + 콘텐츠 조합이 MZ세대의 동기부여 공식." },
      hot: { starter: "\"버터런 같은 챌린지 문화가 결국 '인증을 위한 행동'이 되는 건 아닌지, 어떻게 보세요?\"", context: "비판적 시각: SNS 인증이 목적이지 건강이 목적이 아님. 긍정적 시각: 동기가 뭐든 결과적으로 운동을 하게 만드니 좋은 것. 행동경제학의 '넛지' 이론과 연결 — 사람들은 직접적 보상(버터)이 있을 때 행동한다." },
    },
    takMode: {
      intro: "\"10km를 뛰어서 버터를 만든다? 나는 10km 뛰면 택시비가 만들어지거든. 생산성 따지면 내가 이김\"",
      kkokkomu: [
        "\"'사 먹는 버터가 더 맛있다'는 후기 ㅋㅋㅋ 10km 뛰고 얻은 인생의 교훈이 '마트가 답이다'. 이거 자기계발서에 넣어야 함\"",
        "\"이거 결국 SNS에 올리려고 뛰는 거잖아. '오늘 버터 만들었습니다 🧈🏃' 좋아요 200개. 마트에서 버터 사면? 좋아요 0개. 결국 좋아요가 버터보다 비싼 세상\"",
        "\"회사에서 버터런 하자고 했더니 팀장님이 '그 시간에 보고서 하나 더 써' 하심. 맞는 말인데 왜 이렇게 슬프지. 직장인의 러닝은 퇴근 후 지하철 환승뿐\"",
      ],
    },
    followUp: ["러닝 크루 추천?", "플로깅은 뭐예요?", "달리기 시작하려면 어떻게?"],
    updatedAt: "2026-03-08",
  },
  {
    id: "lotto16", emoji: "🎰", badge: "재미", badgeColor: "#AB47BC",
    title: "로또 1등 16명 동시 당첨 — 20억 잭팟 논란",
    headline: "한 회차에 로또 1등이 16명 나오면서 '집단 당첨' 의혹과 함께 로또 시스템 공정성 논란이 재점화.",
    glossaryKeys: [],
    keyFacts: [
      "로또 1등 16명 동시 당첨 — 1인당 약 20억 원",
      "'2게임 중복 당첨' 가능성 제기 — 같은 번호를 2장 샀을 때",
      "통계적으로 16명 동시 당첨 확률은 극히 희박",
      "로또 판매점 특정 지역 편중 논란도 재부상",
      "매주 로또 판매액 약 1,000억 원 — 국민 도박인가 희망인가",
    ],
    talkStarters: [
      "\"로또 1등 16명 동시에 나왔대요. 이거 가능한 거예요?\"",
      "\"20억이면 뭐 하실 거예요? 저는 일단 퇴사부터...\"",
    ],
    flavors: {
      mild: { starter: "\"로또 1등 16명 동시 당첨 뉴스 보셨어요? 대박이죠\"", context: "한 회차에 16명. 1인당 약 20억. 2게임 중복 당첨 가능성도 제기." },
      medium: { starter: "\"로또 20억 당첨되면 뭐 하실 거예요? 진지하게요\"", context: "한국 로또 1등 평균 당첨금 약 20~25억. 세후 약 15억. 실제 당첨자 중 상당수가 5년 내 파산한다는 통계가 있음. 미국에서는 '로또 당첨자의 저주(Lottery Curse)'라는 표현도 있음." },
      hot: { starter: "\"매주 로또 판매액이 1,000억인데, 이게 국민적 '희망 산업'인 건지 '합법 도박'인 건지 어떻게 보세요?\"", context: "로또 수익의 약 40%는 복권기금으로 사회에 환원. 하지만 저소득층일수록 로또 구매 비율이 높아 '가난세(poverty tax)'라는 비판도 있음. 행동경제학적으로 인간은 확률을 직관적으로 이해하지 못해 '나도 될 수 있다'는 착각에 빠지기 쉬움." },
    },
    takMode: {
      intro: "\"로또 1등이 16명? 나는 5등도 안 되는데 16명이 동시에 1등이라고? 확률 계산 다시 해봐. 내 인생 확률이 더 희박한 거 아님?\"",
      kkokkomu: [
        "\"20억이면 뭐 하냐고? 일단 퇴사하고... 아 잠깐, 세후 15억인데 강남 아파트 사면 끝이네. 로또의 꿈이 '내 집 마련'이라는 게 진짜 2026년 대한민국 요약임\"",
        "\"매주 로또 판매액이 1,000억이래. 전 국민이 매주 1,000억을 모아서 '혹시 모르니까'에 투자하는 나라. 이게 벤처 투자보다 규모가 큰 건 함정\"",
        "\"로또 당첨자 중 상당수가 5년 내 파산한다는 통계가 있는데, 그 말은 20억을 받아도 못 지킨다는 뜻임. 근데 나는 월급도 못 지키거든. 금액만 다르고 본질은 같은 거 아닌가\"",
      ],
    },
    followUp: ["로또 당첨자의 평균 행복도?", "통계적으로 가장 많이 나오는 번호?", "해외 로또 시스템은?"],
    updatedAt: "2026-03-14",
  },
];

// ─── Components ───

function FlavorSelector({ value, onChange }) {
  return (
    <div className="flex gap-2 p-1 rounded-2xl" style={{ background: "var(--chip-bg)" }}>
      {FLAVOR_LEVELS.map(f => (
        <button key={f.id} className="flex-1 py-2.5 px-2 rounded-xl text-xs font-bold text-center transition-all" onClick={() => onChange(f.id)}
          style={{ background: value === f.id ? f.color : "transparent", color: value === f.id ? "#fff" : "var(--text-muted)", boxShadow: value === f.id ? "0 2px 8px rgba(0,0,0,0.1)" : "none" }}>
          {f.label}
        </button>
      ))}
    </div>
  );
}

function NewsCard({ topic, flavor, onFlavorChange, onBookmark, isBookmarked }) {
  const [expanded, setExpanded] = useState(false);
  const [takOpen, setTakOpen] = useState(false);
  const fl = topic.flavors[flavor];
  return (
    <div className="rounded-2xl overflow-hidden transition-all" style={{ background: "var(--card-bg)", boxShadow: "var(--card-shadow)", border: "none" }}>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold text-white" style={{ background: topic.badgeColor }}>{topic.badge}</span>
          <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>{topic.updatedAt}</span>
        </div>
        <div className="flex items-start gap-3 mb-3">
          <span className="text-3xl">{topic.emoji}</span>
          <div className="flex-1">
            <h3 className="text-base font-bold leading-snug mb-1.5" style={{ color: "var(--text)" }}>{topic.title}</h3>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{topic.headline}</p>
          </div>
        </div>

        {/* Flavor Selector */}
        <div className="mb-3">
          <p className="text-[10px] font-bold mb-1.5" style={{ color: "var(--text-muted)" }}>대화의 맛 선택</p>
          <FlavorSelector value={flavor} onChange={onFlavorChange} />
        </div>

        {/* Selected Flavor Content */}
        <div className="p-3.5 rounded-xl" style={{ background: "var(--tip-bg)", borderLeft: `3px solid ${FLAVOR_LEVELS.find(f => f.id === flavor)?.color}` }}>
          <p className="text-xs font-bold mb-1.5" style={{ color: FLAVOR_LEVELS.find(f => f.id === flavor)?.color }}>
            💬 {FLAVOR_LEVELS.find(f => f.id === flavor)?.label} — 이렇게 시작하세요
          </p>
          <p className="text-sm italic mb-2 leading-relaxed" style={{ color: "var(--text)" }}>{fl.starter}</p>
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{fl.context}</p>
        </div>

        {/* 꼬꼬무 더보기 CTA */}
        <button className={`w-full mt-4 py-3.5 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${expanded ? "" : "kkokkomu-btn"}`}
          style={{ background: expanded ? "var(--chip-bg)" : undefined, color: expanded ? "var(--accent)" : "#fff", boxShadow: expanded ? "none" : "0 4px 14px var(--accent-shadow)" }}
          onClick={() => setExpanded(!expanded)}>
          {expanded ? "접기 ↑" : (<>꼬꼬무 더보기 <span style={{ fontSize: 13 }}>↓</span></>)}
        </button>
      </div>

      <div className="overflow-hidden transition-all duration-400" style={{ maxHeight: expanded ? "3000px" : "0", opacity: expanded ? 1 : 0 }}>
        <div className="px-5 pb-5 space-y-3">

          {/* 핵심 팩트 */}
          {topic.keyFacts?.length > 0 && (
            <div className="p-3.5 rounded-xl" style={{ background: "var(--tip-bg)" }}>
              <p className="text-xs font-bold mb-2" style={{ color: "var(--accent)" }}>📌 핵심 팩트</p>
              {topic.keyFacts.map((f, i) => (
                <p key={i} className="text-sm mb-1.5 leading-relaxed" style={{ color: "var(--text)" }}>• {f}</p>
              ))}
            </div>
          )}

          {/* 이렇게 말해보세요 */}
          {topic.talkStarters?.length > 0 && (
            <div className="p-3.5 rounded-xl" style={{ background: "rgba(46,125,50,0.05)", border: "1px solid rgba(46,125,50,0.12)" }}>
              <p className="text-xs font-bold mb-2" style={{ color: "#2E7D32" }}>💬 이렇게 말해보세요</p>
              {topic.talkStarters.map((s, i) => (
                <p key={i} className="text-sm mb-1.5 leading-relaxed italic" style={{ color: "var(--text)" }}>{s}</p>
              ))}
            </div>
          )}

          {/* 꼬꼬무 후속 질문 */}
          <div>
            <p className="text-xs font-bold mb-2" style={{ color: "var(--text-muted)" }}>🔗 꼬꼬무 — 이렇게 이어가세요</p>
            <div className="flex flex-wrap gap-1.5">
              {topic.followUp.map((f, i) => (
                <span key={i} className="px-2.5 py-1.5 rounded-lg text-xs" style={{ background: "var(--chip-bg)", border: "1px solid var(--border)", color: "var(--text-secondary)" }}>{f}</span>
              ))}
            </div>
          </div>

          {/* 어려운 용어 */}
          {topic.glossaryKeys?.length > 0 && (
            <div className="p-3.5 rounded-xl" style={{ background: "linear-gradient(135deg, rgba(103,58,183,0.05), rgba(103,58,183,0.1))", border: "1px solid rgba(103,58,183,0.15)" }}>
              <p className="text-xs font-bold mb-2.5 flex items-center gap-1.5" style={{ color: "#5E35B1" }}>
                <span style={{ fontSize: 14 }}>📖</span> 이 뉴스의 어려운 용어
              </p>
              <div className="space-y-2.5">
                {topic.glossaryKeys.map(k => GLOSSARY[k] && (
                  <div key={k}>
                    <span className="inline-block text-xs font-bold px-2 py-0.5 rounded mb-1" style={{ background: "rgba(103,58,183,0.12)", color: "#5E35B1" }}>{k}</span>
                    <p className="text-xs leading-relaxed pl-0.5" style={{ color: "var(--text-secondary)" }}>{GLOSSARY[k]}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 감다살 드립 모드 — 재미 카테고리만 */}
          {topic.takMode && (
            <div>
              <button className="w-full py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all"
                style={{ background: takOpen ? "linear-gradient(135deg, #FF6F00, #FFB300)" : "linear-gradient(135deg, rgba(255,111,0,0.08), rgba(255,179,0,0.15))", color: takOpen ? "#fff" : "#FF6F00", border: takOpen ? "none" : "1.5px solid #FFB300" }}
                onClick={() => setTakOpen(!takOpen)}>
                😎 감다살 드립 모드 {takOpen ? "OFF" : "ON"}
              </button>
              {takOpen && (
                <div className="mt-2 p-4 rounded-xl" style={{ background: "linear-gradient(135deg, rgba(255,111,0,0.06), rgba(255,179,0,0.1))", border: "1px solid rgba(255,179,0,0.2)", animation: "fadeIn 0.3s" }}>
                  <p className="text-xs font-bold mb-2" style={{ color: "#E65100" }}>😎 이렇게 꺼내면 감다살</p>
                  <p className="text-sm italic mb-3 leading-relaxed" style={{ color: "var(--text)" }}>{topic.takMode.intro}</p>
                  <p className="text-xs font-bold mb-2" style={{ color: "#FF6F00" }}>🔥 감다살 꼬꼬무 드립</p>
                  {topic.takMode.kkokkomu.map((k, i) => (
                    <p key={i} className="text-sm mb-2 leading-relaxed" style={{ color: "var(--text-secondary)" }}>{k}</p>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="flex" style={{ borderTop: "1px solid var(--chip-bg)" }}>
        <button className="flex-1 py-3 text-sm font-medium flex items-center justify-center gap-1.5" style={{ color: isBookmarked ? "var(--accent)" : "var(--text-secondary)" }} onClick={() => onBookmark(topic)}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M2.79726 4.80739C5.11177 2.39754 8.90702 2.39754 11.2215 4.80739L11.2224 4.80827L11.9872 5.60702L12.7529 4.80739C15.0674 2.39754 18.8626 2.39754 21.1772 4.80739L21.179 4.80935C23.5242 7.26774 23.1318 10.953 21.2363 13.4384L21.2351 13.44C19.3267 15.9292 17.1219 17.9359 15.4019 19.3169C14.5402 20.0088 13.796 20.547 13.2653 20.9135C12.9998 21.0968 12.7875 21.2373 12.6402 21.3328C12.5666 21.3805 12.5092 21.417 12.4695 21.442L12.4235 21.4708L12.4109 21.4786L12.4072 21.4809L12.406 21.4816C12.406 21.4816 12.4053 21.4821 11.9872 20.8C11.5813 21.4894 11.5809 21.4892 11.5809 21.4892L11.5792 21.4882L11.5754 21.4859L11.5621 21.478L11.5142 21.4491C11.4729 21.424 11.4132 21.3875 11.3368 21.3396C11.184 21.244 10.964 21.1033 10.6902 20.9197C10.1426 20.5527 9.37805 20.0137 8.50199 19.3205C6.75443 17.9378 4.54128 15.9246 2.72667 13.423L2.72566 13.4216C0.930009 10.935 0.438148 7.26368 2.79726 4.80739ZM11.9872 20.8L11.5809 21.4892C11.8358 21.6393 12.1538 21.6362 12.406 21.4816L11.9872 20.8ZM11.9794 19.8524C12.0866 19.7811 12.2129 19.6958 12.3562 19.5968C12.8601 19.2489 13.5728 18.7336 14.4002 18.0693C16.058 16.7382 18.1594 14.8219 19.9646 12.4675C21.5249 10.421 21.6753 7.64872 20.0223 5.91478C18.3375 4.16154 15.5917 4.16174 13.9071 5.91539L12.565 7.31704C12.4141 7.47464 12.2054 7.56376 11.9872 7.56376C11.769 7.56376 11.5603 7.47464 11.4094 7.31704L10.0676 5.91571C8.38268 4.16167 5.63602 4.16151 3.95122 5.91571C2.31111 7.62338 2.50465 10.382 4.02235 12.4843C5.72139 14.8264 7.81446 16.7363 9.49477 18.0658C10.3327 18.7288 11.0626 19.2432 11.5809 19.5906C11.7329 19.6925 11.8666 19.7799 11.9794 19.8524Z" fill="currentColor"/></svg>
          {isBookmarked ? "저장됨" : "저장"}
        </button>
        <div style={{ width: 1, background: "var(--chip-bg)" }} />
        <button className="flex-1 py-3 text-sm font-medium flex items-center justify-center gap-1.5" style={{ color: "var(--text-secondary)" }}
          onClick={() => { const fl2 = topic.flavors[flavor]; navigator.clipboard?.writeText(`[LeTalk] ${topic.title}\n\n${fl2.starter}\n\n${fl2.context}\n\n🔗 ${topic.followUp.join(" / ")}`); }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M15.2002 5.49995C15.2002 3.67741 16.6777 2.19995 18.5002 2.19995C20.3227 2.19995 21.8002 3.67741 21.8002 5.49995C21.8002 7.32249 20.3227 8.79995 18.5002 8.79995C17.5813 8.79995 16.7502 8.42439 16.1518 7.8184L8.76439 11.5121C8.78798 11.6713 8.8002 11.8342 8.8002 12C8.8002 12.1657 8.78798 12.3286 8.76439 12.4878L16.1518 16.1815C16.7502 15.5755 17.5813 15.2 18.5002 15.2C20.3227 15.2 21.8002 16.6774 21.8002 18.5C21.8002 20.3225 20.3227 21.7999 18.5002 21.7999C16.6777 21.7999 15.2002 20.3225 15.2002 18.5C15.2002 18.1742 15.2474 17.8594 15.3354 17.5621L8.14877 13.9688C7.54724 14.7767 6.58483 15.3 5.5002 15.3C3.67766 15.3 2.2002 13.8225 2.2002 12C2.2002 10.1774 3.67766 8.69995 5.5002 8.69995C6.58482 8.69995 7.54724 9.22322 8.14876 10.0311L15.3354 6.43778C15.2474 6.14051 15.2002 5.82574 15.2002 5.49995ZM18.5002 3.79995C17.5613 3.79995 16.8002 4.56107 16.8002 5.49995C16.8002 6.43884 17.5613 7.19995 18.5002 7.19995C19.4391 7.19995 20.2002 6.43884 20.2002 5.49995C20.2002 4.56107 19.4391 3.79995 18.5002 3.79995ZM18.5002 16.8C17.5613 16.8 16.8002 17.5611 16.8002 18.5C16.8002 19.4388 17.5613 20.2 18.5002 20.2C19.4391 20.2 20.2002 19.4388 20.2002 18.5C20.2002 17.5611 19.4391 16.8 18.5002 16.8ZM3.8002 12C3.8002 11.0611 4.56131 10.3 5.5002 10.3C6.43908 10.3 7.2002 11.0611 7.2002 12C7.2002 12.9388 6.43908 13.7 5.5002 13.7C4.56131 13.7 3.8002 12.9388 3.8002 12Z" fill="currentColor"/></svg>
          공유
        </button>
      </div>
    </div>
  );
}

function ChipSelect({ options, value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map(o => {
        const sel = value === o.id;
        return (
          <button key={o.id} onClick={() => onChange(o.id)} className="px-3.5 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-1.5"
            style={{ background: sel ? "var(--accent)" : "var(--chip-bg)", color: sel ? "#fff" : "var(--text-secondary)", border: sel ? "1.5px solid var(--accent)" : "1.5px solid var(--border)" }}>
            {o.icon && <span>{o.icon}</span>}{o.emoji && <span>{o.emoji}</span>}<span>{o.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// ─── Main App ───
export default function LeTalk() {
  const [screen, setScreen] = useState("home");
  const [darkMode, setDarkMode] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);
  const [newsFilter, setNewsFilter] = useState("all");
  const [flavorMap, setFlavorMap] = useState({});

  const getFlavor = (id) => flavorMap[id] || "mild";
  const setFlavor = (id, f) => setFlavorMap(prev => ({ ...prev, [id]: f }));

  const toggleBookmark = (t) => setBookmarks(prev => prev.find(b => b.id === t.id) ? prev.filter(b => b.id !== t.id) : [...prev, t]);
  const isBookmarked = (t) => bookmarks.some(b => b.id === t.id);

  const badgeMap = { economy: "경제", intl: "국제", tech: "기술", trend: "트렌드", society: "사회", fun: "재미" };
  const filtered = newsFilter === "all" ? TRENDING : TRENDING.filter(n => n.badge === badgeMap[newsFilter]);

  const theme = darkMode ? {
    "--bg": "#0c0c12", "--card-bg": "#181824", "--text": "#f0f0f5", "--text-secondary": "#9898b0",
    "--text-muted": "#58586e", "--accent": "#ff6b6b", "--accent-light": "#ff8e8e",
    "--accent-shadow": "rgba(255,107,107,0.2)", "--border": "#252538", "--chip-bg": "#1c1c2c",
    "--tip-bg": "rgba(255,107,107,0.05)", "--nav-bg": "rgba(12,12,18,0.95)",
    "--card-shadow": "none",
  } : {
    "--bg": "#f4f5f7", "--card-bg": "#ffffff", "--text": "#191f28", "--text-secondary": "#4e5968",
    "--text-muted": "#8b95a1", "--accent": "#d4453b", "--accent-light": "#e8685e",
    "--accent-shadow": "rgba(212,69,59,0.12)", "--border": "#f2f3f5", "--chip-bg": "#f2f3f5",
    "--tip-bg": "rgba(212,69,59,0.03)", "--nav-bg": "rgba(255,255,255,0.97)",
    "--card-shadow": "0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)",
  };

  return (
    <div style={{ ...theme, background: "var(--bg)", minHeight: "100vh", fontFamily: "'Pretendard', -apple-system, sans-serif" }}>
      <style>{`
        @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');
        @keyframes slideUp { from { opacity:0; transform:translateY(16px) } to { opacity:1; transform:translateY(0) } }
        @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
        @keyframes gradientFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .kkokkomu-btn {
          background: linear-gradient(270deg, #d4453b, #ff6b8a, #e8685e, #d4453b);
          background-size: 300% 300%;
          animation: gradientFlow 3s ease infinite;
        }
        .kkokkomu-btn:active { transform: scale(0.97); }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        button { cursor: pointer; border: none; background: none; font-family: inherit; }
      `}</style>

      <div className="mx-auto" style={{ maxWidth: 440, paddingBottom: 80 }}>

        {/* HOME */}
        {screen === "home" && (
          <div className="px-5 pt-12 pb-6" style={{ animation: "fadeIn 0.4s" }}>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-black tracking-tight" style={{ color: "var(--text)" }}>
                  Le<span style={{ color: "var(--accent)" }}>Talk</span>
                </h1>
                <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>대화의 맛을 더하다</p>
                <p className="text-[10px] mt-1" style={{ color: "var(--text-muted)", opacity: 0.6 }}>제작자 : 이상현(le_sh7)</p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 rounded-full transition-all"
                style={{ background: "var(--card-bg)", boxShadow: "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)", color: "var(--text-secondary)" }}
                onClick={() => setDarkMode(!darkMode)}>
                <span style={{ fontSize: 16 }}>{darkMode ? "🌞" : "🌙"}</span>
                <span className="text-xs font-medium">{darkMode ? "라이트" : "다크"}</span>
              </button>
            </div>

            {/* Concept Banner */}
            <div className="p-5 rounded-2xl mb-6" style={{ background: "linear-gradient(135deg, var(--accent), var(--accent-light))", boxShadow: "0 4px 16px var(--accent-shadow)" }}>
              <p className="text-white text-base font-bold mb-1">대화의 맛을 골라보세요</p>
              <p className="text-white text-xs opacity-90 leading-relaxed">같은 뉴스도 순한맛·중간맛·매운맛으로 다르게 꺼낼 수 있어요. 상대방과의 관계, 분위기에 맞는 깊이를 선택하세요.</p>
            </div>

            {/* Filter */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold" style={{ color: "var(--text)" }}>🔥 이번 주 대화 주제</h2>
              <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: "var(--tip-bg)", color: "var(--accent)" }}>3/4 ~ 3/18</span>
            </div>
            <div className="flex gap-1.5 mb-4 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
              {[{ id: "all", l: "전체" }, { id: "fun", l: "재미" }, { id: "economy", l: "경제" }, { id: "intl", l: "국제" }, { id: "tech", l: "기술" }, { id: "trend", l: "트렌드" }, { id: "society", l: "사회" }].map(f => (
                <button key={f.id} className="px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all" onClick={() => setNewsFilter(f.id)}
                  style={{ background: newsFilter === f.id ? "var(--accent)" : "var(--card-bg)", color: newsFilter === f.id ? "#fff" : "var(--text-muted)", boxShadow: newsFilter === f.id ? "0 2px 8px var(--accent-shadow)" : "var(--card-shadow)" }}>
                  {f.l}
                </button>
              ))}
            </div>

            {/* News Cards */}
            <div className="space-y-4">
              {filtered.map((t, i) => (
                <div key={t.id} style={{ animation: `slideUp 0.4s ease-out ${i * 80}ms both` }}>
                  <NewsCard topic={t} flavor={getFlavor(t.id)} onFlavorChange={(f) => setFlavor(t.id, f)} onBookmark={toggleBookmark} isBookmarked={isBookmarked(t)} />
                </div>
              ))}
            </div>

          </div>
        )}

        {/* BOOKMARKS */}
        {screen === "bookmarks" && (
          <div className="px-5 pt-6 pb-8" style={{ animation: "fadeIn 0.3s" }}>
            <div className="flex items-center gap-3 mb-5">
              <button className="w-9 h-9 rounded-full flex items-center justify-center text-sm" style={{ background: "var(--chip-bg)", color: "var(--text)" }} onClick={() => setScreen("home")}>←</button>
              <h2 className="text-lg font-bold" style={{ color: "var(--text)" }}>❤️ 저장한 주제 ({bookmarks.length})</h2>
            </div>
            {bookmarks.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-3xl mb-3">📌</p>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>아직 저장한 주제가 없어요</p>
                <button className="mt-4 px-5 py-2 rounded-xl text-sm font-medium" style={{ background: "var(--accent)", color: "#fff" }} onClick={() => setScreen("home")}>주제 찾으러 가기</button>
              </div>
            ) : (
              <div className="space-y-4">
                {bookmarks.map(t => (
                  <NewsCard key={t.id} topic={t} flavor={getFlavor(t.id)} onFlavorChange={(f) => setFlavor(t.id, f)} onBookmark={toggleBookmark} isBookmarked={true} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* GLOSSARY */}
        {screen === "glossary" && (
          <div className="px-5 pt-6 pb-8" style={{ animation: "fadeIn 0.3s" }}>
            <div className="flex items-center gap-3 mb-5">
              <button className="w-9 h-9 rounded-full flex items-center justify-center text-sm" style={{ background: "var(--chip-bg)", color: "var(--text)" }} onClick={() => setScreen("home")}>←</button>
              <h2 className="text-lg font-bold" style={{ color: "var(--text)" }}>📖 용어 사전</h2>
            </div>
            <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>대화에서 나올 수 있는 어려운 용어들을 미리 알아두세요.</p>
            <div className="space-y-2">
              {Object.entries(GLOSSARY).map(([k, v]) => (
                <div key={k} className="p-4 rounded-xl" style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}>
                  <p className="text-sm font-bold mb-1" style={{ color: "var(--accent)" }}>{k}</p>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{v}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Nav */}
      <div className="fixed bottom-0 left-0 right-0 flex justify-center" style={{ background: "var(--nav-bg)", backdropFilter: "blur(24px)", borderTop: "1px solid var(--chip-bg)", zIndex: 50 }}>
        <div className="flex w-full" style={{ maxWidth: 440 }}>
          {[
            { id: "home", label: "홈", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M11.4576 2.20608C11.7669 1.93115 12.233 1.93115 12.5423 2.20608L21.726 10.3694C21.9003 10.5243 22 10.7463 22 10.9795V21.1836C22 21.6345 21.6345 22 21.1837 22H15.0612C14.6104 22 14.2449 21.6345 14.2449 21.1836V16.0816C14.2449 14.7977 13.2838 13.8367 12 13.8367C10.7161 13.8367 9.75505 14.7977 9.75505 16.0816V21.1836C9.75505 21.6344 9.38957 22 8.93872 22H2.81624C2.36539 22 1.99991 21.6345 1.99991 21.1836V10.9795C1.99991 10.7463 2.09962 10.5243 2.2739 10.3694L11.4576 2.20608ZM8.12239 20.3669V16.0816C8.12239 13.896 9.81441 12.204 12 12.204C14.1855 12.204 15.8775 13.896 15.8775 16.0816V20.3673H20.3673V11.3461L12 3.90842L3.63257 11.3461V20.3673L8.12239 20.3669Z" fill="currentColor"/></svg> },
            { id: "glossary", label: "용어사전", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M12.4999 3.79995C17.3834 3.79995 21.1999 7.35812 21.1999 11.5806C21.1999 14.0038 19.9579 16.1907 17.9683 17.6313C17.7605 17.7817 17.6374 18.0227 17.6374 18.2793V20.5712C17.5254 20.503 17.4098 20.4329 17.2927 20.3622C16.5007 19.8835 15.5575 19.3227 15.2064 19.1628C15.0459 19.0897 14.8656 19.0717 14.6938 19.1117C13.9939 19.2744 13.2589 19.3612 12.4999 19.3612C7.61652 19.3612 3.79995 15.8031 3.79995 11.5806C3.79995 7.35812 7.61652 3.79995 12.4999 3.79995ZM18.0162 22.6801C18.263 22.8329 18.5731 22.8401 18.8267 22.6989C19.0803 22.5577 19.2374 22.2902 19.2374 22V18.6773C21.4039 16.9699 22.7999 14.4342 22.7999 11.5806C22.7999 6.32515 18.1099 2.19995 12.4999 2.19995C6.88997 2.19995 2.19995 6.32515 2.19995 11.5806C2.19995 16.836 6.88997 20.9612 12.4999 20.9612C13.2774 20.9612 14.0357 20.8827 14.7654 20.7336C15.1332 20.9345 15.7982 21.3284 16.465 21.7315C16.8711 21.9769 17.2591 22.2142 17.5457 22.3902C17.6889 22.4781 17.8067 22.5507 17.8886 22.6012L18.0162 22.6801Z" fill="currentColor"/><path fillRule="evenodd" clipRule="evenodd" d="M7.82497 9.99995C7.82497 9.55812 8.18315 9.19995 8.62497 9.19995H16.5C16.9418 9.19995 17.3 9.55812 17.3 9.99995C17.3 10.4418 16.9418 10.8 16.5 10.8H8.62497C8.18315 10.8 7.82497 10.4418 7.82497 9.99995Z" fill="currentColor"/><path fillRule="evenodd" clipRule="evenodd" d="M7.82497 13.5C7.82497 13.0581 8.18315 12.7 8.62497 12.7H16.5C16.9418 12.7 17.3 13.0581 17.3 13.5C17.3 13.9418 16.9418 14.3 16.5 14.3H8.62497C8.18315 14.3 7.82497 13.9418 7.82497 13.5Z" fill="currentColor"/></svg> },
            { id: "bookmarks", label: "저장", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M3.19995 2.99995C3.19995 2.55812 3.55812 2.19995 3.99995 2.19995H20C20.4418 2.19995 20.7999 2.55812 20.7999 2.99995V21C20.7999 21.3106 20.6202 21.5931 20.3388 21.7246C20.0574 21.8562 19.7254 21.813 19.487 21.6139L12 15.3582L4.51289 21.6139C4.27454 21.813 3.94246 21.8562 3.6611 21.7246C3.37973 21.5931 3.19995 21.3106 3.19995 21V2.99995ZM4.79995 3.79995V19.289L11.487 13.7018C11.784 13.4537 12.2159 13.4537 12.5129 13.7018L19.2 19.289V3.79995H4.79995Z" fill="currentColor"/></svg> },
          ].map(tab => (
            <button key={tab.id} className="flex-1 py-3 flex flex-col items-center gap-1"
              style={{ color: screen === tab.id ? "var(--accent)" : "var(--text-muted)" }}
              onClick={() => setScreen(tab.id)}>
              {tab.icon}
              <span className="text-[10px] font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
