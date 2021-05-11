/**@jsxImportSource @emotion/react */
import { Link, useMatch } from 'react-router-dom';
import { theme } from 'core/theme';

function NavLink(props: any) {
  const match = useMatch(props.to);
  return (
    <Link
      css={[
        {
          borderLeft: `5px solid transparent`,
          display: 'block',
          padding: '8px',
          width: '100%',
          color: theme.colors.text,
          borderRadius: theme.radii.sm,
          textDecoration: 'none',
          ':hover': {
            color: theme.colors.primary,
          },
        },
        match
          ? {
              borderLeft: `5px solid ${theme.colors.primary}`,
              ':hover': {
                background: theme.colors.gray[5],
              },
            }
          : null,
      ]}
      {...props}
    />
  );
}

export { NavLink };
