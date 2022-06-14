import { memo, useCallback } from 'react';
import { Button, Dialog, DialogActions, DialogTitle } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'stores';
import { actions } from 'stores/slice';
import { Alert } from 'types';

const AlertModal = () => {
  const dispatch = useDispatch();
  const { open, text } = useSelector<RootState, Alert>(
    (state) => state.app.alertModal
  );

  const handleClose = useCallback(() => {
    dispatch(actions.setAlertModal({ open: false, text: '' }));
  }, [dispatch]);

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
