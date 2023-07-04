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
  padding: 7px;
  text-align: right;
  margin-bottom: 10px;
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
        <ToggleButton value="normal">전체</ToggleButton>
        <ToggleButton value="dday">디데이</ToggleButton>
        <ToggleButton value="calendar">일자</ToggleButton>
      </ToggleButtonGroup>
    </Root>
  );
};

export default memo(Toggle);
