import { memo, ReactNode } from 'react';
import { RefrigeratorFood } from 'types';
import styled from 'styled-components';
import ListItem from './ListItem';
import Empty from 'components/Empty';

interface ListProps {
  items: RefrigeratorFood[] | null;
  children?: ReactNode;
}

const Root = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Layout = styled.div`
  padding: 0 0.5rem;
`;

const Container = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  padding-bottom: 55px;
`;

const Content = styled.li`
  margin: 0;
  padding: 0;
  :not(:first-child) {
    margin-top: 10px;
  }
`;

const List = ({ items, children }: ListProps) => {
  return (
    <Root>
      {children}
      {items !== null && items.length > 0 ? (
        <>
          <Layout>
            <Container>
              {items.map((item) => {
                return (
                  <Content key={item.id}>
                    <ListItem item={item} />
                  </Content>
                );
              })}
            </Container>
          </Layout>
        </>
      ) : items === null ? (
        <Empty
          text="등록된 데이터가 없어요 ㅠ.ㅠ"
          description="아래 버튼을 눌러 추가해 주세요 :)"
        />
      ) : items.length === 0 ? (
        <Empty
          text="조회된 데이터가 없어요 ㅠ.ㅠ"
          description="아래 버튼을 눌러 추가해 주세요 :)"
        />
      ) : (
        ''
      )}
    </Root>
  );
};

export default memo(List);
