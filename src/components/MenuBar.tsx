import { memo, useCallback } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faUtensilSpoon,
  faCalendarAlt,
} from '@fortawesome/free-solid-svg-icons';
import { PAGE_PATH } from '../constants/index';

const Root = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;

  width: 100%;
  z-index: 100;
  height: 60px;
  background-color: #fff;
  border-top: 1px solid var(--themeColorLN1);
  font-size: 12px;
`;

const TabContainer = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
`;

const Tab = styled.li`
  flex: 1 1 auto;
  text-align: center;
`;

const Button = styled.a`
  display: block;
  padding: 18px 0;
`;

const MenuBar = () => {
  const history = useHistory();
  const handleClickItem = useCallback(
    (url) => () => {
      history.push(url);
    },
    [history]
  );

  return (
    <Root>
      <TabContainer>
        <Tab>
          <Button onClick={handleClickItem(PAGE_PATH.MAIN)}>
            <FontAwesomeIcon icon={faHome} size="2x" />
          </Button>
        </Tab>
        <Tab>
          <Button onClick={handleClickItem(PAGE_PATH.HOME_TASK_LIST)}>
            <FontAwesomeIcon icon={faCalendarAlt} size="2x" />
          </Button>
        </Tab>
        <Tab>
          <Button onClick={handleClickItem(PAGE_PATH.REFRIGERATOR_LIST)}>
            <FontAwesomeIcon icon={faUtensilSpoon} size="2x" />
          </Button>
        </Tab>
      </TabContainer>
    </Root>
  );
};

export default memo(MenuBar);
