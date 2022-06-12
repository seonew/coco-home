import { memo } from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/styles';

import { Button } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import CancleIcon from '@material-ui/icons/Cancel';

interface ButtonContainerProps {
  onClickSaveContents: () => void;
}

const Root = styled.div`
  display: table;
  width: 100%;
  padding: 20px 10px;
  table-layout: fixed;
  box-sizing: border-box;
  border-top: 1px solid #f2f2f2;
  background-color: #fff;
  margin-top: 10px;
`;

const ButtonDiv = styled.div`
  display: table-cell;
  padding: 0 5px;
`;
const useStyles = makeStyles(() => ({
  button: {
    width: '100%',
  },
}));

const ButtonContainer = ({ onClickSaveContents }: ButtonContainerProps) => {
  const classes = useStyles();

  const handleSaveContents = () => {
    onClickSaveContents();
  };

  return (
    <Root data-cy="confirmButtonBox">
      <ButtonDiv>
        <Button
          variant="outlined"
          className={classes.button}
          startIcon={<CancleIcon />}
          onClick={() => {
            window.history.back();
          }}
        >
          Cancle
        </Button>
      </ButtonDiv>
      <ButtonDiv>
        <Button
          variant="contained"
          className={classes.button}
          startIcon={<SaveIcon />}
          onClick={handleSaveContents}
        >
          Save
        </Button>
      </ButtonDiv>
    </Root>
  );
};

export default memo(ButtonContainer);
