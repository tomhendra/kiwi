/**@jsxImportSource @emotion/react */
import { Link, useMatch } from 'react-router-dom';
import { PathMatch } from 'react-router';
import styled from 'styled-components';
import { theme } from 'core/theme';

interface Props {
  $match: PathMatch | null;
}

const StyledLink = styled(Link)<Props>`
  border-left: 5px solid transparent;
  border-color: ${props => (props.$match ? theme.colors.primary : null)};
  display: block;
  padding: 8px;
  width: 100%;
  color: ${theme.colors.text};
  border-radius: ${theme.radii.sm};
  text-decoration: none;
  :hover {
    color: ${theme.colors.primary};
    background: ${props => (props.$match ? theme.colors.gray[7] : null)};
  }
`;

// const StyledLinkObj = styled(Link)<Props>(({ $match }) => ({
//   borderLeft: '5px solid transparent',
//   borderColor: $match ? theme.colors.primary : '',
//   display: 'block',
//   padding: '8px',
//   width: '100%',
//   color: theme.colors.text,
//   borderRadius: theme.radii.sm,
//   textDecoration: 'none',
//   ':hover': {
//     color: theme.colors.primary,
//     background: $match ? theme.colors.gray[7] : '',
//   },
// }));

function NavLink(props: any) {
  const match = useMatch(props.to);
  return <StyledLink $match={match} {...props} />;
}

export { NavLink };
