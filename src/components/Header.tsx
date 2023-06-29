import { memo, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { PAGE_PATH } from '../constants/index';

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
    history.push(PAGE_PATH.MYPAGE);
  }, [history]);

  return (
    <Root>
      <Container data-cy="header">
        <Left data-cy="back" onClick={handleClickBack}>
          <FontAwesomeIcon icon={faChevronLeft} size="lg" />
        </Left>
        <Center>{text}</Center>
        <Right data-cy="home" onClick={handleClickMypage}>
          <FontAwesomeIcon icon={faUserAlt} size="lg" />
        </Right>
      </Container>
    </Root>
  );
};

export default memo(Header);
