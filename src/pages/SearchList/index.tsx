import { memo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'stores';
import { HomeTask } from 'types';
import { PAGE_PATH, pageNameByPathName } from 'constants/index';

import styled from 'styled-components';
import List from './List';
import Header from 'components/Header';

const Root = styled.div`
  height: 100%;
  background-color: #f4f4f4;
`;

const SearchList = () => {
  const searchList = useSelector<RootState, HomeTask[] | null>(
    (state) => state.taskList.searchList
  );

  return (
    <Root>
      <Header text={pageNameByPathName[PAGE_PATH.SEARCH_HOME_TASK_LIST]} />
      <List items={searchList} />
    </Root>
  );
};

export default memo(SearchList);
