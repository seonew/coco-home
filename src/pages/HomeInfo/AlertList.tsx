import { useCallback } from 'react';
import styled from 'styled-components';
import { HomeAlert } from 'types';
import RoundedRowItem from 'components/RoundedRowItem';
import ContentList from 'components/ContentList';

interface AlertListProps {
  items: HomeAlert[] | null;
  onClick?: (item: HomeAlert) => void;
}

const Root = styled.div``;

const Container = styled.div`
  box-sizing: border-box;
  min-height: 100%;
`;

const Contents = styled.div`
  font-size: 14px;
`;

const AlertList = ({ items, onClick }: AlertListProps) => {
  const handleClickItem = useCallback(
    (item) => () => {
      if (onClick !== undefined) {
        onClick(item);
      }
    },
    [onClick]
  );

  const renderAlertItem = useCallback(
    (item) => {
      let dateText = `다음 안내까지 ${item.dday} 일 남았습니다.`;
      if (item.dday === 0) {
        dateText = `오늘은 ${item.work} 하는 날입니다.`;
      }

      return (
        <Contents onClick={handleClickItem(item)}>
          <span>{item.member.name}&nbsp;</span>
          <span>{item.space}&nbsp;</span>
          {item.targetItem !== undefined ? (
            <span>{item.targetItem}&nbsp;</span>
          ) : (
            ''
          )}
          <span>{item.work}</span>
          <div>{dateText}</div>
        </Contents>
      );
    },
    [handleClickItem]
  );

  const emptyItems = (
    <RoundedRowItem>
      <Contents>7일 이내 알림 예정이 없습니다.</Contents>
    </RoundedRowItem>
  );

  return (
    <Root>
      <p>알림 리스트</p>
      <Container>
        {items !== null && (items?.length as number) > 0 ? (
          <ContentList items={items} render={renderAlertItem} keyProp="id" />
        ) : (
          emptyItems
        )}
      </Container>
    </Root>
  );
};

export default AlertList;
