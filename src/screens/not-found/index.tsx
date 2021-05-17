/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const StyledContainer = styled.div`
  height: 100%;
  display: grid;
  align-items: center;
  justify-content: center;
`;

function NotFoundScreen() {
  return (
    <StyledContainer>
      <p>Sorry... nothing here.</p>
      <Link to="/dashboard">Go back to the Dashboard</Link>
    </StyledContainer>
  );
}

export { NotFoundScreen };
