import { PropsWithChildren, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useStore } from '@waveditors/rxjs-react';
import { useTemplateId } from '../../common/hooks';
import { useTemplateQuery } from '../../common/graphql/template.g';
import { CONTROL_PANEL } from '../../../common/constants';
import { versionsStoreConstructor, getCurrent } from '../store';
import { VersionsContext, useVersionsContext } from '../hooks';
import { handleError } from '../../../common/services';
import { useErrorHandler } from '../../../common/hooks';

const VersionsLoader = () => {
  const templateId = useTemplateId();
  const versions = useVersionsContext();
  const { noResource } = useErrorHandler();
  const { data } = useTemplateQuery({
    variables: { templateId },
    fetchPolicy: 'network-only',
    onError: handleError([noResource]),
  });

  useEffect(() => {
    if (!data?.template.versions) return;
    const storeCurrent = getCurrent(versions.getValue());
    if (storeCurrent) return;
    const current = data.template?.versions[0].json;
    versions.actions.setCurrent(current);
  }, [data?.template, versions]);

  return !templateId || Number.isNaN(templateId) ? (
    <Navigate to={CONTROL_PANEL} />
  ) : null;
};

export const VersionsProvider = ({ children }: PropsWithChildren) => {
  const versionsStore = useStore(
    versionsStoreConstructor(),
    { current: null, preview: null },
    []
  );
  return (
    <VersionsContext.Provider value={versionsStore}>
      <VersionsLoader />
      {children}
    </VersionsContext.Provider>
  );
};
