import { memo, useCallback } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faUtensilSpoon,
  faCalendarAlt,
} from '@fortawesome/free-solid-svg-icons';
import constants from '../constants/index';

const Root = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;

  z-index: 100;
  height: 60px;
  background-color: #fff;
  border-top: 1px solid var(--themeColorLN1);
  width: 100%;
`;

const TabContainer = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  padding: 0;
  width: 100%;
`;

const Tab = styled.li`
  flex: 1 1 auto;
  text-align: center;
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
          <FontAwesomeIcon
            icon={faHome}
            size="lg"
            onClick={handleClickItem(constants.PAGE_PATH.MAIN)}
          />
        </Tab>
        <Tab>
          <FontAwesomeIcon
            icon={faCalendarAlt}
            size="lg"
            onClick={handleClickItem(constants.PAGE_PATH.HOME_TASK_LIST)}
          />
        </Tab>
        <Tab>
          <FontAwesomeIcon
            icon={faUtensilSpoon}
            size="lg"
            onClick={handleClickItem(constants.PAGE_PATH.REFRIGERATOR_LIST)}
          />
        </Tab>
      </TabContainer>
    </Root>
  );
};

export default memo(MenuBar);
