import {
  memo,
  useEffect,
  useCallback,
  CSSProperties,
  useState,
  useMemo,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RootState } from 'stores';
import { actions } from './stores/slice';
import { HomeListItem, RefrigeratorFood } from 'types';
import { PAGE_PATH, TextType, PageNameByPathName } from 'constants/index';

import styled from 'styled-components';
import List from './List';
import FloatingButton from 'components/FloatingButton';
import AddIcon from '@material-ui/icons/Add';
import EmptyHome from 'pages/HomeInfo/EmptyHome';
import Toggle from './Toggle';
import Skeleton from './Skeleton';
import Header from 'components/Header';

const Root = styled.div`
  height: 100%;
`;

const Container = styled.div`
  height: 100%;
  animation: fadeIn 0.4s ease-out;
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const floatingButtonStyle: CSSProperties = {
  position: 'fixed',
  right: 15,
  bottom: 0,
  height: 110,
};

const RegisterRefrigeratorList = () => {
  const currentRefrigeratorFoods = useSelector<
    RootState,
    RefrigeratorFood[] | null
  >((state) => state.refrigeratorList.currentRefrigeratorFoods);
  const homeId = useSelector<RootState, string>(
    (state) => state.app.currentHome.id
  );
  const loading = useSelector<RootState, boolean>((state) => state.app.loading);
  const homeList = useSelector<RootState, HomeListItem[] | null>(
    (state) => state.mypage.homeList
  );
  const [filterType, setFilterType] = useState('normal');

  const dispatch = useDispatch();
  const history = useHistory();

  const handleClickButton = useCallback(
    (url) => () => {
      history.push(url);
    },
    [history]
  );

  const handleChangeFilterType = useCallback((type) => {
    setFilterType(type);
  }, []);

  const nextRefrigeratorFoods = useMemo(() => {
    let result;
    if (filterType === 'dday') {
      result = currentRefrigeratorFoods?.filter((item) => {
        return item.expirationDay;
      });
    } else if (filterType === 'calendar') {
      result = currentRefrigeratorFoods?.filter((item) => {
        return item.date;
      });
    } else if (filterType === 'normal') {
      result = currentRefrigeratorFoods;
    }
    return result;
  }, [currentRefrigeratorFoods, filterType]);

  useEffect(() => {
    if (homeId !== '') {
      dispatch(actions.fetchRefrigeratorFoods());
    }
  }, [dispatch, homeId]);

  return (
    <Root>
      <Header text={PageNameByPathName[PAGE_PATH.REFRIGERATOR_LIST]} />
      {homeId ? (
        <Container>
          {loading ? (
            <Skeleton />
          ) : (
            <List items={nextRefrigeratorFoods ?? currentRefrigeratorFoods}>
              <Toggle
                selectedItem={filterType}
                onChange={handleChangeFilterType}
              />
            </List>
          )}
          <FloatingButton
            color={'primary'}
            title={'add'}
            style={floatingButtonStyle}
            onClick={handleClickButton(PAGE_PATH.REFRIGERATOR_REGISTER)}
          >
            <AddIcon />
          </FloatingButton>
        </Container>
      ) : (homeList?.length as number) > 0 ? (
        <EmptyHome textType={TextType.SELECT} />
      ) : (
        <EmptyHome textType={TextType.REGISTER} />
      )}
    </Root>
  );
};

export default memo(RegisterRefrigeratorList);
