import { memo, ReactNode } from 'react';
import styled from 'styled-components';

interface RowProps {
  text: string;
  required?: boolean;
  children?: ReactNode;
}

const Root = styled.div`
  padding: 0.75rem 1.2rem;
  border-bottom: 1px solid #f2f2f2;
  background-color: #fff;
  min-height: 80px;
`;

const Asterisk = styled.span`
  color: red;
`;

const Title = styled.h3`
  margin: 0;
  line-height: 32px;
`;

const Row = ({ text, required, children }: RowProps) => {
  return (
    <Root data-cy="row">
      <Title>
        {required && <Asterisk className="mr5">*</Asterisk>}
        {text}
      </Title>
      {children}
    </Root>
  );
};

export default memo(Row);
