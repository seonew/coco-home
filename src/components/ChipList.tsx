import { memo, useCallback } from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/styles';

interface ChipListProps {
  type: string;
  items: string[];
  selectedItem?: string;
  onClickItem: (type: string, item: string) => void;
}

const Root = styled.div`
  margin: 5px 0;
`;

const CustomChip = styled.span`
  display: inline-block;
  margin: 3px;
  padding: 7px;
  font-size: 15px;
  border-radius: 15px;
  border: 1px #1976d2 solid;
  box-shadow: 0 1px 1px 0 rgb(0 0 0 / 10%);
`;

const useStyles = makeStyles(() => ({
  selected: {
    backgroundColor: '#1976d2',
    color: 'white',
  },
}));

const ChipList = ({
  type,
  items,
  selectedItem,
  onClickItem,
}: ChipListProps) => {
  const classes = useStyles();

  const handleClickItem = useCallback(
    (item) => () => {
      onClickItem(type, item);
    },
    [onClickItem, type]
  );

  const listItems = items.map((item, index) => {
    return (
      <CustomChip
        key={`${index}`}
        className={item === selectedItem ? classes.selected : ''}
        onClick={handleClickItem(item)}
      >
        {item}
      </CustomChip>
    );
  });

  return <Root>{items.length > 0 && listItems}</Root>;
};

export default memo(ChipList);
