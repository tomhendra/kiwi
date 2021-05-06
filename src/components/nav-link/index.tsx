/**@jsxImportSource @emotion/react */
import { Link } from 'react-router-dom';
import { theme } from 'theme';

function NavLink(props: any) {
  return (
    <Link
      css={{
        display: 'block',
        padding: '8px',
        width: '100%',
        color: theme.colors.text,
        borderRadius: theme.radii.sm,
        textDecoration: 'none',
        ':hover': {
          color: theme.colors.primary,
        },
      }}
      {...props}
    />
  );
}

export { NavLink };
