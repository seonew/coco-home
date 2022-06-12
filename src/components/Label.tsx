import { memo } from 'react';
import styled from 'styled-components';

interface LabelProps {
  text: string;
  color?: string;
}

const Root = styled.span<{ color?: string }>`
  position: absolute;
  top: 10px;
  left: 12px;

  min-width: 18px;
  padding: 0 5px;
  font-size: 10px;
  font-weight: 700;
  line-height: 18px;
  letter-spacing: -0.31px;
  border-radius: 9px;

  color: ${(props) => (props.color ? '#fff' : '#43484b')};
  background-color: ${(props) => props.color || '#fff'};
`;

const Label = ({ text, color }: LabelProps) => {
  return <Root color={color}>{text}</Root>;
};
export default memo(Label);
