import { useCallback, useEffect, memo, CSSProperties } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'stores';
import { actions as appActions } from 'stores/slice';
import { actions } from './stores/slice';
import { Home } from 'types';
import constants, { pageNameByPathName } from 'constants/index';
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
  const nextHome = useSelector<RootState, Home>(
    (state) => state.homeRegister.nextHome
  );
  const displayName = nextHome.displayName;
  const works = nextHome['works'];
  const members = nextHome['members'];
  const spaces = nextHome['spaces'];
  const items = nextHome['items'];
  const openMemberListModal = useSelector<RootState, boolean>(
    (state) => state.homeRegister.memberListModal.open
  );
  const openRegisterModal = useSelector<RootState, boolean>(
    (state) => state.homeRegister.registerModal.open
  );
  const openAlertModal = useSelector<RootState, boolean>(
    (state) => state.app.alertModal.open
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
      dispatch(actions.removeNextHomeItem({ currentType, text }));
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
      dispatch(appActions.setAlertModal({ open: !openAlertModal, text }));
    },
    [dispatch, openAlertModal]
  );

  const validate = useCallback(() => {
    const keys = Object.keys(nextHome);
    let result = keys.some((key) => {
      if (
        (key === 'displayName' && nextHome.displayName === '') ||
        ((key === 'spaces' || key === 'members' || key === 'works') &&
          nextHome[key].length === 0)
      ) {
        showAlertModal(getMessage(key));
        return true;
      }

      return false;
    });

    if (!result) {
      const owner = members.some((member) => {
        return member.type === 'owner';
      });

      if (!owner) {
        showAlertModal('구성원에 본인을 포함해 주세요.');
        result = true;
      }
    }

    return result;
  }, [members, nextHome, showAlertModal]);

  const handleSaveContents = useCallback(() => {
    if (validate()) {
      return;
    }

    dispatch(actions.insertMyHomeRegister(nextHome));
  }, [dispatch, nextHome, validate]);

  useEffect(() => {
    dispatch(actions.initialize());
  }, [dispatch]);

  return (
    <Root>
      <HeaderButtonContainer
        text={pageNameByPathName[constants.PAGE_PATH.HOME_REGISTER]}
        onClickSaveContents={handleSaveContents}
      />
      <Row text={constants.DISPLAY_NAME} required={true}>
        <TextField text={displayName} onChange={handleChangeTextField} />
      </Row>
      <Row text="구성원" required={true}>
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
      <Row text="집안일" required={true}>
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
      <Row text="공간" required={true}>
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
      <Row text="대상" required={false}>
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
