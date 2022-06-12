import { memo, useState, useCallback } from 'react';
import styled from 'styled-components';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

interface ToggleProps {
  onChange: (next: string) => void;
}

const Root = styled.div`
  background-color: white;
  padding: 7px;
  text-align: right;
`;

const Toggle = ({ onChange }: ToggleProps) => {
  const [item, setItem] = useState('normal');

  const handleChange = useCallback(
    (e) => {
      const current = e.target.value;
      setItem(current);
      onChange(current);
    },
    [onChange]
  );

  return (
    <Root>
      <ToggleButtonGroup
        size="small"
        color="primary"
        value={item}
        exclusive
        onChange={handleChange}
      >
        <ToggleButton value="normal">전체</ToggleButton>
        <ToggleButton value="dday">디데이</ToggleButton>
        <ToggleButton value="calendar">일자</ToggleButton>
      </ToggleButtonGroup>
    </Root>
  );
};

export default memo(Toggle);
