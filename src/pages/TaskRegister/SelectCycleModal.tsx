import { memo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { actions } from './stores/slice';
import { CALENDAR } from 'constants/index';

import styled from 'styled-components';
import { Dialog, DialogContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

interface SelectCycleModalProps {
  open: boolean;
  selectedItem: number;
  onSelectItem: (type: string, item: number) => void;
}

const CustomChip = styled.span`
  display: inline-block;
  width: 20px;
  height: 20px;

  margin: 3px;
  padding: 7px;
  font-size: 15px;
  border-radius: 15px;
  border: 1px #1976d2 solid;
  box-shadow: 0 1px 1px 0 rgb(0 0 0 / 10%);
`;

const Center = styled.span`
  display: flex;
  justify-content: center;
`;

const useStyles = makeStyles(() => ({
  selected: {
    backgroundColor: '#1976d2',
    color: 'white',
  },
}));

const SelectCycleModal = ({
  open,
  selectedItem,
  onSelectItem,
}: SelectCycleModalProps) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const values = CALENDAR.NUMBERS;

  const handleClose = useCallback(() => {
    dispatch(actions.setOpenSelectCycleModal(!open));
  }, [dispatch, open]);

  const handleClickItem = useCallback(
    (item) => () => {
      onSelectItem('value', item);
      handleClose();
    },
    [handleClose, onSelectItem]
  );

  const listItems = values.map((item, index) => {
    return (
      <CustomChip
        key={`${index}`}
        className={item === selectedItem ? classes.selected : ''}
        onClick={handleClickItem(item)}
      >
        <Center>{item}</Center>
      </CustomChip>
    );
  });

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>{listItems}</DialogContent>
    </Dialog>
  );
};

export default memo(SelectCycleModal);
