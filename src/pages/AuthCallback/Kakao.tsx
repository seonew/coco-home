import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { actions } from '../../stores/slice';
import axios from 'axios';
import qs from 'qs';
import constants from 'constants/index';

const CallbackKakao = ({ history, location }) => {
  const AUTH_URI = process.env.REACT_APP_KAKAO_AUTH_URI || '';
  const dispatch = useDispatch();

  useEffect(() => {
    async function getToken() {
      const { code } = qs.parse(location.search, {
        ignoreQueryPrefix: true,
      });

      try {
        const response = await axios.post(AUTH_URI, {
          code,
        });

        const { access_token, name, lastHomeId, imgUrl, userId } =
          response.data;

        dispatch(
          actions.login({
            token: access_token,
            name,
            lastHomeId,
            imgUrl,
            userId,
          })
        );
        history.push(constants.PAGE_PATH.MYPAGE);
      } catch (error) {
        history.push(constants.PAGE_PATH.LOGIN);
      }
    }

    getToken();
  }, [AUTH_URI, dispatch, location, history]);
  return null;
};

export default CallbackKakao;
