/** @jsxImportSource @emotion/react */
import { Project } from 'core/models';
import { Link } from 'react-router-dom';
import { theme } from 'core/theme';

function ProjectPreview({ project }: { project: Project }) {
  const { id, title, description, startAt, endAt } = project;

  return (
    <Link to={`/projects/${id}`}>
      <div
        css={{
          background: theme.colors.white,
          padding: theme.space[4],
          marginBottom: theme.space[3],
          borderRadius: theme.radii.lg,
        }}
      >
        <p>id: {id}</p>
        <p>title: {title}</p>
        <p>description: {description}</p>
        <p>start: {startAt}</p>
        <p>end: {endAt}</p>
      </div>
    </Link>
  );
}

export { ProjectPreview };
