/** @jsxImportSource @emotion/react */
import { Link } from 'react-router-dom';

function NotFoundScreen() {
  return (
    <div
      css={{
        height: '100%',
        display: 'grid',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div>
        <p>Sorry... nothing here.</p>
        <Link to="/dashboard">Go back to the Dashboard</Link>
      </div>
    </div>
  );
}

export { NotFoundScreen };
