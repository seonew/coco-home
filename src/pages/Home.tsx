import { memo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'stores';
import { HomeListItem } from 'types';
import { PAGE_PATH, TextType, pageNameByPathName } from 'constants/index';

import HomeInfo from './HomeInfo';
import EmptyHome from './HomeInfo/EmptyHome';
import Header from 'components/Header';

const Home = () => {
  const homeId = useSelector<RootState, string>(
    (state) => state.app.currentHome.id
  );
  const homeList = useSelector<RootState, HomeListItem[] | null>(
    (state) => state.mypage.homeList
  );

  return (
    <>
      <Header text={pageNameByPathName[PAGE_PATH.MAIN]} />
      {homeId ? (
        <HomeInfo />
      ) : (homeList?.length as number) > 0 ? (
        <EmptyHome textType={TextType.SELECT} />
      ) : (
        <EmptyHome textType={TextType.REGISTER} />
      )}
    </>
  );
};

export default memo(Home);
