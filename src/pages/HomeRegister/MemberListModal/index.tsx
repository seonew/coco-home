import { useCallback, memo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'stores';
import { actions } from '../stores/slice';
import { actions as appActions } from 'stores/slice';
import { HomeMember } from 'types';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import MemberList from './MemberList';
import Search from 'components/Search';

interface MemberListModalProps {
  open: boolean;
}

const MemberListModal = ({ open }: MemberListModalProps) => {
  const dispatch = useDispatch();
  const searchMembers = useSelector<RootState, HomeMember[] | null>(
    (state) => state.homeRegister.searchMembers
  );
  const members = useSelector<RootState, HomeMember[]>(
    (state) => state.homeRegister.nextHome.members
  );
  const [nextMembers, setNextMembers] = useState<HomeMember[]>([]);

  const handleClose = useCallback(() => {
    dispatch(actions.setOpenMemberListModal(!open));
  }, [dispatch, open]);

  const showAlertModal = useCallback(
    (text) => {
      dispatch(appActions.showAlertModal({ text }));
    },
    [dispatch]
  );

  const handleClickItem = useCallback(() => {
    if (nextMembers.length === 0) {
      showAlertModal('추가할 사용자를 선택해 주세요.');
      return;
    }

    const result = nextMembers.reduce((result: HomeMember[], member) => {
      const { name, type, userId, imgUrl } = member;

      const foundMember = members.find((current) => current.userId === userId);
      if (foundMember) {
        showAlertModal('이미 추가된 사용자 입니다.');
      } else {
        result.push({ name, type, userId, imgUrl });
      }

      return result;
    }, []);

    dispatch(actions.addHomeMembers(result));

    setNextMembers([]);
    handleClose();
  }, [dispatch, handleClose, members, nextMembers, showAlertModal]);

  const handleClickSearchItem = useCallback(
    (text) => {
      dispatch(actions.searchMemberUser(text));
    },
    [dispatch]
  );

  const handleClickMember = useCallback(
    (item, checked) => {
      if (checked) {
        setNextMembers([...nextMembers, item]);
      } else {
        const nextItems = nextMembers.filter(
          (element) => element.userId !== item.userId
        );
        setNextMembers(nextItems);
      }
    },
    [nextMembers]
  );

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">
        추가할 사용자를 선택해주세요.
      </DialogTitle>
      <Search
        onClickItem={handleClickSearchItem}
        placeholder={'사용자 이름을 입력해주세요.'}
      />
      <DialogContent>
        <MemberList members={searchMembers} onClickItem={handleClickMember} />
      </DialogContent>
      {searchMembers ? (
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            취소
          </Button>
          <Button onClick={handleClickItem} color="primary" data-cy="confirm">
            확인
          </Button>
        </DialogActions>
      ) : (
        ''
      )}
    </Dialog>
  );
};

export default memo(MemberListModal);
