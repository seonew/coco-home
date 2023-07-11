import { CircularProgress } from '@mui/material';
import styled from 'styled-components';

const OverlaySpinner = () => {
  return (
    <Background>
      <StyledCircularProgress />
    </Background>
  );
};

const Background = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: #00000051;
  z-index: 101;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledCircularProgress = styled(CircularProgress)`
  z-index: 102;
`;

export default OverlaySpinner;
