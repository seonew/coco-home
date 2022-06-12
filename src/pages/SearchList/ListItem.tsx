import { memo } from 'react';
import { HomeTask } from 'types';
import { getUnitCodeToString } from 'utils/common';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/styles';

interface ListItemProps {
  item: HomeTask;
}

const Div = styled.div`
  position: relative;
  padding: 17px 20px 20px;
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
  mr8: {
    marginRight: '8px',
  },
  mr6: {
    marginRight: '6px',
  },
});

const ListItem = ({ item }: ListItemProps) => {
  const classes = useStyles();

  return (
    <Div>
      <CategoryDiv>
        <Tag className={classes.mr6}>
          <strong>{item.member.name}</strong>
        </Tag>
        <b>{item.space}</b>
      </CategoryDiv>
      <ContentDiv>
        <ContentInfo>
          <Text>
            <span>{item.targetItem}&nbsp;</span>
            <span>{item.work}</span>
          </Text>
          {item.cycle.value !== 0 ? (
            <Text>
              <span>주기: </span>
              <span>{item.cycle.value}&nbsp;</span>
              <span>{getUnitCodeToString(item.cycle.unit)}</span>
            </Text>
          ) : (
            ''
          )}
          <Text>
            <span className={classes.mr8}>
              실행 일시: {item.date.toString()}
            </span>
          </Text>
        </ContentInfo>
      </ContentDiv>
    </Div>
  );
};

export default memo(ListItem);
