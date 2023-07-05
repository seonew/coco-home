import { Box, Skeleton } from '@material-ui/core';

const LoadingHomeList = () => {
  const height = window.innerHeight;
  const count = Math.ceil(height / 115);

  return (
    <Box sx={{ padding: 2 }}>
      <Skeleton
        variant="rectangular"
        height={36}
        style={{ borderRadius: 14, marginBottom: 15 }}
      />
      {[...Array(count)].map((current, index) => {
        return (
          <Skeleton
            key={index}
            variant="rectangular"
            height={100}
            style={{ borderRadius: 19, marginBottom: 15 }}
          />
        );
      })}
    </Box>
  );
};

export default LoadingHomeList;
