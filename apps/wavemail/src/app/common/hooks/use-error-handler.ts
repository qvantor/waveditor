import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import { Handler } from '../services';
import { CONTROL_PANEL } from '../constants';

export const useErrorHandler = (): { noResource: Handler } => {
  const navigate = useNavigate();
  return useMemo(
    () => ({
      noResource: {
        error: ['FORBIDDEN', 'NOT_FOUND'],
        handle: () => navigate(CONTROL_PANEL),
      },
    }),
    [navigate]
  );
};
