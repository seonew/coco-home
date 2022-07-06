import { PayloadAction } from '@reduxjs/toolkit';

export interface Home {
  id: string;
  displayName?: string;
  members: HomeMember[];
  spaces: string[];
  items: string[];
  works: string[];
}

export interface User {
  name: string;
  imgUrl: string;
  userId: string;
}

export interface HomeMember extends User {
  type: string;
  added?: boolean;
}

export interface HomeTask {
  id: string;
  homeId: string;
  member: { name: string; id: string };
  space: string;
  targetItem: string;
  work: string;
  date: Date;
  cycle: {
    value: number;
    unit: string;
  };
}

export interface HomeListItem {
  homeId: string;
  displayName?: string;
  memberType: string;
}

export interface RefrigeratorFood {
  id: string;
  homeId: string;
  space: string;
  targetItem: string;
  count: number;
  priority: number;
  date?: Date;
  expirationDay?: number;
}

export interface HomeAlert extends HomeTask {
  dday: number;
}

export interface StatisticsByHomeTask {
  key: string[];
  count: number[];
}

export interface HomeTasksByDate {
  [key: string]: HomeTask[];
}

interface Modal {
  open: boolean;
}

export interface Alert extends Modal {
  text: string;
}

export interface Confirm extends Modal {
  title: string;
  text?: string;
  confirmAction: PayloadAction | null;
}

export type ShowConfirmPayload = Omit<Confirm, 'open'>;

export type EmptyPayload = {} | null | undefined;
