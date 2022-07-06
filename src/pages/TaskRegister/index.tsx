import { memo, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'stores';
import constants, { pageNameByPathName } from 'constants/index';
import { actions } from './stores/slice';
import { actions as appActions } from 'stores/slice';
import {
  getUnitStringToCode,
  getUnitCodeToString,
  getUnitArray,
  getMessage,
} from 'utils/common';

import styled from 'styled-components';
import Row from 'components/Row';
import ChipList from 'components/ChipList';
import DatePicker from 'components/DatePicker';
import HeaderButtonContainer from 'components/HeaderButtonContainer';
import { Home, HomeTask } from 'types';
import SelectCycleModal from './SelectCycleModal';
import Toggle from 'components/Toggle';
import { Avatar, Button, Chip } from '@mui/material';
import { makeStyles } from '@material-ui/styles';

const Root = styled.div`
  height: 100%;
  background-color: #fff;
`;

const ChipContainer = styled.div`
  display: inline-block;
  margin: 4px 3px;
`;

const Inline = styled.div`
  display: inline-block;
`;

const ToggleContainer = styled.div`
  position: relative;
  float: right;
  top: -35px;
`;

const useStyles = makeStyles(() => ({
  none: {
    display: 'none',
  },
}));

const TaskRegister = () => {
  const edtied = useSelector<RootState, boolean>(
    (state) => state.taskRegister.edit
  );
  const currentHome = useSelector<RootState, Home>(
    (state) => state.app.currentHome
  );
  const openSelectCycleModal = useSelector<RootState, boolean>(
    (state) => state.taskRegister.selectCycleModal.open
  );
  const members = currentHome['members'];
  const works = currentHome['works'];
  const spaces = currentHome['spaces'];
  const items = currentHome['items'];
  const selectedItem = useSelector<RootState, HomeTask | null>(
    (state) => state.taskRegister.selectedItem
  );

  const [selectedContent, setSelectedContent] = useState({
    id: selectedItem?.id,
    member: { name: selectedItem?.member.name, id: selectedItem?.member.id },
    space: selectedItem?.space,
    targetItem: selectedItem?.targetItem,
    work: selectedItem?.work,
    date: selectedItem?.date ?? new Date(),
    cycle: {
      value: selectedItem?.cycle.value ?? 1,
      unit: selectedItem?.cycle.unit ?? '',
    },
  });
  const [showCycle, setShowCycle] = useState(
    selectedItem?.cycle.unit === undefined
      ? false
      : selectedItem?.cycle.unit === ''
      ? false
      : true
  );

  const units = getUnitArray();
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleChangeSelectedCycle = useCallback(
    (name, value) => {
      if (name === 'unit') {
        value = getUnitStringToCode(value);
      }

      const nextCycleSubItem = { [name]: value };
      const nextCycleItem = { ...selectedContent.cycle, ...nextCycleSubItem };

      setSelectedContent({ ...selectedContent, cycle: nextCycleItem });
    },
    [selectedContent]
  );

  const handleClickMember = useCallback(
    (item) => () => {
      const nextSubItem = { name: item.name, id: item.userId };
      const nextItem = { ...selectedContent.member, ...nextSubItem };

      setSelectedContent({ ...selectedContent, member: nextItem });
    },
    [selectedContent]
  );

  const handleClickDate = useCallback(
    (item) => {
      setSelectedContent({ ...selectedContent, date: item });
    },
    [selectedContent]
  );

  const handleClickItem = useCallback(
    (name, value) => {
      const nextItem = { ...selectedContent, [name]: value };
      setSelectedContent(nextItem);
    },
    [selectedContent]
  );

  const handleClickOpenSelectCycleModal = useCallback(() => {
    dispatch(actions.setOpenSelectCycleModal(!openSelectCycleModal));
  }, [dispatch, openSelectCycleModal]);

  const handleClickToggle = useCallback(
    (checked) => {
      const nextCycleSubItem = {
        value: 1,
        unit: '',
      };
      const nextCycleItem = { ...selectedContent.cycle, ...nextCycleSubItem };
      setSelectedContent({ ...selectedContent, cycle: nextCycleItem });
      setShowCycle(checked);
    },
    [selectedContent]
  );

  const showAlertModal = useCallback(
    (text) => {
      dispatch(appActions.showAlertModal({ text }));
    },
    [dispatch]
  );

  const validate = useCallback(() => {
    const keys = Object.keys(selectedContent);
    const result = keys.some((key) => {
      if (
        (key !== 'id' &&
          key !== 'targetItem' &&
          selectedContent[key] === undefined) ||
        (key === 'member' && selectedContent[key].name === undefined)
      ) {
        showAlertModal(getMessage(key));
        return true;
      }
      return false;
    });
    return result;
  }, [selectedContent, showAlertModal]);

  const handleSaveContents = useCallback(() => {
    if (validate()) {
      return;
    }

    if (edtied) {
      dispatch(actions.updateTaskRegister(selectedContent));
    } else {
      dispatch(actions.insertTaskRegister(selectedContent));
    }
  }, [dispatch, edtied, selectedContent, validate]);

  return (
    <Root>
      <HeaderButtonContainer
        text={pageNameByPathName[constants.PAGE_PATH.HOME_TASK_REGISTER]}
        onClickSaveContents={handleSaveContents}
      />
      <Row text={constants.MEMBER} required={true}>
        {members.map((member, index) => {
          return (
            <ChipContainer key={index}>
              {selectedContent.member.id === member.userId ? (
                <Chip
                  avatar={<Avatar alt={member.name} src={member.imgUrl} />}
                  label={member.name}
                  onClick={handleClickMember(member)}
                  color="primary"
                />
              ) : (
                <Chip
                  avatar={<Avatar alt={member.name} src={member.imgUrl} />}
                  label={member.name}
                  onClick={handleClickMember(member)}
                  color="primary"
                  variant="outlined"
                />
              )}
            </ChipContainer>
          );
        })}
      </Row>
      <Row text={constants.WORK} required={true}>
        <ChipList
          type={'work'}
          items={works}
          selectedItem={selectedContent.work}
          onClickItem={handleClickItem}
        />
      </Row>
      <Row text={constants.SPACE} required={true}>
        <ChipList
          type={'space'}
          items={spaces}
          selectedItem={selectedContent.space}
          onClickItem={handleClickItem}
        />
      </Row>
      {(items.length as number) > 0 ? (
        <Row text={constants.TARGET_ITEM} required={false}>
          <ChipList
            type={'targetItem'}
            items={items}
            selectedItem={selectedContent.targetItem}
            onClickItem={handleClickItem}
          />
        </Row>
      ) : (
        ''
      )}

      <Row text={constants.DATE} required={true}>
        <DatePicker date={selectedContent.date} onClickItem={handleClickDate} />
      </Row>
      <Row text={constants.CYCLE} required={false}>
        <ToggleContainer>
          <Toggle onChange={handleClickToggle} checked={showCycle} />
        </ToggleContainer>
        <div className={showCycle ? '' : classes.none}>
          <Button
            variant="contained"
            size="small"
            style={{ marginRight: '5px' }}
            onClick={handleClickOpenSelectCycleModal}
          >
            {selectedContent.cycle.value}
          </Button>
          <Inline>
            <ChipList
              type={'unit'}
              items={units}
              selectedItem={getUnitCodeToString(selectedContent.cycle.unit)}
              onClickItem={handleChangeSelectedCycle}
            />
          </Inline>
        </div>
      </Row>
      <SelectCycleModal
        open={openSelectCycleModal}
        selectedItem={selectedContent.cycle.value}
        onSelectItem={handleChangeSelectedCycle}
      />
    </Root>
  );
};

export default memo(TaskRegister);
