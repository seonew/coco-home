import { memo, CSSProperties, useCallback } from 'react';
import styled from 'styled-components';
import { Tooltip, Fab, SvgIconProps } from '@material-ui/core';

interface FloatingButtonProps {
  color?: 'default' | 'inherit' | 'primary' | 'secondary';
  title: string;
  children?: SvgIconProps;
  style?: CSSProperties;
  onClick: () => void;
}

const Root = styled.div``;

const FloatingButton = ({
  color,
  title,
  children,
  style,
  onClick,
}: FloatingButtonProps) => {
  const handleClickItem = useCallback(() => {
    onClick();
  }, [onClick]);

  return (
    <Root style={style} data-cy="floatingButton">
      <Tooltip title={title} onClick={handleClickItem}>
        <Fab color={color || 'primary'} size="small" aria-label={title}>
          {children}
        </Fab>
      </Tooltip>
    </Root>
  );
};
export default memo(FloatingButton);
