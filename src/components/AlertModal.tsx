import { memo, useCallback } from 'react';
import { Button, Dialog, DialogActions, DialogTitle } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { actions } from 'stores/slice';

interface AlertModalProps {
  open: boolean;
  text: string;
}

const AlertModal = ({ open, text }: AlertModalProps) => {
  const dispatch = useDispatch();

  const handleClose = useCallback(() => {
    dispatch(actions.setOpenAlertModal(!open));
  }, [dispatch, open]);

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{text}</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>확인</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default memo(AlertModal);
