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
import AlertModal from 'components/AlertModal';

interface RegisterModalProps {
  open: boolean;
}

const RegisterModal = ({ open }: RegisterModalProps) => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const currentType = useSelector<RootState, string>(
    (state) => state.homeRegister.currentType
  );
  const openAlertModal = useSelector<RootState, boolean>(
    (state) => state.app.alertModal.open
  );
  const [alertMessage, setAlertMessage] = useState('');

  const showAlertModal = useCallback(
    (text) => {
      setAlertMessage(text);
      dispatch(appActions.setOpenAlertModal(!openAlertModal));
    },
    [dispatch, openAlertModal]
  );
  const handleClose = useCallback(() => {
    setText('');
    dispatch(actions.setOpenRegisterModal(!open));
  }, [dispatch, open]);

  const handleChangeTextField = useCallback((e) => {
    const current = e.target.value;
    setText(current);
  }, []);

  const handleChangeItem = useCallback(() => {
    handleClose();
  }, [handleClose]);

  const handleChangeTextItem = useCallback(() => {
    if (text === '') {
      showAlertModal('내용을 입력해주세요.');
      return;
    }

    dispatch(actions.addNextHomeItem({ currentType, text }));
    handleChangeItem();
  }, [currentType, dispatch, handleChangeItem, showAlertModal, text]);

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
        <Button onClick={handleChangeItem} color="primary">
          취소
        </Button>
        <Button
          onClick={handleChangeTextItem}
          color="primary"
          data-cy="confirm"
        >
          확인
        </Button>
      </DialogActions>
      <AlertModal open={openAlertModal} text={alertMessage} />
    </Dialog>
  );
};

export default memo(RegisterModal);
