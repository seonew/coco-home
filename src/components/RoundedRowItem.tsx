import { memo, ReactNode } from 'react';
import styled from 'styled-components';

interface RoundedRowItemProps {
  children?: ReactNode;
  text?: string;
  color?: string;
  onClick?: () => void;
}

const Root = styled.div<{ color?: string }>`
  padding: 17px 20px;
  border-radius: 8px;
  background: ${(props) => props.color ?? '#f2f4f6'};
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.5715rem;
  letter-spacing: -0.5px;
  color: #000;
`;

const RoundedRowItem = ({
  children,
  text,
  color,
  onClick,
}: RoundedRowItemProps) => {
  const handleClickItem = () => {
    if (onClick !== undefined) {
      onClick();
    }
  };

  return (
    <Root color={color} onClick={handleClickItem} data-cy="roundedRowItem">
      {children ?? text}
    </Root>
  );
};

export default memo(RoundedRowItem);
