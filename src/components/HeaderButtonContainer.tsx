import { memo, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faCheck } from '@fortawesome/free-solid-svg-icons';

interface HeaderButtonContainerProps {
  text: string;
  onClickSaveContents: () => void;
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
  padding: 10px 20px;
  font-size: 14px;
`;

const Left = styled.div`
  flex: 0 0 20px;
`;

const Right = styled.div`
  flex: 0 0 20px;
`;

const Center = styled.div`
  flex-grow: 1;
  font-size: 18px;
  text-align: center;
`;

const HeaderButtonContainer = ({
  text,
  onClickSaveContents,
}: HeaderButtonContainerProps) => {
  const history = useHistory();

  const handleClickBack = useCallback(() => {
    history.goBack();
  }, [history]);

  const handleSaveContents = useCallback(() => {
    onClickSaveContents();
  }, [onClickSaveContents]);

  return (
    <Root>
      <Container>
        <Left>
          <FontAwesomeIcon icon={faXmark} size="lg" onClick={handleClickBack} />
        </Left>
        <Center>{text}</Center>
        <Right>
          <FontAwesomeIcon
            icon={faCheck}
            size="lg"
            onClick={handleSaveContents}
          />
        </Right>
      </Container>
    </Root>
  );
};

export default memo(HeaderButtonContainer);
