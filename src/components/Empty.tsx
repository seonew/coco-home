import { memo, ReactNode } from 'react';
import styled from 'styled-components';

interface EmptyProps {
  text: string;
  description?: string;
  children?: ReactNode;
}

const Root = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-color: #fff;
  text-align: center;
  align-items: center;
`;

const Text = styled.div`
  font-size: 1.2rem;
  line-height: 22px;
  letter-spacing: -0.5px;
  color: #6f8292;
`;

const Description = styled.div`
  font-size: 1rem;
  line-height: 19px;
  letter-spacing: -0.6px;
  color: #9aa3a9;
  padding-top: 12px;
`;

const Empty = ({ text, description, children }: EmptyProps) => {
  return (
    <Root>
      <Text>{text}</Text>
      <Description>{description}</Description>
      {children}
    </Root>
  );
};

export default memo(Empty);
