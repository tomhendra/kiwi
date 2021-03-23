import { ModeToggle } from './components';
import { StyledContainer, StyledNav } from './styled';

export function Navbar() {
  return (
    <StyledContainer>
      <StyledNav>
        <ModeToggle />
      </StyledNav>
    </StyledContainer>
  );
}
