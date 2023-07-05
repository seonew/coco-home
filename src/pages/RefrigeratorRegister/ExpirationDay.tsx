import { memo, useCallback } from 'react';
import styled from 'styled-components';

interface ExpirationDayProps {
  day?: number;
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

const ExpirationDay = ({ day, onChange }: ExpirationDayProps) => {
  const handleChangeTextField = useCallback(
    (e) => {
      const current = e.target.value;
      if (current.length > 2) {
        return;
      }
      const result = parseInt(current, 10) || 0;
      onChange(result);
    },
    [onChange]
  );

  return (
    <Root>
      <Input
        type="number"
        pattern="\d*"
        value={day}
        onChange={handleChangeTextField}
      />
      <span className="ml5">일</span>
    </Root>
  );
};

export default memo(ExpirationDay);
