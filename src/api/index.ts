import instance from '../utils/axiosInstance';
import axios, { AxiosResponse } from 'axios';
import {
  Home,
  HomeMember,
  HomeTask,
  HomeAlert,
  StatisticsByHomeTask,
  HomeListItem,
  HomeTasksByDate,
  EmptyPayload,
  User,
} from 'types';

// HOMES
export const fetchCurrentHomeInfoApi = (
  homeId: string
): Promise<AxiosResponse<Home>> => {
  return instance.get(`/api/homes/${homeId}/info`);
};

export const fetchMyHomeListApi = (): Promise<AxiosResponse<HomeListItem>> => {
  return instance.get('/api/homes');
};

export const insertHomesApi = (home: Home): Promise<AxiosResponse<Home>> => {
  return instance.post('/api/homes', {
    displayName: home.displayName,
    items: home.items,
    spaces: home.spaces,
    works: home.works,
    members: home.members,
  });
};

export const updateHomesApi = (
  home: Home
): Promise<AxiosResponse<EmptyPayload>> => {
  return instance.patch(`/api/homes/${home.id}`, {
    displayName: home.displayName,
    items: home.items,
    spaces: home.spaces,
    works: home.works,
    members: home.members,
  });
};

export const deleteHomesApi = (
  id: string
): Promise<AxiosResponse<EmptyPayload>> => {
  return instance.delete(`/api/homes/${id}`);
};

// HOME MEMBER
export const fetchMemberUsersApi = (
  name: string
): Promise<AxiosResponse<HomeMember>> => {
  return instance.get('/api/homes/members/users', {
    params: { name },
  });
};

// HOME TASK
export const insertHomesTasksApi = (
  homeTask: HomeTask
): Promise<AxiosResponse<HomeTask>> => {
  return instance.post(`/api/homes/${homeTask.homeId}/tasks`, {
    targetItem: homeTask.targetItem,
    member: homeTask.member,
    space: homeTask.space,
    work: homeTask.work,
    date: homeTask.date,
    cycle: homeTask.cycle,
  });
};

export const updateHomeTasksApi = (
  homeTask: HomeTask
): Promise<AxiosResponse<EmptyPayload>> => {
  return instance.patch(`/api/homes/${homeTask.homeId}/tasks`, {
    id: homeTask.id,
    member: homeTask.member,
    space: homeTask.space,
    targetItem: homeTask.targetItem,
    work: homeTask.work,
    date: homeTask.date,
    cycle: homeTask.cycle,
  });
};

export const deleteHomeTasksApi = (
  id: string
): Promise<AxiosResponse<EmptyPayload>> => {
  return instance.delete(`/api/homes/tasks/${id}`);
};

export const fetchHomeTasksByDateApi = (
  year: number,
  month: number,
  homeId: string
): Promise<AxiosResponse<HomeTasksByDate>> => {
  return instance.get(`/api/homes/${homeId}/tasks/calendar`, {
    params: {
      year,
      month,
    },
  });
};

export const fetchHomeTasksDetailApi = (
  targetDate: { year: number; month: number; day: number },
  homeId: string
): Promise<AxiosResponse<HomeTask[]>> => {
  return instance.get(`/api/homes/${homeId}/task/detail`, {
    params: {
      year: targetDate.year,
      month: targetDate.month,
      day: targetDate.day,
    },
  });
};

export const searchHomeTasksApi = (
  keyword: string,
  homeId: string
): Promise<AxiosResponse<HomeTask>> => {
  return instance.get(`/api/homes/${homeId}/tasks/search`, {
    params: {
      keyword,
    },
  });
};

export const fetchHomeTasksAlertApi = (
  homeId: string
): Promise<AxiosResponse<HomeAlert>> => {
  return instance.get(`/api/homes/${homeId}/tasks/alert`);
};

export const fetchHomeTaskStatisticsTargetApi = (
  year: number,
  month: number,
  homeId: string,
  target: string
): Promise<AxiosResponse<StatisticsByHomeTask>> => {
  return instance.get(`/api/homes/${homeId}/tasks/statistics/${target}`, {
    params: {
      year,
      month,
    },
  });
};

// USER
export const fetchUserInfoApi = (): Promise<AxiosResponse<User>> => {
  return instance.get(`api/users`);
};

export const updateUserApi = (
  homeId: string
): Promise<AxiosResponse<string>> => {
  return instance.patch(`/api/users`, {
    homeId,
  });
};

export const loginGuestApi = () => {
  const AUTH_URI = process.env.REACT_APP_GUEST_AUTH_URI || '';
  return axios.post(AUTH_URI);
};
