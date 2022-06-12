import { memo } from 'react';
import { HomeTask } from 'types';
import styled from 'styled-components';
import ListItem from './ListItem';
import Empty from 'components/Empty';

interface ListProps {
  items: HomeTask[] | null;
}

const Layout = styled.div`
  padding: 0.5rem;
  padding-top: 0;

  animation: fadeIn 0.4s ease-out;
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const Container = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const Content = styled.li`
  margin: 0;
  padding: 0;
  margin-bottom: 10px;
`;

const List = ({ items }: ListProps) => {
  return (
    <>
      {items !== null && items.length > 0 ? (
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
      ) : (
        <Empty text="조회된 데이터가 없어요 ㅠ.ㅠ" />
      )}
    </>
  );
};

export default memo(List);
