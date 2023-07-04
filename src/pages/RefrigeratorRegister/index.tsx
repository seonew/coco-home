import { memo, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'stores';
import { actions } from './stores/slice';
import { actions as appActions } from 'stores/slice';
import {
  TextMessages,
  PAGE_PATH,
  REFRIGERATOR_SPACES,
  PageNameByPathName,
} from 'constants/index';
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
  const [selectedToggle, setSelectedToggle] = useState('dday');
  const homeId = useSelector<RootState, string>(
    (state) => state.app.currentHome.id
  );
  const showCalendar = useSelector<RootState, boolean>(
    (state) => state.refrigeratorRegister.showCalendar
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
      setSelectedToggle(current);

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
      dispatch(appActions.showAlertModal({ text }));
    },
    [dispatch]
  );

  const validate = useCallback(
    (nextRefrigeratorFood) => {
      const targetKeysWithStringValues = ['space', 'targetItem'];
      const invalidKeyWithStringValues = targetKeysWithStringValues.find(
        (key) => nextRefrigeratorFood[key].length === 0
      );
      if (invalidKeyWithStringValues) {
        showAlertModal(getMessage(invalidKeyWithStringValues));
        return false;
      }

      if (nextRefrigeratorFood['targetItem'].length > 11) {
        showAlertModal('10글자 이하로 입력해주세요.');
        return false;
      }

      const targetKeysWithNumberValues = ['count', 'priority'];
      const invalidKeyWithNumberValues = targetKeysWithNumberValues.find(
        (key) => nextRefrigeratorFood[key] === 0
      );
      if (invalidKeyWithNumberValues) {
        showAlertModal(getMessage(invalidKeyWithNumberValues));
        return false;
      }

      if (!showCalendar && nextRefrigeratorFood['expirationDay'] === 0) {
        showAlertModal(getMessage('expirationDay'));
        return false;
      }

      return true;
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

    if (!validate(nextRefrigeratorFood)) {
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
        text={PageNameByPathName[PAGE_PATH.REFRIGERATOR_REGISTER]}
        onClickSaveContents={handleSaveContents}
      />
      <Row text={TextMessages.SPACE} required={true}>
        <ChipList
          type={'space'}
          items={REFRIGERATOR_SPACES}
          selectedItem={space}
          onClickItem={handleClickSpace}
        />
      </Row>
      <Row text={TextMessages.TARGET_ITEM} required={true}>
        <TextField onChange={handleChangeTextField} />
      </Row>
      <Row text={TextMessages.COUNTER} required={true}>
        <Counter onClickItem={handleClickCount} />
      </Row>
      <Row text={TextMessages.PRIORITY} required={true}>
        <Rating onClickItem={handleClickPriority} />
      </Row>
      <div>
        <Toggle selectedItem={selectedToggle} onChange={handleChangeToggle} />
        {showCalendar ? (
          <Row text={TextMessages.ADDED_DATE} required={true}>
            <DatePicker onClickItem={handleClickDate} />
          </Row>
        ) : (
          <Row text={TextMessages.ADDED_EXPIRATION_DATE} required={true}>
            <ExpirationDay
              day={expirationDay}
              onChange={handleChangeExpirationDay}
            />
          </Row>
        )}
      </div>
    </Root>
  );
};

export default memo(RegisterRefrigerator);
