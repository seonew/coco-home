import { memo, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import constants from '../constants/index';

interface HeaderProps {
  text: string;
}

const Root = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 8px 0;
  background-color: #fff;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  padding: 10px 0;
  font-size: 14px;
`;

const Left = styled.div`
  flex: 0 0 20px;
  padding: 20px;
`;

const Right = styled.div`
  flex: 0 0 20px;
  padding: 20px;
`;

const Center = styled.div`
  flex-grow: 1;
  font-size: 18px;
  text-align: center;
`;

const Header = ({ text }: HeaderProps) => {
  const history = useHistory();

  const handleClickBack = () => {
    history.goBack();
  };

  const handleClickMypage = useCallback(() => {
    history.push(constants.PAGE_PATH.MYPAGE);
  }, [history]);

  return (
    <Root>
      <Container data-cy="header">
        <Left data-cy="back">
          <FontAwesomeIcon
            icon={faChevronLeft}
            size="lg"
            onClick={handleClickBack}
          />
        </Left>
        <Center>{text}</Center>
        <Right data-cy="home">
          <FontAwesomeIcon
            icon={faUserAlt}
            size="lg"
            onClick={handleClickMypage}
          />
        </Right>
      </Container>
    </Root>
  );
};

export default memo(Header);
