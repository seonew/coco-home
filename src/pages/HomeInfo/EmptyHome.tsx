import { CSSProperties, memo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { actions as mypageActions } from '../Mypage/stores/slice';
import styled from 'styled-components';

import AddIcon from '@material-ui/icons/Add';
import FloatingButton from 'components/FloatingButton';
import Empty from 'components/Empty';

interface EmptyHomeProps {
  displayText: string;
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  height: 100%;
  background-color: #fff;
`;

const floatingButtonStyle: CSSProperties = {
  position: 'fixed',
  right: 15,
  bottom: 0,
  height: 110,
};

const EmptyHome = ({ displayText }: EmptyHomeProps) => {
  const dispatch = useDispatch();

  const handleClickButtonToCreate = useCallback(() => {
    dispatch(mypageActions.goHomeRegisterPageToCreate());
  }, [dispatch]);
  const selectedHome = displayText === '선택';

  const text = displayText + '된 우리집이 없어요.';
  const description =
    '오른쪽 ' +
    (selectedHome ? '상단' : '하단') +
    ' 버튼을 눌러서 우리집을 ' +
    displayText +
    '해 주세요 :)';

  return (
    <Root>
      <Empty text={text} description={description} />
      {selectedHome ? (
        ''
      ) : (
        <FloatingButton
          color={'primary'}
          title={'add'}
          style={floatingButtonStyle}
          onClick={handleClickButtonToCreate}
        >
          <AddIcon />
        </FloatingButton>
      )}
    </Root>
  );
};

export default memo(EmptyHome);
