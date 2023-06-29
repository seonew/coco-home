import { CSSProperties, memo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { actions as mypageActions } from '../Mypage/stores/slice';
import { PAGE_PATH, TextType } from 'constants/index';
import styled from 'styled-components';

import Empty from 'components/Empty';
import { Button } from '@mui/material';

interface EmptyHomeProps {
  textType: TextType;
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  height: 100%;
  background-color: #fff;
`;

const buttonStyle: CSSProperties = { width: '30%', marginTop: '15px' };

const EmptyHome = ({ textType }: EmptyHomeProps) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleClickButtonToSelect = useCallback(() => {
    history.push(PAGE_PATH.MYPAGE);
  }, [history]);

  const handleClickButtonToCreate = useCallback(() => {
    dispatch(mypageActions.goHomeRegisterPageToCreate());
  }, [dispatch]);

  const displayText = textType === TextType.SELECT ? '선택' : '등록';
  const text = `${displayText}된 우리집이 없어요.`;
  const description = `아래 버튼을 눌러서 우리집을 ${displayText}해 주세요 :)`;

  return (
    <Root>
      <Empty text={text} description={description}>
        {textType === TextType.SELECT ? (
          <Button
            variant="outlined"
            style={buttonStyle}
            onClick={handleClickButtonToSelect}
          >
            선택하기
          </Button>
        ) : (
          <Button
            variant="outlined"
            style={buttonStyle}
            onClick={handleClickButtonToCreate}
          >
            등록하기
          </Button>
        )}
      </Empty>
    </Root>
  );
};

export default memo(EmptyHome);
