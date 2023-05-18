interface Props {
  id: string;
}

export const NotFoundDumb = ({ id }: Props) => (
  <p>Element with id {id} is not found</p>
);
