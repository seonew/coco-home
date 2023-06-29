import { memo, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'stores';
import { actions } from './stores/slice';
import { actions as appActions } from 'stores/slice';

import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';

interface RegisterModalProps {
  open: boolean;
}

const RegisterModal = ({ open }: RegisterModalProps) => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const currentType = useSelector<RootState, string>(
    (state) => state.homeRegister.currentType
  );

  const handleClose = useCallback(() => {
    setText('');
    dispatch(actions.setOpenRegisterModal(!open));
  }, [dispatch, open]);

  const handleChangeTextField = useCallback((e) => {
    const current = e.target.value;
    setText(current);
  }, []);

  const handleClickItem = useCallback(() => {
    handleClose();
  }, [handleClose]);

  const handleClickTextItem = useCallback(() => {
    if (text === '') {
      dispatch(appActions.showAlertModal({ text: '내용을 입력해주세요.' }));
      return;
    }

    dispatch(actions.addNextHomeItem({ currentType, text }));
    handleClickItem();
  }, [currentType, dispatch, handleClickItem, text]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      data-cy="registerModal"
    >
      <DialogTitle id="form-dialog-title">
        추가할 내용을 입력해주세요.
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          type="text"
          fullWidth
          onChange={handleChangeTextField}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClickItem} color="primary">
          취소
        </Button>
        <Button onClick={handleClickTextItem} color="primary" data-cy="confirm">
          확인
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default memo(RegisterModal);
