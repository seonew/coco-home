import { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'stores';
import { actions as appActions } from 'stores/slice';
import { User } from 'types';

import styled from 'styled-components';
import { Avatar } from '@material-ui/core';

const UserInfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 20px;
  padding-bottom: 40px;
  position: relative;
  padding: 0.5rem 18px;
  border-bottom: 2px #f4f4f4 solid;

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

const UserInfoDiv = styled.div`
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
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  padding-left: 2px;
  font-weight: 700;
`;

const ItemSubText = styled.span`
  line-height: 25px;
  color: #1e1e23;
  font-weight: 400;
  letter-spacing: -1.22px;
`;

const ButtonToLogout = styled.button`
  color: #4e5968;
  white-space: nowrap;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  background-color: #f2f4f6;
  border: 0 solid transparent;
  line-height: 18px;
  padding: 4px 8px;
  border-radius: 8px;
`;

const UserInfo = () => {
  const user = useSelector<RootState, User>((state) => state.app.user);
  const open = useSelector<RootState, boolean>(
    (state) => state.app.confirmModal.open
  );
  const dispatch = useDispatch();

  const handleClickItem = useCallback(() => {
    dispatch(
      appActions.setConfirmModal({
        open: !open,
        title: '로그아웃 하시겠습니까?',
        confirmAction: appActions.logout(),
      })
    );
  }, [dispatch, open]);

  return (
    <>
      <UserInfoContainer>
        <UserInfoDiv>
          <ListItemAvatar>
            <Avatar
              alt={user.name}
              src={user.imgUrl}
              sx={{ width: 26, height: 26 }}
            />
          </ListItemAvatar>
          <ListItemText>
            <ItemText>{user.name}</ItemText>
            <ItemSubText> 님 환영합니다.</ItemSubText>
          </ListItemText>
        </UserInfoDiv>
        <div>
          <ButtonToLogout onClick={handleClickItem}>로그아웃</ButtonToLogout>
        </div>
      </UserInfoContainer>
    </>
  );
};

export default memo(UserInfo);
