export interface GridData {
  id: number;
  title: string;
  instrument: string;
  dateTime: string;
}

export interface CarouselItem {
  id: number;
  imageUrl: string;
  title: string;
}

export interface BoardData {
  id: number;
  title: string;
  dateTime: string;
  userId: string;
}

export const mockObbliData: GridData[] = [
  {
    id: 1,
    title: '화성 금란교회 베이스 급구',
    instrument: '베이스',
    dateTime: '2024-09-17 14:30',
  },
  {
    id: 2,
    title: '청담동 결혼식 피아노 구해요 시급 3만원',
    instrument: '피아노',
    dateTime: '2024-09-17 13:00',
  },
  {
    id: 3,
    title: '드럼 오브리 구합니다. 포항 온누리교회, 자세한 사항은 010-...',
    instrument: '드럼',
    dateTime: '2024-09-16 10:00',
  },
  {
    id: 4,
    title: '바이올린 오브리 - 서울시립대 예술회관',
    instrument: '바이올린',
    dateTime: '2024-09-15 15:30',
  },
  {
    id: 5,
    title: '첼로 대타 구합니다. (연동교회, 6만원)',
    instrument: '첼로',
    dateTime: '2024-09-14 11:00',
  },
  {
    id: 6,
    title: '플룻 오브리 구해요.',
    instrument: '플룻',
    dateTime: '2024-09-13 16:45',
  },
  {
    id: 7,
    title: '클라리넷 오브리가토~',
    instrument: '클라리넷',
    dateTime: '2024-09-12 09:30',
  },
  {
    id: 8,
    title: '색소폰 오브리를 구해본 적 있나요?',
    instrument: '색소폰',
    dateTime: '2024-09-11 18:15',
  },
];

export const mockLessonData: GridData[] = [
  {
    id: 1,
    title: '바이올린 레슨',
    instrument: '바이올린',
    dateTime: '2024-09-17',
  },
  {
    id: 2,
    title: '성악 레슨생 구함',
    instrument: '성악',
    dateTime: '2024-09-16',
  },
  {
    id: 3,
    title: '첼로 레슨 받고싶어요. 시급 5만원, 서울.',
    instrument: '첼로',
    dateTime: '2024-09-15',
  },
  {
    id: 4,
    title: '피아노 레슨있을라나?',
    instrument: '피아노',
    dateTime: '2024-09-14',
  },
  {
    id: 5,
    title: '기타 레슨 - 서울 목동 학원',
    instrument: '기타',
    dateTime: '2024-09-13',
  },
  {
    id: 6,
    title: '드럼 : 당신도 잘 칠 수 있다.',
    instrument: '드럼',
    dateTime: '2024-09-12',
  },
  {
    id: 7,
    title: '플룻은 세상에서 가장 아름다운 음색을 가졌습니다.',
    instrument: '플룻',
    dateTime: '2024-09-11',
  },
  {
    id: 8,
    title: '클라리넷 레슨 : 첫 레슨 무료, 전화상담 가능',
    instrument: '클라리넷',
    dateTime: '2024-09-10',
  },
];

export const mockRecruitmentData: CarouselItem[] = [
  { id: 1, imageUrl: '/images/recruit1.jpg', title: '채용 공고 1' },
  { id: 2, imageUrl: '/images/recruit2.jpg', title: '채용 공고 2' },
  { id: 3, imageUrl: '/images/recruit3.jpg', title: '채용 공고 3' },
  { id: 4, imageUrl: '/images/recruit4.jpg', title: '채용 공고 4' },
  { id: 5, imageUrl: '/images/recruit5.jpg', title: '채용 공고 5' },
  { id: 6, imageUrl: '/images/recruit6.jpg', title: '채용 공고 6' },
  { id: 7, imageUrl: '/images/recruit7.jpg', title: '채용 공고 7' },
  { id: 8, imageUrl: '/images/recruit8.jpg', title: '채용 공고 8' },
];

export const mockConcertData: CarouselItem[] = [
  { id: 1, imageUrl: '/images/concert1.jpg', title: '콘서트 1' },
  { id: 2, imageUrl: '/images/concert2.jpg', title: '콘서트 2' },
  { id: 3, imageUrl: '/images/concert3.jpg', title: '콘서트 3' },
  { id: 4, imageUrl: '/images/concert4.jpg', title: '콘서트 4' },
  { id: 5, imageUrl: '/images/concert5.jpg', title: '콘서트 5' },
  { id: 6, imageUrl: '/images/concert6.jpg', title: '콘서트 6' },
  { id: 7, imageUrl: '/images/concert7.jpg', title: '콘서트 7' },
  { id: 8, imageUrl: '/images/concert8.jpg', title: '콘서트 8' },
];

export const mockBoardData1 = [
  { id: 1, title: '피아노 중고 팝니다, 상태 A급', dateTime: '2024-09-17', userId: 'user123' },
  { id: 2, title: '중고 기타 싸게 팝니다. 급처분', dateTime: '2024-09-16', userId: 'user456' },
  { id: 3, title: '음향 장비 세트 판매합니다', dateTime: '2024-09-15', userId: 'user789' },
  { id: 4, title: '플룻 케이스 새 제품 팝니다.', dateTime: '2024-09-14', userId: 'user101' },
  { id: 5, title: '첼로용 어깨받침 구해요. 연락주세요', dateTime: '2024-09-13', userId: 'user202' },
  { id: 6, title: '공연 스탠드 팝니다. 거의 새 것', dateTime: '2024-09-12', userId: 'user303' },
  { id: 7, title: '바이올린 활 수리할 곳 추천해주세요', dateTime: '2024-09-11', userId: 'user404' },
  { id: 8, title: '기타 이펙터 세트 할인 판매', dateTime: '2024-09-10', userId: 'user505' },
];

export const mockBoardData2 = [
  { id: 1, title: '바이올린의 진화, 그 역사적 흐름을 따라', dateTime: '2024-09-17', userId: 'user123' },
  { id: 2, title: '모차르트의 숨겨진 명곡들', dateTime: '2024-09-16', userId: 'user456' },
  { id: 3, title: '피아노 협주곡의 거장들: 베토벤부터 라흐마니노프까지', dateTime: '2024-09-15', userId: 'user789' },
  { id: 4, title: '첼로의 감동, 역대 최고의 연주자들', dateTime: '2024-09-14', userId: 'user101' },
  { id: 5, title: '플룻으로 연주하는 명곡 10선', dateTime: '2024-09-13', userId: 'user202' },
  { id: 6, title: '교향곡의 역사: 하이든부터 말러까지', dateTime: '2024-09-12', userId: 'user303' },
  { id: 7, title: '드럼의 역사: 타악기의 기원과 진화', dateTime: '2024-09-11', userId: 'user404' },
  { id: 8, title: '오케스트라 지휘자의 역할과 그 중요성', dateTime: '2024-09-10', userId: 'user505' },
];
