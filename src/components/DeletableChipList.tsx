import { memo, useCallback } from 'react';
import styled from 'styled-components';
import { Chip } from '@material-ui/core';

interface DeletableChipListProps {
  type: string;
  items: string[];
  onClickDeleteItem: (type: string, item: string) => void;
}

const Root = styled.div`
  margin: 5px 0;
`;

const DeletableChipList = ({
  type,
  items,
  onClickDeleteItem,
}: DeletableChipListProps) => {
  const handleClick = useCallback(
    (item) => () => {
      onClickDeleteItem(type, item);
    },
    [onClickDeleteItem, type]
  );

  const listItems = items.map((item, index) => {
    return (
      <Chip
        style={{ margin: '3px' }}
        key={`${index}`}
        label={item}
        color="primary"
        variant="outlined"
        onDelete={handleClick(item)}
      />
    );
  });

  return (
    <Root className="inline">
      {items ? <>{listItems}</> : '등록된 데이터가 없습니다.'}
    </Root>
  );
};

export default memo(DeletableChipList);
