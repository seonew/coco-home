import { memo, ReactNode } from 'react';
import styled from 'styled-components';

interface ContentListProps {
  items: unknown[];
  render: (item: unknown) => ReactNode;
  keyProp: string;
}

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 4px 26px;
  border-radius: 22px;
  border: 0.5px solid #dcdcde;
  background: #fff;
`;

const ListItem = styled.li`
  position: relative;
  min-height: 22px;
  padding: 12px 0;
  font-size: 0;
  &.item {
    border-top: 1px solid rgba(0, 0, 0, 0.05);
  }
  :not(:first-child) {
    border-top: 1px solid rgba(0, 0, 0, 0.05);
  }
`;

const ContentList = ({ items, render, keyProp }: ContentListProps) => {
  return (
    <List>
      {items?.map((item) => {
        return <ListItem key={(item as any)[keyProp]}>{render(item)}</ListItem>;
      })}
    </List>
  );
};
export default memo(ContentList);
