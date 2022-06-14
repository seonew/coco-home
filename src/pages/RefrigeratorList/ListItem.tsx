import { memo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { actions } from './stores/slice';
import { RefrigeratorFood } from 'types';

import styled from 'styled-components';
import { makeStyles } from '@material-ui/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Rating } from '@material-ui/core';
import { faTrashAlt, faMinusCircle } from '@fortawesome/free-solid-svg-icons';

interface ListItemProps {
  item: RefrigeratorFood;
}

const Div = styled.div`
  position: relative;
  padding: 17px 10px 20px 20px;
  background-color: #fff;
`;

const Date = styled.span`
  font-size: 13px;
  color: #999;
  margin-left: 8px;
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

const TextDiv = styled.div`
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
    padding: '0 10px 10px',
  },
  bottom: {
    verticalAlign: 'bottom',
  },
  mr8: {
    marginRight: '8px',
  },
  mr6: {
    marginRight: '6px',
  },
});

const ListItem = ({ item }: ListItemProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleClickDeleteItem = useCallback(() => {
    dispatch(actions.deleteRefrigeratorFoods(item));
  }, [dispatch, item]);

  const handleClickEditItem = useCallback(() => {
    if (item.count <= 1) {
      handleClickDeleteItem();
    } else {
      dispatch(actions.setFoodCount(item));
    }
  }, [dispatch, handleClickDeleteItem, item]);

  return (
    <Div>
      <CategoryDiv>
        <Tag className={classes.mr6}>
          <strong>{item.space}</strong>
        </Tag>
        <b>{item.targetItem}</b>
        <Date>{item.date ? item.date.toString() : ''}</Date>
        <Date>{item.expirationDay ? item.expirationDay : ''}</Date>
        <span className={classes.button} onClick={handleClickDeleteItem}>
          <FontAwesomeIcon icon={faTrashAlt} size="1x" />
        </span>
      </CategoryDiv>
      <ContentDiv>
        <ContentInfo>
          <TextDiv>
            <span>우선 순위: </span>
            <Rating
              size="small"
              value={item.priority}
              readOnly
              className={classes.bottom}
            />
          </TextDiv>
          <TextDiv>
            <span className={classes.mr8}>수량: {item.count}</span>
            <span onClick={handleClickEditItem}>
              <FontAwesomeIcon icon={faMinusCircle} size="sm" />
            </span>
          </TextDiv>
        </ContentInfo>
      </ContentDiv>
    </Div>
  );
};

export default memo(ListItem);
