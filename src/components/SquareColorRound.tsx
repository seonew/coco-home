import { memo } from 'react';
import styled from 'styled-components';

interface SquareColorRoundProps {
  text: string;
  color: string;
  onClickItem: (text: string) => void;
}

const Root = styled.div<{ color: string }>`
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  font-weight: 600;
  background: ${(props) => props.color || 'yellow'};
`;

const SquareColorRound = ({
  text,
  color,
  onClickItem,
}: SquareColorRoundProps) => {
  const handleClickItem = () => {
    onClickItem(text);
  };

  return (
    <Root color={color} onClick={handleClickItem}>
      {text}
    </Root>
  );
};

export default memo(SquareColorRound);
