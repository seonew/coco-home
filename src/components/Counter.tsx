import { memo, useCallback, useState } from 'react';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

interface CounterProps {
  onClickItem: (number: number) => void;
}

const Root = styled.div`
  margin: 8px 0;
`;

const Span = styled.span`
  padding: 0 16px;
`;

const Counter = ({ onClickItem }: CounterProps) => {
  const [number, setNumber] = useState(0);

  const handleClickDecrease = useCallback(() => {
    const next = number - 1;
    if (next < 0) {
      return;
    }

    setNumber(next);
    onClickItem(next);
  }, [number, onClickItem]);

  const handleClickIncrease = useCallback(() => {
    const next = number + 1;

    setNumber(next);
    onClickItem(next);
  }, [number, onClickItem]);

  return (
    <Root>
      <FontAwesomeIcon
        icon={faMinusCircle}
        size="lg"
        onClick={handleClickDecrease}
      />
      <Span>{number}</Span>
      <FontAwesomeIcon
        icon={faPlusCircle}
        size="lg"
        onClick={handleClickIncrease}
      />
    </Root>
  );
};

export default memo(Counter);
