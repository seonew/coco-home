import { createSlice } from '@reduxjs/toolkit';

export interface State {}

const initialState: State = {};

const searchListSlice = createSlice({
  name: 'searchList',
  initialState,
  reducers: {},
});

export const { actions, reducer } = searchListSlice;
