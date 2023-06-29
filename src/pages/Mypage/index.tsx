import { memo, useCallback, useEffect, CSSProperties } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from './stores/slice';
import { actions as appActions } from 'stores/slice';
import { RootState } from 'stores';
import { HomeListItem } from 'types';

import { makeStyles } from '@material-ui/styles';
import styled from 'styled-components';
import FloatingButton from 'components/FloatingButton';
import Label from 'components/Label';
import AddIcon from '@material-ui/icons/Add';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faCog } from '@fortawesome/free-solid-svg-icons';
import Skeleton from './Skeleton';
import EmptyHome from '../HomeInfo/EmptyHome';
import UserInfo from './UserInfo';
import { PAGE_PATH, TextType, pageNameByPathName } from 'constants/index';
import Header from 'components/Header';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  min-height: 100%;
`;

const HomeListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding-top: 1rem;
  position: relative;

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

const Card = styled.div`
  position: relative;
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  border-radius: 19px;
  font-weight: 400;
  background: ${(props) => props.color || 'yellow'};
`;

const SelectedCard = styled.div<{ selected: boolean }>`
  position: relative;
  width: 100%;
  height: 100px;
  border-radius: 21px;
  margin: 0 1rem 0.7rem;
  ${(props) =>
    props.selected &&
    'border: 2px rgb(25 118 210 / 75%) solid; font-weight: 700;'};
`;

const DisplayName = styled.div`
  flex: 5 0 190px;
  margin-left: 12px;
`;

const ButtonContainer = styled.div`
  flex: 1 0 50px;
  margin: 0 2px;
  text-align: right;
`;

const Button = styled.span`
  padding: 10px 0;
  padding-right: 0.7rem;
`;

const floatingButtonStyle: CSSProperties = {
  position: 'fixed',
  right: 15,
  bottom: 0,
  height: 110,
};

const useStyles = makeStyles(() => ({
  selected: {
    fontWeight: 700,
  },
}));

const Mypage = () => {
  const homeList = useSelector<RootState, HomeListItem[] | null>(
    (state) => state.mypage.homeList
  );
  const homeId = useSelector<RootState, string>(
    (state) => state.app.currentHome.id
  );
  const loading = useSelector<RootState, boolean>((state) => state.app.loading);
  const initialized = useSelector<RootState, boolean>(
    (state) => state.mypage.initialized
  );

  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(actions.fetchHomeList());
  }, [dispatch]);

  const handleSetHomeIdAndChangeModal = useCallback(
    (homeId) => () => {
      dispatch(
        appActions.showConfirmModal({
          title: '선택한 홈을 삭제하시겠습니까?',
          confirmAction: actions.deleteHome({
            homeId: homeId,
          }),
        })
      );
    },
    [dispatch]
  );

  const handleClickHomeName = useCallback(
    (homeId) => () => {
      dispatch(actions.selectHome(homeId));
    },
    [dispatch]
  );

  const handleClickButtonToEdit = useCallback(
    (homeId) => () => {
      dispatch(actions.goHomeRegisterPageToEdit(homeId));
    },
    [dispatch]
  );

  const handleClickButtonToCreate = useCallback(() => {
    dispatch(actions.goHomeRegisterPageToCreate());
  }, [dispatch]);

  return (
    <Root>
      <Header text={pageNameByPathName[PAGE_PATH.MYPAGE]} />
      {initialized && loading ? (
        <Skeleton />
      ) : (
        <>
          <UserInfo />
          {(homeList?.length as number) > 0 ? (
            <>
              <HomeListContainer data-cy="myHomeList">
                {homeList?.map((item) => {
                  return (
                    <SelectedCard
                      selected={item.homeId === homeId}
                      key={`${item.homeId}`}
                    >
                      <Card
                        className={
                          item.homeId === homeId ? classes.selected : ''
                        }
                        color="#f2f4f6"
                      >
                        <DisplayName onClick={handleClickHomeName(item.homeId)}>
                          {item.displayName}
                        </DisplayName>
                        <ButtonContainer>
                          <Button
                            onClick={handleClickButtonToEdit(item.homeId)}
                          >
                            <FontAwesomeIcon icon={faCog} size="1x" />
                          </Button>
                          {item.memberType === 'owner' && (
                            <Button
                              onClick={handleSetHomeIdAndChangeModal(
                                item.homeId
                              )}
                            >
                              <FontAwesomeIcon icon={faTrashAlt} size="1x" />
                            </Button>
                          )}
                        </ButtonContainer>
                        {item.memberType === 'owner' && (
                          <Label text={item.memberType} />
                        )}
                      </Card>
                    </SelectedCard>
                  );
                })}
              </HomeListContainer>
              <FloatingButton
                color={'primary'}
                title={'add'}
                style={floatingButtonStyle}
                onClick={handleClickButtonToCreate}
              >
                <AddIcon />
              </FloatingButton>
            </>
          ) : (
            <EmptyHome textType={TextType.REGISTER} />
          )}
        </>
      )}
    </Root>
  );
};

export default memo(Mypage);
