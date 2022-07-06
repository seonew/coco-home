const constants = {
  DISPLAY_NAME: '우리집 이름을 등록해 주세요.',
  MEMBER: '누가 했나요?',
  WORK: '무엇을 했나요?',
  SPACE: '어떤 공간인가요?',
  TARGET_ITEM: '어떤 것인가요?',

  DATE: '언제 했나요?',
  CYCLE: '어떤 주기마다 안내할까요?',

  HOME: {
    SPACES: ['주방', '화장실', '베란다'],
    WORKS: ['설거지', '청소', '교체', '분리수거'],
    ITEMS: ['세면대', '변기', '공기청정기'],
  },

  // REFRIGERATOR
  ADDED_DATE: '언제 추가했나요?',
  ADDED_EXPIRATION_DATE: '얼마나 보관 예정인가요?',
  PRIORITY: '우선 순위가 어느 정도인가요?',
  COUNTER: '남은 수량이 몇 개인가요?',

  CALENDAR: {
    NUMBERS: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    UNITS: {
      일: '0',
      주: '1',
      개월: '2',
    },
    MONTHS: [
      '1월',
      '2월',
      '3월',
      '4월',
      '5월',
      '6월',
      '7월',
      '8월',
      '9월',
      '10월',
      '11월',
      '12월',
    ],
    WEEKDAYS: ['일', '월', '화', '수', '목', '금', '토'],
  },

  // COUPON
  COUPON: {
    BRAND: ['스타벅스', '배스킨라빈스'],
  },

  PAGE_PATH: {
    REFRIGERATOR_REGISTER: '/refrigerator/register',
    REFRIGERATOR_LIST: '/refrigerator/list',
    SEARCH_HOME_TASK_LIST: '/home/task/list/search',
    HOME_TASK_LIST: '/home/task/list',
    HOME_TASK_DETAIL: '/home/task/detail/:year/:month/:day',
    HOME_TASK_STATISTICS: '/home/task/statistics',
    HOME_TASK_REGISTER: '/home/task/register',
    HOME_REGISTER: '/home/register',
    MYPAGE: '/mypage',
    MAIN: '/',
    LOGIN: '/login',
    AUTH_CALLBACK: '/callback',
    AUTH_CALLBACK_KAKAO: '/callback/kakao',
    AUTH_CALLBACK_GUEST: '/callback/guest',
  },
};

export const pageNameByPathName = {
  [constants.PAGE_PATH.SEARCH_HOME_TASK_LIST]: '검색 결과',
  [constants.PAGE_PATH.REFRIGERATOR_REGISTER]: '음식 등록',
  [constants.PAGE_PATH.REFRIGERATOR_LIST]: '음식들',
  [constants.PAGE_PATH.HOME_TASK_LIST]: '집안일들',
  [constants.PAGE_PATH.HOME_TASK_DETAIL]: '집안일 상세',
  [constants.PAGE_PATH.HOME_TASK_REGISTER]: '집안일 등록',
  [constants.PAGE_PATH.HOME_TASK_STATISTICS]: '통계',
  [constants.PAGE_PATH.HOME_REGISTER]: '우리집 등록',
  [constants.PAGE_PATH.MYPAGE]: '마이페이지',
  [constants.PAGE_PATH.MAIN]: '코코홈',
};

export const chart = {
  BACKGROUND_COLOR: [
    'rgb(255, 99, 132)',
    'rgb(255, 159, 64)',
    'rgb(255, 205, 86)',
    'rgb(75, 192, 192)',
    'rgb(54, 162, 235)',
    'rgb(153, 102, 255)',
    'rgb(201, 203, 207)',
  ],
  BORDER_COLOR: [
    'rgb(255, 99, 132)',
    'rgb(255, 159, 64)',
    'rgb(255, 205, 86)',
    'rgb(75, 192, 192)',
    'rgb(54, 162, 235)',
    'rgb(153, 102, 255)',
    'rgb(201, 203, 207)',
  ],
};

export default constants;
