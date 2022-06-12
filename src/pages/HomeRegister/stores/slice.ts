import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Home, HomeMember } from 'types';
import constants from 'constants/index';

export interface State {
  nextHome: Home;
  currentType: string;
  searchMembers: HomeMember[] | null;
  memberListModal: { open: boolean };
  registerModal: { open: boolean };
}

const initialState: State = {
  nextHome: {
    id: '',
    displayName: '',
    spaces: constants.HOME.SPACES,
    members: [{ name: '', type: '', userId: '', imgUrl: '' }],
    works: constants.HOME.WORKS,
    items: constants.HOME.ITEMS,
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
      state.nextHome.members = action.payload;
      state.searchMembers = null;
    },
    addHomeMembersFailed: (state, action) => {},
    removeHomeMembers: (state, action: PayloadAction<string>) => {
      const members = state.nextHome.members;
      const userId = action.payload;
      const nextItems = members.filter((element) => element.userId !== userId);

      state.nextHome.members = nextItems;
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
      state.nextHome = action.payload;
      state.searchMembers = null;
      state.currentType = '';
    },
    initializeFailed: (state, action) => {},

    addNextHomeItem: (state, action) => {},
    removeNextHomeItem: (state, action) => {},
    addHomeSpaces: (state, action: PayloadAction<string>) => {
      const nextHomeSpaces = state.nextHome.spaces;
      const text = action.payload;

      nextHomeSpaces.push(text);
    },
    removeHomeSpaces: (state, action: PayloadAction<string>) => {
      const nextHomeSpaces = state.nextHome.spaces;
      const text = action.payload;

      const index = nextHomeSpaces.findIndex((element) => element === text);
      nextHomeSpaces.splice(index, 1);
    },
    addHomeWorks: (state, action: PayloadAction<string>) => {
      const nextHomeWorks = state.nextHome.works;
      const text = action.payload;

      nextHomeWorks.push(text);
    },
    removeHomeWorks: (state, action: PayloadAction<string>) => {
      const nextHomeWorks = state.nextHome.works;
      const text = action.payload;

      const index = nextHomeWorks.findIndex((element) => element === text);
      nextHomeWorks.splice(index, 1);
    },
    addHomeItems: (state, action: PayloadAction<string>) => {
      const nextHomeItems = state.nextHome.items;
      const text = action.payload;

      nextHomeItems.push(text);
    },
    removeHomeItems: (state, action: PayloadAction<string>) => {
      const nextHomeItems = state.nextHome.items;
      const text = action.payload;

      const index = nextHomeItems.findIndex((element) => element === text);
      nextHomeItems.splice(index, 1);
    },
    insertMyHomeRegister: (state, action) => {},
    insertMyHomeRegisterSuccess: (state) => {
      state.nextHome = {
        id: '',
        displayName: '',
        spaces: constants.HOME.SPACES,
        members: [{ name: '', type: '', userId: '', imgUrl: '' }],
        works: constants.HOME.WORKS,
        items: [],
      };
    },
    insertMyHomeRegisterFailed: (state, action) => {},
    updateMyHomeRegister: (state, action) => {},
    updateMyHomeRegisterSuccess: (state) => {
      state.nextHome = {
        id: '',
        displayName: '',
        spaces: constants.HOME.SPACES,
        members: [{ name: '', type: '', userId: '', imgUrl: '' }],
        works: constants.HOME.WORKS,
        items: constants.HOME.ITEMS,
      };
    },
    updateMyHomeRegisterFailed: (state, action) => {},
    setCurrentType: (state, action: PayloadAction<string>) => {
      state.currentType = action.payload;
    },
    setDisplayName: (state, action: PayloadAction<string>) => {
      state.nextHome.displayName = action.payload;
    },
  },
});

export const { actions, reducer } = homeRegisterSlice;
