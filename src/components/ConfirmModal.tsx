import { memo, useCallback } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from 'stores/slice';
import { RootState } from 'stores';
import { Confirm } from 'types';

const ConfirmModal = () => {
  const dispatch = useDispatch();
  const { open, title, text, confirmAction } = useSelector<RootState, Confirm>(
    (state) => state.app.confirmModal
  );

  const handleConfirm = useCallback(() => {
    dispatch(confirmAction);
  }, [confirmAction, dispatch]);

  const handleClose = useCallback(() => {
    dispatch(
      actions.setConfirmModal({ open: false, title: '', confirmAction: null })
    );
  }, [dispatch]);

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        {text ? (
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {text}
            </DialogContentText>
          </DialogContent>
        ) : (
          ''
        )}
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          <Button onClick={handleConfirm}>확인</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default memo(ConfirmModal);
