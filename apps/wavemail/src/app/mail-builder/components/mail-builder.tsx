import { Navigate, useParams } from 'react-router-dom';
import { Spin } from 'antd';
import { useTemplateQuery } from '../graphql/template.g';
import { ROOT } from '../../common/constants';
import { MailBuilderInternal } from './mail-builder-internal';

export const MailBuilder = () => {
  const params = useParams<{ id: string }>();
  const { data, loading } = useTemplateQuery({
    variables: { templateId: Number(params.id) },
  });
  if (!params.id) return <Navigate to={ROOT} />;
  if (!data?.template.versions || loading) return <Spin />;
  const version = data.template.versions[0].json;
  return <MailBuilderInternal {...version} />;
};
