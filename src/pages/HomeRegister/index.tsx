import { useCallback, useEffect, memo, CSSProperties } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'stores';
import { actions as appActions } from 'stores/slice';
import { actions } from './stores/slice';
import { Home } from 'types';
import {
  TextMessages,
  MEMBER_TEXT,
  PAGE_PATH,
  SPACE_TEXT,
  TARGET_ITEM_TEXT,
  WORK_TEXT,
  PageNameByPathName,
} from 'constants/index';
import { getMessage } from 'utils/common';

import styled from 'styled-components';
import HeaderButtonContainer from 'components/HeaderButtonContainer';
import Row from 'components/Row';
import DeletableChipList from 'components/DeletableChipList';
import TextField from 'components/TextField';
import RegisterModal from './RegisterModal';
import MemberListModal from './MemberListModal';
import { Avatar, Chip } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

const Root = styled.div`
  height: 100%;
  background-color: #fff;
`;

const Container = styled.div`
  padding: 2px 0;
`;

const ButtonContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`;

const buttonStyle: CSSProperties = {
  color: '#1976d2',
};

const HomeRegister = () => {
  const currentHome = useSelector<RootState, Home>(
    (state) => state.homeRegister.currentHome
  );
  const displayName = currentHome.displayName;
  const works = currentHome.works;
  const members = currentHome.members;
  const spaces = currentHome.spaces;
  const items = currentHome.items;
  const openMemberListModal = useSelector<RootState, boolean>(
    (state) => state.homeRegister.memberListModal.open
  );
  const openRegisterModal = useSelector<RootState, boolean>(
    (state) => state.homeRegister.registerModal.open
  );
  const dispatch = useDispatch();

  const handleClickAddButton = useCallback(
    (type) => () => {
      dispatch(actions.setCurrentType(type));
      dispatch(actions.setOpenRegisterModal(!openRegisterModal));
    },
    [dispatch, openRegisterModal]
  );

  const handleDeleteDialogContent = useCallback(
    (currentType, text) => {
      dispatch(actions.removeCurrentHomeItem({ currentType, text }));
    },
    [dispatch]
  );

  const handleClickMemberListModal = useCallback(
    (type) => () => {
      dispatch(actions.setCurrentType(type));
      dispatch(actions.setOpenMemberListModal(!openMemberListModal));
    },
    [dispatch, openMemberListModal]
  );

  const handleDeleteMembers = useCallback(
    (target) => {
      dispatch(actions.removeHomeMembers(target));
    },
    [dispatch]
  );

  const handleChangeTextField = useCallback(
    (text) => {
      dispatch(actions.setDisplayName(text));
    },
    [dispatch]
  );

  const showAlertModal = useCallback(
    (text) => {
      dispatch(appActions.showAlertModal({ text }));
    },
    [dispatch]
  );

  const validate = useCallback(() => {
    if (currentHome.displayName === '') {
      showAlertModal(getMessage('displayName'));
      return false;
    }

    const isOwner =
      members.findIndex((member) => member.type === 'owner') !== -1;
    if (!isOwner) {
      showAlertModal('구성원에 본인을 포함해 주세요.');
      return false;
    }

    const targetKeys = ['members', 'works', 'spaces'];
    const invalidKey = targetKeys.find((key) => currentHome[key].length === 0);
    if (invalidKey) {
      showAlertModal(getMessage(invalidKey));
      return false;
    }

    return true;
  }, [members, currentHome, showAlertModal]);

  const handleSaveContents = useCallback(() => {
    if (!validate()) {
      return;
    }

    dispatch(actions.insertMyHomeRegister(currentHome));
  }, [dispatch, currentHome, validate]);

  useEffect(() => {
    dispatch(actions.initialize());
  }, [dispatch]);

  return (
    <Root>
      <HeaderButtonContainer
        text={PageNameByPathName[PAGE_PATH.HOME_REGISTER]}
        onClickSaveContents={handleSaveContents}
      />
      <Row text={TextMessages.DISPLAY_NAME} required={true}>
        <TextField
          defaultValue={displayName}
          onChange={handleChangeTextField}
        />
      </Row>
      <Row text={MEMBER_TEXT} required={true}>
        <Container>
          {members.map((item) => {
            const { name, userId, imgUrl } = item;

            return (
              <Chip
                style={{ margin: '3px' }}
                key={userId}
                label={name}
                avatar={<Avatar alt={name} src={imgUrl} />}
                color={item.type === 'owner' ? 'primary' : 'default'}
                variant="outlined"
                onDelete={() => {
                  handleDeleteMembers(userId);
                }}
              />
            );
          })}
          <ButtonContainer>
            <FontAwesomeIcon
              icon={faCirclePlus}
              size="2x"
              style={buttonStyle}
              onClick={handleClickMemberListModal('members')}
            />
          </ButtonContainer>
        </Container>
      </Row>
      <Row text={WORK_TEXT} required={true}>
        <Container>
          <DeletableChipList
            type={'works'}
            items={works}
            onClickDeleteItem={handleDeleteDialogContent}
          />
          <ButtonContainer>
            <FontAwesomeIcon
              icon={faCirclePlus}
              size="2x"
              style={buttonStyle}
              onClick={handleClickAddButton('works')}
            />
          </ButtonContainer>
        </Container>
      </Row>
      <Row text={SPACE_TEXT} required={true}>
        <Container>
          <DeletableChipList
            type={'spaces'}
            items={spaces}
            onClickDeleteItem={handleDeleteDialogContent}
          />
          <ButtonContainer>
            <FontAwesomeIcon
              icon={faCirclePlus}
              size="2x"
              style={buttonStyle}
              onClick={handleClickAddButton('spaces')}
            />
          </ButtonContainer>
        </Container>
      </Row>
      <Row text={TARGET_ITEM_TEXT} required={false}>
        <Container>
          <DeletableChipList
            type={'items'}
            items={items}
            onClickDeleteItem={handleDeleteDialogContent}
          />
          <ButtonContainer>
            <FontAwesomeIcon
              icon={faCirclePlus}
              size="2x"
              style={buttonStyle}
              onClick={handleClickAddButton('items')}
            />
          </ButtonContainer>
        </Container>
      </Row>
      <RegisterModal open={openRegisterModal} />
      <MemberListModal open={openMemberListModal} />
    </Root>
  );
};

export default memo(HomeRegister);
