import { memo, useState, useCallback } from 'react';
import styled from 'styled-components';

interface ExpirationDayProps {
  text?: number;
  onChange: (next: number) => void;
}

const Root = styled.div`
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  appearance: none;
  padding: 0.5em 1em;
  border: 1px solid #ddd;
  font-size: 1em;
  font-weight: 400;
  width: 50px;
`;

const ExpirationDay = ({ text, onChange }: ExpirationDayProps) => {
  const [item, setItem] = useState<number>();
  const handleChangeTextField = useCallback(
    (e) => {
      const current = e.target.value;
      if (current.length > 2) {
        return;
      }
      const result = parseInt(current, 10) || 0;
      setItem(result);
      onChange(result);
    },
    [onChange]
  );

  return (
    <Root>
      <Input
        type="text"
        value={text ?? item}
        onChange={handleChangeTextField}
      />
      <span style={{ marginLeft: '5px' }}>일</span>
    </Root>
  );
};

export default memo(ExpirationDay);
