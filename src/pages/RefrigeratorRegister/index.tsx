import { memo, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'stores';
import { actions } from './stores/slice';
import { actions as appActions } from 'stores/slice';
import constants, { pageNameByPathName } from 'constants/index';
import { RefrigeratorFood } from 'types';
import { getMessage } from 'utils/common';
import styled from 'styled-components';

import Row from 'components/Row';
import ChipList from 'components/ChipList';
import Rating from 'components/Rating';
import DatePicker from 'components/DatePicker';
import HeaderButtonContainer from 'components/HeaderButtonContainer';
import Counter from 'components/Counter';
import TextField from 'components/TextField';
import ExpirationDay from './ExpirationDay';
import Toggle from './Toggle';
import AlertModal from 'components/AlertModal';

const Root = styled.div`
  height: 100%;
  background-color: #fff;
`;

const RegisterRefrigerator = () => {
  const [space, setSpace] = useState('');
  const [targetItem, setTargetItem] = useState('');
  const [count, setCount] = useState(0);
  const [priority, setPriority] = useState(0);
  const [date, setDate] = useState(new Date());
  const [expirationDay, setExpirationDay] = useState(0);
  const [alertMessage, setAlertMessage] = useState('');
  const spaces = ['냉장', '냉동'];
  const homeId = useSelector<RootState, string>(
    (state) => state.app.currentHome.id
  );
  const showCalendar = useSelector<RootState, boolean>(
    (state) => state.refrigeratorRegister.showCalendar
  );
  const openAlertModal = useSelector<RootState, boolean>(
    (state) => state.app.alertModal.open
  );

  const dispatch = useDispatch();

  const handleChangeExpirationDay = useCallback((current) => {
    setExpirationDay(current);
  }, []);

  const handleChangeTextField = useCallback((current) => {
    setTargetItem(current);
  }, []);

  const handleClickCount = useCallback((item) => {
    setCount(item);
  }, []);

  const handleClickPriority = useCallback((item) => {
    setPriority(item);
  }, []);

  const handleClickDate = useCallback((item) => {
    setDate(item);
  }, []);

  const handleClickSpace = useCallback((name, value) => {
    setSpace(value);
  }, []);

  const handleChangeToggle = useCallback(
    (current) => {
      if (current === 'calendar') {
        setExpirationDay(0);
      } else {
        setDate(new Date());
      }
      dispatch(actions.setShowCalendar(!showCalendar));
    },
    [dispatch, showCalendar]
  );

  const showAlertModal = useCallback(
    (text) => {
      setAlertMessage(text);
      dispatch(appActions.setOpenAlertModal(!openAlertModal));
    },
    [dispatch, openAlertModal]
  );

  const validate = useCallback(
    (nextRefrigeratorFood) => {
      const keys = Object.keys(nextRefrigeratorFood);
      const result = keys.some((key) => {
        if (
          (key !== 'id' &&
            key !== 'expirationDay' &&
            (nextRefrigeratorFood[key] === '' ||
              nextRefrigeratorFood[key] === 0)) ||
          (key === 'expirationDay' &&
            nextRefrigeratorFood[key] === 0 &&
            !showCalendar)
        ) {
          showAlertModal(getMessage(key));
          return true;
        }

        if (key !== 'homeId' && nextRefrigeratorFood[key].length > 11) {
          showAlertModal('10글자 이하로 입력해주세요.');
          return true;
        }
        return false;
      });
      return result;
    },
    [showAlertModal, showCalendar]
  );

  const handleSaveContents = useCallback(() => {
    const nextRefrigeratorFood: RefrigeratorFood = {
      id: '',
      homeId: homeId,
      space: space,
      targetItem: targetItem,
      count: count,
      priority: priority,
      date: date,
      expirationDay: expirationDay,
    };

    if (validate(nextRefrigeratorFood)) {
      return;
    }

    dispatch(actions.insertUserRegisterRefrigeratorData(nextRefrigeratorFood));
  }, [
    count,
    date,
    dispatch,
    expirationDay,
    homeId,
    priority,
    space,
    targetItem,
    validate,
  ]);

  return (
    <Root>
      <HeaderButtonContainer
        text={pageNameByPathName[constants.PAGE_PATH.REFRIGERATOR_REGISTER]}
        onClickSaveContents={handleSaveContents}
      />
      <Row text={constants.SPACE} required={true}>
        <ChipList
          type={'space'}
          items={spaces}
          selectedItem={space}
          onClickItem={handleClickSpace}
        />
      </Row>
      <Row text={constants.TARGET_ITEM} required={true}>
        <TextField onChange={handleChangeTextField} />
      </Row>
      <Row text={constants.COUNTER} required={true}>
        <Counter onClickItem={handleClickCount} />
      </Row>
      <Row text={constants.PRIORITY} required={true}>
        <Rating onClickItem={handleClickPriority} />
      </Row>
      <div>
        <Toggle onChange={handleChangeToggle} />
        {showCalendar ? (
          <Row text={constants.ADDED_DATE} required={true}>
            <DatePicker onClickItem={handleClickDate} />
          </Row>
        ) : (
          <Row text={constants.ADDED_EXPIRATION_DATE} required={true}>
            <ExpirationDay
              text={expirationDay}
              onChange={handleChangeExpirationDay}
            />
          </Row>
        )}
      </div>
      <AlertModal open={openAlertModal} text={alertMessage} />
    </Root>
  );
};

export default memo(RegisterRefrigerator);
