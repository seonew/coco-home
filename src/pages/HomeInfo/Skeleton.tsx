import { memo } from 'react';
import { Box, Skeleton, Typography } from '@material-ui/core';

const LoadingHomeInfo = () => {
  return (
    <Box sx={{ padding: 2 }}>
      <Skeleton
        variant="rectangular"
        height={50}
        style={{ borderRadius: 8, marginBottom: 15 }}
      />
      <Skeleton
        variant="rectangular"
        height={125}
        style={{ borderRadius: 20, marginBottom: 15 }}
      />
      <Skeleton width="100%">
        <Typography variant="h4" component="div">
          .
        </Typography>
      </Skeleton>
      <Skeleton
        variant="rectangular"
        height={50}
        style={{ borderRadius: 8, marginBottom: 15 }}
      />
    </Box>
  );
};

export default memo(LoadingHomeInfo);
