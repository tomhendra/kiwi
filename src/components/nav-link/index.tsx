/**@jsxImportSource @emotion/react */
import { Link } from 'react-router-dom';
import { theme } from 'theme';

function NavLink(props: any) {
  return (
    <Link
      css={{
        display: 'block',
        padding: '8px 15px 8px 10px',
        margin: '5px 0',
        width: '100%',
        height: '100%',
        color: theme.colors.text,
        borderRadius: theme.radii.sm,
        borderLeft: '5px solid transparent',
        ':hover': {
          color: theme.colors.primaryHover,
          textDecoration: 'none',
          background: theme.colors.secondary,
        },
      }}
      {...props}
    />
  );
}

export { NavLink };
