import { memo, useState, useCallback } from 'react';
import { TextField as MuiTextField } from '@material-ui/core';

interface TextFieldProps {
  text?: string;
  onChange: (next: string) => void;
}

const TextField = ({ text, onChange }: TextFieldProps) => {
  const [item, setItem] = useState('');

  const handleChangeTextField = useCallback(
    (e) => {
      const current = e.target.value;
      setItem(current);
      onChange(current);
    },
    [onChange]
  );

  return (
    <MuiTextField
      id="outlined-basic"
      size="small"
      value={text ?? item}
      onChange={handleChangeTextField}
      placeholder="여기에 입력해주세요."
      fullWidth
    />
  );
};

export default memo(TextField);
