import { memo } from 'react';
import { Box, Skeleton as SkeletonMUI, Typography } from '@material-ui/core';

const Skeleton = () => {
  return (
    <Box sx={{ padding: 2 }}>
      <SkeletonMUI
        variant="rectangular"
        height={50}
        style={{ borderRadius: 8, marginBottom: 15 }}
      />
      <SkeletonMUI
        variant="rectangular"
        height={125}
        style={{ borderRadius: 20, marginBottom: 15 }}
      />
      <SkeletonMUI width="100%">
        <Typography variant="h4" component="div">
          .
        </Typography>
      </SkeletonMUI>
      <SkeletonMUI
        variant="rectangular"
        height={50}
        style={{ borderRadius: 8, marginBottom: 15 }}
      />
    </Box>
  );
};

export default memo(Skeleton);
