import { memo } from 'react';
import styled from 'styled-components';

import { makeStyles } from '@material-ui/styles';
import { Chip } from '@material-ui/core';

interface DeletableChipListProps {
  type: string;
  items: string[];
  onClickDeleteItem: (type: string, item: string) => void;
}

const Root = styled.div`
  margin: 5px 0;
`;

const useStyles = makeStyles(() => ({
  selected: {
    backgroundColor: '#1976d2',
    color: 'white',
  },
  remove: {
    display: 'inline',
  },
}));

const DeletableChipList = ({
  type,
  items,
  onClickDeleteItem,
}: DeletableChipListProps) => {
  const classes = useStyles();

  const ListItems = items.map((item, index) => {
    return (
      <Chip
        style={{ margin: '3px' }}
        key={`${index}`}
        label={item}
        color="primary"
        variant="outlined"
        onDelete={() => {
          onClickDeleteItem(type, item);
        }}
      />
    );
  });

  return (
    <Root className={classes.remove}>
      {items ? <>{ListItems}</> : '등록된 데이터가 없습니다.'}
    </Root>
  );
};

export default memo(DeletableChipList);
