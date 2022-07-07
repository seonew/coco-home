import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HomeTask } from 'types';

export interface State {
  selectedItem: HomeTask | null;
  edit: boolean;
  selectCycleModal: { open: boolean; selectedItem: number };
}

const initialState: State = {
  selectedItem: null,
  edit: false,
  selectCycleModal: { open: false, selectedItem: 1 },
};

const taskRegisterSlice = createSlice({
  name: 'taskRegister',
  initialState,
  reducers: {
    insertTaskRegister: (state, action) => {},
    insertTaskRegisterSuccess: (state, action) => {},
    insertTaskRegisterFailed: (state, action) => {},
    updateTaskRegister: (state, action) => {},
    updateTaskRegisterSuccess: (state, action) => {},
    updateTaskRegisterFailed: (state, action) => {},
    goRegisterPageToCreate: (state) => {},
    goRegisterPageToEdit: (state, action) => {},
    goRegisterPageToRepeat: (state, action) => {},
    setSelectedItem: (state, action: PayloadAction<HomeTask | null>) => {
      state.selectedItem = action.payload;
    },
    setEdit: (state, action: PayloadAction<boolean>) => {
      state.edit = action.payload;
    },
    setOpenSelectCycleModal: (state, action: PayloadAction<boolean>) => {
      state.selectCycleModal.open = action.payload;
    },
  },
});

export const { actions, reducer } = taskRegisterSlice;
