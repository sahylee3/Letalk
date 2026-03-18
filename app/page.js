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
  { id: "mild", label: "순한맛", desc: "가볍게 꺼내기 좋은 수준", color: "#4CAF50" },
  { id: "medium", label: "중간맛", desc: "대화가 자연스럽게 깊어지는 수준", color: "#FF9800" },
  { id: "hot", label: "매운맛", desc: "토론급 깊이, 인사이트 폭발", color: "#F44336" },
];

// ─── Topics Database ───
const TRENDING = [
  // ═══ 뉴스 ═══
  {
    id: "oil100", emoji: "⛽", badge: "뉴스", badgeColor: "#37474F",
    title: "기름값이 미쳤다 — 유가 100달러 돌파",
    headline: "중동 전쟁으로 호르무즈 해협이 마비되며 브렌트유가 100달러를 돌파. 출퇴근길 주유가 무서워진 시대.",
    glossaryKeys: ["호르무즈 해협", "브렌트유", "IEA", "석유제품 최고가격제"],
    keyFacts: [
      "3월 12일 브렌트유 100달러 돌파 — 2022년 러-우 전쟁 이후 처음",
      "IEA: 하루 약 800만 배럴 공급 차질 — 걸프전(450만)의 거의 2배",
      "정부 '석유제품 최고가격제' 3/13 전격 시행 — 한국 역사상 최초",
      "휘발유 리터당 2,200원 전망 — 월 기름값 30만 원 시대",
    ],
    talkStarters: [
      "\"주유소 갔더니 숫자를 두 번 봤어요. 리터당 2천 원이 넘다니\"",
      "\"기름값 때문에 자전거 출퇴근 시작한 사람 주변에 있어요?\"",
      "\"석유 최고가격제가 한국 역사상 처음이래요. 그만큼 심각하다는 거겠죠\"",
    ],
    flavors: {
      mild: { starter: "\"요즘 기름값 보셨어요? 리터당 2천 원이 넘었더라고요\"", context: "출퇴근 30km 기준 월 기름값이 30만 원을 넘는 시대. 커뮤니티에서 '기름값 때문에 차 팔까 고민한다'는 글에 공감이 수천 개 달림." },
      medium: { starter: "\"석유 최고가격제, 효과가 있을까요?\"", context: "정부가 주유소 판매가에 상한선을 걸었는데, 주유소 폐업 우려도 나옴. 베네수엘라가 유가 통제했다가 주유소에 기름이 없는 사태를 겪은 전례가 있어서 걱정되는 상황." },
      hot: { starter: "\"이번 위기가 1973년 오일쇼크급이라는 분석이 있던데요\"", context: "1차 오일쇼크 때 미국은 속도제한 55마일, 일요일 주유소 휴업까지 시행. 지금은 전기차라는 대안이 있지만, 글로벌 공급망이 더 복잡해져서 파급이 더 클 수 있다는 반론도." },
    },
    followUp: ["전기차 판매가 실제로 늘고 있을까?", "기름값이 라면값까지 올리는 구조가 뭐야?", "한국 전략비축유는 며칠분이야?"],
    updatedAt: "2026-03-17",
  },
  {
    id: "fx1500", emoji: "💱", badge: "뉴스", badgeColor: "#37474F",
    title: "환율 1,500원 돌파 — 17년 만의 충격",
    headline: "원-달러 환율이 1,500원을 넘었습니다. 해외직구, 여행, 유학 비용이 체감 가능한 수준으로 올랐어요.",
    glossaryKeys: ["환율", "경상수지"],
    keyFacts: [
      "3월 14일 원-달러 환율 1,512원 — 2009년 금융위기 이후 최고",
      "해외여행 비용 2년 전 대비 약 40% 상승",
      "수입 물가 상승 → 라면·커피·밀가루 가격 줄줄이 인상 예고",
      "해외직구 이용자 25% 감소 (관세청 2월 데이터)",
    ],
    talkStarters: [
      "\"환율 1,500원이 체감이 안 된다면, 해외직구 가격을 보세요\"",
      "\"올여름 해외여행 계획 있으셨으면 다시 계산해봐야 할 수도...\"",
    ],
    flavors: {
      mild: { starter: "\"환율이 1,500원 넘었다는데 체감되세요?\"", context: "아이폰 살 때 2년 전보다 30만 원 비싸졌고, 스타벅스 원두도 올랐고, 넷플릭스 구독료도 올랐음. 모르는 사이에 생활 곳곳이 환율 영향권." },
      medium: { starter: "\"환율이 이렇게 되면 여행 대신 뭘 해야 할까요?\"", context: "제주도·강원도 관광이 반사이익. '국내여행이 해외보다 비싸다'던 시대가 끝남. 환율 1,500원이면 일본 3박 비용으로 제주 5박이 가능." },
      hot: { starter: "\"환율이 1,500원인데 왜 수출 기업은 안 좋아할까요?\"", context: "교과서에서는 '환율 상승 = 수출 유리'라고 배우지만, 현실은 수입 원자재 가격도 동시에 올라서 이익이 상쇄됨. 삼성전자도 환율 이익보다 원자재 비용 증가가 더 큰 상황." },
    },
    followUp: ["환율이 물가에 영향을 주는 구조는?", "달러 말고 엔화는 왜 싸졌어?", "환율을 잡으려면 어떻게 해야 해?"],
    updatedAt: "2026-03-17",
  },
  {
    id: "usiran", emoji: "⚔️", badge: "뉴스", badgeColor: "#37474F",
    title: "미국-이란 충돌 격화 — 호르무즈 위기",
    headline: "미국과 이란의 군사적 긴장이 고조되면서, 우리 일상에도 영향이 오고 있습니다.",
    glossaryKeys: ["호르무즈 해협"],
    keyFacts: [
      "미국, 이란 핵시설 인근 공습 실행 — 이란은 '전면 보복' 선언",
      "호르무즈 해협 일시 봉쇄 → 글로벌 석유 수송 20% 차질",
      "한국 에너지 수입의 70%가 중동 경유 — 직접 타격권",
    ],
    talkStarters: [
      "\"중동 뉴스가 기름값이랑 직결된다는 게 이번에 체감됐어요\"",
      "\"호르무즈 해협이 막히면 한국이 가장 타격을 받는 나라 중 하나래요\"",
    ],
    flavors: {
      mild: { starter: "\"중동 상황이 심각하다는 뉴스 보셨어요?\"", context: "멀리 있는 이야기 같지만, 기름값·물가·환율 모두 여기서 시작됨. 우리 지갑에 직접 영향을 주는 국제 뉴스." },
      medium: { starter: "\"에너지의 70%를 중동에 의존하는 게 위험하지 않을까요?\"", context: "한국은 석유 수입 5위 국가인데, 자체 유전이 거의 없음. 중동 불안 때마다 직격탄. 에너지 다변화가 안보 문제라는 인식이 커지는 중." },
      hot: { starter: "\"이번 사태가 3차 세계대전으로 번질 수 있다는 분석도 있던데요\"", context: "1914년 사라예보 사건처럼 지역 충돌이 세계 대전으로 번진 역사. 다만 핵무기 시대에는 '확증파괴' 원칙 때문에 전면전 가능성은 낮다는 게 다수 분석. 하지만 대리전·경제전은 이미 진행 중." },
    },
    followUp: ["한국의 에너지 자립률은?", "호르무즈 해협이 왜 그렇게 중요해?"],
    updatedAt: "2026-03-16",
  },
  {
    id: "chip_crisis", emoji: "🔬", badge: "뉴스", badgeColor: "#37474F",
    title: "반도체 부족 재발 — 자동차·가전 올스톱",
    headline: "AI 수요 폭증으로 반도체가 다시 부족해졌어요. 자동차 출고 지연, 가전 가격 인상이 시작됐습니다.",
    glossaryKeys: ["HBM", "7나노 공정"],
    keyFacts: [
      "AI 반도체(HBM) 수요 전년 대비 340% 폭증",
      "차량용 반도체 부족 → 현대차 일부 모델 출고 3~6개월 지연",
      "SK하이닉스·삼성 HBM 풀가동에도 수요의 60%만 충족",
    ],
    talkStarters: [
      "\"차 뽑으려면 6개월 기다려야 한다는데, 반도체 때문이래요\"",
      "\"AI가 좋긴 한데, 반도체를 다 가져가니까 다른 데서 부족해진 거죠\"",
    ],
    flavors: {
      mild: { starter: "\"자동차 출고가 몇 달씩 밀리고 있다는 거 아세요?\"", context: "반도체 하나가 없으면 수천만 원짜리 차를 만들 수 없는 시대. 현대차 아이오닉 6 출고 대기 6개월. 반도체가 '산업의 쌀'이라고 불리는 이유." },
      medium: { starter: "\"AI 때문에 반도체 부족이 다시 왔다는데, 양날의 검 아닌가요?\"", context: "ChatGPT 한 번 질문에 구글 검색 10배의 전력과 반도체가 필요. AI가 편리하지만 자원을 엄청나게 소모하는 기술이라는 점이 부각되는 중." },
      hot: { starter: "\"반도체 전쟁에서 한국이 유리한 위치에 있다는데, 어떻게 보세요?\"", context: "메모리 반도체 세계 1위(삼성+SK 점유율 70%), HBM 분야에서는 SK하이닉스가 압도적. 하지만 비메모리(설계)는 대만 TSMC가 장악. 한국의 강점과 약점이 명확한 구도." },
    },
    followUp: ["HBM이 뭐길래 이렇게 중요해?", "반도체 하나가 없으면 차를 못 만드는 이유?"],
    updatedAt: "2026-03-16",
  },
  {
    id: "ai_fatigue", emoji: "🤖", badge: "뉴스", badgeColor: "#37474F",
    title: "AI 피로감 — '또 AI?' 반응이 늘고 있다",
    headline: "모든 것에 AI를 붙이는 시대, 사람들의 반응이 달라지고 있어요. 기대에서 피로로.",
    glossaryKeys: [],
    keyFacts: [
      "가트너: 2026년 'AI 환멸기' 진입 선언",
      "AI 제품 사용 후 만족도: 1년 전 78% → 현재 52%로 하락",
      "구직 시장에서 '사람이 직접 합니다'가 마케팅 포인트가 되는 현상",
    ],
    talkStarters: [
      "\"요즘 뭐든 AI 붙이잖아요. AI 냉장고, AI 세탁기... 진짜 필요할까요?\"",
      "\"'사람이 만들었습니다'가 프리미엄이 되는 세상이 올 줄이야\"",
    ],
    flavors: {
      mild: { starter: "\"요즘 AI 피로감 느끼시는 것 같아요. 뭐든 AI래요\"", context: "AI 냉장고, AI 칫솔까지 나온 상황. 소비자들은 '진짜 AI인 것'과 '이름만 AI인 것'을 구분하기 시작. 피로감의 핵심은 AI 자체가 아니라 '과대 포장'에 대한 반감." },
      medium: { starter: "\"AI가 만든 거 vs 사람이 만든 거, 차이가 느껴지세요?\"", context: "AI 그림은 기술적으로 완벽하지만 '감정'이 없다는 평가. 수제 빵이 공장 빵보다 비싼 이유와 같은 맥락. '불완전함의 가치'가 부상하는 중." },
      hot: { starter: "\"AI가 많은 일을 대체하면, 인간은 뭘 하면서 살아야 할까요?\"", context: "산업혁명 때도 같은 걱정을 했지만 새로운 직업이 생겼음. 다만 이번에는 '지적 노동'까지 대체 가능하다는 점이 다름. 결국 인간만의 가치는 '관계·감정·의미 부여'에 있다는 철학적 논의." },
    },
    followUp: ["AI가 대체 못 하는 직업은 뭐야?", "AI 환멸기가 뭐야?"],
    updatedAt: "2026-03-15",
  },
  // ═══ 문화 ═══
  {
    id: "wangsanam", emoji: "🎬", badge: "문화", badgeColor: "#AB47BC",
    title: "왕과 사는 남자 1,300만 — 올해 첫 천만 영화",
    headline: "장항준 감독의 22년 만의 역작. 유해진·박서준 주연으로 한국 관객의 마음을 사로잡았습니다.",
    glossaryKeys: [],
    keyFacts: [
      "개봉 18일 만에 1,300만 돌파 — 2026년 첫 천만 영화",
      "장항준 감독 22년 만의 대형 프로젝트",
      "영화 관람 후 조선왕조실록 구매 3배 증가",
    ],
    talkStarters: [
      "\"왕사남 보셨어요? 1,300만이면 서울 인구보다 많이 본 거래요\"",
      "\"영화 보고 나서 역사에 관심 생긴 사람 저만 그런가요?\"",
    ],
    flavors: {
      mild: { starter: "\"왕사남 보셨어요? 저는 진짜 재밌게 봤거든요\"", context: "1,300만이면 대한민국 국민 4명 중 1명이 본 셈. '안 본 사람 찾기가 더 어렵다'는 말이 나올 정도. 유해진의 연기가 압도적이라는 평." },
      medium: { starter: "\"영화 한 편이 사람들의 역사 인식을 바꾸는 게 가능하다고 보세요?\"", context: "영화 이후 조선왕조실록 판매 3배 증가, 경복궁 방문객 급증. 교과서가 10년 걸려 못 한 일을 영화가 2시간에 해냈다는 평가." },
      hot: { starter: "\"사극 영화가 이렇게 흥행하는 게 한국만의 특수성일까요?\"", context: "할리우드의 역사 영화와 한국 사극의 차이. 한국은 '왕의 이야기'에 공감하는 문화가 있고, 이는 유교적 권력 서사와 연결된다는 분석. 반면 미국은 '개인의 영웅' 서사가 주류." },
    },
    takMode: {
      intro: "\"1,300만이면 서울 인구보다 많은데? 안 본 사람이 오히려 아웃사이더임. '왕사남 안 봤어요'가 아니라 '네? 왜요?'로 대답해야 하는 시대\"",
      kkokkomu: [
        "\"교육부가 10년간 못 한 역사 교육을 유해진이 2시간 만에 해결함. 수능에 왕사남 나와야 하는 거 아닌가. 시험 범위: 유해진 표정 분석\"",
        "\"장항준 감독 인스타에 '22년 걸렸네' 올렸는데, 댓글 1등이 '저는 22년 동안 뭐 했나 싶네요' ㅋㅋ 새벽 3시에 이 댓글 보고 천장 쳐다봄. 나의 천만은 언제 오냐\"",
        "\"유해진이 2005년 '왕의 남자'에도 나오고 2026년 '왕과 사는 남자'에도 나옴. 조선시대 600년 근속이면 퇴직금이 경복궁임. 인사팀에 문의 바람\"",
      ],
    },
    followUp: ["올해 천만 영화 또 나올까?", "한국인이 사극을 좋아하는 이유?"],
    updatedAt: "2026-03-15",
  },
  {
    id: "bts_comeback", emoji: "💜", badge: "문화", badgeColor: "#AB47BC",
    title: "BTS 광화문 컴백 — 3월 21일, 서울이 보라색으로",
    headline: "BTS 완전체 컴백 라이브 'ARIRANG'이 광화문광장에서 열립니다. 전 세계가 서울을 주목하는 날.",
    glossaryKeys: [],
    keyFacts: [
      "2026년 3월 21일(토) 오후 8시, 광화문광장",
      "완전체 컴백 + 신곡 'ARIRANG' 최초 공개",
      "서울시 '인파 위기경보' 발령 — 예상 인원 30만명",
    ],
    talkStarters: [
      "\"BTS 컴백이 광화문이래요. 출근길 어떡하죠?\"",
      "\"신곡 제목이 '아리랑'이래요. 세계인이 아리랑을 부를 생각하니 소름\"",
    ],
    flavors: {
      mild: { starter: "\"BTS 컴백 소식 들으셨어요? 광화문에서 한대요\"", context: "완전체가 다시 모였다는 것만으로 전 세계가 반응. 아미가 아니더라도 '광화문이 보라색으로 물든다'는 이미지가 대단하다는 반응." },
      medium: { starter: "\"BTS가 한국 경제에 미치는 영향이 연간 얼마인지 아세요?\"", context: "현대경제연구원 추산 연간 5조 원 이상. 관광·패션·한국어 교육 등 파생 효과. 아이돌 하나가 중견 기업 매출을 넘는 시대." },
      hot: { starter: "\"K-POP의 세계적 성공이 한국의 소프트파워를 바꿨다고 보세요?\"", context: "BTS 이전과 이후의 한국 이미지는 확실히 다름. 외교부보다 BTS가 한국을 더 알렸다는 평가. 문화가 외교의 도구가 되는 시대의 의미." },
    },
    takMode: {
      intro: "\"광화문 통행 제한이래. 세종대왕이 한글 반포할 때도 길 안 막았는데, BTS는 도로까지 막음. 업적 비교: 세종대왕 - 한글 / BTS - 교통 마비\"",
      kkokkomu: [
        "\"서울시가 '인파 위기경보' 발령함 ㅋㅋ BTS 콘서트가 태풍이랑 같은 등급. 기상청에서 BTS 예보도 해야 하는 거 아닌가. '내일 보라색 비 예상'\"",
        "\"신곡이 '아리랑'이래. 우리 할머니한테 말씀드렸더니 창법 시범 보여주시면서 '내가 원조다' 하심. 할머니 아미 가입 신청서 어디서 받나요\"",
        "\"광화문 못 지나간다고 회사에 얘기했더니 재택근무 승인남 ㅋㅋ 인생 첫 BTS 덕분에 얻은 재택. 이게 진짜 팬서비스 아닌가. 다음 달에도 컴백해주세요\"",
      ],
    },
    followUp: ["K-POP이 한국 경제에 미치는 실제 규모는?", "BTS 이전과 이후의 한류 차이?"],
    updatedAt: "2026-03-16",
  },
  {
    id: "butter_run", emoji: "🧈", badge: "문화", badgeColor: "#AB47BC",
    title: "버터런 챌린지 — 10km 뛰고 버터 만들기",
    headline: "러닝+쉐이킹으로 직접 버터를 만드는 '버터런' 챌린지가 전국적으로 확산 중입니다.",
    glossaryKeys: [],
    keyFacts: [
      "인스타그램 '#버터런' 해시태그 85만 건 돌파",
      "전국 러닝 크루 300곳 이상 참여",
      "버터 완성률 약 60% — 나머지는 '크림 상태'로 끝남",
    ],
    talkStarters: [
      "\"10km 뛰면서 버터를 만든다는 게 말이 돼요?\"",
      "\"사 먹는 버터가 더 맛있다는 후기가 제일 웃겨요\"",
    ],
    flavors: {
      mild: { starter: "\"버터런이라고 아세요? 뛰면서 버터를 만드는 건데요\"", context: "생크림을 병에 넣고 흔들면서 10km를 뛰면 버터가 됨. 러닝 크루 문화 + SNS 인증 + 요리의 결합. 해시태그 85만 건으로 올해 최대 운동 트렌드." },
      medium: { starter: "\"버터런이 유행하는 게 '경험 소비' 트렌드 때문이라는 분석이 있어요\"", context: "MZ세대는 '결과물'보다 '과정의 재미'를 소비. 맛있는 버터가 목적이 아니라, '뛰면서 만드는 경험'이 목적. 완성률 60%인데도 인기인 이유." },
      hot: { starter: "\"이런 챌린지가 유행하는 사회적 배경이 뭘까요?\"", context: "SNS 인증 문화 + 혼자 하는 운동의 한계 + '생산하는 쾌감'의 결합. 소비만 하던 세대가 직접 만드는 것에서 의미를 찾기 시작했다는 분석. 비슷한 트렌드: 도자기 공방, 원데이 클래스." },
    },
    takMode: {
      intro: "\"10km를 뛰어서 버터를 만든다고? 그 시간에 배달 시키면 버터 3개가 옴. 하지만 '배달시킨 버터'는 인스타 감성이 0이잖아. 좋아요가 버터보다 비싼 세상\"",
      kkokkomu: [
        "\"완주 후기 베스트 댓글: '사 먹는 버터가 더 맛있다' ㅋㅋ 10km 뛰고 얻은 인생의 교훈이 '마트가 정답이다'. 자기계발서 1장 분량의 깨달음\"",
        "\"회사에서 '팀빌딩으로 버터런 하자'고 했더니 팀장님이 '그 시간에 PPT 한 장 더 만들어' ㅋㅋ 맞는 말인데 왜 슬프지. 직장인의 유일한 러닝은 퇴근 후 지하철 환승뿐\"",
        "\"버터런 실패해서 크림 상태로 끝난 사람들이 '수제 생크림입니다'라고 올리는 긍정회로가 진짜 대단함. 실패를 리브랜딩하는 능력. 이력서에 써도 되는 수준\"",
      ],
    },
    followUp: ["경험 소비 트렌드가 뭐야?", "올해 가장 유행한 챌린지는?"],
    updatedAt: "2026-03-15",
  },
  // ═══ 만약에 ═══
  {
    id: "if_abroad", emoji: "🌏", badge: "만약에", badgeColor: "#00897B",
    title: "만약 1년간 해외에서 살 수 있다면?",
    headline: "돈 걱정 없이, 1년간 어디든 살 수 있다면 어디로 가시겠어요? 단, 한 도시에서만.",
    glossaryKeys: [],
    keyFacts: [
      "한국인 선호 1위: 일본(도쿄/오사카), 2위: 포르투갈(리스본), 3위: 태국(치앙마이)",
      "디지털 노마드 비자 발급 국가 60개국 이상 (2026년 기준)",
      "해외 장기 거주자의 향수병 피크: 3개월 차",
    ],
    talkStarters: [
      "\"1년간 해외 살기, 진지하게 생각해본 적 있으세요?\"",
      "\"혼자 가는 거라면 어디로 가실 거예요?\"",
    ],
    flavors: {
      mild: { starter: "\"1년간 해외에서 살 수 있다면 어디 가고 싶으세요?\"", context: "제일 인기 있는 답은 일본이지만, 실제 장기 거주 만족도 1위는 포르투갈 리스본. 물가가 서울의 70%, 날씨 좋고, 영어 소통 가능." },
      medium: { starter: "\"해외 살기에서 가장 중요한 게 뭘까요?\"", context: "음식? 날씨? 사실 장기 거주자들이 꼽는 1위는 '외로움 관리'. 3개월 차에 향수병, 6개월 차에 현지 친구가 생기기 시작한다는 게 공통 패턴." },
      hot: { starter: "\"1년 공백이 커리어에 독이 될까요, 약이 될까요?\"", context: "한국에서는 '갭 = 리스크'. 실리콘밸리에서는 '사바티컬 = 경험 자산'. 이 인식 차이가 한국과 미국의 직장 문화 차이를 보여줌." },
    },
    followUp: ["디지털 노마드 비자가 뭐야?", "해외 살기 비용 1위 도시는?"],
    updatedAt: "2026-03-18",
  },
  {
    id: "if_textpast", emoji: "📱", badge: "만약에", badgeColor: "#00897B",
    title: "만약 10년 전의 나에게 문자를 보낸다면?",
    headline: "딱 한 문장만 보낼 수 있다면, 뭐라고 보내시겠어요?",
    glossaryKeys: [],
    keyFacts: [
      "설문 결과 1위: 관계 관련 조언 (38%)",
      "2위: 재테크 조언 — '비트코인 사' (27%)",
      "3위: '괜찮아, 잘 될 거야' 같은 위로 (22%)",
    ],
    talkStarters: [
      "\"10년 전의 나한테 뭐라고 문자 보내실 거예요?\"",
      "\"사실 뭘 말해줘도 그때의 나는 안 들었을 것 같지 않아요?\"",
    ],
    flavors: {
      mild: { starter: "\"10년 전의 나한테 문자 하나 보낼 수 있다면 뭐라고 하실 거예요?\"", context: "'비트코인 사'를 떠올리지만 실제 설문 1위는 '그 사람 놓치지 마', '부모님한테 더 잘해'. 결국 돈보다 관계가 후회의 핵심." },
      medium: { starter: "\"과거를 바꾸면 지금의 좋은 것도 사라질 수 있잖아요\"", context: "나비효과 문제. 그때의 실수가 지금의 나를 만들었다면, 실수를 막는 게 정말 좋은 선택일까? 실패가 성장의 조건이었을 수 있다는 역설." },
      hot: { starter: "\"과거의 나한테 뭘 말해줘도 결국 안 들었을 거라는 연구가 있어요\"", context: "'조언의 역설' — 사람은 직접 경험하기 전까지 조언을 진짜로 받아들이지 않음. 10년 전의 내가 지금의 나 말을 들을 확률은 사실상 0%에 가깝다는 심리학 연구." },
    },
    followUp: ["사람들이 가장 후회하는 것 1위는?", "미래의 나에게 편지 쓰는 서비스가 있다던데?"],
    updatedAt: "2026-03-18",
  },
  {
    id: "if_superpower", emoji: "⚡", badge: "만약에", badgeColor: "#00897B",
    title: "만약 초능력 하나를 가질 수 있다면?",
    headline: "순간이동, 독심술, 시간 정지, 비행. 딱 하나만 고를 수 있다면?",
    glossaryKeys: [],
    keyFacts: [
      "글로벌 설문 1위: 순간이동 (31%)",
      "2위: 시간 정지 (24%) — 수면 부족 해결 목적",
      "3위: 비행 (19%)",
    ],
    talkStarters: [
      "\"초능력 하나 고를 수 있으면 뭘 고르세요?\"",
      "\"순간이동이 있으면 출퇴근이 0분이에요. 이것만으로 인생이 바뀌지 않겠어요?\"",
    ],
    flavors: {
      mild: { starter: "\"초능력 하나를 가질 수 있다면 뭘 고르실 거예요?\"", context: "1위는 항상 순간이동. 출퇴근을 0으로 만들 수 있다는 게 현대인에게 가장 매력적인 초능력. 결국 우리가 가장 원하는 건 '시간'이라는 뜻." },
      medium: { starter: "\"독심술을 가지면 행복해질까요, 불행해질까요?\"", context: "연인의 모든 생각, 직장 동료의 속마음을 안다면? '모르는 게 약'이라는 말의 심리학적 근거가 여기 있음. 인간관계의 윤활유는 '적당한 모름'." },
      hot: { starter: "\"초능력이 모두에게 주어지면 사회가 어떻게 바뀔까요?\"", context: "순간이동 보편화 → 부동산 가치 체계 붕괴, 비행 보편화 → 항공 산업 소멸, 독심술 보편화 → 외교·비즈니스 협상 불가능. 초능력 하나로 경제 구조 전체가 바뀜." },
    },
    followUp: ["가장 쓸모없는 초능력은?", "순간이동이 가능하면 부동산 가격은?"],
    updatedAt: "2026-03-18",
  },
  // ═══ 선택은? ═══
  {
    id: "ch_salary", emoji: "⚖️", badge: "선택은?", badgeColor: "#5C6BC0",
    title: "연봉 2배 vs 주 3일 근무",
    headline: "지금 연봉의 2배 + 주 6일 vs 지금 연봉 그대로 + 주 3일. 당신의 선택은?",
    glossaryKeys: [],
    keyFacts: [
      "20대: 연봉 2배 선택 64% / 40대 이상: 주 3일 선택 71%",
      "영국 주 4일 근무 실험: 참여 기업 92%가 '계속하겠다' 응답",
      "하버드 연구: 돈으로 시간을 사는 사람이 더 행복",
    ],
    talkStarters: [
      "\"연봉 2배와 주 3일 근무, 진지하게 고르라면 뭘 고르세요?\"",
    ],
    flavors: {
      mild: { starter: "\"연봉 2배와 주 3일 근무 중에 뭘 고르실 거예요?\"", context: "20대는 돈, 40대는 시간을 고른다는 설문. 나이가 들수록 시간의 가치가 올라간다는 해석. 지금의 나는 어디에 있을까?" },
      medium: { starter: "\"돈이 더 있으면 시간을 살 수 있잖아요. 그래도 시간을 선택하세요?\"", context: "하버드 연구에서 '돈으로 시간을 사는 사람이, 시간으로 돈을 버는 사람보다 행복도가 높다'는 결론. 가사도우미, 배달, 택시 — 시간을 사는 소비가 행복의 열쇠." },
      hot: { starter: "\"주 3일 근무가 보편화되면 경제가 유지될 수 있을까요?\"", context: "영국 실험 결과 생산성이 떨어지지 않거나 오히려 상승. 하지만 제조업·서비스업에서는 적용이 어렵다는 반론. 지식 노동과 육체 노동의 격차가 더 벌어질 수 있는 구조적 문제." },
    },
    followUp: ["주 4일 근무 실험 결과는?", "나이별로 선택이 다른 이유는?"],
    updatedAt: "2026-03-18",
  },
  {
    id: "ch_past_future", emoji: "⏳", badge: "선택은?", badgeColor: "#5C6BC0",
    title: "과거를 바꾸는 능력 vs 미래를 보는 능력",
    headline: "과거의 한 순간을 바꿀 수 있는 능력 vs 1년 후의 미래를 볼 수 있는 능력.",
    glossaryKeys: [],
    keyFacts: [
      "후회가 많은 사람은 과거를, 불안이 많은 사람은 미래를 선택하는 경향",
      "심리학 분류: 후회 회피형 vs 불확실성 회피형",
    ],
    talkStarters: [
      "\"과거를 바꾸는 것과 미래를 보는 것, 뭐가 더 끌리세요?\"",
    ],
    flavors: {
      mild: { starter: "\"과거를 바꾸는 능력과 미래를 보는 능력, 어떤 게 더 끌리세요?\"", context: "이 질문에 대한 답이 성격을 보여줌. 후회가 많은 사람은 과거를, 불안이 많은 사람은 미래를 선택. 당신은 어느 쪽?" },
      medium: { starter: "\"미래를 알면 노력의 의미가 사라지지 않을까요?\"", context: "결과를 아는 상태에서 과정을 사는 건, 스포일러 알고 영화 보는 것과 비슷. 불확실성이 오히려 인생을 재미있게 만든다는 철학." },
      hot: { starter: "\"과거를 바꿔도 나비효과로 더 나빠질 수 있잖아요\"", context: "양자역학 '다세계 해석' — 과거를 바꾸면 평행 세계가 생기는 것일 뿐, 지금의 나는 바뀌지 않을 수도. 시간 여행이 가능하더라도 '자기 자신의 과거'는 바꿀 수 없다는 이론." },
    },
    followUp: ["나비효과가 실제로 증명된 적 있어?", "시간 여행이 이론적으로 가능해?"],
    updatedAt: "2026-03-18",
  },
  // ═══ 상식 ═══
  {
    id: "fact_honey", emoji: "🍯", badge: "상식", badgeColor: "#F4511E",
    title: "꿀은 3,000년이 지나도 상하지 않는다",
    headline: "이집트 피라미드에서 발견된 3,000년 된 꿀도 먹을 수 있었다고 합니다.",
    glossaryKeys: [],
    keyFacts: [
      "꿀이 안 썩는 이유: 낮은 수분(17%), 높은 산성(pH 3.9), 과산화수소 자연 생성",
      "마누카 꿀은 FDA 승인 화상 치료제로도 사용됨",
    ],
    talkStarters: [
      "\"꿀이 3,000년이 지나도 안 썩는다는 거 알고 계셨어요?\"",
    ],
    flavors: {
      mild: { starter: "\"꿀이 안 썩는다는 거 아세요? 피라미드 꿀도 먹을 수 있대요\"", context: "자연이 만든 완벽한 방부제. 이집트에서 발굴된 3,000년 된 꿀이 실제로 먹을 수 있는 상태였다는 연구 결과." },
      medium: { starter: "\"꿀이 항균성을 가지고 있어서 실제 의료용으로 쓰인다는 거 아세요?\"", context: "마누카 꿀로 화상·상처를 치료하는 게 FDA 승인을 받은 의학적 치료법. 자연 식품이 현대 의학에서도 인정받는 드문 사례." },
      hot: { starter: "\"꿀벌이 사라지면 인류는 4년 내 멸종한다는 말, 과장인가요?\"", context: "아인슈타인이 했다고 알려진 말이지만 출처 불분명. 다만 전 세계 식량의 75%가 곤충 수분에 의존하는 건 사실. 꿀벌 개체수가 매년 감소 중이라 실제 위기." },
    },
    followUp: ["마누카 꿀이 비싼 이유는?", "꿀벌이 사라지면 어떻게 돼?"],
    updatedAt: "2026-03-18",
  },
  {
    id: "fact_octopus", emoji: "🐙", badge: "상식", badgeColor: "#F4511E",
    title: "문어는 심장이 3개, 피는 파란색",
    headline: "심장 3개, 파란 피, 팔마다 독립 신경계. 지구의 외계인이라 불리는 이유.",
    glossaryKeys: [],
    keyFacts: [
      "심장 3개: 전신 순환용 1개 + 아가미 순환용 2개",
      "헤모시아닌(구리 기반) 때문에 피가 파란색",
      "잘린 팔이 30분 이상 독립적으로 움직임",
    ],
    talkStarters: [
      "\"문어 심장이 3개인 거 알고 계셨어요?\"",
      "\"문어 피가 빨간색이 아니라 파란색이래요\"",
    ],
    flavors: {
      mild: { starter: "\"문어가 심장이 3개고 피가 파란색인 거 아세요?\"", context: "우리가 먹는 문어가 사실 지구에서 가장 신비한 생물 중 하나. 팔 8개에 각각 독립된 신경계가 있어서, 하나의 몸에 9개의 의식이 있다는 해석도." },
      medium: { starter: "\"문어의 지능이 개와 비슷하다는 연구가 있어요\"", context: "병뚜껑을 여는 문어, 미로를 풀어나가는 문어 영상이 유명. 두족류 연구자들 사이에서 '문어를 먹어도 되는가'라는 윤리적 논의가 실제로 있음." },
      hot: { starter: "\"문어의 유전자가 지구 생물과 너무 달라서 외계 기원설이 있대요\"", context: "2018년 국제 학술지에 '문어 조상이 지구 외부에서 왔을 가능성'이 진지하게 논문으로 게재됨. 다수 과학자는 회의적이지만, 문어의 유전적 독특성은 사실." },
    },
    followUp: ["문어의 지능은 어느 수준이야?", "문어는 왜 수명이 짧아?"],
    updatedAt: "2026-03-18",
  },
  {
    id: "fact_brain", emoji: "🧠", badge: "상식", badgeColor: "#F4511E",
    title: "당신의 뇌는 하루 6만 개의 생각을 한다",
    headline: "그 중 80%는 부정적이고, 95%는 어제와 같은 생각입니다.",
    glossaryKeys: [],
    keyFacts: [
      "하루 평균 6만 개 생각 — 초당 약 1개",
      "80%가 부정적 생각 (진화적 생존 본능)",
      "95%가 전날과 동일한 반복 생각",
    ],
    talkStarters: [
      "\"하루에 6만 번 생각한다는데, 80%가 부정적이래요\"",
      "\"우울한 게 아니라 뇌가 원래 그렇게 설계된 거래요\"",
    ],
    flavors: {
      mild: { starter: "\"하루에 몇 번이나 생각하시는 것 같아요? 무려 6만 번이래요\"", context: "그중 80%가 부정적이라는 게 놀라운데, 이건 우울한 게 아니라 뇌의 설계. 위험을 먼저 감지하는 게 생존에 유리했기 때문." },
      medium: { starter: "\"95%가 어제와 같은 생각이래요. 새로운 생각을 하려면 어떡하죠?\"", context: "매일 같은 루틴 → 같은 생각 → 같은 결정 → 같은 하루의 반복. '새로운 경험을 하지 않으면 새로운 생각도 없다'는 신경과학적 근거. 루틴을 깨는 게 창의성의 시작." },
      hot: { starter: "\"부정적 생각을 줄이는 게 가능한가요, 아니면 받아들여야 하나요?\"", context: "명상이 부정 편향을 줄인다는 연구 vs '부정적 생각 자체를 없애려 하면 더 늘어난다'는 역설(곰 실험). 핵심은 부정적 생각을 없애는 게 아니라 '관찰하는 것'." },
    },
    followUp: ["명상이 정말 효과가 있어?", "뇌의 디폴트 모드 네트워크가 뭐야?"],
    updatedAt: "2026-03-18",
  },
  // ═══ 시즌 ═══
  {
    id: "season_cherry", emoji: "🌸", badge: "시즌", badgeColor: "#EC407A",
    title: "올해 벚꽃, 어디서 보실 건가요?",
    headline: "2026년 벚꽃 개화 예상: 서울 여의도 4/2, 경주 3/28, 진해 3/25. 30년 전보다 2주 빨라졌습니다.",
    glossaryKeys: [],
    keyFacts: [
      "2026년 서울 개화 예상: 4/2 (1990년 평균 4/15에서 2주 앞당겨짐)",
      "일본 1,200년 벚꽃 기록: 현재가 역사상 가장 빠른 개화",
      "진해 군항제: 3/25~4/5 개최 예정",
    ],
    talkStarters: [
      "\"올해 벚꽃 어디서 보실 거예요?\"",
      "\"벚꽃이 매년 빨라지는 게 느껴지시지 않나요?\"",
    ],
    flavors: {
      mild: { starter: "\"올해 벚꽃 어디서 보실 거예요? 개화 예상일이 나왔더라고요\"", context: "서울 여의도 4/2, 경주 보문단지 3/28, 진해 3/25. 벚꽃은 만개 후 일주일이 절정. 타이밍이 전부." },
      medium: { starter: "\"벚꽃 개화가 매년 빨라지고 있다는 거 아세요?\"", context: "1990년 서울 평균 4/15 → 2026년 4/2. 30년간 2주 앞당겨짐. 일본에서 1,200년간 기록한 데이터에서 '현재가 역사상 가장 빠른 개화'라는 결론." },
      hot: { starter: "\"벚꽃 개화일이 기후 변화의 가장 직관적인 증거라고 하더라고요\"", context: "꽃이 일찍 피는 건 예쁘지만, 생태계 교란의 신호. 꿀벌 활동 시기와 개화 시기가 어긋나면 수분이 안 되고, 농업에 직접 타격. 아름다운 벚꽃 뒤의 불편한 진실." },
    },
    followUp: ["기후 변화로 사라질 수 있는 꽃은?", "벚꽃 명소 추천해줘"],
    updatedAt: "2026-03-18",
  },
  {
    id: "season_newyear", emoji: "🎯", badge: "시즌", badgeColor: "#EC407A",
    title: "새해 목표, 진짜 지킨 적 있어요?",
    headline: "새해 목표를 세운 사람의 92%가 2월 안에 포기합니다. 올해도 그렇게 될까요?",
    glossaryKeys: [],
    keyFacts: [
      "새해 목표 실패율 92% (2월 내 포기)",
      "가장 흔한 목표: 운동(47%), 다이어트(33%), 저축(21%)",
      "행동설계학: '의지'가 아니라 '환경'이 행동을 바꿈",
    ],
    talkStarters: [
      "\"새해 목표 세우셨어요? 아직 유지 중이세요?\"",
      "\"92%가 2월에 포기한대요. 우리도 그 92%인 건 아니겠죠?\"",
    ],
    flavors: {
      mild: { starter: "\"새해 목표 아직 유지 중이세요? 솔직하게요\"", context: "실패율 92%라는 통계. '의지력의 문제'가 아니라 '목표 설정 방식의 문제'라는 게 행동과학의 결론. 대부분 목표가 너무 크고, 시스템이 없음." },
      medium: { starter: "\"'매일 운동하기' 대신 '운동복을 현관에 놓기'가 더 효과적이래요\"", context: "행동설계학에서 말하는 '환경 설계'. 의지에 기대지 말고 환경을 바꾸라는 것. 냉장고 앞에 물 놓기, 폰 화면에 영어 앱 놓기 같은 사소한 변화가 습관을 만듦." },
      hot: { starter: "\"새해 목표 자체가 실패를 전제한 구조라는 비판이 있어요\"", context: "1월 1일에 갑자기 동기가 생기는 게 아니라, 사회적 압력에 의한 의무감일 뿐. 진짜 변화는 '새해'가 아니라 '각성의 순간'에 시작. 스티브 잡스가 매일 '오늘이 마지막이라면?'을 질문한 이유." },
    },
    followUp: ["습관을 만드는 최소 기간은?", "행동설계학이 뭐야?"],
    updatedAt: "2026-03-18",
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

function NewsCard({ topic, flavor, onFlavorChange, onBookmark, isBookmarked, onOpenSheet }) {
  const fl = topic.flavors[flavor];
  return (
    <div className="rounded-3xl overflow-hidden transition-all" style={{ background: "var(--card-bg)", boxShadow: "var(--card-shadow)" }}>
      <div className="p-6">
        <div className="flex items-center gap-2.5 mb-4">
          <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold text-white" style={{ background: topic.badgeColor }}>{topic.badge}</span>
          <span className="text-[11px]" style={{ color: "var(--text-muted)" }}>{topic.updatedAt}</span>
        </div>
        <div className="flex items-start gap-4 mb-4">
          <span className="text-4xl mt-0.5">{topic.emoji}</span>
          <div className="flex-1">
            <h3 className="text-lg font-bold leading-tight mb-2" style={{ color: "var(--text)", letterSpacing: "-0.02em" }}>{topic.title}</h3>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)", lineHeight: "1.6" }}>{topic.headline}</p>
          </div>
        </div>
        <div className="mb-4">
          <p className="text-xs font-semibold mb-2 tracking-wide" style={{ color: "var(--text-muted)", letterSpacing: "0.05em" }}>대화의 맛 선택</p>
          <FlavorSelector value={flavor} onChange={onFlavorChange} />
        </div>
        <div className="p-4 rounded-2xl" style={{ background: "rgba(245,245,247,0.6)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.4)" }}>
          <p className="text-xs font-bold mb-2" style={{ color: FLAVOR_LEVELS.find(f => f.id === flavor)?.color }}>
            💬 {FLAVOR_LEVELS.find(f => f.id === flavor)?.label} — 이렇게 시작하세요
          </p>
          <p className="text-sm mb-2.5" style={{ color: "var(--text)", lineHeight: "1.65", fontStyle: "italic" }}>{fl.starter}</p>
          <p className="text-sm" style={{ color: "var(--text-secondary)", lineHeight: "1.65" }}>{fl.context}</p>
        </div>
        <button className="w-full mt-4 py-3.5 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 transition-all kkokkomu-btn"
          style={{ color: "#fff", boxShadow: "0 4px 14px var(--accent-shadow)" }}
          onClick={() => onOpenSheet(topic)}>
          꼬꼬무 더보기
        </button>
      </div>
      <div className="flex" style={{ borderTop: "1px solid var(--chip-bg)" }}>
        <button className="flex-1 py-3 text-sm font-medium flex items-center justify-center gap-1.5" style={{ color: isBookmarked ? "var(--accent)" : "var(--text-secondary)" }} onClick={() => onBookmark(topic)}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M3.19995 2.99995C3.19995 2.55812 3.55812 2.19995 3.99995 2.19995H20C20.4418 2.19995 20.7999 2.55812 20.7999 2.99995V21C20.7999 21.3106 20.6202 21.5931 20.3388 21.7246C20.0574 21.8562 19.7254 21.813 19.487 21.6139L12 15.3582L4.51289 21.6139C4.27454 21.813 3.94246 21.8562 3.6611 21.7246C3.37973 21.5931 3.19995 21.3106 3.19995 21V2.99995ZM4.79995 3.79995V19.289L11.487 13.7018C11.784 13.4537 12.2159 13.4537 12.5129 13.7018L19.2 19.289V3.79995H4.79995Z" fill="currentColor"/></svg>
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

// ─── Bottom Sheet (토스 스타일) ───
function BottomSheet({ topic, onClose }) {
  const [takOpen, setTakOpen] = useState(false);
  if (!topic) return null;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 100, animation: "dimIn 0.2s ease" }}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }} onClick={onClose} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, maxHeight: "85vh", borderRadius: "24px 24px 0 0", background: "var(--card-bg)", boxShadow: "0 -8px 40px rgba(0,0,0,0.15)", animation: "sheetUp 0.35s cubic-bezier(0.22,1,0.36,1)", overflowY: "auto", WebkitOverflowScrolling: "touch" }}>
        <div className="flex justify-center pt-3 pb-4 sticky top-0" style={{ background: "var(--card-bg)", borderRadius: "24px 24px 0 0", zIndex: 2 }}>
          <div style={{ width: 36, height: 5, borderRadius: 3, background: "var(--text-muted)", opacity: 0.25 }} />
        </div>
        <div className="px-6 pb-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{topic.emoji}</span>
            <div>
              <h3 className="text-base font-bold" style={{ color: "var(--text)", letterSpacing: "-0.02em" }}>{topic.title}</h3>
              <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>꼬꼬무 더보기</p>
            </div>
          </div>
          <button className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "var(--chip-bg)" }} onClick={onClose}>
            <span style={{ color: "var(--text-secondary)", fontSize: 16, fontWeight: 700 }}>✕</span>
          </button>
        </div>
        <div className="px-6 pb-10 space-y-4">
          {topic.keyFacts?.length > 0 && (
            <div className="p-4 rounded-2xl" style={{ background: "var(--chip-bg)" }}>
              <p className="text-xs font-bold mb-3" style={{ color: "var(--accent)", letterSpacing: "0.03em" }}>📌 핵심 팩트</p>
              {topic.keyFacts.map((f, i) => (
                <p key={i} className="text-sm mb-2" style={{ color: "var(--text)", lineHeight: "1.6" }}>• {f}</p>
              ))}
            </div>
          )}
          {topic.talkStarters?.length > 0 && (
            <div className="p-4 rounded-2xl" style={{ background: "rgba(46,125,50,0.04)" }}>
              <p className="text-xs font-bold mb-3" style={{ color: "#2E7D32", letterSpacing: "0.03em" }}>💬 이렇게 말해보세요</p>
              {topic.talkStarters.map((s, i) => (
                <p key={i} className="text-sm mb-2" style={{ color: "var(--text)", lineHeight: "1.6", fontStyle: "italic" }}>{s}</p>
              ))}
            </div>
          )}
          <div>
            <p className="text-xs font-bold mb-3" style={{ color: "var(--text-muted)", letterSpacing: "0.03em" }}>🔗 꼬꼬무 — 이렇게 이어가세요</p>
            <div className="flex flex-wrap gap-2">
              {topic.followUp.map((f, i) => (
                <span key={i} className="px-3 py-2 rounded-full text-xs font-medium" style={{ background: "var(--chip-bg)", color: "var(--text-secondary)" }}>{f}</span>
              ))}
            </div>
          </div>
          {topic.glossaryKeys?.length > 0 && (
            <div className="p-4 rounded-2xl" style={{ background: "rgba(103,58,183,0.04)", border: "1px solid rgba(103,58,183,0.1)" }}>
              <p className="text-xs font-bold mb-3 flex items-center gap-1.5" style={{ color: "#5E35B1", letterSpacing: "0.03em" }}>📖 이 뉴스의 어려운 용어</p>
              <div className="space-y-3">
                {topic.glossaryKeys.map(k => GLOSSARY[k] && (
                  <div key={k}>
                    <span className="inline-block text-xs font-bold px-2 py-0.5 rounded mb-1" style={{ background: "rgba(103,58,183,0.12)", color: "#5E35B1" }}>{k}</span>
                    <p className="text-xs leading-relaxed pl-0.5" style={{ color: "var(--text-secondary)" }}>{GLOSSARY[k]}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {topic.takMode && (
            <div>
              <button className="w-full py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all"
                style={{ background: takOpen ? "linear-gradient(135deg, #FF6F00, #FFB300)" : "linear-gradient(135deg, rgba(255,111,0,0.08), rgba(255,179,0,0.15))", color: takOpen ? "#fff" : "#FF6F00", border: takOpen ? "none" : "1.5px solid #FFB300" }}
                onClick={() => setTakOpen(!takOpen)}>
                😎 감다살 드립 모드 {takOpen ? "OFF" : "ON"}
              </button>
              {takOpen && (
                <div className="mt-3 p-5 rounded-2xl" style={{ background: "rgba(255,179,0,0.06)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", border: "1px solid rgba(255,179,0,0.15)", animation: "fadeIn 0.3s" }}>
                  <p className="text-[10px] mb-3 px-3 py-1.5 rounded-full inline-block" style={{ background: "rgba(255,111,0,0.1)", color: "#E65100" }}>⚡ 재미 요소로만 봐주세요 — 실제 정보와 다를 수 있습니다</p>
                  <p className="text-xs font-bold mb-2" style={{ color: "#E65100" }}>😎 이렇게 꺼내면 감다살</p>
                  <p className="text-sm italic mb-3" style={{ color: "var(--text)", lineHeight: "1.65" }}>{topic.takMode.intro}</p>
                  <p className="text-xs font-bold mb-2" style={{ color: "#FF6F00" }}>🔥 감다살 꼬꼬무 드립</p>
                  {topic.takMode.kkokkomu.map((k, i) => (
                    <p key={i} className="text-sm mb-2.5" style={{ color: "var(--text-secondary)", lineHeight: "1.65" }}>{k}</p>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
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
  const [sheetTopic, setSheetTopic] = useState(null);

  const getFlavor = (id) => flavorMap[id] || "mild";
  const setFlavor = (id, f) => setFlavorMap(prev => ({ ...prev, [id]: f }));

  const toggleBookmark = (t) => setBookmarks(prev => prev.find(b => b.id === t.id) ? prev.filter(b => b.id !== t.id) : [...prev, t]);
  const isBookmarked = (t) => bookmarks.some(b => b.id === t.id);

  const badgeMap = { news: "뉴스", culture: "문화", ifwhat: "만약에", choice: "선택은?", fact: "상식", season: "시즌" };
  const filtered = newsFilter === "all" ? TRENDING : TRENDING.filter(n => n.badge === badgeMap[newsFilter]);

  const theme = darkMode ? {
    "--bg": "#000000", "--card-bg": "#1c1c1e", "--text": "#f5f5f7", "--text-secondary": "#a1a1a6",
    "--text-muted": "#636366", "--accent": "#d4453b", "--accent-light": "#e8685e",
    "--accent-shadow": "rgba(212,69,59,0.25)", "--border": "#2c2c2e", "--chip-bg": "#2c2c2e",
    "--tip-bg": "rgba(212,69,59,0.06)", "--nav-bg": "rgba(0,0,0,0.85)",
    "--card-shadow": "none",
  } : {
    "--bg": "#F2F4F6", "--card-bg": "#ffffff", "--text": "#1d1d1f", "--text-secondary": "#6e6e73",
    "--text-muted": "#aeaeb2", "--accent": "#d4453b", "--accent-light": "#e8685e",
    "--accent-shadow": "rgba(212,69,59,0.15)", "--border": "#f5f5f7", "--chip-bg": "#f5f5f7",
    "--tip-bg": "rgba(212,69,59,0.03)", "--nav-bg": "rgba(255,255,255,0.8)",
    "--card-shadow": "0 2px 12px rgba(0,0,0,0.06)",
  };

  return (
    <div style={{ ...theme, background: "var(--bg)", minHeight: "100vh", fontFamily: "'Noto Sans KR', -apple-system, 'SF Pro Display', BlinkMacSystemFont, sans-serif", WebkitFontSmoothing: "antialiased" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;600;700;900&family=Playfair+Display:wght@700;800;900&display=swap');
        @keyframes slideUp { from { opacity:0; transform:translateY(20px) } to { opacity:1; transform:translateY(0) } }
        @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
        @keyframes gradientFlow {
          0% { background-position: 0% 50%; }
          25% { background-position: 50% 100%; }
          50% { background-position: 100% 50%; }
          75% { background-position: 50% 0%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes sheetUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        @keyframes dimIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .kkokkomu-btn {
          background: linear-gradient(270deg, #d4453b, #ff4081, #ff6b8a, #e8685e, #ff8a65, #d4453b);
          background-size: 400% 400%;
          animation: gradientFlow 2s ease infinite;
          box-shadow: 0 4px 20px rgba(212,69,59,0.3);
        }
        .kkokkomu-btn:hover { box-shadow: 0 6px 28px rgba(212,69,59,0.4); }
        .kkokkomu-btn:active { transform: scale(0.96); }
        * { box-sizing: border-box; margin: 0; padding: 0; -webkit-font-smoothing: antialiased; }
        button { cursor: pointer; border: none; background: none; font-family: inherit; }
      `}</style>

      <div className="mx-auto" style={{ maxWidth: 460, paddingBottom: 90 }}>

        {/* HOME */}
        {screen === "home" && (
          <div className="px-6 pt-14 pb-6" style={{ animation: "fadeIn 0.4s" }}>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-4xl font-black tracking-tight" style={{ color: "var(--text)", letterSpacing: "-0.02em", fontFamily: "'Playfair Display', Georgia, serif" }}>
                  Le<span style={{ color: "var(--accent)" }}>Talk</span>
                </h1>
                <p className="text-base mt-1.5" style={{ color: "var(--text-muted)" }}>대화의 맛을 더하다</p>
                <p className="text-[10px] mt-1" style={{ color: "var(--text-muted)", opacity: 0.5 }}>제작자 : 이상현(le_sh7)</p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 rounded-full transition-all"
                style={{ background: "rgba(255,255,255,0.6)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", boxShadow: "0 1px 4px rgba(0,0,0,0.06), inset 0 0 0 1px rgba(255,255,255,0.5)", color: "var(--text-secondary)" }}
                onClick={() => setDarkMode(!darkMode)}>
                <span style={{ fontSize: 16 }}>{darkMode ? "🌞" : "🌙"}</span>
                <span className="text-xs font-medium">{darkMode ? "라이트" : "다크"}</span>
              </button>
            </div>

            {/* Concept Banner */}
            <div className="p-6 rounded-3xl mb-8" style={{ background: "linear-gradient(135deg, rgba(212,69,59,0.9), rgba(232,104,94,0.9))", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", boxShadow: "0 8px 32px var(--accent-shadow)" }}>
              <p className="text-white text-lg font-bold mb-1.5" style={{ letterSpacing: "-0.01em" }}>대화의 맛을 골라보세요</p>
              <p className="text-white text-xs opacity-90 leading-relaxed">뉴스부터 만약에·선택은?·상식까지, 순한맛·중간맛·매운맛으로 대화의 깊이를 선택하세요.</p>
            </div>

            {/* Filter */}
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold" style={{ color: "var(--text)", letterSpacing: "-0.02em" }}>이번 주 대화 주제</h2>
            </div>
            <div className="flex gap-2 mb-6 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
              {[{ id: "all", l: "전체" }, { id: "news", l: "뉴스" }, { id: "culture", l: "문화" }, { id: "ifwhat", l: "만약에" }, { id: "choice", l: "선택은?" }, { id: "fact", l: "상식" }, { id: "season", l: "시즌" }].map(f => (
                <button key={f.id} className="px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all" onClick={() => setNewsFilter(f.id)}
                  style={{ background: newsFilter === f.id ? "var(--accent)" : "var(--card-bg)", color: newsFilter === f.id ? "#fff" : "var(--text-muted)", boxShadow: newsFilter === f.id ? "0 2px 8px var(--accent-shadow)" : "var(--card-shadow)" }}>
                  {f.l}
                </button>
              ))}
            </div>

            {/* News Cards */}
            <div className="space-y-5">
              {filtered.map((t, i) => (
                <div key={t.id} style={{ animation: `slideUp 0.4s ease-out ${i * 80}ms both` }}>
                  <NewsCard topic={t} flavor={getFlavor(t.id)} onFlavorChange={(f) => setFlavor(t.id, f)} onBookmark={toggleBookmark} isBookmarked={isBookmarked(t)} onOpenSheet={setSheetTopic} />
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
                  <NewsCard key={t.id} topic={t} flavor={getFlavor(t.id)} onFlavorChange={(f) => setFlavor(t.id, f)} onBookmark={toggleBookmark} isBookmarked={true} onOpenSheet={setSheetTopic} />
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

      {/* Bottom Sheet */}
      {sheetTopic && <BottomSheet topic={sheetTopic} onClose={() => setSheetTopic(null)} />}

      {/* Nav */}
      <div className="fixed bottom-0 left-0 right-0 flex justify-center" style={{ background: "rgba(255,255,255,0.65)", backdropFilter: "saturate(180%) blur(24px)", WebkitBackdropFilter: "saturate(180%) blur(24px)", borderTop: "1px solid rgba(255,255,255,0.3)", zIndex: 50 }}>
        <div className="flex w-full" style={{ maxWidth: 460 }}>
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
