import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { actions } from '../../stores/slice';
import axios from 'axios';
import qs from 'qs';
import { PAGE_PATH } from 'constants/index';

const Callback = ({ history, location, authUri }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    async function getToken() {
      const { code } = qs.parse(location.search, {
        ignoreQueryPrefix: true,
      });

      try {
        const response = await axios.post(authUri, {
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
      } catch (error) {
        history.push(PAGE_PATH.LOGIN);
      }
    }

    getToken();
  }, [dispatch, location, history, authUri]);
  return null;
};

export default Callback;
