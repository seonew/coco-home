import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { actions } from '../../stores/slice';
import axios from 'axios';
import constants from 'constants/index';

const CallbackGuest = ({ history, location }) => {
  const AUTH_URI = process.env.REACT_APP_GUEST_AUTH_URI || '';
  const dispatch = useDispatch();

  useEffect(() => {
    async function getToken() {
      try {
        const response = await axios.post(AUTH_URI);
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

export default CallbackGuest;
