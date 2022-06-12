import { memo, useCallback, useState } from 'react';
import { Box } from '@mui/material';
import RatingUI from '@mui/material/Rating';

interface RatingProps {
  onClickItem: (number: number | null) => void;
}

const Rating = ({ onClickItem }: RatingProps) => {
  const [value, setValue] = useState<number | null>(0);

  const handleClickItem = useCallback(
    (event, newValue) => {
      setValue(newValue);
      onClickItem(newValue);
    },
    [onClickItem]
  );

  return (
    <Box
      sx={{
        mt: 1,
        mb: 1,
      }}
    >
      <RatingUI
        name="simple-controlled"
        value={value}
        precision={0.5}
        onChange={handleClickItem}
      />
    </Box>
  );
};

export default memo(Rating);
