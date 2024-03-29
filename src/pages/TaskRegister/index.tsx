import { memo, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'stores';
import { TextMessages, PAGE_PATH, PageNameByPathName } from 'constants/index';
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

const Root = styled.div`
  height: 100%;
  background-color: #fff;
`;

const ChipContainer = styled.div`
  display: inline-block;
  margin: 4px 3px;
`;

const ToggleContainer = styled.div`
  position: relative;
  float: right;
  top: -35px;
`;

const TaskRegister = () => {
  const edited = useSelector<RootState, boolean>(
    (state) => state.taskRegister.edited
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
    if (selectedContent['member'].name === undefined) {
      showAlertModal(getMessage('member'));
      return false;
    }

    const targetKeys = ['work', 'space', 'date'];
    const invalidKey = targetKeys.find(
      (key) => selectedContent[key] === undefined
    );
    if (invalidKey) {
      showAlertModal(getMessage(invalidKey));
      return false;
    }

    return true;
  }, [selectedContent, showAlertModal]);

  const handleSaveContents = useCallback(() => {
    if (!validate()) {
      return;
    }

    if (edited) {
      dispatch(actions.updateTaskRegister(selectedContent));
    } else {
      dispatch(actions.insertTaskRegister(selectedContent));
    }
  }, [dispatch, edited, selectedContent, validate]);

  return (
    <Root>
      <HeaderButtonContainer
        text={PageNameByPathName[PAGE_PATH.HOME_TASK_REGISTER]}
        onClickSaveContents={handleSaveContents}
      />
      <Row text={TextMessages.MEMBER} required={true}>
        {members.map((member) => {
          return (
            <ChipContainer key={member.userId}>
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
      <Row text={TextMessages.WORK} required={true}>
        <ChipList
          type={'work'}
          items={works}
          selectedItem={selectedContent.work}
          onClickItem={handleClickItem}
        />
      </Row>
      <Row text={TextMessages.SPACE} required={true}>
        <ChipList
          type={'space'}
          items={spaces}
          selectedItem={selectedContent.space}
          onClickItem={handleClickItem}
        />
      </Row>
      {(items.length as number) > 0 ? (
        <Row text={TextMessages.TARGET_ITEM} required={false}>
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

      <Row text={TextMessages.DATE} required={true}>
        <DatePicker date={selectedContent.date} onClickItem={handleClickDate} />
      </Row>
      <Row text={TextMessages.CYCLE} required={false}>
        <ToggleContainer>
          <Toggle onChange={handleClickToggle} checked={showCycle} />
        </ToggleContainer>
        <div className={showCycle ? '' : 'none'}>
          <Button
            variant="contained"
            size="small"
            className="mr5"
            onClick={handleClickOpenSelectCycleModal}
          >
            {selectedContent.cycle.value}
          </Button>
          <div className="inline-block">
            <ChipList
              type={'unit'}
              items={units}
              selectedItem={getUnitCodeToString(selectedContent.cycle.unit)}
              onClickItem={handleChangeSelectedCycle}
            />
          </div>
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
