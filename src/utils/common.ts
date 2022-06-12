import constants from 'constants/index';

export const getUnitStringToCode = (item: string) => {
  return constants.CALENDAR.UNITS[item];
};

export const getUnitCodeToString = (item: string) => {
  const units = Object.keys(constants.CALENDAR.UNITS);
  return units[item];
};

export const getUnitArray = () => {
  const units = Object.keys(constants.CALENDAR.UNITS);
  return units;
};

export const getMessage = (key) => {
  let result;

  switch (key) {
    case 'space':
      result = '공간을 선택해주세요.';
      break;
    case 'work':
      result = '집안일을 선택해주세요.';
      break;
    case 'member':
      result = '사용자를 선택해주세요.';
      break;
    case 'count':
      result = '수량을 입력해주세요.';
      break;
    case 'priority':
      result = '우선순위를 입력해주세요.';
      break;
    case 'expirationDay':
      result = '디데이를 입력해주세요.';
      break;

    case 'displayName':
      result = '우리집 이름을 입력해주세요.';
      break;
    case 'members':
      result = '사용자를 추가해주세요.';
      break;
    case 'spaces':
      result = '공간을 추가해주세요.';
      break;
    case 'works':
      result = '집안일을 추가해주세요.';
      break;
    case 'targetItem':
      result = '추가할 대상을 입력해주세요.';
      break;
    default:
      result = '필수값을 입력해주세요.';
      break;
  }

  return result;
};
