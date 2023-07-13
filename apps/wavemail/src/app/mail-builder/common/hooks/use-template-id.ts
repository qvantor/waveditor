import { useParams } from 'react-router-dom';

export const useTemplateId = () => {
  const params = useParams<{ id: string }>();
  return Number(params.id);
};
