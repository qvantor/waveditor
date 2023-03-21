import { PropsWithChildren } from 'react';

interface Props {
  width: number;
}

export const ColumnDumb = ({ children, width }: PropsWithChildren<Props>) => (
  <div style={{ width }}>{children}</div>
);
