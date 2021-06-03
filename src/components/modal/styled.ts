import styled from 'styled-components';
import { theme } from 'core/theme';

const StyledOverlay = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: ${theme.colors.overlay};
  z-index: ${theme.zIndices[40]};
  transform: translateZ(0);
`;

const StyledContainer = styled.div`
  position: relative;
  outline: 0;
  background: ${theme.colors.background};
  z-index: ${theme.zIndices[50]};
  max-width: ${theme.sizes.lg};
  max-height: ${theme.sizes['2xl']};
  border-radius: ${theme.radii.md};
  box-shadow: ${theme.shadows.default};
  margin: 10vh auto;
  padding: ${theme.space[5]};
  padding-bottom: ${theme.space[6]};
`;

const StyledTitle = styled.h3`
  text-align: center;
  font-size: ${theme.fontSizes[3]};
`;

const StyledContent = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const StyledCloseButton = styled.button`
  background: ${theme.colors.background};
  color: ${theme.colors.text};
  border: 1px solid ${theme.colors.muted};
  border-radius: ${theme.radii.md};
  padding: 0;
  width: ${theme.sizes[8]};
  height: ${theme.sizes[8]};
  line-height: ${theme.lineHeights.normal};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export {
  StyledCloseButton,
  StyledOverlay,
  StyledContainer,
  StyledTitle,
  StyledContent,
};
