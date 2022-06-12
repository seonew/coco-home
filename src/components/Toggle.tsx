import { memo, useCallback } from 'react';
import Switch from '@mui/material/Switch';

interface ToggleProps {
  checked: boolean;
  onChange: (used: boolean) => void;
}

const Toggle = ({ checked, onChange }: ToggleProps) => {
  const handleChangeItem = useCallback(
    (e) => {
      const current = e.target.checked;
      onChange(current);
    },
    [onChange]
  );

  return <Switch checked={checked} onChange={handleChangeItem} />;
};

export default memo(Toggle);
