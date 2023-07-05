import { memo, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from 'stores';
import { actions as appActions } from '../../stores/slice';
import { actions as taskRegisterActions } from '../TaskRegister/stores/slice';
import { Home, HomeAlert, HomeMember } from 'types';

import { Avatar } from '@material-ui/core';
import RoundedRowItem from 'components/RoundedRowItem';
import ContentList from 'components/ContentList';
import AlertList from './AlertList';
import Skeleton from './Skeleton';

const Root = styled.div`
  min-height: 100%;
  background-color: #fff;
`;

const Container = styled.div`
  padding-top: 20px;
  padding-bottom: 40px;
  position: relative;
  padding: 1rem 18px;

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

const ContentContainer = styled.div`
  margin: 10px 0;
`;

const UserInfo = styled.div`
  position: relative;
  padding-left: 34px;
`;

const ListItemAvatar = styled.div`
  overflow: hidden;
  position: absolute;
  top: 50%;
  left: 0;
  width: 26px;
  height: 26px;
  margin-top: -13px;
  border-radius: 50%;
  background: #d8d8d8;
`;

const ListItemText = styled.div`
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  max-width: 100%;
  vertical-align: top;
  padding: 4px 0 3px;
`;

const ItemText = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 1rem;
  line-height: 1.3572rem;
  color: #292a2e;
`;

const Label = styled.span`
  min-width: 15px;
  padding: 1px 3px;
  font-size: 8px;
  font-weight: 600;
  line-height: 18px;
  color: #1976d2;
  border: 1px #1976d2 solid;
  border-radius: 20px;
  background-color: #fff;
  margin-left: 5px;
`;

const HomeInfo = () => {
  const currentHome = useSelector<RootState, Home>(
    (state) => state.app.currentHome
  );
  const members: HomeMember[] = currentHome?.members;
  const refrigeratorSummary = useSelector<RootState, Record<string, string>[]>(
    (state) => state.app.refrigeratorSummary
  );
  const alertList = useSelector<RootState, HomeAlert[] | null>(
    (state) => state.app.alertList
  );
  const loading = useSelector<RootState, boolean>((state) => state.app.loading);
  const init = useSelector<RootState, boolean>((state) => state.app.init);

  const dispatch = useDispatch();

  const handleClickAlertItem = useCallback(
    (item) => {
      dispatch(taskRegisterActions.goRegisterPageToRepeat(item));
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(appActions.fetchMainHomeInfo());
  }, [dispatch]);

  const renderUserInfo = useCallback((member) => {
    return (
      <UserInfo>
        <ListItemAvatar>
          <Avatar
            alt={member.name}
            src={member.imgUrl}
            sx={{ width: 26, height: 26 }}
          />
        </ListItemAvatar>
        <ListItemText id={member.userId}>
          <ItemText>{member.name}</ItemText>
          {member.type === 'owner' && <Label>{member.type}</Label>}
        </ListItemText>
      </UserInfo>
    );
  }, []);

  return (
    <Root>
      {init && loading ? (
        <Skeleton />
      ) : (
        <Container>
          <RoundedRowItem>
            <strong>{currentHome?.displayName}</strong>
          </RoundedRowItem>

          <ContentContainer>
            <ContentList
              items={members}
              render={renderUserInfo}
              keyProp="userId"
            />
          </ContentContainer>

          {refrigeratorSummary.length > 0 ? (
            <RoundedRowItem>
              {refrigeratorSummary.map((element, index) => {
                return (
                  <div key={index}>
                    <span className="mr5">
                      {element._id} {element.count}개
                    </span>
                  </div>
                );
              })}
            </RoundedRowItem>
          ) : (
            ''
          )}

          <AlertList items={alertList} onClick={handleClickAlertItem} />
        </Container>
      )}
    </Root>
  );
};

export default memo(HomeInfo);
