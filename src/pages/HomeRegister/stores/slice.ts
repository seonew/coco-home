import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Home, HomeMember } from 'types';
import { HOME } from 'constants/index';

export interface State {
  currentHome: Home;
  currentType: string;
  searchMembers: HomeMember[] | null;
  memberListModal: { open: boolean };
  registerModal: { open: boolean };
}

const initialState: State = {
  currentHome: {
    id: '',
    displayName: '',
    spaces: HOME.SPACES,
    members: [{ name: '', type: '', userId: '', imgUrl: '' }],
    works: HOME.WORKS,
    items: HOME.ITEMS,
  },
  currentType: '',
  searchMembers: null,
  memberListModal: { open: false },
  registerModal: { open: false },
};

const homeRegisterSlice = createSlice({
  name: 'homeRegister',
  initialState,
  reducers: {
    addHomeMembers: (state, action) => {},
    addHomeMembersSuccess: (state, action: PayloadAction<HomeMember[]>) => {
      state.currentHome.members = action.payload;
      state.searchMembers = null;
    },
    addHomeMembersFailed: (state, action) => {},
    removeHomeMembers: (state, action: PayloadAction<string>) => {
      const members = state.currentHome.members;
      const userId = action.payload;
      const nextItems = members.filter((element) => element.userId !== userId);

      state.currentHome.members = nextItems;
    },

    setOpenMemberListModal: (state, action: PayloadAction<boolean>) => {
      state.memberListModal.open = action.payload;
      state.searchMembers = null;
    },
    setOpenRegisterModal: (state, action: PayloadAction<boolean>) => {
      state.registerModal.open = action.payload;
    },
    searchMemberUser: (state, action: PayloadAction<string>) => {
      state.searchMembers = null;
    },
    searchMemberUserSuccess: (state, action: PayloadAction<HomeMember[]>) => {
      state.searchMembers = action.payload;
    },
    searchMemberUserFailed: (state, action) => {},

    initialize: (state) => {},
    initializeSuccess: (state, action: PayloadAction<Home>) => {
      state.currentHome = action.payload;
      state.searchMembers = null;
      state.currentType = '';
    },
    initializeFailed: (state, action) => {},

    addCurrentHomeItem: (state, action) => {},
    removeCurrentHomeItem: (state, action) => {},
    addHomeSpaces: (state, action: PayloadAction<string>) => {
      const currentHomeSpaces = state.currentHome.spaces;
      const text = action.payload;

      currentHomeSpaces.push(text);
    },
    removeHomeSpaces: (state, action: PayloadAction<string>) => {
      const currentHomeSpaces = state.currentHome.spaces;
      const text = action.payload;

      const index = currentHomeSpaces.findIndex((element) => element === text);
      currentHomeSpaces.splice(index, 1);
    },
    addHomeWorks: (state, action: PayloadAction<string>) => {
      const currentHomeWorks = state.currentHome.works;
      const text = action.payload;

      currentHomeWorks.push(text);
    },
    removeHomeWorks: (state, action: PayloadAction<string>) => {
      const currentHomeWorks = state.currentHome.works;
      const text = action.payload;

      const index = currentHomeWorks.findIndex((element) => element === text);
      currentHomeWorks.splice(index, 1);
    },
    addHomeItems: (state, action: PayloadAction<string>) => {
      const currentHomeItems = state.currentHome.items;
      const text = action.payload;

      currentHomeItems.push(text);
    },
    removeHomeItems: (state, action: PayloadAction<string>) => {
      const currentHomeItems = state.currentHome.items;
      const text = action.payload;

      const index = currentHomeItems.findIndex((element) => element === text);
      currentHomeItems.splice(index, 1);
    },
    insertMyHomeRegister: (state, action) => {},
    insertMyHomeRegisterSuccess: (state) => {
      state.currentHome = {
        id: '',
        displayName: '',
        spaces: HOME.SPACES,
        members: [{ name: '', type: '', userId: '', imgUrl: '' }],
        works: HOME.WORKS,
        items: [],
      };
    },
    insertMyHomeRegisterFailed: (state, action) => {},
    updateMyHomeRegister: (state, action) => {},
    updateMyHomeRegisterSuccess: (state) => {
      state.currentHome = {
        id: '',
        displayName: '',
        spaces: HOME.SPACES,
        members: [{ name: '', type: '', userId: '', imgUrl: '' }],
        works: HOME.WORKS,
        items: HOME.ITEMS,
      };
    },
    updateMyHomeRegisterFailed: (state, action) => {},
    setCurrentType: (state, action: PayloadAction<string>) => {
      state.currentType = action.payload;
    },
    setDisplayName: (state, action: PayloadAction<string>) => {
      state.currentHome.displayName = action.payload;
    },
  },
});

export const { actions, reducer } = homeRegisterSlice;
