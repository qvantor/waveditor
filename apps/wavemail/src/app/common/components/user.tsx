import { AiOutlineUser } from 'react-icons/ai';
import styled from 'styled-components';
import { tokens } from '@waveditors/theme';
import { User as UserType } from '../types/gql.g';

type Props = {
  user?: Pick<UserType, 'id' | 'firstName' | 'lastName'> | null;
};

const Root = styled.div`
  display: inline-flex;
  gap: 5px;
`;

const Circle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${tokens.color.element.primary};
  color: ${tokens.color.text.tertiary};
  width: 16px;
  height: 16px;
  font-size: 13px;
  border-radius: 100%;
`;
export const User = ({ user }: Props) => {
  return (
    <Root>
      <Circle>
        <AiOutlineUser />
      </Circle>
      {user?.firstName} {user?.lastName}
    </Root>
  );
};
