import { PAGE_PATH } from 'constants/index';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { RootState } from 'stores';

const PrivateRoute = ({ children, ...rest }) => {
  const isAuthenticated = useSelector<RootState, boolean>(
    (state) => state.app.isAuthenticated
  );

  return (
    <Route
      {...rest}
      render={() =>
        isAuthenticated ? children : <Redirect to={PAGE_PATH.LOGIN} />
      }
    />
  );
};

export default PrivateRoute;
