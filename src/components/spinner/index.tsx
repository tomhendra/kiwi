/** @jsxImportSource @emotion/react */
import { FaSpinner } from 'react-icons/fa';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const spin = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
});

const Spinner = styled(FaSpinner)({
  animation: `${spin} 1s linear infinite`,
});

Spinner.defaultProps = {
  'aria-label': 'loading',
};

const StyledContainer = styled.div({
  fontSize: '4em',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

function FullPageSpinner() {
  return (
    <StyledContainer>
      <Spinner />
    </StyledContainer>
  );
}
export { Spinner, FullPageSpinner };
