import { memo, useState, useCallback } from 'react';
import { TextField as MuiTextField } from '@material-ui/core';

interface MultiTextFieldProps {
  name: string;
  defaultValue?: string;
  onChange: (type: string, next: string) => void;
}

const MultiTextField = ({
  name,
  defaultValue,
  onChange,
}: MultiTextFieldProps) => {
  const [value, setValue] = useState('');

  const handleChangeTextField = useCallback(
    (e) => {
      const current = e.target.value;
      setValue(current);
      onChange(name, current);
    },
    [onChange, name]
  );

  return (
    <MuiTextField
      id="outlined-basic"
      size="small"
      value={defaultValue ?? value}
      onChange={handleChangeTextField}
      placeholder="여기에 입력해주세요."
      fullWidth
    />
  );
};

export default memo(MultiTextField);
