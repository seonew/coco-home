import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  Home,
  HomeAlert,
  User,
  Alert,
  Confirm,
  ShowConfirmPayload,
  ShowAlertPayload,
} from 'types';
import { HOME } from 'constants/index';

export interface State {
  isAuthenticated: boolean;
  token: string;
  user: User;
  loading: boolean;
  dialogContent: string;
  init: boolean;

  alertModal: Alert;
  confirmModal: Confirm;

  currentHome: Home;
  refrigeratorSummary: Record<string, string>[];
  alertList: HomeAlert[] | null;
}

const initialState: State = {
  isAuthenticated:
    localStorage.getItem('isAuthenticated') === 'true' ? true : false,
  token: localStorage.getItem('access_token') ?? '',
  user: {
    name: localStorage.getItem('name') ?? '',
    imgUrl: '',
    userId: '',
  },
  loading: false,
  dialogContent: '',
  init: true,

  alertModal: { open: false, text: '' },
  confirmModal: { open: false, title: '', confirmAction: null },

  currentHome: {
    id: localStorage.getItem('lastHomeId') ?? '',
    spaces: HOME.SPACES,
    members: [{ name: '', type: '', userId: '', imgUrl: '' }],
    works: HOME.WORKS,
    items: HOME.ITEMS,
  },
  refrigeratorSummary: [],
  alertList: null,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    initialize: (state) => {},
    initializeSuccess: (state) => {},
    initializeFailed: (state, action) => {},
    fetchMainHomeInfo: (state) => {},
    goTaskRegisterPage: (state, action) => {},
    fetchHomeTasksAlert: (state) => {},
    fetchHomeTasksAlertSuccess: (state, action: PayloadAction<HomeAlert[]>) => {
      state.alertList = action.payload;
    },
    fetchHomeTasksAlertFailed: (state, action) => {},
    fetchRefrigeratorSummary: (state, action) => {},
    fetchRefrigeratorSummarySuccess: (
      state,
      action: PayloadAction<Record<string, string>[]>
    ) => {
      state.refrigeratorSummary = action.payload;
    },
    fetchRefrigeratorSummaryFailed: (state, action) => {},
    deleteHomeId: (state, action) => {},
    deleteHomeIdSuccess: (state) => {
      state.currentHome.id = '';
      state.currentHome.spaces = HOME.SPACES;
      state.currentHome.members = [
        { name: '', type: '', userId: '', imgUrl: '' },
      ];
      state.currentHome.works = HOME.WORKS;
      state.currentHome.items = HOME.ITEMS;
    },
    deleteHomeIdFailed: (state, action) => {},
    updateHomeId: (state, action) => {},
    updateHomeIdSuccess: (state, action) => {
      state.currentHome.id = action.payload;
    },
    updateHomeIdFailed: (state, action) => {},
    fetchCurrentHomeInfo: (state, action) => {},
    fetchCurrentHomeInfoSuccess: (state, action: PayloadAction<Home>) => {
      state.currentHome = action.payload;
    },
    fetchCurrentHomeInfoFailed: (state, action) => {},

    goUrl: (state, action) => {},
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    resetAlertModal: (state) => {
      state.alertModal.text = '';
    },
    setAlertModal: (state, action: PayloadAction<Alert>) => {
      const { open, text } = action.payload;
      state.alertModal.open = open;
      state.alertModal.text = text;
    },
    showAlertModal: (state, action: PayloadAction<ShowAlertPayload>) => {},
    hideAlertModal: (state) => {
      state.alertModal.open = false;
    },
    resetConfirmModal: (state) => {
      state.confirmModal.title = '';
      state.confirmModal.text = '';
      state.confirmModal.confirmAction = null;
    },
    setConfirmModal: (state, action: PayloadAction<Confirm>) => {
      const { open, title, text, confirmAction } = action.payload;
      state.confirmModal.title = title;
      state.confirmModal.text = text;
      state.confirmModal.confirmAction = confirmAction;
      state.confirmModal.open = open;
    },
    showConfirmModal: (state, action: PayloadAction<ShowConfirmPayload>) => {},
    hideConfirmModal: (state) => {
      state.confirmModal.open = false;
    },
    setDialogContent: (state, action: PayloadAction<string>) => {
      state.dialogContent = action.payload;
    },
    setInit: (state, action) => {
      state.init = action.payload;
    },

    fetchUserInfo: (state) => {},
    fetchUserInfoSuccess: (state, action: PayloadAction<User>) => {
      state.user.name = action.payload.name;
      state.user.userId = action.payload.userId;
      state.user.imgUrl = action.payload.imgUrl;
    },
    login: (state, action) => {},
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.user.name = action.payload.name;
      state.user.userId = action.payload.userId;
      state.user.imgUrl = action.payload.imgUrl;
      state.isAuthenticated = true;
      state.currentHome.id = action.payload.lastHomeId;
    },
    loginGuest: (state) => {},
    logout: (state) => {},
    logoutSuccess: (state) => {
      state.token = '';
      state.user.name = '';
      state.user.userId = '';
      state.user.imgUrl = '';
      state.isAuthenticated = false;
      state.currentHome.id = '';
    },
  },
});

export const { actions, reducer } = appSlice;
