import { memo, useCallback, useState } from 'react';

import styled from 'styled-components';
import SearchIcon from '@material-ui/icons/Search';
import { Paper, IconButton, InputBase, Divider } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { actions as appActions } from 'stores/slice';

interface SearchProps {
  placeholder: string;
  onClickItem: (text: string) => void;
}

const Root = styled.div`
  padding: 0.5rem;
  background-color: #fff;
`;

const Search = ({ placeholder, onClickItem }: SearchProps) => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const showAlertModal = useCallback(
    (text) => {
      dispatch(appActions.showAlertModal({ text }));
    },
    [dispatch]
  );

  const handleChangeTextField = useCallback((e) => {
    const current = e.target.value;
    setText(current);
  }, []);

  const handleClickItem = useCallback(() => {
    if (text === '') {
      showAlertModal('내용을 입력해주세요.');
      return;
    }

    onClickItem(text);
  }, [onClickItem, showAlertModal, text]);

  return (
    <Root data-cy="search">
      <Paper
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
        }}
        variant="outlined"
        style={{ height: '30px' }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder={placeholder}
          onChange={handleChangeTextField}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton
          type="submit"
          sx={{ p: '10px' }}
          aria-label="search"
          onClick={handleClickItem}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </Root>
  );
};

export default memo(Search);
