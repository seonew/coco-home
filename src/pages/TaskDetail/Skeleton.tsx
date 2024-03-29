import { Box, Skeleton } from '@material-ui/core';

const LoadingTaskDetail = () => {
  const height = window.innerHeight;
  const count = Math.ceil(height / 130);

  return (
    <Box sx={{ padding: 1 }}>
      {[...Array(count)].map((current, index) => {
        return (
          <Skeleton
            key={index}
            variant="rectangular"
            height={120}
            style={{ borderRadius: 8, marginBottom: 10 }}
          />
        );
      })}
    </Box>
  );
};

export default LoadingTaskDetail;
