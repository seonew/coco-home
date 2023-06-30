import { memo, useState, useCallback } from 'react';
import styled from 'styled-components';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

interface ToggleProps {
  text?: number;
  onChange: (next: string) => void;
}

const Root = styled.div`
  background-color: white;
  padding-left: 20px;
  padding-top: 15px;
`;

const Toggle = ({ text, onChange }: ToggleProps) => {
  const [value, setValue] = useState('dday');

  const handleChange = useCallback(
    (e) => {
      const current = e.target.value;
      setValue(current);
      onChange(value);
    },
    [value, onChange]
  );

  return (
    <Root>
      <ToggleButtonGroup
        size="small"
        color="primary"
        value={value}
        exclusive
        onChange={handleChange}
      >
        <ToggleButton value="dday">디데이</ToggleButton>
        <ToggleButton value="calendar">캘린더</ToggleButton>
      </ToggleButtonGroup>
    </Root>
  );
};

export default memo(Toggle);
