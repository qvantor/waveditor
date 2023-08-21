import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import { GraphQLError } from 'graphql/index';
import { notification } from 'antd';
import { Handler } from '../services';
import { CONTROL_PANEL } from '../constants';

export const useErrorHandler = (): {
  noResource: Handler;
  toastAll: Handler;
} => {
  const navigate = useNavigate();
  return useMemo(
    () => ({
      toastAll: {
        error: '*',
        handle: (e: GraphQLError) =>
          notification.error({
            message: e.message,
            description: e.extensions?.code as string,
          }),
      },
      noResource: {
        error: ['FORBIDDEN', 'NOT_FOUND'],
        handle: () => navigate(CONTROL_PANEL),
      },
    }),
    [navigate]
  );
};
