import { memo, useCallback } from 'react';
import styled from 'styled-components';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

interface ToggleProps {
  selectedItem: string;
  onChange: (next: string) => void;
}

const Root = styled.div`
  background-color: white;
  padding-left: 20px;
  padding-top: 15px;
`;

const Toggle = ({ selectedItem, onChange }: ToggleProps) => {
  const handleChangeItem = useCallback(
    (e) => {
      const current = e.target.value;
      onChange(current);
    },
    [onChange]
  );

  return (
    <Root>
      <ToggleButtonGroup
        size="small"
        color="primary"
        value={selectedItem}
        exclusive
        onChange={handleChangeItem}
      >
        <ToggleButton value="dday">디데이</ToggleButton>
        <ToggleButton value="calendar">캘린더</ToggleButton>
      </ToggleButtonGroup>
    </Root>
  );
};

export default memo(Toggle);
