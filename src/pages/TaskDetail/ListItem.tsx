import { memo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { actions } from './stores/slice';
import { actions as taskRegisterActions } from '../TaskRegister/stores/slice';
import { actions as appActions } from 'stores/slice';
import { HomeTask } from 'types';
import { getUnitCodeToString } from 'utils/common';

import styled from 'styled-components';
import { makeStyles } from '@material-ui/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

interface ListItemProps {
  item: HomeTask;
}

const Div = styled.div`
  position: relative;
  padding: 17px 10px 20px 20px;
  background-color: #fff;
`;

const CategoryDiv = styled.div`
  margin-bottom: 10px;
  color: #222;
`;

const ContentDiv = styled.div`
  display: flex;
  align-items: center;
`;

const ContentInfo = styled.div`
  position: relative;
  flex: 1 1;
  min-width: 0;
`;

const Text = styled.div`
  font-size: 14px;
`;

const Tag = styled.span`
  padding: 2px 3px;
  vertical-align: middle;
  border: 1px #1976d2 solid;
  border-radius: 8px;
  font-size: 11px;
  line-height: 14px;
  color: #1976d2;
`;

const useStyles = makeStyles({
  button: {
    float: 'right',
    display: 'block',
    padding: '0 7px 10px 7px',
  },
});

const ListItem = ({ item }: ListItemProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleClickDeleteItem = useCallback(() => {
    dispatch(
      appActions.showConfirmModal({
        title: '선택한 집안일을 삭제하시겠습니까?',
        confirmAction: actions.deleteHomeTasks(item),
      })
    );
  }, [dispatch, item]);

  const handleClickEditItem = useCallback(() => {
    dispatch(taskRegisterActions.goRegisterPageToEdit(item));
  }, [dispatch, item]);

  return (
    <Div>
      <CategoryDiv data-cy="detail">
        <Tag className="mr6">
          <strong>{item.member.name}</strong>
        </Tag>
        <strong>{item.work}</strong>
        <span className={classes.button}>
          <FontAwesomeIcon
            icon={faTrashAlt}
            size="1x"
            onClick={handleClickDeleteItem}
          />
        </span>
        <span className={classes.button}>
          <FontAwesomeIcon
            icon={faEdit}
            size="1x"
            onClick={handleClickEditItem}
          />
        </span>
      </CategoryDiv>
      <ContentDiv>
        <ContentInfo>
          <Text>
            <span>{item.space}</span>
            <span>&nbsp;{item.targetItem}</span>
          </Text>
          {item.cycle.unit !== '' && (
            <Text>
              <span>주기: </span>
              <span>{item.cycle.value}</span>
              <span>{getUnitCodeToString(item.cycle.unit)}</span>
            </Text>
          )}
          <Text>
            <span className="mr8">실행 일시: {item.date.toString()}</span>
          </Text>
        </ContentInfo>
      </ContentDiv>
    </Div>
  );
};

export default memo(ListItem);
